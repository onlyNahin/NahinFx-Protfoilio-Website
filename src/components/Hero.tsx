'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Download, Mail, Globe, Share2, Link as LinkIcon } from 'lucide-react';
import { CmsData } from '@/lib/db';

interface HeroProps {
  data: CmsData['hero'];
  primaryColor?: string;
}

export default function Hero({ data, primaryColor = '#FF1B1B' }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting blobs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none blur-[120px] animate-pulse"
        style={{ backgroundColor: primaryColor }}
      />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] rounded-full bg-red-900/20 blur-[90px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold tracking-widest text-white backdrop-blur-md self-start">
              <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: primaryColor }} />
              <Sparkles className="h-3.5 w-3.5 text-red-400" />
              <span>{data.badge}</span>
            </div>

            {/* Giant Profession Headline */}
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-black tracking-[0.3em] uppercase text-red-500">
                {data.subheadline}
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-none mt-2">
                PORTO<span style={{ color: primaryColor }}>FOLIO</span>
              </h1>
              <span className="text-xl sm:text-3xl font-extrabold tracking-widest text-gray-300 uppercase mt-1">
                {data.profession}
              </span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl font-normal leading-relaxed">
              {data.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={data.ctaPrimaryLink}
                className="group flex items-center gap-3 rounded-xl px-7 py-4 font-extrabold text-sm text-white shadow-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: primaryColor,
                  boxShadow: `0 0 30px ${primaryColor}60`,
                }}
              >
                <span>{data.ctaPrimaryText}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={data.ctaSecondaryLink}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold text-gray-200 hover:border-white/30 hover:bg-white/10 backdrop-blur-md transition-all"
              >
                <Download className="h-4 w-4 text-gray-400" />
                <span>{data.ctaSecondaryText}</span>
              </a>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">CONNECT:</span>
              <div className="flex items-center gap-3">
                {data.socials.github && (
                  <a href={data.socials.github} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-gray-400 hover:text-white hover:border-white/30 transition-all">
                    <Share2 className="h-4 w-4" />
                  </a>
                )}
                {data.socials.behance && (
                  <a href={data.socials.behance} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-gray-400 hover:text-white hover:border-white/30 transition-all">
                    <Globe className="h-4 w-4" />
                  </a>
                )}
                {data.socials.linkedin && (
                  <a href={data.socials.linkedin} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-gray-400 hover:text-white hover:border-white/30 transition-all">
                    <LinkIcon className="h-4 w-4" />
                  </a>
                )}
                {data.socials.email && (
                  <a href={`mailto:${data.socials.email}`} className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-gray-400 hover:text-white hover:border-white/30 transition-all">
                    <Mail className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Profile Frame (Inspired by reference image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Outer red glowing background shape */}
              <div
                className="absolute -inset-2 rounded-3xl opacity-75 blur-xl transition duration-1000 group-hover:opacity-100 animate-pulse"
                style={{ backgroundColor: primaryColor }}
              />

              {/* Profile Card Container */}
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#141416]/80 p-3 backdrop-blur-2xl shadow-2xl">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-black">
                  <img
                    src={data.profileImage}
                    alt={data.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Bottom Text inside Card */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold tracking-widest text-red-400 uppercase">
                        CREATIVE LEAD
                      </span>
                      <h3 className="text-2xl font-black text-white">{data.name}</h3>
                    </div>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl font-bold text-white shadow-lg"
                      style={{ backgroundColor: primaryColor }}
                    >
                      ★
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
