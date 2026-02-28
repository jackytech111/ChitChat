"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

const signInSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    const { email, password } = data;
    await signIn(email, password);
    navigate("/");
  };

  return (
    <div className={cn("flex flex-col gap-4 w-full", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border/60 shadow-soft">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* ── Left: Form ── */}
          <form
            className="p-8 md:p-10 flex flex-col gap-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Logo */}
            <a href="/" className="block w-fit">
              <img src="/chitchat.svg" alt="ChitChat" className="h-8" />
            </a>

            {/* Heading */}
            <div className="flex flex-col gap-1.5">
              <h1 className="font-heading text-[1.65rem] font-bold tracking-tight text-foreground leading-none">
                Đăng nhập
              </h1>
              <p className="text-sm text-muted-foreground">
                Chào mừng trở lại{" "}
                <span className="text-orange-500 font-semibold">ChitChat</span>{" "}
                — tiếp tục trò chuyện nào!
              </p>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ban@example.com"
                  autoComplete="email"
                  className="signin-input"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Mật khẩu
                  </Label>
                  <a
                    href="/forgot-password"
                    className="text-xs text-orange-500 hover:underline underline-offset-4 transition-colors"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu của bạn"
                    autoComplete="current-password"
                    className="signin-input pr-11!"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-orange-500 transition-colors duration-200"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" x2="22" y1="2" y2="22" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 font-semibold text-sm tracking-wide bg-gradient-btn-orange text-white shadow-bubble hover:opacity-90 hover:shadow-[0_0_32px_hsl(22_100%_55%/0.4)] transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
            </Button>

            {/* Divider */}
            <div className="relative flex items-center gap-3 text-xs text-muted-foreground/50">
              <div className="flex-1 h-px bg-border" />
              hoặc
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Signup link */}
            <p className="text-center text-sm text-muted-foreground">
              Chưa có tài khoản?{" "}
              <a
                href="/signup"
                className="text-orange-500 font-semibold hover:underline underline-offset-4 transition-colors"
              >
                Đăng ký ngay
              </a>
            </p>
          </form>

          {/* ── Right: Visual Panel ── */}
          <div className="relative hidden md:flex flex-col items-center justify-center overflow-hidden bg-gradient-orange">
            <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-orange-400/20 blur-3xl" />
            <div className="pointer-events-none absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-pink-400/15 blur-2xl" />

            <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-8 text-center w-full max-w-[320px]">
              <div className="rounded-2xl overflow-hidden shadow-[0_24px_64px_-12px_hsl(22_100%_55%/0.3)] border border-white/10 w-full">
                <img
                  src="/placeholderSignIn.png"
                  alt="ChitChat preview"
                  className="w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold text-foreground/80 tracking-wide uppercase">
                  Kết nối. Trò chuyện. Vui vẻ.
                </p>
                <p className="text-xs text-muted-foreground max-w-50 leading-relaxed">
                  Hàng triệu người dùng đang trò chuyện trên ChitChat mỗi ngày.
                </p>
              </div>

              <div className="flex items-center flex-wrap justify-center gap-y-2">
                <div className="flex items-center">
                  {["🧑🏻", "👩🏽", "🧔🏾", "👩🏻", "🧑🏿"].map((emoji, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm shadow border-2 border-white/40"
                      style={{ marginLeft: i > 0 ? "-8px" : "0" }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <span className="ml-3 text-xs text-muted-foreground font-medium whitespace-nowrap">
                  +2.4M người dùng
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms */}
      <p className="px-4 text-center text-xs text-muted-foreground leading-relaxed">
        Bằng cách tiếp tục, bạn đồng ý với{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-orange-500 transition-colors"
        >
          Điều khoản dịch vụ
        </a>{" "}
        và{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-orange-500 transition-colors"
        >
          Chính sách bảo mật
        </a>{" "}
        của chúng tôi.
      </p>
    </div>
  );
}
