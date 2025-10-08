import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Circle, PentagonIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-svh items-center justify-center">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute left-4 top-4",
        })}
      >
        <ArrowLeft />
        Back
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center self-center gap-2 font-medium"
        >
          <PentagonIcon className="size-8" />
          TestaLyteLMS.
        </Link>
        {children}

        <div>
          <p className="text-balance text-center text-xs text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <span className="hover:text-primary hover:underline">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="hover:text-primary hover:underline">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
