import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/zodSchema";
import type { LoginFormType } from "../utils/types";
import { Link, Navigate, useNavigate } from "react-router";
import { useLogin } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const { loginMutation } = useLogin();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const loginHandle = async (lvalue: LoginFormType) => {
    await loginMutation.mutateAsync(lvalue);

    reset();

    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen flex w-3xl items-center justify-center px-4">
        <Card className=" z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-white">
          <CardHeader className="text-center space-y-2 pb-2">
            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400">
              Login to continue your journey
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit(loginHandle)}>
              <div className="space-y-2">
                <Label className="text-gray-300">Email</Label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-2xl border-white/10 bg-white/5 py-6 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Password</Label>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                  className="rounded-2xl border-white/10 bg-white/5 py-6 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full rounded-2xl bg-orange-700 hover:bg-orange-600 py-6 text-base font-semibold"
              >
                {loginMutation.isPending ? <Loader2 /> : "Login"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              <Link to={"/auth/register"}>
                Don&apos;t have an account?{" "}
                <span className="text-orange-500 cursor-pointer hover:text-orange-300">
                  Register
                </span>
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginForm;
