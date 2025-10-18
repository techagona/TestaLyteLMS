import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function CoursesPage() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link href={"/admin/courses/create"} className={buttonVariants()}>
          Create Course
        </Link>
      </div>
      <div>
        <h1>Here You will display all of your courses</h1>
      </div>
    </>
  );
}
