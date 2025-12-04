"use client";

import React, { useEffect, useState } from "react";

interface Repo {
  name: string;
  owner: string;
  url: string;
  description?: string;
}

interface RepoSelectorProps {
  onSelectRepo: (owner: string, name: string) => void;
  onClose: () => void;
  initialData?: any;
}

export function RepoSelector({ onSelectRepo, onClose, initialData }: RepoSelectorProps) {
  const [mode, setMode] = useState<"choose" | "create">("choose");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [repoName, setRepoName] = useState("sitewise-site");
  const [error, setError] = useState<string | null>(null);

  // Load user repos
  useEffect(() => {
    const loadRepos = async () => {
      try {
        const res = await fetch("/api/repo/list");
        if (res.ok) {
          const data = await res.json();
          setRepos(data.repos || []);
        } else {
          setError("Failed to load repos");
        }
      } catch (err) {
        setError("Error loading repos");
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, []);

  const handleCreateRepo = async () => {
    if (!repoName.trim()) {
      setError("Please enter a repo name");
      return;
    }

    setCreating(true);
    setError(null);

    try {
      const res = await fetch("/api/repo/ensure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: repoName.trim(),
          initialData,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create repo");
      }

      const data = await res.json();
      onSelectRepo(data.owner, data.name);
    } catch (err: any) {
      setError(err.message || "Error creating repo");
    } finally {
      setCreating(false);
    }
  };

  const handleSelectExisting = (repo: Repo) => {
    onSelectRepo(repo.owner, repo.name);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 border border-white/20 rounded-lg max-w-2xl w-full max-h-96 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-neutral-900 border-b border-white/20 p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Select or Create Repository</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 text-red-300 rounded text-sm">
              {error}
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-white/10">
            <button
              onClick={() => setMode("choose")}
              className={`px-4 py-2 border-b-2 transition ${
                mode === "choose"
                  ? "border-brand-purple text-white"
                  : "border-transparent text-text-secondary hover:text-white"
              }`}
            >
              Use Existing
            </button>
            <button
              onClick={() => setMode("create")}
              className={`px-4 py-2 border-b-2 transition ${
                mode === "create"
                  ? "border-brand-purple text-white"
                  : "border-transparent text-text-secondary hover:text-white"
              }`}
            >
              Create New
            </button>
          </div>

          {/* Choose existing repos */}
          {mode === "choose" && (
            <div>
              {loading ? (
                <div className="text-center text-text-secondary py-8">Loading repos...</div>
              ) : repos.length === 0 ? (
                <div className="text-center text-text-secondary py-8">No repos found. Create a new one.</div>
              ) : (
                <div className="space-y-2">
                  {repos.map((repo) => (
                    <button
                      key={`${repo.owner}/${repo.name}`}
                      onClick={() => handleSelectExisting(repo)}
                      className="w-full text-left p-3 rounded border border-white/10 hover:border-brand-purple/50 hover:bg-brand-purple/5 transition"
                    >
                      <div className="font-semibold text-white">
                        {repo.owner}/{repo.name}
                      </div>
                      {repo.description && (
                        <div className="text-xs text-text-secondary mt-1">{repo.description}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Create new repo */}
          {mode === "create" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Repository Name</label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="sitewise-site"
                  className="w-full px-3 py-2 bg-neutral-800 border border-white/20 rounded text-white placeholder-white/40 text-sm"
                />
                <div className="text-xs text-text-secondary mt-1">
                  Will be created from the sitewise.dev template repo
                </div>
              </div>

              <button
                onClick={handleCreateRepo}
                disabled={creating}
                className="w-full px-4 py-2 bg-brand-purple text-white rounded font-semibold hover:bg-brand-purple/90 disabled:opacity-50 transition"
              >
                {creating ? "Creating..." : "Create Repository"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
