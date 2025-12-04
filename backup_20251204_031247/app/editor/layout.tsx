import React from 'react';
import Link from 'next/link';

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-12">
      <aside className="col-span-3 md:col-span-2 border-r border-white/10 p-4">
        <div className="text-sm text-neutral-400 mb-4">Admin</div>
        <nav className="space-y-2">
          <Link href="/editor" className="block text-white">Dashboard</Link>
          <Link href="/editor/docs" className="block text-white">Docs</Link>
          <Link href="/editor/settings" className="block text-white">Settings</Link>
        </nav>
      </aside>
      <main className="col-span-9 md:col-span-10 p-6">{children}</main>
    </div>
  );
}
