"use client";

import React, { FC, useEffect } from "react";
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
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io5";
import { useRegisterMutation } from "@/redux/auth/authApi";
import { toast } from "react-toastify";
import Spinner from "@/utils/Spinner";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpProps = {
  className?: string;
  switchComponent: (currentComponent: string) => void;
};

const SignUp: FC<SignUpProps> = ({ className, switchComponent }) => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [register, { isLoading, error, data, isSuccess }] =
    useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successfully !";
      toast.success(message);
      switchComponent("verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [isSuccess, data, switchComponent, error]);
  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    const newData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    register(newData);
  };

  return (
    <div className={cn("", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="elearning@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="* * * * *" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className=" flex items-center gap-1.5">
                <Spinner />
                <span>Loading...</span>
              </div>
            ) : (
              "SignUp"
            )}
          </Button>
        </form>
      </Form>
      <div className="w-full flex flex-col items-center justify-center pt-2">
        <p>Or join with</p>
        <div className="flex items-center justify-center text-3xl py-3 gap-2.5">
          <button>
            <FcGoogle />
          </button>
          <button>
            <IoLogoGithub />
          </button>
        </div>
      </div>
      <div className="mt-4 ">
        <p>
          <span>Already have an account</span>
          <span
            className=" text-green-600 font-bold "
            onClick={() => switchComponent("sign-in")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
