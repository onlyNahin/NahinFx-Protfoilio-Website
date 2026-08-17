-- Create schema for portfolio

CREATE TABLE public.experiences (
  id text PRIMARY KEY,
  company text NOT NULL,
  role text NOT NULL,
  year text NOT NULL,
  description text NOT NULL,
  logo text
);

CREATE TABLE public.skills (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  percentage integer NOT NULL,
  icon text NOT NULL
);

CREATE TABLE public.software (
  id text PRIMARY KEY,
  name text NOT NULL,
  icon_url text NOT NULL,
  level text NOT NULL,
  color text NOT NULL
);

CREATE TABLE public.projects (
  id text PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  client text NOT NULL,
  software_used text[] NOT NULL DEFAULT '{}',
  date text NOT NULL,
  featured boolean NOT NULL DEFAULT false,
  thumbnail text NOT NULL,
  images text[] NOT NULL DEFAULT '{}',
  video_url text,
  behance_url text,
  github_url text,
  demo_url text,
  download_url text,
  tags text[] NOT NULL DEFAULT '{}'
);

CREATE TABLE public.testimonials (
  id text PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  avatar text NOT NULL,
  rating integer NOT NULL,
  content text NOT NULL
);

CREATE TABLE public.achievements (
  id text PRIMARY KEY,
  title text NOT NULL,
  number text NOT NULL,
  suffix text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL
);

CREATE TABLE public.blogs (
  id text PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  cover_image text NOT NULL,
  date text NOT NULL,
  read_time text NOT NULL,
  published boolean NOT NULL DEFAULT false
);

CREATE TABLE public.messages (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  date text NOT NULL,
  read boolean NOT NULL DEFAULT false
);

CREATE TABLE public.site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  hero jsonb NOT NULL DEFAULT '{}'::jsonb,
  about jsonb NOT NULL DEFAULT '{}'::jsonb,
  seo jsonb NOT NULL DEFAULT '{}'::jsonb,
  theme jsonb NOT NULL DEFAULT '{}'::jsonb,
  CONSTRAINT site_settings_single_row CHECK (id = 1)
);

-- Setup RLS (Row Level Security)
-- For a public portfolio, everything is generally readable by everyone.
-- Only authenticated users (you) should be able to write/update.

ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.software ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create read policies for public (anon) users
CREATE POLICY "Public profiles are viewable by everyone." ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public skills are viewable by everyone." ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public software are viewable by everyone." ON public.software FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone." ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public testimonials are viewable by everyone." ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public achievements are viewable by everyone." ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public blogs are viewable by everyone." ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Public site_settings are viewable by everyone." ON public.site_settings FOR SELECT USING (true);
-- Messages are typically private
CREATE POLICY "Messages can be inserted by anyone." ON public.messages FOR INSERT WITH CHECK (true);

-- Authenticated users (the admin) can do all operations
CREATE POLICY "Authenticated users have full access to experiences." ON public.experiences FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users have full access to skills." ON public.skills FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users have full access to software." ON public.software FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users have full access to projects." ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users have full access to testimonials." ON public.testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users have full access to achievements." ON public.achievements FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users have full access to blogs." ON public.blogs FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users have full access to messages." ON public.messages FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users have full access to site_settings." ON public.site_settings FOR ALL TO authenticated USING (true);
