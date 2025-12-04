"use client";

import React, { useEffect, useState } from "react";
import PuckEditor from "@/components/integrations/puck";
import { RepoSelector } from "@/components/repo-selector";

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
    // When user becomes available, show repo selector instead of auto-creating
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
"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import HelpModal from "./components/DynamicHelpModal";

export default function EditorHome() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [versions, setVersions] = useState<Array<{ id: string; timestamp: number }>>([]);

  async function refreshVersions() {
    const res = await fetch("/api/versions/home");
    const json = await res.json();
    setVersions(json.versions || []);
  }

  useEffect(() => {
    async function check() {
      if (!session) return;
      const res = await fetch("/api/admin-status");
      const json = await res.json();
      setIsAdmin(Boolean(json.isAdmin));
      await refreshVersions();
    }
    check();
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold mb-2">Admin Editor</h1>
        <p className="text-neutral-400 mb-4">
          Sign in with GitHub to access the admin editor.
        </p>
        <button
          className="px-4 py-2 rounded bg-white text-black"
          onClick={() => signIn("github")}
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <HelpModal />
          <button
            className="px-4 py-2 rounded bg-white text-black"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="rounded border border-white/10 p-4">
        <div className="text-sm text-neutral-400">Status</div>
        <div className="mt-2">
          <div className="text-white">Signed in as {session.user?.name || session.user?.email}</div>
          <div className="text-neutral-400 text-sm">GitHub OAuth successful</div>
          {isAdmin === null && <div className="text-neutral-400 text-sm">Verifying admin…</div>}
          {isAdmin === false && (
            <div className="text-red-400 text-sm">Not an admin. Ensure this repo is a fork of the template or you have push access.</div>
          )}
          {isAdmin === true && (
            <div className="text-green-400 text-sm">Admin verified</div>
          )}
        </div>
      </div>

      <div className="rounded border border-white/10 p-4">
        <div className="text-sm text-neutral-400">Quick Links</div>
        <ul className="mt-2 list-disc list-inside">
          <li>
            <Link href="/editor/docs" className="text-white underline">Inline Docs</Link>
          </li>
          <li>
            <Link href="/editor/settings" className="text-white underline">Settings</Link>
          </li>
        </ul>
      </div>

      {isAdmin ? (
        <div className="rounded border border-white/10 p-4">
          <div className="text-sm text-neutral-400">Editor</div>
          <div className="mt-2 text-white">Puck editor surface goes here.</div>
        </div>
      ) : (
        <div className="rounded border border-white/10 p-4">
          <div className="text-sm text-neutral-400">Editor</div>
          <div className="mt-2 text-neutral-400">You need admin access to use the editor.</div>
        </div>
      )}

      {isAdmin && (
        <div className="rounded border border-white/10 p-4">
          <div className="text-sm text-neutral-400">Version History</div>
          <div className="mt-2">
            {versions.length === 0 ? (
              <div className="text-neutral-400">No versions yet.</div>
            ) : (
              <ul className="space-y-1">
                {versions.map(v => (
                  <li key={v.id} className="flex items-center justify-between">
                    <span className="text-sm text-white">{new Date(v.timestamp).toLocaleString()}</span>
                    <button
                      className="px-2 py-1 rounded bg-white text-black text-sm"
                      onClick={async () => {
                        await fetch("/api/versions-github/home", {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ versionId: v.id })
                        });
                        await refreshVersions();
                      }}
                    >
                      Rollback
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
