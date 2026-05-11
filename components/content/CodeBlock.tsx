'use client';
// Code block with language tabs (Python / JavaScript / Java / C++).
// The selected tab index is local state — no need to lift it up.

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { CodeTab } from '@/types';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  tabs: CodeTab[];
}

export default function CodeBlock({ tabs }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(tabs[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (tabs.length === 0) return null;

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 my-5 bg-gray-950 shadow-sm">

      {/* ── Tab row ──────────────────────────────────────────────────── */}
      <div className="flex items-center bg-gray-900 border-b border-gray-800 px-1">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
            className={cn(
              'px-4 py-2.5 text-xs font-medium transition-colors focus-visible:outline-none',
              i === activeTab
                ? 'text-white border-b-2 border-brand-500'
                : 'text-gray-400 hover:text-gray-200',
            )}
          >
            {tab.label}
          </button>
        ))}

        {/* Copy button — right-aligned */}
        <button
          onClick={handleCopy}
          className="ml-auto mr-2 p-1.5 text-gray-400 hover:text-white transition-colors rounded"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      </div>

      {/* ── Code area ────────────────────────────────────────────────── */}
      <pre className="overflow-x-auto px-5 py-4 text-sm leading-6 text-gray-100 font-mono">
        <code>{tabs[activeTab].code}</code>
      </pre>

    </div>
  );
}