'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('portfolio_admin_auth', 'true');
      router.push('/admin_21');
    } else {
      setError('Invalid admin credentials. (Use admin / admin123)');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f10] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-panel p-8 rounded-3xl shadow-2xl flex flex-col gap-6">
          
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-xl mb-3">
              <Shield className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wider">
              PORTFOLIO CMS ADMIN
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Sign in to manage website content, theme, and projects.
            </p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400 font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-300">USERNAME</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-300">PASSWORD</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 font-extrabold text-sm text-white shadow-xl hover:bg-red-500 transition-all mt-2"
            >
              <span>SIGN IN TO CMS</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center text-xs text-gray-400 flex flex-col gap-1">
            <span className="font-bold text-red-400 flex items-center justify-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> Quick Demo Credentials
            </span>
            <span>Username: <strong className="text-white">admin</strong> | Password: <strong className="text-white">admin123</strong></span>
          </div>

        </div>
      </div>
    </div>
  );
}
