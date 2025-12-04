"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function EditorSettings() {
  const { data: session } = useSession();
  const [stagingEnabled, setStagingEnabled] = useState(true);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="text-neutral-400 text-sm">Welcome {session?.user?.name || session?.user?.email}</div>
      <div className="rounded border border-white/10 p-4">
        <div className="text-sm text-neutral-400">Preview/Staging</div>
        <label className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            checked={stagingEnabled}
            onChange={(e) => setStagingEnabled(e.target.checked)}
          />
          <span>Enable staging previews</span>
        </label>
      </div>
    </div>
  );
}
