"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleLoginUser } from "./actions";
import { useRouter } from "next/navigation";

// Mocked data storage
//const mockedFormData: z.infer<typeof loginUserZod>[] = [];

// Zod validation schema
const loginUserZod = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Hooks can only be called in the body of a functional component
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // Initialize form
  const loginUserForm = useForm<z.infer<typeof loginUserZod>>({
    resolver: zodResolver(loginUserZod),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof loginUserZod>) {
    try {
      setLoading(true);

      // Call the server action to login user (Call to the backend)
      const result = await handleLoginUser(values);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message || "Login successful!");
        loginUserForm.reset();

        // Redirect user to home page
        router.push("/");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("max-w-[500px]", className)} {...props}>
      <Form {...loginUserForm}>
        <form onSubmit={loginUserForm.handleSubmit(onSubmit)}>
          {/* Div for styling */}
          <div className="width-[400px] space-y-4 rounded-md border p-4">
            {/* EMAIL */}
            <FormField
              control={loginUserForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent"
                      autoComplete="off"
                      disabled={loading}
                      placeholder="Email"
                      type="email"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* PASSWORD */}
            <FormField
              control={loginUserForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent"
                      autoComplete="off"
                      disabled={loading}
                      placeholder="Password"
                      type="password"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button
              type="submit"
              disabled={loading}
              className="cursor-pointer border-black rounded-md"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
