import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function requireAdmin(
  options: { onFail?: "redirect" | "json" } = {}
) {
  const onFail = options.onFail ?? "redirect";
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    if (onFail === "redirect") redirect("/login");
    throw NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user?.role !== "admin") {
    if (onFail === "redirect") redirect("/not-admin");
    throw NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return session;
}
