"use client";

import React from 'react';
import { puckBlocks as baseBlocks } from '@/components/puck-blocks';
import { puckBlocksExtended } from '@/components/puck-blocks/extended';

type Block = { type: string; props?: Record<string, any> };

const allBlocks: Record<string, any> = { ...(baseBlocks as Record<string, any>), ...(puckBlocksExtended as Record<string, any>) };

export default function PageRenderer({ blocks }: { blocks: Block[] }) {
  if (!blocks || !blocks.length) return null;

  return (
    <>
      {blocks.map((block, idx) => {
        const def = allBlocks[block.type];
        if (!def || typeof def.render !== 'function') {
          return (
            <div key={idx} className="py-12 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block px-3 py-2 rounded-md bg-red-600/10 text-red-300 border border-red-700">Missing block: {block.type}</div>
                <p className="mt-3 text-sm text-neutral-400">This block type is not registered in the renderer.</p>
              </div>
            </div>
          );
        }

        try {
          // Many puck block defs expose a `render` function that returns JSX
          return <React.Fragment key={idx}>{def.render(block.props || {})}</React.Fragment>;
        } catch (err) {
          return (
            <div key={idx} className="py-12 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block px-3 py-2 rounded-md bg-yellow-600/10 text-yellow-300 border border-yellow-700">Render error: {block.type}</div>
                <p className="mt-3 text-sm text-neutral-400">An error occurred while rendering this block.</p>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
