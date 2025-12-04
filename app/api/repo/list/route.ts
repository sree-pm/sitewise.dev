import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

/**
 * List repos owned by the authenticated user
 * GET /api/repo/list
 */
export async function GET(request: NextRequest) {
  try {
    const cookieToken = request.cookies.get("gh_token")?.value;
    if (!cookieToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const octokit = new Octokit({ auth: cookieToken });

    // Get user's repos
    const repos = await octokit.rest.repos.listForAuthenticatedUser({
      per_page: 100,
      sort: "updated",
      direction: "desc",
    });

    return NextResponse.json({
      repos: repos.data.map((r) => ({
        name: r.name,
        owner: r.owner.login,
        url: r.html_url,
        description: r.description,
      })),
    });
  } catch (err: any) {
    console.error("Error listing repos:", err);
    return NextResponse.json({ error: err.message || "Failed to list repos" }, { status: 500 });
  }
}
