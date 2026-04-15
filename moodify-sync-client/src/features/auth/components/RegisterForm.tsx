import { Link } from "react-router";
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
import { loginSchema, registerSchema } from "../utils/zodSchema";
import type { RegisterFormType } from "../utils/types";

const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });

  const registerHandle = async (lvalue: RegisterFormType) => {
    console.log(lvalue);
    reset();
  };

  return (
    <div className="min-h-screen w-3xl flex items-center justify-center px-4">
      <Card className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-white">
        <CardHeader className="text-center space-y-2 pb-2">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-gray-400">
            Create your account and vibe with every beat
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(registerHandle)}>
            <div className="space-y-2">
              <Label className="text-gray-300">Full Name</Label>
              <Input
                {...register("fullName")}
                type="text"
                placeholder="Enter your full name"
                className="rounded-2xl border-white/10 bg-white/5 py-6 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
              />
              {errors.fullName && (
                <span className="text-red-500">{errors.fullName.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Email</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="rounded-2xl border-white/10 bg-white/5 py-6 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Password</Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Create password"
                className="rounded-2xl border-white/10 bg-white/5 py-6 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full rounded-2xl bg-orange-700 hover:bg-orange-600 py-6 text-base font-semibold"
            >
              Register
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            <Link to={"/auth/login"}>
              Already have an account?{" "}
              <span className="text-orange-500 cursor-pointer hover:text-orange-300">
                Login
              </span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
