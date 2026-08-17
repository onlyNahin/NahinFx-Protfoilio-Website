'use client';

import React, { useState } from 'react';
import { Shield, Mail, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  primaryColor?: string;
  brandName?: string;
}

export default function Footer({ primaryColor = '#FF1B1B', brandName = 'Nahin Sharif' }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'subscribed'>('idle');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) return;
    setNewsletterStatus('subscribed');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus('idle'), 4000);
  };

  return (
    <footer className="relative bg-[#0a0a0c] border-t border-white/10 text-gray-400">

      {/* Newsletter Banner */}
      <div className="border-b border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ boxShadow: `0 0 60px ${primaryColor}12` }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4" style={{ color: primaryColor }} />
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: primaryColor }}>Stay Updated</span>
              </div>
              <h3 className="text-xl font-black text-white">Get Design Inspiration & Updates</h3>
              <p className="text-sm text-gray-400 mt-1">Subscribe to receive new projects, tutorials, and design insights.</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex items-center gap-3 w-full md:w-auto">
              {newsletterStatus === 'subscribed' ? (
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>You're subscribed!</span>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 md:w-64 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-red-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105 flex-shrink-0"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Mail className="h-4 w-4" />
                    Subscribe
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Footer Main */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl font-black text-white text-lg" style={{ backgroundColor: primaryColor }}>
                D
              </div>
              <span className="text-base font-black text-white tracking-widest">{brandName}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Premium graphic design, branding, motion graphics, and visual storytelling. Available for freelance & full-time globally.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['Home', '#hero'], ['About', '#about'], ['Portfolio', '#portfolio'],
                ['Blog', '#blog'], ['Contact', '#contact'],
              ].map(([label, href]) => (
                <a key={label} href={href} className="text-xs font-bold text-gray-400 hover:text-white transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-600">© {new Date().getFullYear()} {brandName} Portfolio. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
