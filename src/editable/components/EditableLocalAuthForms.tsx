'use client'

import { FormEvent, useEffect, useState, type InputHTMLAttributes } from 'react'
import { useRouter } from 'next/navigation'
import { pagesContent } from '@/editable/content/pages.content'

const USERS_KEY = 'slot4:local-auth-users'
const SESSION_KEY = 'slot4:local-auth-session'

type LocalUser = {
  name: string
  email: string
  password: string
  createdAt: string
}

const readUsers = (): LocalUser[] => {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(USERS_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const saveUsers = (users: LocalUser[]) => window.localStorage.setItem(USERS_KEY, JSON.stringify(users))

const saveSession = (user: Pick<LocalUser, 'name' | 'email'>) => {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email, loggedInAt: new Date().toISOString() }))
  window.dispatchEvent(new Event('slot4-auth-change'))
}

const inputClass = 'h-12 border border-black/20 bg-white px-4 text-base font-semibold text-black outline-none transition placeholder:text-neutral-500 focus:border-[var(--slot4-accent)]'
const buttonClass = 'inline-flex h-12 items-center justify-center bg-black px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--slot4-accent)] disabled:opacity-60'

function AuthField({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.16em]"><span>{label}</span><input {...props} className={inputClass} /></label>
}

export function EditableLocalLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    const user = readUsers().find((item) => item.email.toLowerCase() === normalizedEmail)
    if (!user || user.password !== password) {
      setStatus('error')
      setMessage(pagesContent.auth.login.noAccount)
      return
    }
    saveSession(user)
    setStatus('success')
    setMessage(pagesContent.auth.login.success)
    window.setTimeout(() => router.push('/'), 500)
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={submit}>
      <AuthField label="Email address" type="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
      <AuthField label="Password" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      {message ? <p className={`rounded-2xl px-4 py-3 text-sm font-bold ${status === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>{message}</p> : null}
      <button type="submit" className={buttonClass}>{pagesContent.auth.login.submitLabel}</button>
    </form>
  )
}

export function EditableLocalSignupForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedName = name.trim()
    const normalizedEmail = email.trim().toLowerCase()
    if (password.length < 4) {
      setStatus('error')
      setMessage(pagesContent.auth.signup.passwordShort)
      return
    }
    const users = readUsers()
    const nextUser: LocalUser = {
      name: normalizedName || normalizedEmail.split('@')[0] || 'Member',
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    }
    saveUsers([nextUser, ...users.filter((item) => item.email.toLowerCase() !== normalizedEmail)])
    saveSession(nextUser)
    setStatus('success')
    setMessage(pagesContent.auth.signup.success)
    window.setTimeout(() => router.push('/'), 500)
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={submit}>
      <AuthField label="Full name" placeholder="Your full name" value={name} onChange={(event) => setName(event.target.value)} required />
      <AuthField label="Email address" type="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
      <AuthField label="Password" type="password" placeholder="Use at least 4 characters" value={password} onChange={(event) => setPassword(event.target.value)} required />
      {message ? <p className={`rounded-2xl px-4 py-3 text-sm font-bold ${status === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>{message}</p> : null}
      <button type="submit" className={buttonClass}>{pagesContent.auth.signup.submitLabel}</button>
    </form>
  )
}

export function useEditableLocalAuthSession() {
  const [session, setSession] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const load = () => {
      try {
        const parsed = JSON.parse(window.localStorage.getItem(SESSION_KEY) || 'null')
        setSession(parsed && typeof parsed.email === 'string' ? parsed : null)
      } catch {
        setSession(null)
      }
    }
    load()
    window.addEventListener('slot4-auth-change', load)
    window.addEventListener('storage', load)
    return () => {
      window.removeEventListener('slot4-auth-change', load)
      window.removeEventListener('storage', load)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem(SESSION_KEY)
    window.dispatchEvent(new Event('slot4-auth-change'))
    setSession(null)
  }

  return { session, logout }
}
