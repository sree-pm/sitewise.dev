"use client";

import React from "react";
import { useSession } from "next-auth/react";

export default function EditorDocs() {
  const { data: session } = useSession();
  return (
    <div className="prose prose-invert max-w-none">
      <h1>Editor Docs</h1>
      <p>
        Welcome {session?.user?.name || "Editor"}. This panel explains how to use the JSON-driven blocks
        and the admin workflow.
      </p>
      <h2>Workflow</h2>
      <ul>
        <li>Sign in with GitHub to unlock admin tools.</li>
        <li>Edit page content using the block editor.</li>
        <li>Save changes to versioned JSON files.</li>
        <li>Preview changes on staging before publishing.</li>
      </ul>
    </div>
  );
}
