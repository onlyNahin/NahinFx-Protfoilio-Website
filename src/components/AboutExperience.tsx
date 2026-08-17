'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, Palette, Wrench, CheckCircle2 } from 'lucide-react';
import { CmsData } from '@/lib/db';

interface AboutProps {
  about: CmsData['about'];
  experiences: CmsData['experiences'];
  skills: CmsData['skills'];
  software: CmsData['software'];
  primaryColor?: string;
}

export default function AboutExperience({
  about,
  experiences,
  skills,
  software,
  primaryColor = '#FF1B1B',
}: AboutProps) {
  return (
    <section id="about" className="relative py-24 bg-[#0f0f10]/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-extrabold tracking-widest text-red-500 uppercase">
            <Palette className="h-3.5 w-3.5" />
            <span>ABOUT & EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-3">
            {about.title}
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm sm:text-base mt-2">
            {about.subtitle}
          </p>
        </div>

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { label: 'Years Experience', val: `${about.yearsExperience}+` },
            { label: 'Projects Completed', val: `${about.completedProjects}+` },
            { label: 'Satisfied Clients', val: `${about.satisfiedClients}+` },
            { label: 'Awards Won', val: `${about.awardsWon}` },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card flex flex-col items-center justify-center p-6 rounded-2xl text-center"
            >
              <span className="text-3xl sm:text-5xl font-black text-white tracking-tight" style={{ color: primaryColor }}>
                {stat.val}
              </span>
              <span className="text-xs font-bold tracking-wider text-gray-400 uppercase mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* 2 Column Layout: Experience Timeline & Software Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Experience Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-xl p-2.5 bg-red-500/10 text-red-500 border border-red-500/20">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-wider uppercase">
                MY EXPERIENCE & ROLES
              </h3>
            </div>

            <div className="relative border-l-2 border-white/10 ml-4 pl-6 flex flex-col gap-8">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div
                    className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-black transition-all group-hover:scale-125"
                    style={{ backgroundColor: primaryColor }}
                  />

                  <div className="glass-card p-6 rounded-2xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-black text-white">{exp.role}</span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-red-400">
                        {exp.year}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-gray-300 mb-2">{exp.company}</div>
                    <p className="text-xs text-gray-400 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Software Icons & Skills Progress */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Software Grid */}
            <div className="glass-panel p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl p-2.5 bg-red-500/10 text-red-500 border border-red-500/20">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-extrabold text-white tracking-wider uppercase">
                  SOFTWARE MASTERY
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {software.map((sw) => (
                  <motion.div
                    key={sw.id}
                    whileHover={{ scale: 1.08, y: -4 }}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 transition-all text-center group cursor-pointer"
                  >
                    <img src={sw.iconUrl} alt={sw.name} className="h-10 w-10 object-contain mb-2 filter drop-shadow-md" />
                    <span className="text-xs font-extrabold text-white group-hover:text-red-400 transition-colors">
                      {sw.name}
                    </span>
                    <span className="text-[10px] text-gray-400 mt-0.5">{sw.level}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skill Progress Bars */}
            <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4">
              <h4 className="text-sm font-extrabold text-white tracking-widest uppercase mb-2">
                CREATIVE PROFICIENCY
              </h4>
              {skills.map((skill) => (
                <div key={skill.id} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-200">{skill.name}</span>
                    <span className="text-red-400">{skill.percentage}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
