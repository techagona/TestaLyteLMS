"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

import React, { useState, useTransition } from "react";

import { toast } from "sonner";

export default function VerifyRequest() {
  const [emailOtp, setemailOtp] = useState("");
  const [emailPending, startEmailTransition] = useTransition();
  const router = useRouter();
  const params = useSearchParams();

  const isOTPCompleted = emailOtp.length === 6;
  const email = params.get("email") || "";

  function handleOtpVerification() {
    startEmailTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp: emailOtp,
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Email verified successfully, you will be redirected soon..."
            );
            router.push("/");
          },

          onError: () => {
            toast.error("Invalid email/OTP");
          },
        },
      });
    });
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Check your email</CardTitle>
        <CardDescription>
          We have sent a verification email to your inbox. Please check your
          email, copy the code and paste here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            maxLength={6}
            value={emailOtp}
            onChange={(value) => setemailOtp(value)}
            className="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <p className="text-sm text-muted-foreground mt-2">
            Enter the 6-digit code sent to your email.
          </p>
        </div>

        <Button
          onClick={handleOtpVerification}
          disabled={emailPending || !isOTPCompleted}
          className="w-full cursor-pointer"
        >
          {emailPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Verifying your account</span>
            </>
          ) : (
            <>Verity Account</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
