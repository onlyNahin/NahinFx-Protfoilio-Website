'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, ExternalLink, Globe, Share2, Download, Eye, X, Tag } from 'lucide-react';
import { Project } from '@/lib/db';

interface PortfolioProps {
  projects: Project[];
  primaryColor?: string;
}

const CATEGORIES = ['All', 'Poster', 'Branding', 'Thumbnail', 'UI', 'Photography', 'Motion', 'Video'] as const;

export default function PortfolioGallery({ projects, primaryColor = '#FF1B1B' }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="portfolio" className="relative py-24 bg-[#0f0f10]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-extrabold tracking-widest text-red-500 uppercase">
            <Filter className="h-3.5 w-3.5" />
            <span>MY DESIGN WORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-3">
            PORTFOLIO GALLERY
          </h2>
          <p className="text-gray-400 max-w-xl text-sm sm:text-base mt-2">
            Explore recent poster compositions, brand assets, and digital graphics.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? 'text-white shadow-lg scale-105'
                      : 'border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  style={{
                    backgroundColor: isActive ? primaryColor : undefined,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-full border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Portfolio Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveProject(project)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#161618] shadow-xl hover:border-red-500/50 transition-all"
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[11px] font-extrabold text-white">
                    {project.category}
                  </div>

                  {/* Hover Eye Icon */}
                  <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 shadow-lg">
                    <Eye className="h-4 w-4" />
                  </div>

                  {/* Project Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-red-400 tracking-wider uppercase">
                      {project.client}
                    </span>
                    <h3 className="text-lg font-black text-white leading-snug group-hover:text-red-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="rounded bg-white/10 px-2 py-0.5 text-[9px] text-gray-300 font-semibold">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No projects found matching current filters.
          </div>
        )}

      </div>

      {/* Lightbox / Preview Modal */}
      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#141416] p-6 sm:p-8 shadow-2xl overscroll-contain"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-gray-300 hover:bg-white/20 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Main Media Image */}
                <div className="flex flex-col gap-4">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                    <img
                      src={activeProject.thumbnail}
                      alt={activeProject.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  {activeProject.images.length > 1 && (
                    <div className="grid grid-cols-3 gap-2">
                      {activeProject.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt=""
                          className="h-20 w-full object-cover rounded-xl border border-white/10"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Details Column */}
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="rounded-full bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 text-xs font-bold uppercase">
                      {activeProject.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
                      {activeProject.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {activeProject.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-4 text-xs">
                    <div>
                      <span className="text-gray-400 block font-semibold">CLIENT:</span>
                      <span className="text-white font-bold">{activeProject.client}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-semibold">DATE:</span>
                      <span className="text-white font-bold">{activeProject.date}</span>
                    </div>
                  </div>

                  {/* Software used */}
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase block mb-2">SOFTWARE USED:</span>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.softwareUsed.map((sw, i) => (
                        <span key={i} className="rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {activeProject.behanceUrl && (
                      <a
                        href={activeProject.behanceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white transition-transform hover:scale-105"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <Globe className="h-4 w-4" />
                        <span>Behance</span>
                      </a>
                    )}
                    {activeProject.demoUrl && (
                      <a
                        href={activeProject.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
