const LoginForm = () => {
  return (
    <>
      <div className="min-h-screen relative bg-black overflow-hidden flex items-center justify-center px-4">
        {/* background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,115,0,0.18),_transparent_55%)]" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-3xl" />

        {/* login card */}
        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-sm text-gray-400 mt-2">
              Login to continue your journey
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-orange-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-orange-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 transition-all duration-300 shadow-lg"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <span className="text-orange-400 cursor-pointer hover:text-orange-300">
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
