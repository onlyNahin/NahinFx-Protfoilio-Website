'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, MessageSquare, Phone, MapPin, Globe, Share2, Link as LinkIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CmsData } from '@/lib/db';

interface ContactProps {
  socials: CmsData['hero']['socials'];
  primaryColor?: string;
}

export default function ContactSection({ socials, primaryColor = '#FF1B1B' }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore confetti error
      }
    } catch (error) {
      console.error('Contact submit error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0f0f10]/95 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-extrabold tracking-widest text-red-500 uppercase">
            <Mail className="h-3.5 w-3.5" />
            <span>LET'S WORK TOGETHER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-3">
            GET IN TOUCH
          </h2>
          <p className="text-gray-400 max-w-xl text-sm sm:text-base mt-2">
            Have a poster project, branding inquiry, or motion graphics job? Send a message directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Contact Info & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-8 rounded-3xl flex flex-col gap-6">
              <h3 className="text-xl font-extrabold text-white tracking-wider uppercase">
                DIRECT CONTACT
              </h3>

              <div className="flex items-center gap-4">
                <div className="rounded-2xl p-3 bg-red-500/10 text-red-500 border border-red-500/20">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-semibold">EMAIL ME AT</span>
                  <a href={`mailto:${socials.email}`} className="text-sm font-bold text-white hover:text-red-400 transition-colors">
                    {socials.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-2xl p-3 bg-red-500/10 text-red-500 border border-red-500/20">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-semibold">WHATSAPP / PHONE</span>
                  <a href={socials.whatsapp} target="_blank" rel="noreferrer" className="text-sm font-bold text-white hover:text-red-400 transition-colors">
                    Direct WhatsApp Link
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-2xl p-3 bg-red-500/10 text-red-500 border border-red-500/20">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-semibold">LOCATION</span>
                  <span className="text-sm font-bold text-white">Bangladesh (Global Remote)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-bold text-gray-400 uppercase block mb-3">SOCIAL PLATFORMS</span>
                <div className="flex flex-wrap gap-2">
                  <a href={socials.behance} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white">
                    <Globe className="h-4 w-4" /> Behance
                  </a>
                  <a href={socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white">
                    <Share2 className="h-4 w-4" /> GitHub
                  </a>
                  <a href={socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white">
                    <LinkIcon className="h-4 w-4" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl flex flex-col gap-6">
              <h3 className="text-xl font-extrabold text-white tracking-wider uppercase">
                SEND A DIRECT INQUIRY
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-300">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-300">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-300">SUBJECT</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Poster Design Commission"
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-300">MESSAGE *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project goals, timelines, and ideas..."
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group flex items-center justify-center gap-3 rounded-xl py-4 font-extrabold text-sm text-white shadow-xl transition-all duration-300 hover:scale-102"
                style={{ backgroundColor: primaryColor }}
              >
                {status === 'submitting' ? (
                  <span>Sending Message...</span>
                ) : status === 'success' ? (
                  <span className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="h-5 w-5" /> Message Sent Successfully!
                  </span>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
