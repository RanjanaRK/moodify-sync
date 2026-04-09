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

const LoginForm = () => {
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
            <form className="space-y-5">
              <div className="space-y-2">
                <Label className="text-gray-300">Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-2xl border-white/10 bg-white/5 py-6 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="rounded-2xl border-white/10 bg-white/5 py-6 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-2xl bg-orange-700 hover:bg-orange-600 py-6 text-base font-semibold"
              >
                Login
              </Button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Don&apos;t have an account?{" "}
              <span className="text-orange-500 cursor-pointer hover:text-orange-300">
                Register
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginForm;
