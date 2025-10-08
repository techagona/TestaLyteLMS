"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader, Loader2 } from "lucide-react";
import React, { useTransition } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [githubPending, startGithubTransition] = useTransition();

  async function handleGithubLogin() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Signed in with Github, you will be redirected soon..."
            );
          },
          onError: (error) => {
            toast.error(`Internal Server Error`);
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>
          Login with your Github or Email Account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          className="w-full cursor-pointer"
          variant="outline"
          onClick={handleGithubLogin}
          disabled={githubPending}
        >
          {githubPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Sign in with Github
            </>
          )}
        </Button>

        <div
          className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 
        after:z-0 after:items-center after:border-t after:border-border"
        >
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="m@example.com" />
          </div>
          <Button className="cursor-pointer">Continue with Email</Button>
        </div>
      </CardContent>
    </Card>
  );
}
