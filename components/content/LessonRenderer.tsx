import { ContentBlock } from '@/types';
import CodeBlock from './CodeBlock';
import { DIAGRAMS } from '@/components/diagrams';

export default function LessonRenderer({ content }: { content: ContentBlock[] }) {
  return (
    <article className="prose-content" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {content.map((block, i) => <Block key={i} block={block} />)}
    </article>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 style={{
          fontSize: 20, fontWeight: 800,
          letterSpacing: '-0.04em',
          color: 'var(--text)',
          marginTop: 24, marginBottom: 4,
          paddingBottom: 10,
          borderBottom: '1px solid var(--border)',
        }}>
          <InlineMd text={block.text ?? ''} />
        </h2>
      );

    case 'h3':
      return (
        <h3 style={{
          fontSize: 15.5, fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          marginTop: 12,
        }}>
          <InlineMd text={block.text ?? ''} />
        </h3>
      );

    case 'paragraph':
      return (
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--muted)', fontWeight: 500 }}>
          <InlineMd text={block.text ?? ''} />
        </p>
      );

    case 'code':
      return <CodeBlock tabs={block.tabs ?? []} />;

    case 'image':
      return (
        <figure style={{ margin: '24px 0', textAlign: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt ?? ''}
            loading="lazy"
            style={{
              display: 'block',
              margin: '0 auto',
              width: '100%',
              maxWidth: 580,
              height: 'auto',
              borderRadius: 14,
              border: '1px solid var(--border)',
              background: '#ffffff',     // SVGs need white bg in dark mode
              padding: '12px',
            }}
          />
          {block.caption && (
            <figcaption style={{
              textAlign: 'center', fontSize: 12,
              color: 'var(--muted)', marginTop: 10,
              fontStyle: 'italic',
            }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'diagram': {
      const DiagramComp = DIAGRAMS[block.diagramId ?? ''];
      if (!DiagramComp) return null;
      return (
        /*
          No maxWidth constraint — let the diagram fill the glass card width.
          The SVG viewBox handles internal proportions; the wider it renders,
          the larger and more readable all text + arrows become automatically.
          No tinted background — diagrams sit directly on the card surface.
        */
        <figure style={{ margin: '28px 0', padding: '4px 0' }}>
          <DiagramComp />
          {block.caption && (
            <figcaption style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'var(--muted)',
              marginTop: 10,
              fontStyle: 'italic',
              fontFamily: 'Inter, sans-serif',
            }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }
    
    case 'callout': {
      const colors = {
        warning: { border: 'var(--warning)', bg: 'rgba(255,184,77,0.08)', text: '#b8860b' },
        tip:     { border: 'var(--accent)',  bg: 'rgba(24,199,161,0.08)',  text: '#0e8a70' },
        info:    { border: 'var(--primary)', bg: 'rgba(109,93,252,0.07)', text: 'var(--primary)' },
      };
      const c = colors[block.variant ?? 'info'];
      return (
        <div style={{
          borderLeft: `4px solid ${c.border}`,
          background: c.bg,
          borderRadius: '0 14px 14px 0',
          padding: '14px 18px',
          fontSize: 14, lineHeight: 1.7,
          color: 'var(--muted)',
        }}>
          <InlineMd text={block.text ?? ''} />
        </div>
      );
    }

    case 'divider':
      return <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '8px 0' }} />;

    default:
      return null;
  }
}

/* ─── Inline markdown: **bold** and `code` ───────────────────────────────── */
function InlineMd({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith('`') && part.endsWith('`'))
          return <code key={i}>{part.slice(1, -1)}</code>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}