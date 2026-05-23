'use client';
import { useState, type ReactNode } from 'react';
import { Copy, Check, Play, ExternalLink } from 'lucide-react';
import { CodeTab } from '@/types';

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

function getRunnerTooltip(label: string): string {
  if (label === 'Python') {
    return 'Opens Python Tutor with this code pre-loaded and copied to your clipboard.';
  }
  return `Copies this ${label} code, then opens OneCompiler. Paste it into the editor if needed.`;
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

  async function handleRun() {
    try {
      await navigator.clipboard.writeText(currentTab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Opening the runner is still useful if clipboard permission is denied.
    }
    window.open(runnerUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <div style={{
      borderRadius: 16,
      overflow: 'hidden',
      border: '1px solid rgba(148,163,184,0.18)',
      marginTop: 4,
      marginBottom: 4,
      background: '#0b111c',
      boxShadow: '0 8px 26px rgba(0,0,0,0.22)',
    }}>

      {/* ── Tab row ──────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#151d2a',
        borderBottom: '1px solid rgba(148,163,184,0.15)',
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
        padding: '18px 24px',
        margin: 0,
        fontSize: 13.75,
        lineHeight: 1.72,
        color: '#f2f6fc',
        fontFamily: "'JetBrains Mono', Consolas, 'Courier New', monospace",
        background: 'transparent',
      }}>
        <code style={{ fontFamily: 'inherit', whiteSpace: 'pre' }}>
          <HighlightedCode code={currentTab.code} language={currentTab.label} />
        </code>
      </pre>

      {/* ── Platform attribution bar ──────────────────────────────────────── */}
      <div style={{
        padding: '7px 24px',
        background: '#151d2a',
        borderTop: '1px solid rgba(148,163,184,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 11,
        color: '#7f8ea3',
      }}>
        <span>
          {isPython ? 'Code will be pre-loaded and copied' : 'Code is copied before OneCompiler opens'}
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

type TokenKind = 'plain' | 'comment' | 'keyword' | 'string' | 'number' | 'function' | 'type';

const TOKEN_COLOR: Record<TokenKind, string> = {
  plain: '#f2f6fc',
  comment: '#98a6ba',
  keyword: '#ff7b72',
  string: '#9ddcff',
  number: '#8ecbff',
  function: '#d2a8ff',
  type: '#ffb86b',
};

const KEYWORDS: Record<string, Set<string>> = {
  Python: new Set([
    'def', 'return', 'for', 'in', 'range', 'if', 'elif', 'else', 'while', 'from', 'import',
    'class', 'None', 'True', 'False', 'and', 'or', 'not',
  ]),
  JavaScript: new Set([
    'function', 'const', 'let', 'var', 'return', 'for', 'if', 'else', 'while', 'class',
    'new', 'true', 'false', 'null', 'undefined',
  ]),
  Java: new Set([
    'public', 'private', 'static', 'class', 'int', 'return', 'for', 'if', 'else', 'while',
    'new', 'true', 'false', 'void',
  ]),
  'C++': new Set([
    'vector', 'int', 'return', 'for', 'if', 'else', 'while', 'true', 'false', 'auto',
    'const', 'size_t',
  ]),
};

const TYPE_WORDS = new Set(['List', 'Array', 'String', 'Integer', 'vector', 'int', 'boolean', 'bool']);

function HighlightedCode({ code, language }: { code: string; language: string }) {
  const lines = code.split('\n');

  return (
    <>
      {lines.map((line, index) => (
        <span key={index}>
          {highlightLine(line, language)}
          {index < lines.length - 1 ? '\n' : null}
        </span>
      ))}
    </>
  );
}

function highlightLine(line: string, language: string): ReactNode[] {
  const commentStart = findCommentStart(line, language);
  if (commentStart >= 0) {
    return [
      ...highlightCodePart(line.slice(0, commentStart), language, 'code'),
      token(line.slice(commentStart), 'comment', `comment-${commentStart}`),
    ];
  }

  return highlightCodePart(line, language, 'code');
}

function findCommentStart(line: string, language: string) {
  if (language === 'Python') return line.indexOf('#');
  return line.indexOf('//');
}

function highlightCodePart(text: string, language: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+\b|\b[A-Za-z_]\w*\b)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(token(text.slice(lastIndex, match.index), 'plain', `${keyPrefix}-plain-${lastIndex}`));
    }

    const value = match[0];
    parts.push(token(value, classifyToken(value, text, match.index, language), `${keyPrefix}-tok-${match.index}`));
    lastIndex = match.index + value.length;
  }

  if (lastIndex < text.length) {
    parts.push(token(text.slice(lastIndex), 'plain', `${keyPrefix}-plain-${lastIndex}`));
  }

  return parts;
}

function classifyToken(value: string, source: string, index: number, language: string): TokenKind {
  if (/^["'`]/.test(value)) return 'string';
  if (/^\d+$/.test(value)) return 'number';
  if (KEYWORDS[language]?.has(value)) return 'keyword';
  if (TYPE_WORDS.has(value)) return 'type';

  const next = source.slice(index + value.length).match(/^\s*\(/);
  return next ? 'function' : 'plain';
}

function token(text: string, kind: TokenKind, key: string) {
  if (!text) return null;
  return (
    <span key={key} style={{ color: TOKEN_COLOR[kind] }}>
      {text}
    </span>
  );
}
