'use client';
import { useState } from 'react';
import { Copy, Check, Play, ExternalLink } from 'lucide-react';
import { CodeTab } from '@/types';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  tabs: CodeTab[];
}

// ─── Platform routing ──────────────────────────────────────────────────────────
//
// Python  → Python Tutor  (pythontutor.com)
//   ✅ Pre-populates the code via URL hash — user lands ready to step through it
//   ✅ Shows variable state at each step — great for learning
//   ✅ Free, no login required
//
// JS/Java/C++ → OneCompiler  (onecompiler.com)
//   ✅ Free, no login, clean UI
//   ✅ Supports all four languages
//   ⚠️  Code pre-population via URL not supported — user pastes manually
//      (noted in the tooltip so they aren't surprised)

function getRunnerUrl(label: string, code: string): string {
  if (label === 'Python') {
    // Python Tutor accepts code in the URL hash — encodeURIComponent is correct here
    const encoded = encodeURIComponent(code);
    return (
      `https://pythontutor.com/render.html#code=${encoded}` +
      `&cumulative=false&heapPrimitives=nevernest&mode=display` +
      `&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false`
    );
  }

  const langMap: Record<string, string> = {
    JavaScript: 'javascript',
    Java:       'java',
    'C++':      'cpp',
  };
  const lang = langMap[label] ?? 'python3';
  return `https://onecompiler.com/${lang}`;
}

function getRunnerName(label: string): string {
  return label === 'Python' ? 'Python Tutor' : 'OneCompiler';
}

// For non-Python languages, warn the user they'll need to paste the code
function getRunnerTooltip(label: string): string {
  if (label === 'Python') {
    return 'Opens Python Tutor with this code pre-loaded. Step through execution line by line.';
  }
  return `Opens OneCompiler (${label}). Copy the code above and paste it there to run.`;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function CodeBlock({ tabs }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied,    setCopied]    = useState(false);
  const [showTip,   setShowTip]   = useState(false);

  if (tabs.length === 0) return null;

  const currentTab  = tabs[activeTab];
  const runnerUrl   = getRunnerUrl(currentTab.label, currentTab.code);
  const runnerName  = getRunnerName(currentTab.label);
  const runnerTip   = getRunnerTooltip(currentTab.label);
  const isPython    = currentTab.label === 'Python';

  async function handleCopy() {
    await navigator.clipboard.writeText(currentTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleRun() {
    window.open(runnerUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <div style={{
      borderRadius: 16,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      marginTop: 4,
      marginBottom: 4,
      background: '#0d1117',
      boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
    }}>

      {/* ── Tab row ──────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#161b22',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '0 4px',
        gap: 2,
      }}>
        {/* Language tabs */}
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
            style={{
              padding: '10px 16px',
              fontSize: 13,
              fontWeight: 600,
              background: 'transparent',
              color: i === activeTab ? '#fff' : '#8b949e',
              borderBottom: i === activeTab
                ? '2px solid var(--primary)'
                : '2px solid transparent',
              transition: 'color 200ms, border-color 200ms',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}

        {/* ── Right-side actions ─────────────────────────────────────────── */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, paddingRight: 10 }}>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            title="Copy code"
            style={actionBtnStyle}
          >
            {copied
              ? <Check   size={14} style={{ color: '#3fb950' }} />
              : <Copy    size={14} />
            }
          </button>

          {/* Run Code button — with tooltip */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
          >
            <button
              onClick={handleRun}
              title={runnerTip}
              style={{
                ...actionBtnStyle,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 12px',
                borderRadius: 8,
                background: isPython
                  ? 'rgba(109, 93, 252, 0.18)'   // purple for Python Tutor
                  : 'rgba(24, 199, 161, 0.15)',   // teal for OneCompiler
                color: isPython ? 'var(--primary-2)' : 'var(--accent)',
                fontSize: 12,
                fontWeight: 700,
                border: `1px solid ${isPython ? 'rgba(109,93,252,0.25)' : 'rgba(24,199,161,0.22)'}`,
              }}
            >
              <Play size={12} style={{ flexShrink: 0 }} />
              Run
              <ExternalLink size={11} style={{ opacity: 0.7, flexShrink: 0 }} />
            </button>

            {/* Hover tooltip */}
            {showTip && (
              <div style={{
                position: 'absolute',
                bottom: 'calc(100% + 8px)',
                right: 0,
                width: 240,
                padding: '10px 14px',
                borderRadius: 10,
                background: '#1c2128',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                fontSize: 12,
                lineHeight: 1.55,
                color: '#cdd9e5',
                zIndex: 50,
                pointerEvents: 'none',
                whiteSpace: 'normal',
              }}>
                <div style={{ fontWeight: 700, marginBottom: 4, color: '#fff' }}>
                  Opens {runnerName} ↗
                </div>
                {runnerTip}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Code area ────────────────────────────────────────────────────── */}
      <pre style={{
        overflowX: 'auto',
        padding: '20px 24px',
        margin: 0,
        fontSize: 13.5,
        lineHeight: 1.7,
        color: '#e6edf3',
        fontFamily: "'JetBrains Mono', Consolas, 'Courier New', monospace",
        background: 'transparent',
      }}>
        <code style={{ fontFamily: 'inherit' }}>{currentTab.code}</code>
      </pre>

      {/* ── Platform attribution bar ──────────────────────────────────────── */}
      <div style={{
        padding: '8px 24px',
        background: '#161b22',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 11,
        color: '#484f58',
      }}>
        <span>
          {isPython ? '💡 Code will be pre-loaded in Python Tutor' : '💡 Copy code before opening OneCompiler'}
        </span>
        <button
          onClick={handleRun}
          style={{
            background: 'transparent',
            color: isPython ? '#7c6fcd' : '#3ab7a0',
            fontSize: 11,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: 0,
          }}
        >
          Try it on {runnerName} <ExternalLink size={10} />
        </button>
      </div>
    </div>
  );
}

const actionBtnStyle: React.CSSProperties = {
  background: 'transparent',
  color: '#8b949e',
  cursor: 'pointer',
  display: 'grid',
  placeItems: 'center',
  padding: 6,
  borderRadius: 6,
  transition: 'color 200ms, background 200ms',
  border: 'none',
};