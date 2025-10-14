// This is a CLIENT COMPONENT, This is where code goes (form, buttons...)
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Mocked data storage
const mockedFormData: z.infer<typeof signupUserZod>[] = [];

// Zod validation schema
const signupUserZod = z
  .object({
    //firstName: z.string(),
    //lastName: z.string(),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Obtain route parameters
  //const params = useParams()

  // Translation
  //const { t } = useTranslation(params.locale, "common")

  const [loading, setLoading] = useState(false);

  // App router hook to redirect / navigate user
  //const router = useRouter;

  // Initialize form
  const SignupUserForm = useForm<z.infer<typeof signupUserZod>>({
    // Generic <z.infer<typeof loginUserZod>> tells TypeScript to infer the form data type from the Zod schema — this keeps types in sync.
    resolver: zodResolver(signupUserZod), // Tell RHF to validate using Zod schema on submit
    defaultValues: {
      // sets initial values for each form field
      //firstName: "",
      //lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Mock form with try catch
  async function onSubmit(values: z.infer<typeof signupUserZod>) {
    try {
      setLoading(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      // Toast was not working because there was not toast provided in the root layout
      toast.success("Working");

      // Push data to (BE later) mockedFormData
      console.log("Pushing data to mockedFormData", values);
      mockedFormData.push(values);
      console.log("MockedFormData", mockedFormData);

      // Reset form
      SignupUserForm.reset();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const onError: SubmitErrorHandler<z.infer<typeof signupUserZod>> = (
    errors
  ) => {
    console.log("Errors", errors);
  };

  return (
    <div
      className={cn(
        "max-w-[500px] bg-white text-black borrder-black rounded-md",
        className
      )}
      {...props}
    >
      <Form {...SignupUserForm}>
        <form onSubmit={SignupUserForm.handleSubmit(onSubmit)}>
          {/* Div for styling */}
          <div className="width-[400px] space-y-4 rounded-md border p-4">
            {/* <FormField control={signupUserForm.control} name='firstName' render={({ field }) => (...)}/>: */}
            {/* { render is a render-prop function that receives { field }; field contains the props needed to bind an input to RHF (usually { value, onChange, onBlur, name, ref }).} */}
            {/* FIRST NAME */}
            {/* <FormField
              control={SignupUserForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent"
                      autoComplete="off"
                      disabled={loading}
                      placeholder="First Name"
                      {...field}
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            ></FormField> */}

            {/* LAST NAME */}
            {/* <FormField
              control={SignupUserForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent"
                      autoComplete="off"
                      disabled={loading}
                      placeholder="Last Name"
                      {...field}
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            ></FormField> */}

            {/* USERNAME */}
            <FormField
              control={SignupUserForm.control}
              name="username"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent"
                      autoComplete="off"
                      disabled={loading}
                      placeholder="Username"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* EMAIL */}
            <FormField
              control={SignupUserForm.control}
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
              control={SignupUserForm.control}
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

            {/* CONFIRM PASSWORD */}
            <FormField
              control={SignupUserForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent"
                      autoComplete="off"
                      disabled={loading}
                      placeholder="Confirm Password"
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
