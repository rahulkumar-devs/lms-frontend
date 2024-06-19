"use client";

import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {  useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useActivationMutation } from "@/redux/auth/authApi";
import { toast } from "react-hot-toast";

const verificationSchema = z.object({
  code: z.string().min(6, "Code must be at least 6 characters"),
});

type VerificationProps = {
  switchComponent: (currentComponent: string) => void;
  whichElement: string;
  className?: string;
};

const VerificationCode: FC<VerificationProps> = ({
  className,
  switchComponent,
  whichElement,
}) => {
  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const { token, user } = useSelector((state: RootState) => state.auth);
  const [activation, { isLoading, isSuccess, error, data }] =
    useActivationMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successfully !";
      toast.success(message);
      switchComponent("sign-in");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [isSuccess, data, switchComponent, error]);

  const onSubmit = (values: z.infer<typeof verificationSchema>) => {
    if (whichElement === "forgot-password") {
      
    } else if (whichElement === "auth-verification") {
      const newData = {
        activationToken: token,
        activateCode: values.code,
      };
      activation(newData);
    }
  };

  return (
    <div className={cn("", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Verify</Button>
        </form>
      </Form>
    </div>
  );
};

export default VerificationCode;
