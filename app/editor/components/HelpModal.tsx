"use client";

import React, { useState } from "react";

export default function HelpModal() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="px-3 py-1 rounded bg-white text-black" onClick={() => setOpen(true)}>Help</button>
      {open && (
        <div className="fixed inset-0 bg-black/60 grid place-items-center">
          <div className="bg-neutral-900 border border-white/10 rounded p-6 w-[480px]">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Editor Shortcuts</h2>
              <button className="text-neutral-400" onClick={() => setOpen(false)}>Close</button>
            </div>
            <ul className="space-y-1 text-sm">
              <li><span className="text-neutral-400">Ctrl/Cmd + S:</span> Save page</li>
              <li><span className="text-neutral-400">Ctrl/Cmd + P:</span> Preview on staging</li>
              <li><span className="text-neutral-400">Ctrl/Cmd + Z:</span> Undo</li>
              <li><span className="text-neutral-400">Ctrl/Cmd + Shift + Z:</span> Redo</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
