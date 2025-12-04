import { NextResponse } from "next/server";
import { getAdminStatus } from "@/lib/repoAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Simple in-memory rate limiter: key by IP, window 60s, max 20
const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQ = 20;

function rateLimit(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQ - 1, resetAt: now + WINDOW_MS };
  }
  if (bucket.count >= MAX_REQ) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
  }
  bucket.count += 1;
  return { allowed: true, remaining: MAX_REQ - bucket.count, resetAt: bucket.resetAt };
}

export async function POST(req: Request) {
  // Rate limit by IP (fallback to token string if available later)
  const ip = (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown").split(",")[0].trim();
  const rl = rateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too Many Requests", resetAt: rl.resetAt }, { status: 429 });
  }

  const admin = await getAdminStatus();
  const session = await getServerSession(authOptions);
  if (!admin.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Expect JSON payload: { slug: string, blocks: any, message?: string }
  const body = await req.json().catch(() => null);
  if (!body || !body.slug || !body.blocks) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // For demo, just echo with attribution. In a real setup, commit to Git or write to storage.
  return NextResponse.json({
    ok: true,
    saved: {
      slug: body.slug,
      blocks: body.blocks,
      editor: { id: session?.user?.email || session?.user?.name, name: session?.user?.name },
      at: Date.now()
    }
  });
}
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

/**
 * API endpoint to save Puck page data directly to GitHub
 * POST /api/save-page
 * 
 * Body: {
 *   pageData: { content: [], root: {} },  // Puck Data object
 *   message: "Update page content",       // Commit message
 *   token: "github_pat_xxx"               // GitHub PAT (from env or body)
 * }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageData, message, token, owner: bodyOwner, repo: bodyRepo } = body;

    // Prefer token from request body, then cookie (user login), then environment
    const cookieToken = request.cookies.get("gh_token")?.value;
    const githubToken = token || cookieToken || process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return NextResponse.json(
        { error: "GitHub token not provided. Set GITHUB_TOKEN env var, login via GitHub, or pass token in request body." },
        { status: 401 }
      );
    }

    // Repo info: allow overriding via request body, otherwise fall back to env
    const owner = bodyOwner || process.env.GITHUB_OWNER || "sree-pm";
    const repo = bodyRepo || process.env.GITHUB_REPO || "sitewise-dev";
    const branch = process.env.GITHUB_BRANCH || "main";
    const filePath = "data/pages.json";

    // Initialize Octokit with token
    const octokit = new Octokit({
      auth: githubToken,
    });

    // Get current file SHA (needed for update)
    let sha: string | undefined;
    try {
      const file = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath,
        ref: branch,
      });
      if ("sha" in file.data) {
        sha = file.data.sha;
      }
    } catch (err: any) {
      // File doesn't exist yet, that's fine for initial creation
      if (err.status !== 404) {
        throw err;
      }
    }

    // Prepare file content (base64 encoded)
    const fileContent = JSON.stringify(pageData, null, 2);
    const encodedContent = Buffer.from(fileContent).toString("base64");

    // Create or update file
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: message || "Update page content via Puck editor",
      content: encodedContent,
      branch,
      ...(sha && { sha }), // Include SHA if file exists (for update)
    });

    console.log(`✓ File committed to GitHub: ${filePath}`);
    console.log(`  Commit: ${response.data.commit.sha}`);

    return NextResponse.json({
      success: true,
      message: `Page saved to GitHub (${filePath})`,
      commit: response.data.commit.sha,
      url: response.data.commit.html_url,
    });
  } catch (error: any) {
    console.error("Error saving to GitHub:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to save page to GitHub" },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to fetch latest page data from GitHub
 * GET /api/save-page?branch=main
 */
export async function GET(request: NextRequest) {
  try {
    const owner = request.nextUrl.searchParams.get("owner") || process.env.GITHUB_OWNER || "sree-pm";
    const repo = request.nextUrl.searchParams.get("repo") || process.env.GITHUB_REPO || "sitewise-dev";
    const branch = request.nextUrl.searchParams.get("branch") || "main";
    const filePath = "data/pages.json";

    // Use public fetch (no token needed for public repos)
    const response = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch ${filePath} from GitHub` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      data,
      branch,
    });
  } catch (error: any) {
    console.error("Error fetching from GitHub:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to fetch page from GitHub" },
      { status: 500 }
    );
  }
}
