import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Compass, Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'
import { loginSchema, loginDefaultValues } from '@/schemas'
import { useLogin } from '@/hooks/useAuth'

export const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)

  const destination = location.state?.from || '/'

  const { mutate: loginUser, isPending } = useLogin({
    onSuccess: (data) => {
      toast.success(data?.message || 'Welcome back!')
      navigate(destination, { replace: true })
    },
    onError: (err) => {
      toast.error(err?.message || 'Invalid email or password. Please try again.')
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
    mode: 'onTouched',
  })
  const onSubmit = (data) => {
    loginUser({ email: data.email, password: data.password })
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 pb-20"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text-main)',
      }}
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[400px] blur-3xl -z-10 rounded-full pointer-events-none opacity-30 transition-all duration-500"
        style={{
          background: `radial-gradient(circle, var(--theme-glow) 0%, transparent 70%)`,
        }}
      />

      {/* Brand logo */}
      <div className="mb-8 text-center">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div
            className="h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-md"
            style={{
              backgroundColor: 'var(--theme-primary)',
              color: 'var(--theme-primary-text)',
            }}
          >
            <Compass className="h-7 w-7 stroke-[2.5]" />
          </div>
          <div className="text-left">
            <span
              className="text-2xl font-extrabold tracking-tight"
              style={{ color: 'var(--theme-text-main)' }}
            >
              Wander<span style={{ color: 'var(--theme-primary)' }}>AI</span>
            </span>
            <span
              className="text-xs block font-bold -mt-1 tracking-wider uppercase opacity-75"
              style={{ color: 'var(--theme-text-muted)' }}
            >
              Trip Planner
            </span>
          </div>
        </Link>
      </div>

      {/* Login Card */}
      <div
        className="w-full max-w-md p-8 rounded-3xl border transition-all duration-300 shadow-xl"
        style={{
          backgroundColor: 'var(--theme-surface-solid)',
          borderColor: 'var(--theme-border)',
          boxShadow: 'var(--theme-card-shadow)',
        }}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--theme-text-main)' }}>
            Welcome back
          </h2>
          <p className="text-sm mt-1 font-medium" style={{ color: 'var(--theme-text-muted)' }}>
            Enter your details to sign in to your account
          </p>
        </div>


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wider mb-1.5"
              style={{ color: 'var(--theme-text-muted)' }}
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold focus:outline-none transition-colors"
                style={{
                  backgroundColor: 'var(--theme-elevated)',
                  borderColor: errors.email ? 'rgb(239 68 68)' : 'var(--theme-border-subtle)',
                  color: 'var(--theme-text-main)',
                }}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                className="block text-xs font-bold uppercase tracking-wider"
                style={{ color: 'var(--theme-text-muted)' }}
              >
                Password
              </label>
              <a href="#" className="text-xs font-semibold transition-colors hover:underline" style={{ color: 'var(--theme-primary)' }}>
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full border rounded-xl pl-10 pr-10 py-2.5 text-sm font-semibold focus:outline-none transition-colors"
                style={{
                  backgroundColor: 'var(--theme-elevated)',
                  borderColor: errors.password ? 'rgb(239 68 68)' : 'var(--theme-border-subtle)',
                  color: 'var(--theme-text-main)',
                }}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500 font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 shadow-md hover:brightness-95"
            style={{
              backgroundColor: 'var(--theme-btn-bg, #c8ff00)',
              color: 'var(--theme-btn-text, #06110d)',
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div
          className="mt-6 pt-6 border-t text-center text-xs"
          style={{ borderColor: 'var(--theme-border-subtle)', color: 'var(--theme-text-muted)' }}
        >
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-bold hover:underline"
            style={{ color: 'var(--theme-text-main)' }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
