'use client';

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { getCmsData, CmsData } from '@/lib/db';
import ParticleBackground from '@/components/ParticleBackground';
import CustomCursor from '@/components/CustomCursor';
import CommandPalette from '@/components/CommandPalette';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutExperience from '@/components/AboutExperience';
import PortfolioGallery from '@/components/PortfolioGallery';
import AchievementsTestimonials from '@/components/AchievementsTestimonials';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import ScrollProgress from '@/components/ScrollProgress';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  const [data, setData] = useState<CmsData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Fetch CMS Data
    fetch('/api/cms')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error fetching CMS:', err));

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light-mode');
      }
      return next;
    });
  };

  const primaryColor = data?.theme?.primaryColor || '#FF1B1B';
  const faviconUrl = data?.theme?.faviconUrl || data?.seo?.faviconUrl || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
  const logoText = data?.theme?.logoText || data?.hero?.name || 'Nahin Sharif';

  useEffect(() => {
    if (!faviconUrl) return;
    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
  }, [faviconUrl]);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0f0f10] flex flex-col items-center justify-center text-white">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 shadow-xl animate-pulse mb-3">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <span className="text-xs font-black tracking-widest uppercase text-gray-400">LOADING Nahin Sharif PORTFOLIO...</span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen selection:bg-red-600 selection:text-white" style={{ '--primary-color': primaryColor } as any}>
      {/* Preloader */}
      <Preloader />

      {/* Scroll Progress Bar + Back to Top */}
      <ScrollProgress primaryColor={primaryColor} />

      {/* Dynamic Cursor & Particles */}
      {data.theme?.cursorStyle !== 'default' && <CustomCursor primaryColor={primaryColor} />}
      {data.theme?.enableParticles !== false && <ParticleBackground primaryColor={primaryColor} />}

      {/* Command Palette Modal (Ctrl + K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        projects={data.projects}
        onToggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />

      {/* Navigation Header */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        primaryColor={primaryColor}
        brandName={logoText}
        logoImageUrl={data.theme?.logoImageUrl}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero data={data.hero} primaryColor={primaryColor} />

        <AboutExperience
          about={data.about}
          experiences={data.experiences}
          skills={data.skills}
          software={data.software}
          primaryColor={primaryColor}
        />

        <PortfolioGallery projects={data.projects} primaryColor={primaryColor} />

        <AchievementsTestimonials
          achievements={data.achievements}
          testimonials={data.testimonials}
          primaryColor={primaryColor}
        />

        <BlogSection blogs={data.blogs} primaryColor={primaryColor} />

        <ContactSection socials={data.hero.socials} primaryColor={primaryColor} />
      </main>

      {/* Footer */}
      <Footer primaryColor={primaryColor} brandName={data.hero.name} />
    </div>
  );
}
