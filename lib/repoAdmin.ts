import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type RepoInfo = {
  full_name: string;
  fork: boolean;
  parent?: { full_name: string };
};

export async function getAdminStatus() {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.accessToken as string | undefined;
  const owner = process.env.GITHUB_OWNER || process.env.TEMPLATE_REPO_OWNER;
  const repo = process.env.GITHUB_REPO || process.env.TEMPLATE_REPO_NAME;
  if (!token || !owner || !repo) {
    return { isAdmin: false, reason: "Missing token or repo env" };
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return { isAdmin: false, reason: `GitHub API ${res.status}` };
    }
    const data = (await res.json()) as RepoInfo;

    // If this repo is a fork of the template repo, consider admin
    const templateFullName = `${process.env.TEMPLATE_REPO_OWNER}/${process.env.TEMPLATE_REPO_NAME}`;
    const isForkOfTemplate = Boolean(data.parent && data.parent.full_name === templateFullName);

    // Alternatively, allow admin if repo matches configured owner/repo and user has push access
    let hasPushAccess = false;
    try {
      const permRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/collaborators/${session?.user?.name || session?.user?.email}?permission=push`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      hasPushAccess = permRes.status === 204; // 204 if user is a collaborator
    } catch {}

    const isAdmin = isForkOfTemplate || hasPushAccess;
    return { isAdmin };
  } catch (e) {
    return { isAdmin: false, reason: "GitHub check failed" };
  }
}
