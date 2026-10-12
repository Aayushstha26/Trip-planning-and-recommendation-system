import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Compass, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAppDispatch } from '@/store/hooks'
import { setCredentials } from '@/store/slices/authSlice'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      dispatch(
        setCredentials({
          user: { email, name: email.split('@')[0] },
          token: 'demo_token_123',
        })
      )
      navigate('/')
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
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

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold focus:outline-none transition-colors"
                style={{
                  backgroundColor: 'var(--theme-elevated)',
                  borderColor: 'var(--theme-border-subtle)',
                  color: 'var(--theme-text-main)',
                }}
              />
            </div>
          </div>

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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border rounded-xl pl-10 pr-10 py-2.5 text-sm font-semibold focus:outline-none transition-colors"
                style={{
                  backgroundColor: 'var(--theme-elevated)',
                  borderColor: 'var(--theme-border-subtle)',
                  color: 'var(--theme-text-main)',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 shadow-md"
            style={{
              backgroundColor: 'var(--theme-primary)',
              color: 'var(--theme-primary-text)',
            }}
          >
            {isLoading ? (
              <span className="h-4 w-4 border-2 border-t-transparent rounded-full animate-spin" />
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
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-slate-900 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
