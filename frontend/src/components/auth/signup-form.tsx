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

const signUpSchema = z.object({
  firstname: z.string().min(1, "Tên bắt buộc phải có"),
  lastname: z.string().min(1, "Họ bắt buộc phải có"),
  username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    // TODO: gọi backend để signup
    console.log(data);
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
                Tạo tài khoản
              </h1>
              <p className="text-sm text-muted-foreground">
                Chào mừng bạn đến với{" "}
                <span className="text-primary font-semibold">ChitChat</span> —
                hãy đăng ký để bắt đầu.
              </p>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4">
              {/* Họ & Tên */}
              <div className="grid grid-cols-2 gap-3">
                {/* Họ */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="lastname"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Họ
                  </Label>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Nguyễn"
                    autoComplete="family-name"
                    className="signup-input"
                    {...register("lastname")}
                  />
                  {errors.lastname && (
                    <p className="text-xs text-destructive">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>

                {/* Tên */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="firstname"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Tên
                  </Label>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="Văn A"
                    autoComplete="given-name"
                    className="signup-input"
                    {...register("firstname")}
                  />
                  {errors.firstname && (
                    <p className="text-xs text-destructive">
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Username */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="username"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Tên người dùng
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Tên đăng nhập của bạn"
                  autoComplete="username"
                  className="signup-input"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-xs text-destructive">
                    {errors.username.message}
                  </p>
                )}
              </div>

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
                  className="signup-input"
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
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tối thiểu 6 ký tự"
                    autoComplete="new-password"
                    className="signup-input pr-11!"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary transition-colors duration-200"
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
              className="w-full h-11 font-semibold text-sm tracking-wide bg-gradient-chat text-white shadow-bubble hover:opacity-90 hover:shadow-glow transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản"}
            </Button>

            {/* Login link */}
            <p className="text-center text-sm text-muted-foreground">
              Đã có tài khoản?{" "}
              <a
                href="/signin"
                className="text-primary font-semibold hover:underline underline-offset-4 transition-colors"
              >
                Đăng nhập
              </a>
            </p>
          </form>

          {/* ── Right: Visual Panel ── */}
          <div className="relative hidden md:flex flex-col items-center justify-center overflow-hidden bg-gradient-purple">
            <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary-glow/20 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
              <div className="rounded-2xl overflow-hidden shadow-[0_24px_64px_-12px_hsl(271_79%_47%/0.35)] border border-white/10">
                <img
                  src="/placeholderSignUp.png"
                  alt="ChitChat preview"
                  className="w-full max-w-65 object-cover"
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

              <div className="flex items-center gap-1.5">
                {["🧑🏻", "👩🏽", "🧔🏾", "👩🏻", "🧑🏿"].map((emoji, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm shadow border-2 border-white/40"
                    style={{ marginLeft: i > 0 ? "-8px" : "0" }}
                  >
                    {emoji}
                  </div>
                ))}
                <span className="ml-3 text-xs text-muted-foreground font-medium">
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
          className="underline underline-offset-4 hover:text-primary transition-colors"
        >
          Điều khoản dịch vụ
        </a>{" "}
        và{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-primary transition-colors"
        >
          Chính sách bảo mật
        </a>{" "}
        của chúng tôi.
      </p>
    </div>
  );
}
