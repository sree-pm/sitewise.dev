"use client";

import React, { useEffect, useState } from "react";
import { Puck, Config, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { puckBlocks } from "@/app/editor/blocks";
import { puckBlocksExtended } from "@/app/editor/blocks/extended";

// Design tokens mapped to Puck components for WYSIWYG editing
const puckConfig: Config = {
  // @ts-ignore - Puck field types are complex, runtime works correctly
  components: {
    // ========== COMPREHENSIVE PUCK BLOCKS (12 BLOCK TYPES) ==========
    ...puckBlocks,
    ...puckBlocksExtended,

    // ========== LEGACY SUPPORT ==========
    TextSection: {
      fields: {
        title: { type: "text" as const },
        content: { type: "textarea" as const },
        align: {
          type: "select" as const,
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
      defaultProps: {
        title: "Section Title",
        content: "Section content goes here",
        align: "center",
      },
      render: ({ title, content, align }) => (
        <div className={`py-24 px-6 text-${align}`}>
          <h2 className="text-4xl font-black text-white mb-4">{title}</h2>
          <p className="text-lg text-text-secondary">{content}</p>
        </div>
      ),
    },

    CardGrid: {
      fields: {
        title: { type: "text" },
        cards: {
          type: "array",
          arrayFields: {
            cardTitle: { type: "text" },
            cardDesc: { type: "textarea" },
            icon: { type: "text" },
          },
        },
      },
      defaultProps: {
        title: "Features",
        cards: [
          { cardTitle: "Feature 1", cardDesc: "Description", icon: "⚡" },
          { cardTitle: "Feature 2", cardDesc: "Description", icon: "🔒" },
        ],
      },
      render: ({ title, cards }) => (
        <div className="py-24 px-6">
          <h2 className="text-4xl font-black text-white mb-12 text-center">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {cards?.map((card: any, i: number) => (
              <div key={i} className="bg-glass-light/30 border border-white/8 rounded-xl p-6">
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{card.cardTitle}</h3>
                <p className="text-sm text-text-secondary">{card.cardDesc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    CTAButton: {
      fields: {
        label: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Primary (Glow)", value: "glow" },
            { label: "Secondary (Outline)", value: "outline" },
          ],
        },
        url: { type: "text" },
      },
      defaultProps: {
        label: "Click me",
        variant: "glow",
        url: "#",
      },
      render: ({ label, variant, url }) => (
        <div className="py-8 text-center">
          <a
            href={url}
            className={`px-8 py-3 font-bold rounded-lg inline-block ${
              variant === "glow"
                ? "bg-gradient-to-br from-brand-purple to-brand-blue text-white shadow-lg"
                : "border-2 border-brand-purple text-brand-purple hover:bg-brand-purple/10"
            }`}
          >
            {label}
          </a>
        </div>
      ),
    },

    Spacer: {
      fields: {
        height: {
          type: "select",
          options: [
            { label: "Small (16px)", value: "16" },
            { label: "Medium (32px)", value: "32" },
            { label: "Large (64px)", value: "64" },
            { label: "Extra Large (96px)", value: "96" },
          ],
        },
      },
      defaultProps: {
        height: "32",
      },
      render: ({ height }) => <div style={{ height: `${height}px` }} />,
    },
  },
};

export function PuckEditor({ repoOwner, repoName, onChangeRepo }: { repoOwner?: string; repoName?: string; onChangeRepo?: () => void }) {
  const [data, setData] = useState<Data>({
    content: [],
    root: {},
  });
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("Update page content");
  const [commitMsg, setCommitMsg] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Try to load from GitHub first, fallback to localStorage
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      // Try GitHub first; if repoOwner/repoName provided, fetch from that repo
      const query = repoOwner && repoName ? `?owner=${encodeURIComponent(repoOwner)}&repo=${encodeURIComponent(repoName)}` : "";
      const res = await fetch(`/api/save-page${query}`);
      if (res.ok) {
        const { data: githubData } = await res.json();
        setData(githubData);
        console.log("✓ Loaded page data from GitHub");
        return;
      }
    } catch (err) {
      console.warn("Could not load from GitHub, trying localStorage...");
    }

    // Fallback to localStorage
    const saved = localStorage.getItem("sitewise.puckData");
    if (saved) {
      try {
        setData(JSON.parse(saved));
        console.log("✓ Loaded page data from localStorage");
      } catch (e) {
        console.warn("Failed to load saved Puck data", e);
      }
    }
  };

  const handleSaveLocal = (updatedData: Data) => {
    setData(updatedData);
    // Save to localStorage
    localStorage.setItem("sitewise.puckData", JSON.stringify(updatedData));
    console.log("✓ Page saved to localStorage");
  };

  const handleSaveToGitHub = async () => {
    if (!message.trim()) {
      alert("Please enter a commit message");
      return;
    }

    setSaving(true);
    setCommitMsg(null);

    try {
      const body: any = {
        pageData: data,
        message: message.trim(),
      };
      if (repoOwner && repoName) {
        body.owner = repoOwner;
        body.repo = repoName;
      }

      const res = await fetch("/api/save-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save to GitHub");
      }

      const result = await res.json();
      setCommitMsg(`✓ Committed to GitHub! ${result.url}`);
      console.log("✓ Page saved to GitHub:", result.url);
      alert(`Saved to GitHub!\nCommit: ${result.commit}\n\nGitHub Actions will rebuild the site automatically.`);
    } catch (err: any) {
      const errMsg = err.message || "Unknown error";
      setCommitMsg(`✗ Error: ${errMsg}`);
      console.error("Error saving to GitHub:", err);
      alert(`Failed to save to GitHub:\n${errMsg}\n\nMake sure GITHUB_TOKEN env var is set.`);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sitewise-page-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setData(imported);
        localStorage.setItem("sitewise.puckData", JSON.stringify(imported));
        alert("✓ Page data imported successfully!");
      } catch (err) {
        alert("Failed to import JSON file. Make sure it's valid Puck data.");
      }
    };
    reader.readAsText(file);
  };

  if (!mounted) return null;

  return (
    <div className="relative w-full">
      {/* Puck Editor */}
      <div className="fixed inset-0 z-50 bg-black">
        <div className="flex flex-col bg-neutral-900 border-b border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-bold text-white">sitewise.dev Page Editor (Puck)</h1>
            <div className="flex gap-2">
              {repoOwner && repoName && onChangeRepo && (
                <button
                  onClick={onChangeRepo}
                  className="px-3 py-2 bg-blue-600 text-white rounded text-sm font-semibold hover:bg-blue-700"
                >
                  📁 Change Repo
                </button>
              )}
              <button
                onClick={() => window.location.href = "/"}
                className="px-4 py-2 bg-neutral-700 text-white rounded font-semibold hover:bg-neutral-600"
              >
                Close Editor
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 px-6 py-3 border-t border-white/10 bg-neutral-950">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Commit message..."
              className="flex-1 min-w-[300px] px-3 py-2 bg-neutral-800 border border-white/20 rounded text-white text-sm"
            />
            <button
              onClick={handleSaveToGitHub}
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "💾 Commit to GitHub"}
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
            >
              📥 Export JSON
            </button>
            <label className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 cursor-pointer">
              📤 Import JSON
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>

          {/* Status Message */}
          {commitMsg && (
            <div className="px-6 py-2 text-sm text-white bg-neutral-800 border-t border-white/10">
              {commitMsg}
            </div>
          )}
        </div>

        <div className="h-[calc(100vh-140px)] overflow-auto">
          <Puck config={puckConfig} data={data} onPublish={handleSaveLocal} />
        </div>
      </div>
    </div>
  );
}

export default PuckEditor;

