import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";

export async function requireAdmin(req: NextRequest) {
  const session = await getServerSession();
  const accessToken = (session as any)?.accessToken as string | undefined;
  if (!accessToken) return { ok: false, reason: 'no-token' };
  return { ok: true, accessToken };
}
