import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Compass,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/schemas";
import { useRegister } from "@/hooks/useAuth";

export const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    mutate: registerUser,
    isPending,
    isSuccess,
  } = useRegister({
    onSuccess: () => {
      toast.success("Account created!", {
        description: "Redirecting you to login...",
      });
      setTimeout(() => {
        navigate("/login", {
          state: { message: "Account created successfully! Please sign in." },
        });
      }, 1500);
    },
    onError: (err) => {
      toast.error("Registration failed", {
        description: err?.message || "Something went wrong. Please try again.",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agreeTerms: false,
    },
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Brand Logo Header */}
      <div className="mb-6 text-center">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Compass className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div className="text-left">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              Wander<span className="text-slate-600">AI</span>
            </span>
            <span className="text-[11px] block font-bold text-slate-400 tracking-wider uppercase -mt-1">
              Trip Planner
            </span>
          </div>
        </Link>
      </div>

      {/* Main Form Card */}
      <Card className="w-full max-w-md shadow-lg border-slate-200 bg-white">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Create an account
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Start planning smart trips and personalized itineraries
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* 1. Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  placeholder="e.g. Aayush Shrestha"
                  className={`pl-9 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* 2. Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className={`pl-9 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 3. Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  className={`pl-9 pr-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* 5. Terms and Privacy Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-950"
                  {...register("agreeTerms")}
                />
                <span className="text-xs text-slate-600 leading-snug">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-semibold text-slate-900 hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-semibold text-slate-900 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>

            {/* 6. Submit Button */}
            <Button
              type="submit"
              disabled={isPending || isSuccess}
              className="w-full h-10 mt-3 font-bold rounded-xl text-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pt-2 pb-6 border-t border-slate-100 flex justify-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="ml-1 font-bold text-slate-900 hover:underline"
          >
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
