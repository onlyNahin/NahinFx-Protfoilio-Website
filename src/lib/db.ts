import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';

export interface Project {
  id: string;
  title: string;
  category: 'Poster' | 'Branding' | 'Thumbnail' | 'UI' | 'Photography' | 'Motion' | 'Video';
  description: string;
  client: string;
  softwareUsed: string[];
  date: string;
  featured: boolean;
  thumbnail: string;
  images: string[];
  videoUrl?: string;
  behanceUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  downloadUrl?: string;
  tags: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  year: string;
  description: string;
  logo?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  percentage: number;
  icon: string;
}

export interface SoftwareItem {
  id: string;
  name: string;
  iconUrl: string;
  level: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
}

export interface Achievement {
  id: string;
  title: string;
  number: string;
  suffix: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  date: string;
  readTime: string;
  published: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface CmsData {
  hero: {
    name: string;
    badge: string;
    profession: string;
    subheadline: string;
    bio: string;
    profileImage: string;
    ctaPrimaryText: string;
    ctaPrimaryLink: string;
    ctaSecondaryText: string;
    ctaSecondaryLink: string;
    socials: {
      github: string;
      behance: string;
      linkedin: string;
      instagram: string;
      whatsapp: string;
      email: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    bioParagraph1: string;
    bioParagraph2: string;
    yearsExperience: number;
    completedProjects: number;
    satisfiedClients: number;
    awardsWon: number;
  };
  experiences: Experience[];
  skills: Skill[];
  software: SoftwareItem[];
  projects: Project[];
  testimonials: Testimonial[];
  achievements: Achievement[];
  blogs: BlogPost[];
  messages: ContactMessage[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    canonicalUrl: string;
    ogImage: string;
    faviconUrl?: string;
    googleSearchConsole: string;
    bingVerification: string;
    robotsTxt: string;
  };
  theme: {
    primaryColor: string; // e.g. #FF1B1B
    cursorStyle: 'default' | 'glow' | 'magnetic';
    enableParticles: boolean;
    sectionOrder: string[];
    logoText?: string;
    logoImageUrl?: string;
    faviconUrl?: string;
  };
}

const defaultData: CmsData = {
  hero: {
    name: "Nahin Sharif",
    badge: "AVAILABLE FOR FREELANCE & FULL-TIME",
    profession: "Graphic Designer & Motion Artist",
    subheadline: "HI! I AM A GRAPHIC DESIGNER & VISUAL STORYTELLER",
    bio: "Creating high-impact poster designs, brand identity systems, video edits, and futuristic motion graphics with cinematic aesthetics.",
    profileImage: "https://i.ibb.co.com/BK3NyW09/Poster-Without-Text.png?auto=format&fit=crop&w=800&q=80",
    ctaPrimaryText: "EXPLORE PORTFOLIO",
    ctaPrimaryLink: "#portfolio",
    ctaSecondaryText: "GET IN TOUCH",
    ctaSecondaryLink: "#contact",
    socials: {
      github: "https://github.com",
      behance: "https://behance.net",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      whatsapp: "https://wa.me/1234567890",
      email: "nahinsharif21@gmail.com",
    },
  },
  about: {
    title: "BIOGRAPHY & ESSENCE",
    subtitle: "Passion for visual excellence, modern typography, and vibrant aesthetic compositions.",
    bioParagraph1: "Passionate graphic designer and digital content creator with over 5 years of experience crafting visually stunning artwork, poster graphics, branding packages, and motion elements.",
    bioParagraph2: "Based in Bangladesh, working with international creators, agencies, and brands. Focused on delivering bold, modern visual languages with precision color grading.",
    yearsExperience: 5,
    completedProjects: 140,
    satisfiedClients: 85,
    awardsWon: 12,
  },
  experiences: [
    {
      id: "exp-1",
      company: "Kampung Soligrafitas",
      role: "Co-Founder & Lead Designer",
      year: "2023 - Present",
      description: "Leading creative direction, graphic design workshops, and branding campaigns for regional and international clients.",
    },
    {
      id: "exp-2",
      company: "Team AESTRO",
      role: "Senior Graphic Designer",
      year: "2022 - 2023",
      description: "Crafted aesthetic poster series, esports branding, and thumbnail graphics reaching over 1M total impressions.",
    },
    {
      id: "exp-3",
      company: "NalakaProject.Id",
      role: "Motion & Graphic Specialist",
      year: "2021 - 2022",
      description: "Produced dynamic YouTube thumbnails, motion graphic overlays, and social media marketing collateral.",
    },
    {
      id: "exp-4",
      company: "Ruang Edit & DPS Class",
      role: "Mentor & Content Creator",
      year: "2020 - 2021",
      description: "Taught Photoshop & Premiere Pro editing workflows to 500+ aspiring digital artists.",
    },
  ],
  skills: [
    { id: "sk-1", name: "Graphic Design & Posters", category: "Design", percentage: 95, icon: "Palette" },
    { id: "sk-2", name: "Motion Graphics & Compositing", category: "Motion", percentage: 90, icon: "Zap" },
    { id: "sk-3", name: "Video Editing & Color Grading", category: "Video", percentage: 88, icon: "Video" },
    { id: "sk-4", name: "Brand Identity & Layouts", category: "Branding", percentage: 92, icon: "Layout" },
    { id: "sk-5", name: "UI/UX Design", category: "Web", percentage: 85, icon: "Figma" },
    { id: "sk-6", name: "Digital Marketing Graphics", category: "Marketing", percentage: 86, icon: "TrendingUp" },
  ],
  software: [
    { id: "sw-1", name: "Adobe Photoshop", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg", level: "Expert", color: "#31A8FF" },
    { id: "sw-2", name: "Adobe Illustrator", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-line.svg", level: "Expert", color: "#FF9A00" },
    { id: "sw-3", name: "Adobe Premiere Pro", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg", level: "Advanced", color: "#9999FF" },
    { id: "sw-4", name: "Adobe After Effects", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg", level: "Advanced", color: "#D291FF" },
    { id: "sw-5", name: "DaVinci Resolve", iconUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80", level: "Advanced", color: "#E02424" },
    { id: "sw-6", name: "Figma", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", level: "Proficient", color: "#F24E1E" },
    { id: "sw-7", name: "Blender 3D", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg", level: "Intermediate", color: "#EA7600" },
    { id: "sw-8", name: "Canva Pro", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg", level: "Expert", color: "#00C4CC" },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Scholarship Webinar Poster Series",
      category: "Poster",
      description: "Modern vibrant event poster design with high-impact typography, neon highlights, and custom photo manipulation.",
      client: "Ponpes Al Hidayah Sumanik",
      softwareUsed: ["Adobe Photoshop", "Canva Pro"],
      date: "2024",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80"
      ],
      behanceUrl: "https://behance.net",
      tags: ["Poster", "Typography", "Event", "Webinar"],
    },
    {
      id: "proj-2",
      title: "Islamic Youth Futuristic Concept Poster",
      category: "Poster",
      description: "Cyberpunk-inspired Islamic theme poster featuring masked model compositing, glowing red text, and grunge textures.",
      client: "Ruang Indes & Kampus Soligrafitas",
      softwareUsed: ["Adobe Photoshop", "Adobe Lightroom"],
      date: "2024",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80"
      ],
      behanceUrl: "https://behance.net",
      tags: ["Poster", "Manipulations", "Futuristic"],
    },
    {
      id: "proj-3",
      title: "Collaboration Futuristic Mecha Poster",
      category: "Poster",
      description: "Neon green & obsidian mecha robot compositing with high-contrast sharp angles and intense graphic glows.",
      client: "Collaboration Futuristic",
      softwareUsed: ["Adobe Photoshop", "Adobe After Effects"],
      date: "2023",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
      ],
      behanceUrl: "https://behance.net",
      tags: ["Poster", "Esports", "Cyberpunk"],
    },
    {
      id: "proj-4",
      title: "Cristiano Ronaldo Legend Tribute Art",
      category: "Branding",
      description: "Tribute digital artwork for legendary football star with dynamic trophy compositing and gold-red aura lighting.",
      client: "Personal Project",
      softwareUsed: ["Adobe Photoshop", "Lightroom"],
      date: "2023",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
      ],
      tags: ["Artwork", "Sports", "Tribute"],
    },
    {
      id: "proj-5",
      title: "iPhone 17 Cyber Concept Reveal",
      category: "UI",
      description: "Ultra-sleek tech product showcase design with warm golden lighting and floating device mockup frame.",
      client: "Tech Vision Inc.",
      softwareUsed: ["Figma", "Blender 3D", "Photoshop"],
      date: "2024",
      featured: true,
      thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80"
      ],
      demoUrl: "https://example.com",
      tags: ["UI", "Mockup", "Product"],
    },
    {
      id: "proj-6",
      title: "Papua Cultural Documentary Thumbnail",
      category: "Thumbnail",
      description: "High click-through YouTube thumbnail design engineered for maximum viewer engagement and crisp readability.",
      client: "Odot Media",
      softwareUsed: ["Adobe Photoshop"],
      date: "2023",
      featured: false,
      thumbnail: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1200&q=80"
      ],
      tags: ["Thumbnail", "YouTube", "Culture"],
    },
  ],
  testimonials: [
    {
      id: "t-1",
      name: "Alex Rivera",
      role: "Creative Director",
      company: "Aestro Media",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      content: "Nahin Sharif delivers world-class graphic designs! His attention to lighting, glowing typography, and compositing detail completely elevated our brand campaigns.",
    },
    {
      id: "t-2",
      name: "Siti Rahma",
      role: "Founder",
      company: "Ruang Edit Studio",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      content: "Working with Nahin Sharif was effortless. He completed 10 high-resolution posters ahead of deadline with zero compromises on quality.",
    },
  ],
  achievements: [
    { id: "ach-1", title: "Global Poster Awards", number: "1st", suffix: " Place", description: "Best Digital Poster Manipulation 2023", icon: "Trophy" },
    { id: "ach-2", title: "Behance Featured Art", number: "15", suffix: "+", description: "Curated in Graphic Design showcase gallery", icon: "Award" },
    { id: "ach-3", title: "Total Student Trainees", number: "500", suffix: "+", description: "Mentorship in photoshop poster compositing", icon: "Users" },
  ],
  blogs: [
    {
      id: "blog-1",
      title: "Mastering Poster Composition & Glow Lighting in Photoshop",
      slug: "mastering-poster-composition-photoshop",
      excerpt: "Learn how to use color grading, camera raw filters, and outer glows to make your graphic design posters pop.",
      content: "Poster design is all about hierarchy, depth, and contrast. In this guide, we dive into building high-impact poster graphics step by step using Photoshop.",
      category: "Tutorial",
      tags: ["Photoshop", "Graphic Design", "Tutorial"],
      coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
      date: "August 1, 2024",
      readTime: "5 min read",
      published: true,
    },
    {
      id: "blog-2",
      title: "Top 5 Motion Graphics Trends to Watch for 2025",
      slug: "top-motion-graphics-trends-2025",
      excerpt: "From cyberpunk glowing line animations to kinetic 3D typography, discover what aesthetics are dominating modern design.",
      content: "Motion design continues to evolve. In 2025, micro-interactions, dynamic light sweeps, and distorted glass typography take center stage.",
      category: "Trends",
      tags: ["Motion Design", "Trends", "After Effects"],
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      date: "July 24, 2024",
      readTime: "4 min read",
      published: true,
    },
  ],
  messages: [
    {
      id: "msg-1",
      name: "Marcus Vance",
      email: "marcus@designco.com",
      subject: "Branding Campaign Collaboration",
      message: "Hi Nahin Sharif, we loved your poster design work for Kampung Soligrafitas. We would like to commission 5 promotional posters for an upcoming esports event.",
      date: "2024-08-05 14:20",
      read: false,
    },
  ],
  seo: {
    metaTitle: "Nahin Sharif | Graphic Designer & Motion Artist Portfolio",
    metaDescription: "Personal portfolio of Nahin Sharif - Graphic Designer, Motion Artist, and Video Editor crafting high-impact posters and visual identity systems.",
    metaKeywords: "Graphic Designer, Poster Design, Motion Graphics, Video Editor, Photoshop, Illustrator, Behance, Nahin Sharif",
    canonicalUrl: "https://nahin.design",
    ogImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    faviconUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    googleSearchConsole: "gsc-verification-code-12345",
    bingVerification: "bing-verification-code-67890",
    robotsTxt: "User-agent: *\nAllow: /\nSitemap: https://nahin.design/sitemap.xml",
  },
  theme: {
    primaryColor: "#FF1B1B",
    cursorStyle: "glow",
    enableParticles: true,
    sectionOrder: ["hero", "about", "portfolio", "achievements", "blog", "contact"],
    logoText: "Nahin Sharif",
    logoImageUrl: "",
    faviconUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
};

export async function getCmsData(): Promise<CmsData> {
  const supabase = await createClient();

  const [
    { data: experiences },
    { data: skills },
    { data: software },
    { data: projects },
    { data: testimonials },
    { data: achievements },
    { data: blogs },
    { data: messages },
    { data: siteSettings }
  ] = await Promise.all([
    supabase.from('experiences').select('*'),
    supabase.from('skills').select('*'),
    supabase.from('software').select('*'),
    supabase.from('projects').select('*'),
    supabase.from('testimonials').select('*'),
    supabase.from('achievements').select('*'),
    supabase.from('blogs').select('*'),
    supabase.from('messages').select('*'),
    supabase.from('site_settings').select('*').eq('id', 1).single()
  ]);

  return {
    hero: siteSettings?.hero || defaultData.hero,
    about: siteSettings?.about || defaultData.about,
    seo: siteSettings?.seo || defaultData.seo,
    theme: siteSettings?.theme || defaultData.theme,
    experiences: experiences || [],
    skills: skills || [],
    software: (software || []).map((s: any) => ({
      id: s.id,
      name: s.name,
      iconUrl: s.icon_url,
      level: s.level,
      color: s.color
    })),
    projects: (projects || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      client: p.client,
      softwareUsed: p.software_used,
      date: p.date,
      featured: p.featured,
      thumbnail: p.thumbnail,
      images: p.images,
      videoUrl: p.video_url,
      behanceUrl: p.behance_url,
      githubUrl: p.github_url,
      demoUrl: p.demo_url,
      downloadUrl: p.download_url,
      tags: p.tags
    })),
    testimonials: testimonials || [],
    achievements: achievements || [],
    blogs: (blogs || []).map((b: any) => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      category: b.category,
      tags: b.tags,
      coverImage: b.cover_image,
      date: b.date,
      readTime: b.read_time,
      published: b.published
    })),
    messages: messages || []
  };
}

export async function saveCmsData(newData: CmsData): Promise<CmsData> {
  // Use the service-role admin client so RLS does not block writes
  const supabase = createAdminClient();

  // 1. Update site_settings
  const { error: settingsError } = await supabase.from('site_settings').upsert({
    id: 1,
    hero: newData.hero,
    about: newData.about,
    seo: newData.seo,
    theme: newData.theme
  });
  if (settingsError) throw new Error(settingsError.message);

  // Helper for sync arrays
  async function syncTable(tableName: string, data: any[], formatFn?: (item: any) => any) {
    if (!data) return;
    const formattedData = formatFn ? data.map(formatFn) : data;
    
    // Upsert all new items
    if (formattedData.length > 0) {
      const { error } = await supabase.from(tableName).upsert(formattedData);
      if (error) {
        console.error(`Error upserting ${tableName}:`, error);
        throw new Error(error.message);
      }
    }

    // Delete removed items
    const { data: currentItems } = await supabase.from(tableName).select('id');
    const newIds = formattedData.map((i: any) => i.id);
    const toDelete = currentItems?.filter(i => !newIds.includes(i.id)) || [];
    
    if (toDelete.length > 0) {
      const deleteIds = toDelete.map(i => i.id);
      const { error } = await supabase.from(tableName).delete().in('id', deleteIds);
      if (error) {
        console.error(`Error deleting from ${tableName}:`, error);
        throw new Error(error.message);
      }
    }
  }

  await syncTable('experiences', newData.experiences);
  await syncTable('skills', newData.skills);
  await syncTable('software', newData.software, (s: any) => ({
    id: s.id,
    name: s.name,
    icon_url: s.iconUrl,
    level: s.level,
    color: s.color
  }));
  await syncTable('projects', newData.projects, (p: any) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    client: p.client,
    software_used: p.softwareUsed || [],
    date: p.date,
    featured: p.featured || false,
    thumbnail: p.thumbnail,
    images: p.images || [],
    video_url: p.videoUrl || null,
    behance_url: p.behanceUrl || null,
    github_url: p.githubUrl || null,
    demo_url: p.demoUrl || null,
    download_url: p.downloadUrl || null,
    tags: p.tags || []
  }));
  await syncTable('testimonials', newData.testimonials);
  await syncTable('achievements', newData.achievements);
  await syncTable('blogs', newData.blogs, (b: any) => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    content: b.content,
    category: b.category,
    tags: b.tags || [],
    cover_image: b.coverImage,
    date: b.date,
    read_time: b.readTime,
    published: b.published || false
  }));
  await syncTable('messages', newData.messages);

  return newData;
}
