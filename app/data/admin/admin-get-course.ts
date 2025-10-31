import "server-only";

import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function AdminGetCourse(id: string) {
  await requireAdmin();

  const data = await prisma.course.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      smallDescription: true,
      status: true,
      price: true,
      duration: true,
      fileKey: true,
      level: true,
      description: true,
      category: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export type AdminGetCourseSingularType = Awaited<
  ReturnType<typeof AdminGetCourse>
>;
