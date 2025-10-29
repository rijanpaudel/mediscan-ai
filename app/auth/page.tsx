'use client'

import { useState } from 'react'
import { signIn, signUp } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password)
        if (error) throw error
        alert('Success! Check your email to confirm your account, then come back to login.')
        setIsSignUp(false)
        setEmail('')
        setPassword('')
      } else {
        const { error } = await signIn(email, password)
        if (error) throw error
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {isSignUp ? 'Sign up to analyze your medical reports' : 'Sign in to your MediScan account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {isSignUp && (
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
            className="text-blue-600 hover:underline text-sm"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-600 hover:underline text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}