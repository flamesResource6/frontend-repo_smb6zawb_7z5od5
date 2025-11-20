import { useState } from 'react'
import { api, setSession } from '../lib/api'

export default function Auth() {
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = mode === 'signup' ?
        await api.signup({ name, email, password }) :
        await api.signin({ email, password })
      setSession(res)
      window.dispatchEvent(new Event('session-change'))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="auth" className="py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow border border-slate-200 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
            <button onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')} className="text-sm text-slate-600 hover:text-slate-900">
              {mode === 'signup' ? 'Have an account? Sign in' : "New here? Sign up"}
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900" required />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900" required />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button disabled={loading} className="w-full inline-flex justify-center items-center px-5 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60">
              {loading ? 'Please wait…' : (mode === 'signup' ? 'Create account' : 'Sign in')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
