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

// Mocked data storage
const mockedFormData: z.infer<typeof loginUserZod>[] = [];

// Zod validation schema
const loginUserZod = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);

  // Initialize form
  const loginUserForm = useForm<z.infer<typeof loginUserZod>>({
    resolver: zodResolver(loginUserZod),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Mock form with try catch
  async function onSubmit(values: z.infer<typeof loginUserZod>) {
    try {
      setLoading(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      toast.success("Working");

      // Push data to (BE later) mockedFormData
      console.log("Pushing data to mockedFormData", values);
      mockedFormData.push(values);
      console.log("MockedFormData", mockedFormData);

      // Reset form
      loginUserForm.reset();
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
            <Button type="submit" disabled={loading} className="cursor-pointer">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
