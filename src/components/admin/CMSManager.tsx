'use client';

import React, { useState } from 'react';
import {
  Layout, FolderPlus, FileText, Mail, Palette, Briefcase,
  Trash2, Edit, Save, Check, Globe, Sparkles, Eye, LogOut, X,
  PlusCircle, BookOpen, Star, Trophy, Users, ChevronDown, ChevronUp,
  Image, Link as LinkIcon, AlignLeft, Tag, Clock, Upload,
} from 'lucide-react';
import { CmsData, Project, Experience, BlogPost, Skill, Testimonial, Achievement } from '@/lib/db';

interface CMSManagerProps {
  initialData: CmsData;
  onSave: (newData: CmsData) => Promise<void>;
  onLogout: () => void;
}

type TabId = 'overview' | 'hero' | 'portfolio' | 'about' | 'skills' | 'experience' | 'testimonials' | 'blog' | 'inbox' | 'seo' | 'theme';

const INPUT_CLS = 'w-full rounded-xl bg-black/50 border border-white/10 p-3 text-xs text-white placeholder-gray-600 focus:border-red-500 focus:outline-none transition-colors';
const TEXTAREA_CLS = `${INPUT_CLS} resize-none`;
const SAVE_BTN = 'rounded-xl bg-red-600 py-2.5 px-5 font-extrabold text-xs text-white hover:bg-red-500 transition-all self-start';

export default function CMSManager({ initialData, onSave, onLogout }: CMSManagerProps) {
  const [data, setData] = useState<CmsData>(initialData);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Modal states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  // Draft states
  const [newProject, setNewProject] = useState<Partial<Project>>({ title: '', category: 'Poster', description: '', client: '', softwareUsed: ['Adobe Photoshop'], date: '2024', featured: true, thumbnail: '', images: [], tags: [] });
  const [newExp, setNewExp] = useState<Partial<Experience>>({ company: '', role: '', year: '', description: '' });
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({ title: '', excerpt: '', content: '', category: 'Tutorial', tags: [], coverImage: '', readTime: '3 min read', published: false });
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({ name: '', category: 'Design', percentage: 80, icon: 'Palette' });
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({ name: '', role: '', company: '', avatar: '', rating: 5, content: '' });

  const handleSaveAll = async (overrideData?: CmsData) => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      await onSave(overrideData || data);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  };

  const update = (patch: Partial<CmsData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  };

  // ---- Project handlers ----
  const handleAddProject = () => {
    if (!newProject.title) return;
    const created: Project = {
      id: `proj-${Date.now()}`,
      title: newProject.title || 'Untitled',
      category: (newProject.category as any) || 'Poster',
      description: newProject.description || '',
      client: newProject.client || 'Client',
      softwareUsed: newProject.softwareUsed || ['Photoshop'],
      date: newProject.date || '2024',
      featured: newProject.featured ?? false,
      thumbnail: newProject.thumbnail || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      images: newProject.images?.length ? newProject.images : [newProject.thumbnail || ''],
      tags: newProject.tags || [],
      behanceUrl: newProject.behanceUrl,
      demoUrl: newProject.demoUrl,
      githubUrl: newProject.githubUrl,
    };
    const next = { ...data, projects: [created, ...data.projects] };
    setData(next);
    handleSaveAll(next);
    setNewProject({ title: '', category: 'Poster', description: '', client: '', softwareUsed: ['Adobe Photoshop'], date: '2024', featured: true, thumbnail: '', images: [], tags: [] });
  };
  const handleDeleteProject = (id: string) => {
    const next = { ...data, projects: data.projects.filter((p) => p.id !== id) };
    setData(next); handleSaveAll(next);
  };
  const handleUpdateProject = () => {
    if (!editingProject) return;
    const next = { ...data, projects: data.projects.map((p) => p.id === editingProject.id ? editingProject : p) };
    setData(next); handleSaveAll(next); setEditingProject(null);
  };

  // ---- Experience handlers ----
  const handleAddExp = () => {
    if (!newExp.company) return;
    const created: Experience = {
      id: `exp-${Date.now()}`,
      company: newExp.company || '',
      role: newExp.role || '',
      year: newExp.year || '2024',
      description: newExp.description || '',
    };
    const next = { ...data, experiences: [created, ...data.experiences] };
    setData(next); handleSaveAll(next);
    setNewExp({ company: '', role: '', year: '', description: '' });
  };
  const handleDeleteExp = (id: string) => {
    const next = { ...data, experiences: data.experiences.filter((e) => e.id !== id) };
    setData(next); handleSaveAll(next);
  };
  const handleUpdateExp = () => {
    if (!editingExp) return;
    const next = { ...data, experiences: data.experiences.map((e) => e.id === editingExp.id ? editingExp : e) };
    setData(next); handleSaveAll(next); setEditingExp(null);
  };

  // ---- Blog handlers ----
  const handleAddBlog = () => {
    if (!newBlog.title) return;
    const created: BlogPost = {
      id: `blog-${Date.now()}`,
      title: newBlog.title || '',
      slug: newBlog.title!.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      excerpt: newBlog.excerpt || '',
      content: newBlog.content || '',
      category: newBlog.category || 'Tutorial',
      tags: newBlog.tags || [],
      coverImage: newBlog.coverImage || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: newBlog.readTime || '3 min read',
      published: newBlog.published ?? false,
    };
    const next = { ...data, blogs: [created, ...data.blogs] };
    setData(next); handleSaveAll(next);
    setNewBlog({ title: '', excerpt: '', content: '', category: 'Tutorial', tags: [], coverImage: '', readTime: '3 min read', published: false });
  };
  const handleDeleteBlog = (id: string) => {
    const next = { ...data, blogs: data.blogs.filter((b) => b.id !== id) };
    setData(next); handleSaveAll(next);
  };
  const handleToggleBlogPublish = (id: string) => {
    const next = { ...data, blogs: data.blogs.map((b) => b.id === id ? { ...b, published: !b.published } : b) };
    setData(next); handleSaveAll(next);
  };

  // ---- Skill handlers ----
  const handleAddSkill = () => {
    if (!newSkill.name) return;
    const created: Skill = {
      id: `sk-${Date.now()}`,
      name: newSkill.name || '',
      category: newSkill.category || 'Design',
      percentage: newSkill.percentage || 80,
      icon: newSkill.icon || 'Palette',
    };
    const next = { ...data, skills: [...data.skills, created] };
    setData(next); handleSaveAll(next);
    setNewSkill({ name: '', category: 'Design', percentage: 80, icon: 'Palette' });
  };
  const handleDeleteSkill = (id: string) => {
    const next = { ...data, skills: data.skills.filter((s) => s.id !== id) };
    setData(next); handleSaveAll(next);
  };
  const handleSkillChange = (id: string, field: keyof Skill, value: string | number) => {
    const next = { ...data, skills: data.skills.map((s) => s.id === id ? { ...s, [field]: value } : s) };
    setData(next);
  };

  // ---- Testimonial handlers ----
  const handleAddTestimonial = () => {
    if (!newTestimonial.name) return;
    const created: Testimonial = {
      id: `t-${Date.now()}`,
      name: newTestimonial.name || '',
      role: newTestimonial.role || '',
      company: newTestimonial.company || '',
      avatar: newTestimonial.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: newTestimonial.rating || 5,
      content: newTestimonial.content || '',
    };
    const next = { ...data, testimonials: [...data.testimonials, created] };
    setData(next); handleSaveAll(next);
    setNewTestimonial({ name: '', role: '', company: '', avatar: '', rating: 5, content: '' });
  };
  const handleDeleteTestimonial = (id: string) => {
    const next = { ...data, testimonials: data.testimonials.filter((t) => t.id !== id) };
    setData(next); handleSaveAll(next);
  };

  // ---- Message handlers ----
  const handleMarkRead = (id: string) => {
    const next = { ...data, messages: data.messages.map((m) => m.id === id ? { ...m, read: true } : m) };
    setData(next); handleSaveAll(next);
  };
  const handleDeleteMessage = (id: string) => {
    const next = { ...data, messages: data.messages.filter((m) => m.id !== id) };
    setData(next); handleSaveAll(next);
  };

  const unreadCount = data.messages?.filter((m) => !m.read).length || 0;

  const NAV: { id: TabId; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Dashboard', icon: <Layout className="h-4 w-4" /> },
    { id: 'hero', label: 'Hero & Profile', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <FolderPlus className="h-4 w-4" />, badge: data.projects.length },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'skills', label: 'Skills', icon: <Star className="h-4 w-4" /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Users className="h-4 w-4" /> },
    { id: 'blog', label: 'Blog / Articles', icon: <BookOpen className="h-4 w-4" />, badge: data.blogs.length },
    { id: 'inbox', label: 'Inbox', icon: <Mail className="h-4 w-4" />, badge: unreadCount },
    { id: 'seo', label: 'SEO & Meta', icon: <Globe className="h-4 w-4" /> },
    { id: 'theme', label: 'Theme & Branding', icon: <Palette className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-gray-200 flex flex-col">
      {/* ── Admin Header ── */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#121215]/95 backdrop-blur-xl px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white text-[10px] font-black shadow-lg shadow-red-600/30">CMS</div>
          <div>
            <h1 className="text-sm font-extrabold text-white leading-none">PORTFOLIO CMS ADMIN</h1>
            <span className="text-[10px] text-gray-500 font-semibold">Live Content Management System</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white transition-all">
            <Eye className="h-3.5 w-3.5" /> View Site
          </a>
          <button
            onClick={() => handleSaveAll()}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-extrabold text-white shadow-lg hover:bg-red-500 transition-all disabled:opacity-50"
          >
            {saving ? <Sparkles className="h-3.5 w-3.5 animate-spin" /> : savedSuccess ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
            <span>{saving ? 'Saving...' : savedSuccess ? 'Saved!' : 'Save All'}</span>
          </button>
          <button onClick={onLogout} className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-all" title="Log Out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ── Layout ── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-56 border-r border-white/10 bg-[#121215] p-3 flex flex-col gap-1 md:overflow-y-auto">
          <span className="px-3 pt-2 pb-1 text-[9px] font-black tracking-widest text-gray-600 uppercase">Navigation</span>
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setActiveTab(n.id)}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all text-left ${activeTab === n.id ? 'bg-red-600 text-white shadow-md shadow-red-600/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <div className="flex items-center gap-2.5">{n.icon}<span>{n.label}</span></div>
              {n.badge !== undefined && n.badge > 0 && (
                <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-black ${activeTab === n.id ? 'bg-white/20 text-white' : n.id === 'inbox' ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                  {n.badge}
                </span>
              )}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 max-w-5xl">

          {/* ───────────── OVERVIEW ───────────── */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-2xl font-black text-white">DASHBOARD OVERVIEW</h2>
                <p className="text-xs text-gray-500 mt-1">All content changes save immediately to the live site.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Projects', val: data.projects.length, color: 'text-red-400' },
                  { label: 'Unread Messages', val: unreadCount, color: 'text-yellow-400' },
                  { label: 'Blog Posts', val: data.blogs.filter(b => b.published).length, color: 'text-emerald-400' },
                  { label: 'Skills Listed', val: data.skills.length, color: 'text-blue-400' },
                ].map((s) => (
                  <div key={s.label} className="glass-panel p-5 rounded-2xl flex flex-col gap-1">
                    <span className={`text-3xl font-black ${s.color}`}>{s.val}</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-3xl flex flex-col gap-3">
                  <h3 className="text-sm font-extrabold text-white">Quick Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    {[['Add Project', 'portfolio'], ['Edit Hero', 'hero'], ['Manage Blog', 'blog'], ['Change Theme', 'theme']].map(([label, tab]) => (
                      <button key={label} onClick={() => setActiveTab(tab as TabId)} className="rounded-xl bg-white/10 px-3 py-2 text-xs font-bold hover:bg-white/20 transition-all">
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="glass-panel p-6 rounded-3xl flex flex-col gap-3">
                  <h3 className="text-sm font-extrabold text-white">Recent Messages</h3>
                  {data.messages.length === 0 && <p className="text-xs text-gray-500">No messages yet.</p>}
                  {data.messages.slice(0, 3).map((m) => (
                    <div key={m.id} className="rounded-xl bg-white/5 p-3 text-xs flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{m.name}</span>
                        {!m.read && <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
                      </div>
                      <span className="text-gray-400 line-clamp-1">{m.message}</span>
                    </div>
                  ))}
                  {data.messages.length > 0 && (
                    <button onClick={() => setActiveTab('inbox')} className="text-xs text-red-400 font-bold hover:text-red-300 self-start">
                      View all messages →
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ───────────── HERO & PROFILE ───────────── */}
          {activeTab === 'hero' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-white">HERO & PROFILE</h2>
              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Display Name', key: 'name' as const },
                    { label: 'Profession Title', key: 'profession' as const },
                    { label: 'Status Badge', key: 'badge' as const },
                    { label: 'Sub Headline', key: 'subheadline' as const },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="text-xs font-bold text-gray-400 block mb-1 uppercase">{label}</label>
                      <input type="text" value={data.hero[key]} onChange={(e) => setData({ ...data, hero: { ...data.hero, [key]: e.target.value } })} className={INPUT_CLS} />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1 uppercase">Bio Paragraph</label>
                  <textarea rows={3} value={data.hero.bio} onChange={(e) => setData({ ...data, hero: { ...data.hero, bio: e.target.value } })} className={TEXTAREA_CLS} />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1 uppercase">Profile Image URL</label>
                  <input type="text" value={data.hero.profileImage} onChange={(e) => setData({ ...data, hero: { ...data.hero, profileImage: e.target.value } })} className={INPUT_CLS} />
                  {data.hero.profileImage && (
                    <img src={data.hero.profileImage} alt="Profile preview" className="mt-2 h-20 w-20 rounded-2xl object-cover border border-white/10" />
                  )}
                </div>
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">CTA Buttons</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Primary Button Text', key: 'ctaPrimaryText' as const },
                      { label: 'Primary Button Link', key: 'ctaPrimaryLink' as const },
                      { label: 'Secondary Button Text', key: 'ctaSecondaryText' as const },
                      { label: 'Secondary Button Link', key: 'ctaSecondaryLink' as const },
                    ].map(({ label, key }) => (
                      <div key={key}>
                        <label className="text-xs font-bold text-gray-500 block mb-1">{label}</label>
                        <input type="text" value={data.hero[key]} onChange={(e) => setData({ ...data, hero: { ...data.hero, [key]: e.target.value } })} className={INPUT_CLS} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Social Links</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(Object.keys(data.hero.socials) as (keyof typeof data.hero.socials)[]).map((key) => (
                      <div key={key}>
                        <label className="text-xs font-bold text-gray-500 block mb-1 capitalize">{key}</label>
                        <input type="text" value={data.hero.socials[key]} onChange={(e) => setData({ ...data, hero: { ...data.hero, socials: { ...data.hero.socials, [key]: e.target.value } } })} className={INPUT_CLS} />
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => handleSaveAll()} className={SAVE_BTN}>Save Hero Settings</button>
              </div>
            </div>
          )}

          {/* ───────────── PORTFOLIO ───────────── */}
          {activeTab === 'portfolio' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-white">PORTFOLIO PROJECTS</h2>
              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Add New Project</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Title *</label>
                    <input type="text" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} className={INPUT_CLS} placeholder="Project title" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Category *</label>
                    <select value={newProject.category} onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })} className={INPUT_CLS}>
                      {['Poster', 'Branding', 'Thumbnail', 'UI', 'Photography', 'Motion', 'Video'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Client</label>
                    <input type="text" value={newProject.client} onChange={(e) => setNewProject({ ...newProject, client: e.target.value })} className={INPUT_CLS} placeholder="Client name" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Date</label>
                    <input type="text" value={newProject.date} onChange={(e) => setNewProject({ ...newProject, date: e.target.value })} className={INPUT_CLS} placeholder="2024" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Description</label>
                  <textarea rows={2} value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} className={TEXTAREA_CLS} placeholder="Describe the project..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Thumbnail Image URL</label>
                  <input type="text" value={newProject.thumbnail} onChange={(e) => setNewProject({ ...newProject, thumbnail: e.target.value })} className={INPUT_CLS} placeholder="https://..." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Behance URL</label>
                    <input type="text" value={newProject.behanceUrl || ''} onChange={(e) => setNewProject({ ...newProject, behanceUrl: e.target.value })} className={INPUT_CLS} placeholder="https://behance.net/..." />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Demo / Live URL</label>
                    <input type="text" value={newProject.demoUrl || ''} onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })} className={INPUT_CLS} placeholder="https://..." />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="featured-new" checked={!!newProject.featured} onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })} className="h-4 w-4 accent-red-500" />
                  <label htmlFor="featured-new" className="text-xs font-bold text-gray-300">Featured Project</label>
                </div>
                <button onClick={handleAddProject} className={`${SAVE_BTN} flex items-center gap-2`}>
                  <PlusCircle className="h-3.5 w-3.5" /> Add to Portfolio
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-extrabold text-white uppercase">Projects ({data.projects.length})</h3>
                {data.projects.map((proj) => (
                  <div key={proj.id} className="glass-panel p-4 rounded-2xl flex items-center gap-4">
                    <img src={proj.thumbnail} alt="" className="h-14 w-14 rounded-xl object-cover flex-shrink-0 border border-white/10" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{proj.title}</h4>
                      <span className="text-xs text-gray-400">{proj.category} • {proj.client} • {proj.date}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => setEditingProject(proj)} className="rounded-lg bg-white/10 p-2 text-gray-300 hover:bg-white/20 hover:text-white transition-all"><Edit className="h-3.5 w-3.5" /></button>
                      <button onClick={() => handleDeleteProject(proj.id)} className="rounded-lg bg-red-500/20 p-2 text-red-400 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───────────── EXPERIENCE ───────────── */}
          {activeTab === 'experience' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-white">EXPERIENCE TIMELINE</h2>
              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4">
                <h3 className="text-sm font-extrabold text-white uppercase">Add New Role</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="text-xs font-bold text-gray-400 block mb-1">Company *</label><input type="text" value={newExp.company} onChange={(e) => setNewExp({ ...newExp, company: e.target.value })} className={INPUT_CLS} placeholder="Company Name" /></div>
                  <div><label className="text-xs font-bold text-gray-400 block mb-1">Role / Position *</label><input type="text" value={newExp.role} onChange={(e) => setNewExp({ ...newExp, role: e.target.value })} className={INPUT_CLS} placeholder="e.g. Lead Designer" /></div>
                  <div><label className="text-xs font-bold text-gray-400 block mb-1">Year / Period</label><input type="text" value={newExp.year} onChange={(e) => setNewExp({ ...newExp, year: e.target.value })} className={INPUT_CLS} placeholder="2023 - Present" /></div>
                </div>
                <div><label className="text-xs font-bold text-gray-400 block mb-1">Description</label><textarea rows={2} value={newExp.description} onChange={(e) => setNewExp({ ...newExp, description: e.target.value })} className={TEXTAREA_CLS} /></div>
                <button onClick={handleAddExp} className={`${SAVE_BTN} flex items-center gap-2`}><PlusCircle className="h-3.5 w-3.5" /> Add Experience</button>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-extrabold text-white uppercase">Timeline ({data.experiences.length})</h3>
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="glass-panel p-4 rounded-2xl flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-bold text-white">{exp.role}</span>
                        <span className="rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5">{exp.year}</span>
                      </div>
                      <span className="text-xs text-gray-400 block">{exp.company}</span>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{exp.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => setEditingExp(exp)} className="rounded-lg bg-white/10 p-2 text-gray-300 hover:bg-white/20 hover:text-white transition-all"><Edit className="h-3.5 w-3.5" /></button>
                      <button onClick={() => handleDeleteExp(exp.id)} className="rounded-lg bg-red-500/20 p-2 text-red-400 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4 border border-white/10">
                <h3 className="text-sm font-extrabold text-white uppercase">Achievement Counters</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Years Exp', key: 'yearsExperience' as const },
                    { label: 'Projects', key: 'completedProjects' as const },
                    { label: 'Clients', key: 'satisfiedClients' as const },
                    { label: 'Awards', key: 'awardsWon' as const },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="text-xs text-gray-400 block mb-1">{label}</label>
                      <input type="number" value={data.about[key]} onChange={(e) => setData({ ...data, about: { ...data.about, [key]: parseInt(e.target.value) || 0 } })} className={INPUT_CLS} />
                    </div>
                  ))}
                </div>
                <button onClick={() => handleSaveAll()} className={SAVE_BTN}>Save Counters</button>
              </div>
            </div>
          )}

          {/* ───────────── SKILLS ───────────── */}
          {activeTab === 'skills' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-white">SKILLS MANAGER</h2>
              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4">
                <h3 className="text-sm font-extrabold text-white uppercase">Add New Skill</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="text-xs font-bold text-gray-400 block mb-1">Skill Name *</label><input type="text" value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} className={INPUT_CLS} placeholder="e.g. Graphic Design" /></div>
                  <div><label className="text-xs font-bold text-gray-400 block mb-1">Category</label><input type="text" value={newSkill.category} onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })} className={INPUT_CLS} placeholder="Design, Video, Web..." /></div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Proficiency ({newSkill.percentage}%)</label>
                    <input type="range" min="1" max="100" value={newSkill.percentage} onChange={(e) => setNewSkill({ ...newSkill, percentage: parseInt(e.target.value) })} className="w-full accent-red-500" />
                  </div>
                </div>
                <button onClick={handleAddSkill} className={`${SAVE_BTN} flex items-center gap-2`}><PlusCircle className="h-3.5 w-3.5" /> Add Skill</button>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-extrabold text-white uppercase">Skill List ({data.skills.length})</h3>
                {data.skills.map((sk) => (
                  <div key={sk.id} className="glass-panel p-4 rounded-2xl flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-white">{sk.name}</span>
                        <span className="text-[10px] text-gray-400 bg-white/10 rounded-full px-2 py-0.5">{sk.category}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: `${sk.percentage}%` }} />
                        </div>
                        <input
                          type="number" min="1" max="100" value={sk.percentage}
                          onChange={(e) => { handleSkillChange(sk.id, 'percentage', parseInt(e.target.value) || 0); }}
                          onBlur={() => handleSaveAll()}
                          className="w-14 rounded-lg bg-black/50 border border-white/10 p-1 text-xs text-white text-center"
                        />
                        <span className="text-xs text-gray-400">%</span>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteSkill(sk.id)} className="rounded-lg bg-red-500/20 p-2 text-red-400 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───────────── TESTIMONIALS ───────────── */}
          {activeTab === 'testimonials' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-white">TESTIMONIALS MANAGER</h2>
              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4">
                <h3 className="text-sm font-extrabold text-white uppercase">Add New Testimonial</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="text-xs font-bold text-gray-400 block mb-1">Client Name *</label><input type="text" value={newTestimonial.name} onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })} className={INPUT_CLS} /></div>
                  <div><label className="text-xs font-bold text-gray-400 block mb-1">Role / Title</label><input type="text" value={newTestimonial.role} onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })} className={INPUT_CLS} /></div>
                  <div><label className="text-xs font-bold text-gray-400 block mb-1">Company</label><input type="text" value={newTestimonial.company} onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })} className={INPUT_CLS} /></div>
                  <div><label className="text-xs font-bold text-gray-400 block mb-1">Avatar Image URL</label><input type="text" value={newTestimonial.avatar} onChange={(e) => setNewTestimonial({ ...newTestimonial, avatar: e.target.value })} className={INPUT_CLS} /></div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Rating ({newTestimonial.rating}/5)</label>
                    <input type="range" min="1" max="5" value={newTestimonial.rating} onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })} className="w-full accent-red-500" />
                  </div>
                </div>
                <div><label className="text-xs font-bold text-gray-400 block mb-1">Testimonial Content *</label><textarea rows={3} value={newTestimonial.content} onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })} className={TEXTAREA_CLS} placeholder="What did the client say?" /></div>
                <button onClick={handleAddTestimonial} className={`${SAVE_BTN} flex items-center gap-2`}><PlusCircle className="h-3.5 w-3.5" /> Add Testimonial</button>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-extrabold text-white uppercase">Testimonials ({data.testimonials.length})</h3>
                {data.testimonials.map((t) => (
                  <div key={t.id} className="glass-panel p-4 rounded-2xl flex items-start gap-4">
                    <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover border-2 border-red-500/30 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-white">{t.name}</span>
                        <div className="flex">{'★'.repeat(t.rating).split('').map((s, i) => <span key={i} className="text-yellow-400 text-xs">{s}</span>)}</div>
                      </div>
                      <span className="text-xs text-gray-400 block">{t.role} · {t.company}</span>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">"{t.content}"</p>
                    </div>
                    <button onClick={() => handleDeleteTestimonial(t.id)} className="rounded-lg bg-red-500/20 p-2 text-red-400 hover:bg-red-500 hover:text-white transition-all flex-shrink-0"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───────────── BLOG ───────────── */}
          {activeTab === 'blog' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-white">BLOG / ARTICLES CMS</h2>
              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4">
                <h3 className="text-sm font-extrabold text-white uppercase">Write New Article</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2"><label className="text-xs font-bold text-gray-400 block mb-1">Article Title *</label><input type="text" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} className={INPUT_CLS} placeholder="e.g. Mastering Poster Composition..." /></div>
                  <div><label className="text-xs font-bold text-gray-400 block mb-1">Category</label><input type="text" value={newBlog.category} onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })} className={INPUT_CLS} placeholder="Tutorial, Tips, Trends..." /></div>
                  <div><label className="text-xs font-bold text-gray-400 block mb-1">Read Time</label><input type="text" value={newBlog.readTime} onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })} className={INPUT_CLS} placeholder="5 min read" /></div>
                  <div className="sm:col-span-2"><label className="text-xs font-bold text-gray-400 block mb-1">Cover Image URL</label><input type="text" value={newBlog.coverImage} onChange={(e) => setNewBlog({ ...newBlog, coverImage: e.target.value })} className={INPUT_CLS} /></div>
                </div>
                <div><label className="text-xs font-bold text-gray-400 block mb-1">Excerpt (short summary)</label><textarea rows={2} value={newBlog.excerpt} onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })} className={TEXTAREA_CLS} /></div>
                <div><label className="text-xs font-bold text-gray-400 block mb-1">Full Content</label><textarea rows={6} value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })} className={TEXTAREA_CLS} placeholder="Write your full article content here..." /></div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="blog-published" checked={!!newBlog.published} onChange={(e) => setNewBlog({ ...newBlog, published: e.target.checked })} className="h-4 w-4 accent-red-500" />
                  <label htmlFor="blog-published" className="text-xs font-bold text-gray-300">Publish Immediately</label>
                </div>
                <button onClick={handleAddBlog} className={`${SAVE_BTN} flex items-center gap-2`}><PlusCircle className="h-3.5 w-3.5" /> {newBlog.published ? 'Publish Article' : 'Save as Draft'}</button>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-extrabold text-white uppercase">All Articles ({data.blogs.length})</h3>
                {data.blogs.map((blog) => (
                  <div key={blog.id} className="glass-panel p-4 rounded-2xl flex items-start gap-4">
                    <img src={blog.coverImage} alt="" className="h-14 w-16 rounded-xl object-cover flex-shrink-0 border border-white/10" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-bold text-white truncate">{blog.title}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-black ${blog.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {blog.published ? 'PUBLISHED' : 'DRAFT'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">{blog.category} · {blog.readTime} · {blog.date}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => handleToggleBlogPublish(blog.id)} className={`rounded-lg p-2 text-xs font-bold transition-all ${blog.published ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/40' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40'}`}>
                        {blog.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => handleDeleteBlog(blog.id)} className="rounded-lg bg-red-500/20 p-2 text-red-400 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───────────── INBOX ───────────── */}
          {activeTab === 'inbox' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-white">INBOX MESSAGES ({data.messages.length})</h2>
              {data.messages.length === 0 && (
                <div className="glass-panel p-12 rounded-3xl flex flex-col items-center gap-3 text-center">
                  <Mail className="h-10 w-10 text-gray-600" />
                  <p className="text-sm text-gray-500">No messages yet. They'll appear here when visitors submit the contact form.</p>
                </div>
              )}
              <div className="flex flex-col gap-3">
                {data.messages.map((m) => (
                  <div key={m.id} className={`glass-panel p-5 rounded-2xl flex flex-col gap-3 border ${m.read ? 'border-white/5' : 'border-red-500/20'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-white">{m.name}</span>
                          {!m.read && <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
                        </div>
                        <span className="text-xs text-gray-400">{m.email} · {m.date}</span>
                        <p className="text-xs font-bold text-red-400 mt-1">{m.subject}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!m.read && (
                          <button onClick={() => handleMarkRead(m.id)} className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-gray-300 hover:bg-white/20 transition-all">
                            Mark Read
                          </button>
                        )}
                        <a href={`mailto:${m.email}?subject=Re: ${m.subject}`} className="rounded-lg bg-blue-500/20 px-3 py-1.5 text-xs font-bold text-blue-400 hover:bg-blue-500/40 transition-all">
                          Reply
                        </a>
                        <button onClick={() => handleDeleteMessage(m.id)} className="rounded-lg bg-red-500/20 p-1.5 text-red-400 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">{m.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───────────── SEO ───────────── */}
          {activeTab === 'seo' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-white">SEO & METADATA PANEL</h2>
              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4">
                {[
                  { label: 'Meta Title', key: 'metaTitle' as const, type: 'input', hint: 'Keep under 60 characters' },
                  { label: 'Meta Description', key: 'metaDescription' as const, type: 'textarea', hint: 'Keep under 160 characters' },
                  { label: 'Keywords (comma separated)', key: 'metaKeywords' as const, type: 'input' },
                  { label: 'Canonical URL', key: 'canonicalUrl' as const, type: 'input' },
                  { label: 'OG Image URL', key: 'ogImage' as const, type: 'input', hint: 'Recommended: 1200x630px' },
                  { label: 'Google Search Console Verification', key: 'googleSearchConsole' as const, type: 'input' },
                  { label: 'Bing Verification Code', key: 'bingVerification' as const, type: 'input' },
                ].map(({ label, key, type, hint }) => (
                  <div key={key}>
                    <label className="text-xs font-bold text-gray-400 block mb-1 uppercase">{label}</label>
                    {hint && <p className="text-[10px] text-gray-600 mb-1">{hint}</p>}
                    {type === 'textarea'
                      ? <textarea rows={3} value={data.seo[key]} onChange={(e) => setData({ ...data, seo: { ...data.seo, [key]: e.target.value } })} className={TEXTAREA_CLS} />
                      : <input type="text" value={data.seo[key] || ''} onChange={(e) => setData({ ...data, seo: { ...data.seo, [key]: e.target.value } })} className={INPUT_CLS} />
                    }
                  </div>
                ))}
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1 uppercase">Favicon URL</label>
                  <div className="flex items-center gap-3">
                    <input type="text" value={data.seo.faviconUrl || ''} onChange={(e) => setData({ ...data, seo: { ...data.seo, faviconUrl: e.target.value }, theme: { ...data.theme, faviconUrl: e.target.value } })} placeholder="https://example.com/favicon.png" className={`${INPUT_CLS} flex-1`} />
                    {data.seo.faviconUrl && (
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-black/60 border border-white/10 flex-shrink-0">
                        <img src={data.seo.faviconUrl} alt="Favicon" className="h-6 w-6 object-contain" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1 uppercase">Robots.txt Content</label>
                  <textarea rows={4} value={data.seo.robotsTxt} onChange={(e) => setData({ ...data, seo: { ...data.seo, robotsTxt: e.target.value } })} className={TEXTAREA_CLS} />
                </div>
                <button onClick={() => handleSaveAll()} className={SAVE_BTN}>Save SEO Settings</button>
              </div>
            </div>
          )}

          {/* ───────────── THEME ───────────── */}
          {activeTab === 'theme' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-white">THEME, LOGO & FAVICON</h2>

              {/* Branding */}
              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Branding & Logo</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Brand Logo Text</label>
                    <input type="text" value={data.theme.logoText || data.hero.name || ''} onChange={(e) => setData({ ...data, theme: { ...data.theme, logoText: e.target.value }, hero: { ...data.hero, name: e.target.value } })} className={INPUT_CLS} placeholder="e.g. Nahin Sharif" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Custom Logo Image URL (optional)</label>
                    <input type="text" value={data.theme.logoImageUrl || ''} onChange={(e) => setData({ ...data, theme: { ...data.theme, logoImageUrl: e.target.value } })} className={INPUT_CLS} placeholder="https://example.com/logo.png" />
                  </div>
                </div>
                {data.theme.logoImageUrl && (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/40 border border-white/10">
                    <span className="text-xs text-gray-400 font-bold">Logo Preview:</span>
                    <img src={data.theme.logoImageUrl} alt="Logo preview" className="h-8 w-auto object-contain" />
                  </div>
                )}
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Favicon URL</label>
                  <div className="flex items-center gap-3">
                    <input type="text" value={data.theme.faviconUrl || data.seo.faviconUrl || ''} onChange={(e) => setData({ ...data, theme: { ...data.theme, faviconUrl: e.target.value }, seo: { ...data.seo, faviconUrl: e.target.value } })} className={`${INPUT_CLS} flex-1`} placeholder="https://example.com/favicon.png" />
                    {(data.theme.faviconUrl || data.seo.faviconUrl) && (
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-black/60 border border-white/10 flex-shrink-0">
                        <img src={data.theme.faviconUrl || data.seo.faviconUrl} alt="Favicon" className="h-6 w-6 object-contain" />
                      </div>
                    )}
                  </div>
                </div>
                <button onClick={() => handleSaveAll()} className={SAVE_BTN}>Save Branding</button>
              </div>

              {/* Accent Color */}
              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Accent Color & Effects</h3>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-3 uppercase">Primary Accent Color</label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { name: 'Crimson Red', hex: '#FF1B1B' },
                      { name: 'Electric Blue', hex: '#3B82F6' },
                      { name: 'Cyber Emerald', hex: '#10B981' },
                      { name: 'Royal Purple', hex: '#8B5CF6' },
                      { name: 'Amber Gold', hex: '#F59E0B' },
                      { name: 'Hot Pink', hex: '#EC4899' },
                    ].map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => { const u = { ...data, theme: { ...data.theme, primaryColor: c.hex } }; setData(u); handleSaveAll(u); }}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all border ${data.theme.primaryColor === c.hex ? 'border-white scale-105 shadow-xl' : 'border-transparent hover:border-white/30'}`}
                        style={{ backgroundColor: c.hex }}
                      >
                        <span className="text-white drop-shadow">{c.name}</span>
                        {data.theme.primaryColor === c.hex && <Check className="h-3 w-3 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/10 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-2">Custom Cursor Style</label>
                    <select value={data.theme.cursorStyle} onChange={(e) => { const u = { ...data, theme: { ...data.theme, cursorStyle: e.target.value as any } }; setData(u); handleSaveAll(u); }} className={INPUT_CLS}>
                      <option value="glow">Aura Glow Cursor</option>
                      <option value="magnetic">Magnetic Dot</option>
                      <option value="default">Default OS Cursor</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 pt-5">
                    <input type="checkbox" id="particles-toggle" checked={data.theme.enableParticles !== false} onChange={(e) => { const u = { ...data, theme: { ...data.theme, enableParticles: e.target.checked } }; setData(u); handleSaveAll(u); }} className="h-4 w-4 accent-red-500" />
                    <label htmlFor="particles-toggle" className="text-xs font-bold text-gray-300">Enable Particle Background</label>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── Edit Project Modal ── */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#141416] p-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-extrabold text-white">EDIT PROJECT</h3>
              <button onClick={() => setEditingProject(null)} className="rounded-lg p-1 text-gray-400 hover:bg-white/10"><X className="h-4 w-4" /></button>
            </div>
            <div><label className="text-xs font-bold text-gray-400 block mb-1">Title</label><input type="text" value={editingProject.title} onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} className={INPUT_CLS} /></div>
            <div><label className="text-xs font-bold text-gray-400 block mb-1">Client</label><input type="text" value={editingProject.client} onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })} className={INPUT_CLS} /></div>
            <div><label className="text-xs font-bold text-gray-400 block mb-1">Category</label>
              <select value={editingProject.category} onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })} className={INPUT_CLS}>
                {['Poster', 'Branding', 'Thumbnail', 'UI', 'Photography', 'Motion', 'Video'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="text-xs font-bold text-gray-400 block mb-1">Description</label><textarea rows={3} value={editingProject.description} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} className={TEXTAREA_CLS} /></div>
            <div><label className="text-xs font-bold text-gray-400 block mb-1">Thumbnail URL</label><input type="text" value={editingProject.thumbnail} onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })} className={INPUT_CLS} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Behance URL</label><input type="text" value={editingProject.behanceUrl || ''} onChange={(e) => setEditingProject({ ...editingProject, behanceUrl: e.target.value })} className={INPUT_CLS} /></div>
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Demo URL</label><input type="text" value={editingProject.demoUrl || ''} onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })} className={INPUT_CLS} /></div>
            </div>
            <button onClick={handleUpdateProject} className={`${SAVE_BTN} w-full text-center justify-center flex items-center gap-2`}><Save className="h-3.5 w-3.5" /> Update Project</button>
          </div>
        </div>
      )}

      {/* ── Edit Experience Modal ── */}
      {editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-[#141416] p-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-extrabold text-white">EDIT EXPERIENCE</h3>
              <button onClick={() => setEditingExp(null)} className="rounded-lg p-1 text-gray-400 hover:bg-white/10"><X className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Company</label><input type="text" value={editingExp.company} onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })} className={INPUT_CLS} /></div>
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Role</label><input type="text" value={editingExp.role} onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })} className={INPUT_CLS} /></div>
              <div><label className="text-xs font-bold text-gray-400 block mb-1">Year / Period</label><input type="text" value={editingExp.year} onChange={(e) => setEditingExp({ ...editingExp, year: e.target.value })} className={INPUT_CLS} /></div>
            </div>
            <div><label className="text-xs font-bold text-gray-400 block mb-1">Description</label><textarea rows={3} value={editingExp.description} onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })} className={TEXTAREA_CLS} /></div>
            <button onClick={handleUpdateExp} className={`${SAVE_BTN} w-full text-center justify-center flex items-center gap-2`}><Save className="h-3.5 w-3.5" /> Update Experience</button>
          </div>
        </div>
      )}
    </div>
  );
}
