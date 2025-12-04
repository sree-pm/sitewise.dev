import { NextResponse } from "next/server";
import { getAdminStatus } from "@/lib/repoAdmin";
import fs from "fs";
import path from "path";

const baseDir = path.join(process.cwd(), "public", "data", "versions");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const dir = path.join(baseDir, params.slug);
  ensureDir(dir);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const versions = files
    .map((f) => ({
      id: path.basename(f, ".json"),
      timestamp: Number(path.basename(f, ".json")),
    }))
    .sort((a, b) => b.timestamp - a.timestamp);
  return NextResponse.json({ versions });
}

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const admin = await getAdminStatus();
  if (!admin.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body || !body.blocks) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  ensureDir(baseDir);
  const dir = path.join(baseDir, params.slug);
  ensureDir(dir);
  const ts = Date.now();
  const file = path.join(dir, `${ts}.json`);
  fs.writeFileSync(file, JSON.stringify({ slug: params.slug, blocks: body.blocks, ts }, null, 2));
  return NextResponse.json({ ok: true, version: ts });
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const admin = await getAdminStatus();
  if (!admin.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const versionId = body?.versionId;
  if (!versionId) return NextResponse.json({ error: "Missing versionId" }, { status: 400 });

  const dir = path.join(baseDir, params.slug);
  const src = path.join(dir, `${versionId}.json`);
  if (!fs.existsSync(src)) return NextResponse.json({ error: "Version not found" }, { status: 404 });
  // Rollback copies selected version as latest
  const ts = Date.now();
  const dst = path.join(dir, `${ts}.json`);
  fs.copyFileSync(src, dst);
  return NextResponse.json({ ok: true, version: ts });
}
