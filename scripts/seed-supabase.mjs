import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env file.")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Since we are running in mjs, we can't directly import db.ts easily without tsx
// We'll read the default data by compiling it or simply parsing cms_data.json
// Or we can just import db.ts using dynamic import if we run this with `tsx`

// But we can also just read `data/cms_data.json` directly!
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataPath = path.join(__dirname, '..', 'data', 'cms_data.json')

if (!fs.existsSync(dataPath)) {
  console.error("No cms_data.json found. Make sure the app has generated it or you have run it once.")
  process.exit(1)
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

async function seed() {
  console.log("Seeding data to Supabase...")

  // Experiences
  if (data.experiences && data.experiences.length > 0) {
    const { error } = await supabase.from('experiences').upsert(data.experiences)
    if (error) console.error("Error seeding experiences:", error)
    else console.log("Seeded experiences")
  }

  // Skills
  if (data.skills && data.skills.length > 0) {
    const { error } = await supabase.from('skills').upsert(data.skills)
    if (error) console.error("Error seeding skills:", error)
    else console.log("Seeded skills")
  }

  // Software
  if (data.software && data.software.length > 0) {
    const mapped = data.software.map((s) => ({
      id: s.id,
      name: s.name,
      icon_url: s.iconUrl,
      level: s.level,
      color: s.color,
    }))
    const { error } = await supabase.from('software').upsert(mapped)
    if (error) console.error("Error seeding software:", error)
    else console.log("Seeded software")
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    const mapped = data.projects.map((p) => ({
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
      video_url: p.videoUrl,
      behance_url: p.behanceUrl,
      github_url: p.githubUrl,
      demo_url: p.demoUrl,
      download_url: p.downloadUrl,
      tags: p.tags || [],
    }))
    const { error } = await supabase.from('projects').upsert(mapped)
    if (error) console.error("Error seeding projects:", error)
    else console.log("Seeded projects")
  }

  // Testimonials
  if (data.testimonials && data.testimonials.length > 0) {
    const { error } = await supabase.from('testimonials').upsert(data.testimonials)
    if (error) console.error("Error seeding testimonials:", error)
    else console.log("Seeded testimonials")
  }

  // Achievements
  if (data.achievements && data.achievements.length > 0) {
    const { error } = await supabase.from('achievements').upsert(data.achievements)
    if (error) console.error("Error seeding achievements:", error)
    else console.log("Seeded achievements")
  }

  // Blogs
  if (data.blogs && data.blogs.length > 0) {
    const mapped = data.blogs.map((b) => ({
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
      published: b.published || false,
    }))
    const { error } = await supabase.from('blogs').upsert(mapped)
    if (error) console.error("Error seeding blogs:", error)
    else console.log("Seeded blogs")
  }

  // Messages
  if (data.messages && data.messages.length > 0) {
    const { error } = await supabase.from('messages').upsert(data.messages)
    if (error) console.error("Error seeding messages:", error)
    else console.log("Seeded messages")
  }

  // Site Settings
  const settingsData = {
    id: 1,
    hero: data.hero || {},
    about: data.about || {},
    seo: data.seo || {},
    theme: data.theme || {},
  }
  const { error: settingsError } = await supabase.from('site_settings').upsert([settingsData])
  if (settingsError) console.error("Error seeding site_settings:", settingsError)
  else console.log("Seeded site_settings")

  console.log("Seeding complete!")
}

seed()
