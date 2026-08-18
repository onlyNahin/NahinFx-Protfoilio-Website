'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CMSManager from '@/components/admin/CMSManager';
import { CmsData } from '@/lib/db';
import { Sparkles } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [data, setData] = useState<CmsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('portfolio_admin_auth');
    if (!auth) {
      router.push('/admin_21/login');
      return;
    }

    // Fetch initial CMS data from API
    fetch(`/api/cms?t=${Date.now()}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load CMS data:', err);
        setLoading(false);
      });
  }, [router]);

  const handleSave = async (newData: CmsData) => {
    const res = await fetch('/api/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });
    const json = await res.json();
    if (json.success) {
      setData(json.data);
    } else {
      throw new Error(json.error || 'Failed to save data');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_auth');
    router.push('/admin_21/login');
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] flex flex-col items-center justify-center text-white">
        <Sparkles className="h-8 w-8 text-red-500 animate-spin mb-3" />
        <span className="text-sm font-extrabold tracking-widest uppercase">Loading Admin CMS...</span>
      </div>
    );
  }

  return <CMSManager initialData={data} onSave={handleSave} onLogout={handleLogout} />;
}
