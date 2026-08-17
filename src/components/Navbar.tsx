'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Command, Sun, Moon, Shield, Menu, X } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  primaryColor?: string;
  brandName?: string;
  logoImageUrl?: string;
}

export default function Navbar({
  onOpenCommandPalette,
  isDarkMode,
  onToggleTheme,
  primaryColor = '#FF1B1B',
  brandName = 'Nahin Sharif',
  logoImageUrl,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ['hero', 'about', 'portfolio', 'blog', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'ABOUT', href: '#about' },
    { name: 'PORTFOLIO', href: '#portfolio' },
    { name: 'BLOG', href: '#blog' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
        ? 'bg-[#0f0f10]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="#hero" className="group flex items-center gap-3">
          {logoImageUrl ? (
            <img
              src={logoImageUrl}
              alt={brandName}
              className="h-10 w-auto max-w-[140px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl font-black text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: primaryColor }}
            >
              {brandName ? brandName.charAt(0) : 'D'}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-white text-base leading-none">
              {brandName}
            </span>
            <span className="text-[10px] tracking-widest text-gray-400 font-semibold uppercase">
              SOLIGRAFITAS
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-bold tracking-widest transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:border-white/20 hover:bg-white/10 transition-all"
            title="Open Command Palette (Ctrl + K)"
          >
            <Command className="h-3.5 w-3.5" />
            <kbd className="rounded bg-black/40 px-1 py-0.5 text-[10px] text-gray-400">Ctrl K</kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-300 hover:bg-white/10 hover:text-white transition-all"
            title="Toggle Dark / Light Theme"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-xl border border-white/10 bg-white/5 p-2 text-gray-300"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-b border-white/10 bg-[#0f0f10]/95 backdrop-blur-2xl px-4 py-4"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-bold tracking-wider text-gray-300 hover:bg-white/10 hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
