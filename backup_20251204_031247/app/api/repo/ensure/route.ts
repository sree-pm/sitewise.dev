import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

/**
 * Ensure a per-user repo exists by generating from a template.
 * POST /api/repo/ensure
 * Body (optional): { name?: string }
 * Uses user's gh_token cookie; falls back to server GITHUB_TOKEN (not recommended)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const desiredName = body?.name;
    const initialData = body?.initialData;

    // For repo creation, ONLY accept user token (no server fallback for security)
    const cookieToken = request.cookies.get("gh_token")?.value;
    if (!cookieToken) {
      return NextResponse.json({ error: "Not authenticated: user GitHub token required" }, { status: 401 });
    }
    const token = cookieToken;

    const octokit = new Octokit({ auth: token });

    // Get user login
    const userRes = await octokit.rest.users.getAuthenticated();
    const login = userRes.data.login;

    const templateOwner = process.env.TEMPLATE_OWNER || process.env.GITHUB_OWNER || "sree-pm";
    const templateRepo = process.env.TEMPLATE_REPO || process.env.GITHUB_REPO || "sitewise-dev";

    // Choose repo name: desiredName || sitewise-<login>
    const repoName = desiredName || `sitewise-site-${login}`;

    // Check if repo already exists under user's account
    try {
      const existing = await octokit.rest.repos.get({ owner: login, repo: repoName });
      // Repo exists - return info
      return NextResponse.json({ exists: true, owner: login, name: repoName, html_url: existing.data.html_url });
    } catch (err: any) {
      if (err.status !== 404) {
        console.error("Error checking existing repo:", err);
        return NextResponse.json({ error: "Failed to check repo" }, { status: 500 });
      }
      // else 404 - continue to create
    }

    // Create from template
    try {
      // octokit has createUsingTemplate endpoint
      const create = await octokit.rest.repos.createUsingTemplate({
        template_owner: templateOwner,
        template_repo: templateRepo,
        name: repoName,
        owner: login,
        include_all_branches: false,
      });

      const repo = create.data;

      // After creation, ensure data/pages.json exists - use initialData if provided, else empty
      const defaultContent = JSON.stringify(initialData || { content: [], root: {} }, null, 2);
      const encoded = Buffer.from(defaultContent).toString("base64");

      try {
        await octokit.rest.repos.createOrUpdateFileContents({
          owner: login,
          repo: repoName,
          path: "data/pages.json",
          message: "chore: initialize pages.json",
          content: encoded,
          branch: repo.default_branch,
        });
      } catch (innerErr) {
        // ignore if already exists
        console.warn("Could not create data/pages.json - it may already exist", innerErr.message || innerErr);
      }

      return NextResponse.json({ exists: false, created: true, owner: login, name: repoName, html_url: repo.html_url });
    } catch (err: any) {
      console.error("Failed to create repo from template:", err);
      return NextResponse.json({ error: err.message || "Failed to create repo from template" }, { status: 500 });
    }
  } catch (err: any) {
    console.error("Unexpected error in /api/repo/ensure:", err);
    return NextResponse.json({ error: err.message || "Unexpected error" }, { status: 500 });
  }
}
