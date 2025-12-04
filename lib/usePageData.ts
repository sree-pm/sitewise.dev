"use client";

import { useEffect, useState } from 'react';

type PageStore = Record<string, any> | null;

export default function usePageData() {
  const [data, setData] = useState<PageStore>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch('/data/pages.json');
        if (!res.ok) throw new Error(`Failed to fetch pages.json: ${res.status}`);
        const json = await res.json();
        if (mounted) setData(json);
      } catch (err: any) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error } as const;
}
import { useEffect, useState } from "react";

interface PageData {
  content: any[];
  root: any;
}

/**
 * Hook to load page data from GitHub
 * Falls back to localStorage if GitHub unavailable
 */
export function usePageData() {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Try to load from GitHub first
        try {
          const res = await fetch("/api/save-page", {
            cache: "no-store",
          });

          if (res.ok) {
            const { data: githubData } = await res.json();
            setData(githubData);
            console.log("✓ Loaded page data from GitHub");
            return;
          }
        } catch (err) {
          console.warn("Could not load from GitHub:", err);
        }

        // Fallback to localStorage
        const saved = localStorage.getItem("sitewise.puckData");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setData(parsed);
            console.log("✓ Loaded page data from localStorage");
            return;
          } catch (e) {
            console.warn("Failed to parse localStorage data:", e);
          }
        }

        // No data found, use empty default
        setData({ content: [], root: {} });
        console.log("ℹ No saved page data found, using defaults");
      } catch (err: any) {
        setError(err.message || "Failed to load page data");
        // Still set defaults on error
        setData({ content: [], root: {} });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
}
