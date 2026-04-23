import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { useRegister } from '../hooks/useAuth';
import type { RegisterFormType } from '../utils/types';
import { registerSchema } from '../utils/zodSchema';

const RegisterForm = () => {
  const navigate = useNavigate();

  const { registerMutation } = useRegister();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });

  const registerHandle = async (rvalue: RegisterFormType) => {
    console.log(rvalue);

    await registerMutation.mutateAsync(rvalue);

    reset();

    navigate('/');
  };

  return (
    <div className="flex min-h-screen w-3xl items-center justify-center px-4">
      <Card className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur-xl">
        <CardHeader className="space-y-2 pb-2 text-center">
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
                {...register('username')}
                type="text"
                placeholder="Enter your full name"
                className="rounded-2xl border-white/10 bg-white/5 py-6 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
              />
              {errors.username && (
                <span className="text-red-500">{errors.username.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Email</Label>
              <Input
                {...register('email')}
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
                {...register('password')}
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
              disabled={registerMutation.isPending}
              className="w-full rounded-2xl bg-orange-700 py-6 text-base font-semibold hover:bg-orange-600"
            >
              {registerMutation.isPending ? <Loader /> : 'Register'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            <Link to={'/auth/login'}>
              Already have an account?{' '}
              <span className="cursor-pointer text-orange-500 hover:text-orange-300">
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
