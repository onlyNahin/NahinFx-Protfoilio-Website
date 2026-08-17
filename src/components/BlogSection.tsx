'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { BlogPost } from '@/lib/db';

interface BlogProps {
  blogs: BlogPost[];
  primaryColor?: string;
}

export default function BlogSection({ blogs, primaryColor = '#FF1B1B' }: BlogProps) {
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  const publishedBlogs = blogs.filter((b) => b.published);

  return (
    <section id="blog" className="relative py-24 bg-[#0f0f10]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-extrabold tracking-widest text-red-500 uppercase">
            <BookOpen className="h-3.5 w-3.5" />
            <span>ARTICLES & THOUGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-3">
            LATEST INSIGHTS
          </h2>
          <p className="text-gray-400 max-w-xl text-sm sm:text-base mt-2">
            Design tutorials, workflow breakdowns, and motion graphics trends.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ y: -6 }}
              onClick={() => setActiveBlog(blog)}
              className="glass-card flex flex-col overflow-hidden rounded-3xl cursor-pointer group"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-red-400 border border-white/10">
                  {blog.category}
                </div>
              </div>

              <div className="flex flex-col p-6 gap-3 flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {blog.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-red-400 pt-2">
                  <span>Read Full Article</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {activeBlog && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveBlog(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#141416] p-6 sm:p-10 shadow-2xl overscroll-contain"
            >
              <button
                onClick={() => setActiveBlog(null)}
                className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-gray-300 hover:bg-white/20 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <span className="rounded-full bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 text-xs font-bold uppercase">
                {activeBlog.category}
              </span>

              <h2 className="text-2xl sm:text-4xl font-black text-white mt-4 leading-tight">
                {activeBlog.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-gray-400 mt-3 mb-6">
                <span>{activeBlog.date}</span>
                <span>•</span>
                <span>{activeBlog.readTime}</span>
              </div>

              <div className="overflow-hidden rounded-2xl mb-6">
                <img src={activeBlog.coverImage} alt="" className="w-full h-auto object-cover" />
              </div>

              <div className="prose prose-invert max-w-none text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {activeBlog.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
