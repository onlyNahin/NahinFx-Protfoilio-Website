'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Users, Star, Quote } from 'lucide-react';
import { CmsData } from '@/lib/db';

interface AchievementProps {
  achievements: CmsData['achievements'];
  testimonials: CmsData['testimonials'];
  primaryColor?: string;
}

export default function AchievementsTestimonials({
  achievements,
  testimonials,
  primaryColor = '#FF1B1B',
}: AchievementProps) {
  return (
    <section className="relative py-24 bg-[#0f0f10]/80 border-t border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-24">
        
        {/* Achievements / Awards Section */}
        <div>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-extrabold tracking-widest text-red-500 uppercase">
              <Trophy className="h-3.5 w-3.5" />
              <span>RECOGNITION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-3">
              AWARDS & MILESTONES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((ach) => (
              <motion.div
                key={ach.id}
                whileHover={{ y: -6 }}
                className="glass-card flex flex-col items-center justify-center p-8 rounded-3xl text-center group"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-white mb-4 shadow-lg transition-transform group-hover:scale-110"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Trophy className="h-7 w-7" />
                </div>
                <div className="text-4xl font-black text-white tracking-tight">
                  {ach.number}<span style={{ color: primaryColor }}>{ach.suffix}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-200 mt-2">{ach.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{ach.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Client Testimonials Section */}
        <div>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-extrabold tracking-widest text-red-500 uppercase">
              <Quote className="h-3.5 w-3.5" />
              <span>TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-3">
              CLIENT ENDORSEMENTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -4 }}
                className="glass-card flex flex-col justify-between p-8 rounded-3xl relative overflow-hidden"
              >
                <Quote className="absolute top-6 right-6 h-12 w-12 text-white/5" />

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-sm text-gray-300 italic leading-relaxed mb-6">
                  "{t.content}"
                </p>

                <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-red-500/50"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">{t.name}</span>
                    <span className="text-xs text-gray-400">{t.role} • {t.company}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
