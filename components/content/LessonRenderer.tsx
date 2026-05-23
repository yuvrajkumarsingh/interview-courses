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
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'var(--prose)', fontWeight: 500 }}>
          <InlineMd text={block.text ?? ''} />
        </p>
      );

    case 'code':
      return <CodeBlock tabs={block.tabs ?? []} />;

    case 'example':
      return (
        <div style={{
          border: '1px solid var(--border)',
          borderRadius: 12,
          background: 'var(--example-bg)',
          padding: '20px 24px',
          margin: '2px 0 6px',
        }}>
          <pre style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            color: 'var(--example-text)',
            fontFamily: "'JetBrains Mono', Consolas, ui-monospace, monospace",
            fontSize: 14.5,
            lineHeight: 1.75,
            fontWeight: 700,
          }}>
            {(block.lines ?? []).join('\n')}
          </pre>
        </div>
      );

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
      const width = getDiagramWidth(block.diagramId);
      if (!DiagramComp) return null;
      return (
        <figure
          style={{
            margin: '16px auto 18px',
            padding: '2px 0',
            width: '100%',
            maxWidth: width,
          }}
        >
          <div style={{ width: '100%', margin: '0 auto' }}>
            <DiagramComp />
          </div>
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

    case 'list':
      return (
        <ul style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          paddingLeft: 22,
          color: 'var(--prose)',
          fontSize: 15.5,
          lineHeight: 1.7,
          fontWeight: 500,
        }}>
          {(block.items ?? []).map((item, i) => (
            <li key={i}>
              <InlineMd text={item} />
            </li>
          ))}
        </ul>
      );

    case 'table':
      return (
        <div style={{
          overflowX: 'auto',
          border: '1px solid var(--border)',
          borderRadius: 12,
          background: 'var(--surface-solid)',
          marginTop: 2,
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: 620,
            fontSize: 13.5,
            color: 'var(--text)',
          }}>
            <thead>
              <tr>
                {(block.table?.headers ?? []).map(header => (
                  <th
                    key={header}
                    style={{
                      textAlign: 'left',
                      padding: '13px 15px',
                      borderBottom: '1px solid var(--border)',
                      background: 'rgba(127,139,164,0.08)',
                      fontWeight: 800,
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(block.table?.rows ?? []).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      style={{
                        padding: '12px 15px',
                        borderBottom: rowIndex === (block.table?.rows.length ?? 0) - 1
                          ? 'none'
                          : '1px solid var(--border)',
                        color: cellIndex === 2 ? 'var(--muted)' : 'var(--text)',
                        lineHeight: 1.55,
                        verticalAlign: 'top',
                      }}
                    >
                      <InlineMd text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'divider':
      return <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '8px 0' }} />;

    default:
      return null;
  }
}

function getDiagramWidth(diagramId?: string) {
  switch (diagramId) {
    case 'pair-sum-start':
    case 'pair-sum-left':
    case 'pair-sum-left-again':
    case 'pair-sum-right':
    case 'pair-sum-found':
      return 575;
    case 'two-ptr-comparison':
      return 660;
    case 'two-ptr-outline':
      return 540;
    case 'two-ptr-inward':
    case 'two-ptr-unidirect':
      return 560;
    case 'two-ptr-staged':
      return 520;
    case 'two-ptr-single':
      return 430;
    case 'two-ptr-sorted':
    default:
      return 480;
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
