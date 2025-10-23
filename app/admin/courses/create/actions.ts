"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { courseSchema, courseSchemaType } from "@/lib/zodSchemas";
import { ApiResponse } from "@/types";
import { headers } from "next/headers";

export async function CreateCourse(
  values: courseSchemaType
): Promise<ApiResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  try {
    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    // Import CourseStatus enum from Prisma client

    const data = await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id as string,
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (e) {
    console.log(e);

    return {
      status: "error",
      message: "Failed to create course.",
    };
  }
}
