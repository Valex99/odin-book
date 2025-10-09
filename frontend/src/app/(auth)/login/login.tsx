"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { InputPassword } from "@/components/ui/input-password";
import { logIn } from "../actions";
import { useMounted } from "@/hooks/use-mounted";
import { useParams, useSearchParams } from "next/navigation";
import { useVoucherRouter } from "@/hooks/use-voucher-router";
import { useTranslation } from "@/i18n/client";
import { LocaleTypes } from "@/i18n/settings";
import { toast } from "sonner";
import Link from "@/components/ui/linkIntl";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const loginUserZod = z.object({
  email: z.string().email({ message: "Email address is not valid!" }),
  password: z.string().min(3, { message: "Password is required!" }),
});

export default function LoginForm({ className, ...props }: LoginFormProps) {
  const params = useParams<{ locale: LocaleTypes }>();
  const { t } = useTranslation(params.locale, "common");

  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");

  const [loading, setLoading] = useState<boolean>(false);
  const router = useVoucherRouter();

  const loginUserForm = useForm<z.infer<typeof loginUserZod>>({
    resolver: zodResolver(loginUserZod),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function credentialLogin(values: z.infer<typeof loginUserZod>) {
    setLoading(true);

    const signInResult = await logIn(
      values.email,
      values.password,
      params.locale
    );
    // console.log('🚀 ~ credentialLogin ~ signInResult:', signInResult)

    if (signInResult.ok) {
      toast.success(t("auth.login.toast.success"));
      router.push(callback || "/");
    } else {
      toast.error(signInResult.error);
    }

    setLoading(false);
  }

  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <div className={cn("", className)} {...props}>
      <Form {...loginUserForm}>
        <form onSubmit={loginUserForm.handleSubmit(credentialLogin)}>
          <div className="mt-8 flex flex-col gap-y-4">
            <FormField
              control={loginUserForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <div className="flex w-full flex-col gap-y-1">
                    <Label
                      className="text-left text-xs text-[#74676F]"
                      htmlFor="email"
                    >
                      {t("auth.login.email")} *
                    </Label>
                    <FormControl>
                      <Input
                        className={""}
                        autoCapitalize="none"
                        autoComplete="off"
                        role="presentation"
                        disabled={loading}
                        placeholder="Enter..."
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <div className="min-w-fit">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={loginUserForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="">
                  <div className="flex w-full flex-col gap-y-1">
                    <Label
                      className="text-left text-xs text-[#74676F]"
                      htmlFor="email"
                    >
                      {t("auth.login.password")} *
                    </Label>
                    <FormControl>
                      <InputPassword
                        className=""
                        id="password"
                        placeholder="Password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        disabled={loading}
                        onKeyDown={(e: { key: string }) => {
                          if (e.key === "enter")
                            loginUserForm.handleSubmit(credentialLogin);
                        }}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <div className="min-w-fit">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="-mt-6">
              <Link
                href="/forgot-password"
                className={cn(buttonVariants({ variant: "link" }), "m-0 p-0")}
              >
                {t("auth.login.forgotPassword")}
              </Link>
            </div>
            <Button
              className="rounded-1 mt-8 bg-primary p-7"
              disabled={loading}
            >
              {t("auth.login.signin")}
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
