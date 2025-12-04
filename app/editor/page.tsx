"use client";

import React, { useEffect, useState } from "react";
import PuckEditor from "@/app/editor/integrations/puck";
import { RepoSelector } from "@/app/editor/components/RepoSelector";

export default function EditorPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [repoInfo, setRepoInfo] = useState<{ owner: string; name: string; html_url: string } | null>(null);
  const [showRepoSelector, setShowRepoSelector] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchMe();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    setShowRepoSelector(true);
  }, [user]);

  const handleSelectRepo = (owner: string, name: string) => {
    setRepoInfo({ owner, name, html_url: `https://github.com/${owner}/${name}` });
    setShowRepoSelector(false);
  };

  if (loading) return <div className="p-6">Loading editor...</div>;

  if (showRepoSelector && user) {
    const localData = typeof window !== "undefined" ? localStorage.getItem("sitewise.puckData") : null;
    const initialData = localData ? JSON.parse(localData) : undefined;
    return <RepoSelector onSelectRepo={handleSelectRepo} onClose={() => setShowRepoSelector(false)} initialData={initialData} />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl w-full text-center bg-neutral-900 border border-white/10 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Sign in to edit</h2>
          <p className="text-sm text-text-secondary mb-6">You must sign in with GitHub to access the editor and commit changes to your repository.</p>
          <a
            href="/api/auth/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-purple text-white rounded-lg font-semibold hover:bg-brand-purple/90"
          >
            Sign in with GitHub
          </a>
        </div>
      </div>
    );
  }

  return <PuckEditor />;
}
