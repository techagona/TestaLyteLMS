import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotAdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-fit p-4 bg-destructive/10 rounded-full">
            <Shield className="size-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Restricted Acess</CardTitle>
          <CardDescription className=" max-w-xs mx-auto">
            Hey! You are not an admin, which means you can not create a course.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-3">
          <Link
            href={"/"}
            className={buttonVariants({
              className: "w-full",
            })}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
