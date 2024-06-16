"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
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
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io5";
import { useLoginMutation } from "@/redux/auth/authApi";
import { toast } from "react-toastify";
import Spinner from "@/utils/Spinner";
import {signIn} from "next-auth/react"

type Props = {
  className?: string;
  switchComponent: (currentComponent: string) => void;
};
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const SignInUser: React.FC<Props> = ({ className, switchComponent }) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading, isSuccess, error, data }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successfully !";
      toast.success(message);
      switchComponent("")
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [isSuccess, data, switchComponent, error]);

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password } = values;
    login({ email, password });
  }

  return (
    <div className={cn("", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
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
                  <Input type="password" placeholder=" * * * * *" {...field} />
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
              "Signin"
            )}
          </Button>
        </form>
      </Form>

      <div className="w-full flex flex-col items-center justify-center pt-2">
        <p>Or join with</p>
        <div className="flex items-center justify-center text-3xl py-3 gap-2.5">
          <button>
            <FcGoogle 
            onClick={()=>{signIn()}}
            />
          </button>
          <button>
            <IoLogoGithub 
             onClick={()=>{signIn()}}
            />
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <span
          className=" text-green-600 font-bold  cursor-pointer"
          onClick={() => switchComponent("forgot-password")}
        >
          Forgot password?
        </span>
        <p>
          <span>Don`&apos;`t have an account?</span>
          <span
            onClick={() => switchComponent("sign-up")}
            className="text-green-600 font-bold cursor-pointer "
          >
            create account
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInUser;
