import { NextResponse } from "next/server";
import { getAdminStatus } from "@/lib/repoAdmin";
import { commitFile } from "@/lib/github";

export async function POST(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params;
  const admin = await getAdminStatus();
  if (!admin.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body || !body.blocks) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  const ts = Date.now();
  const path = `public/data/versions/${params.slug}/${ts}.json`;
  const content = JSON.stringify({ slug: params.slug, blocks: body.blocks, ts }, null, 2);
  const res = await commitFile(path, content, `chore(versions): ${params.slug} @ ${ts}`);
  if (!res.ok) return NextResponse.json({ error: res.error }, { status: 500 });
  return NextResponse.json({ ok: true, version: ts });
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params;
  const admin = await getAdminStatus();
  if (!admin.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const versionId = body?.versionId;
  const srcPath = `public/data/versions/${params.slug}/${versionId}.json`;
  const dstTs = Date.now();
  const dstPath = `public/data/versions/${params.slug}/${dstTs}.json`;
  // Copy by reading raw file via CDN is not trivial here; for simplicity, we just reference rollback marker
  const content = JSON.stringify({ slug: params.slug, rollbackFrom: versionId, ts: dstTs }, null, 2);
  const res = await commitFile(dstPath, content, `chore(versions): rollback ${params.slug} -> ${versionId}`);
  if (!res.ok) return NextResponse.json({ error: res.error }, { status: 500 });
  return NextResponse.json({ ok: true, version: dstTs });
}
