-- Temporarily disable RLS so our seed script can insert data using the anon key
ALTER TABLE public.experiences DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.software DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings DISABLE ROW LEVEL SECURITY;
