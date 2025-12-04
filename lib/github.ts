import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const GITHUB_API = "https://api.github.com";

export async function getGitHubAuth() {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.accessToken as string | undefined;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  if (!token || !owner || !repo) return null;
  return { token, owner, repo };
}

export async function getFileSha(path: string) {
  const auth = await getGitHubAuth();
  if (!auth) return null;
  const res = await fetch(`${GITHUB_API}/repos/${auth.owner}/${auth.repo}/contents/${encodeURIComponent(path)}`, {
    headers: { Authorization: `Bearer ${auth.token}`, Accept: "application/vnd.github+json" },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json?.sha || null;
}

export async function commitFile(path: string, content: string, message: string) {
  const auth = await getGitHubAuth();
  if (!auth) return { ok: false, error: "Missing GitHub auth/env" };
  const sha = await getFileSha(path);
  const res = await fetch(`${GITHUB_API}/repos/${auth.owner}/${auth.repo}/contents/${encodeURIComponent(path)}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${auth.token}`, Accept: "application/vnd.github+json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
      sha: sha || undefined,
    }),
  });
  if (!res.ok) {
    return { ok: false, error: `GitHub ${res.status}` };
  }
  const json = await res.json();
  return { ok: true, data: json };
}
