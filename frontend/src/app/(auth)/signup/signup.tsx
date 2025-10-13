// This is a CLIENT COMPONENT, This is where code goes (form, buttons...)
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
const mockedFormData: z.infer<typeof signupUserZod>[] = [];

// Zod validation schema
const signupUserZod = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
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
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
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

  return (
    <div className={cn("max-w-[500px]", className)} {...props}>
      <Form {...SignupUserForm}>
        <form onSubmit={SignupUserForm.handleSubmit(onSubmit)}>
          {/* Div for styling */}
          <div className="width-[400px] space-y-4 rounded-md border p-4">
            {/* <FormField control={signupUserForm.control} name='firstName' render={({ field }) => (...)}/>: */}
            {/* { render is a render-prop function that receives { field }; field contains the props needed to bind an input to RHF (usually { value, onChange, onBlur, name, ref }).} */}
            {/* FIRST NAME */}
            <FormField
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
            ></FormField>

            {/* LAST NAME */}
            <FormField
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
            ></FormField>

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
