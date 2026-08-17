'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Layout, Folder, Briefcase, FileText, Mail, Shield, Sparkles, Moon, Sun, X } from 'lucide-react';
import { Project } from '@/lib/db';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

export default function CommandPalette({ isOpen, onClose, projects, onToggleTheme, isDarkMode }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (selector: string) => {
    onClose();
    if (selector.startsWith('/')) {
      window.location.href = selector;
      return;
    }
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#141416] shadow-2xl"
        >
          {/* Search bar */}
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search portfolio sections, projects, commands... (Esc to close)"
              className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
              autoFocus
            />
            <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-white/10 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* List items */}
          <div className="max-h-96 overflow-y-auto p-2 overscroll-contain" data-lenis-prevent>
            <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">Quick Navigation</div>
            
            <button
              onClick={() => navigateTo('#hero')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Sparkles className="h-4 w-4 text-red-500" />
              <span>Home / Top</span>
            </button>

            <button
              onClick={() => navigateTo('#about')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Briefcase className="h-4 w-4 text-red-500" />
              <span>About & Experience</span>
            </button>

            <button
              onClick={() => navigateTo('#portfolio')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Folder className="h-4 w-4 text-red-500" />
              <span>Portfolio Gallery</span>
            </button>

            <button
              onClick={() => navigateTo('#blog')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <FileText className="h-4 w-4 text-red-500" />
              <span>Articles & Blog</span>
            </button>

            <button
              onClick={() => navigateTo('#contact')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Mail className="h-4 w-4 text-red-500" />
              <span>Contact Form</span>
            </button>

            <button
              onClick={() => {
                onToggleTheme();
                onClose();
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
              <span>Toggle Dark / Light Theme</span>
            </button>

            {/* Filtered Portfolio Items */}
            {filteredProjects.length > 0 && (
              <>
                <div className="mt-2 px-3 py-1.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">Matching Projects ({filteredProjects.length})</div>
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => navigateTo('#portfolio')}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-red-400" />
                      <span>{p.title}</span>
                    </div>
                    <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-gray-400">{p.category}</span>
                  </button>
                ))}
              </>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-400">
            <span>Press <kbd className="rounded bg-black/40 px-1.5 py-0.5 text-[10px]">Ctrl + K</kbd> to open anytime</span>
            <span>Portfolio CMS v1.0</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
