// Pure presentational component that turns a ContentBlock[] array into
// styled JSX. No state — just a clean render pipeline.

import { ContentBlock } from '@/types';
import CodeBlock from './CodeBlock';
import { cn } from '@/lib/utils';

interface LessonRendererProps {
  content: ContentBlock[];
}

export default function LessonRenderer({ content }: LessonRendererProps) {
  return (
    <article className="prose-content space-y-5">
      {content.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </article>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {

    case 'h2':
      return (
        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 first:mt-0">
          <InlineMarkdown text={block.text ?? ''} />
        </h2>
      );

    case 'h3':
      return (
        <h3 className="text-base font-semibold text-gray-900 mt-6 mb-3">
          <InlineMarkdown text={block.text ?? ''} />
        </h3>
      );

    case 'paragraph':
      return (
        <p className="text-[15px] leading-7 text-gray-700">
          <InlineMarkdown text={block.text ?? ''} />
        </p>
      );

    case 'code':
      return <CodeBlock tabs={block.tabs ?? []} />;

    case 'image':
      return (
        <figure className="my-6">
          {/* Using <img> directly for SVG compatibility — Next/Image doesn't
              support externally-hosted SVGs without special config */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt ?? ''}
            className="lesson-image w-full max-w-2xl mx-auto block"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="text-center text-xs text-gray-500 mt-2">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'callout':
      return (
        <div
          className={cn(
            'rounded-xl border-l-4 p-4 my-5 text-sm leading-7',
            block.variant === 'warning' && 'border-yellow-400 bg-yellow-50 text-yellow-900',
            block.variant === 'tip'     && 'border-green-400 bg-green-50 text-green-900',
            (!block.variant || block.variant === 'info')
              && 'border-brand-400 bg-brand-50 text-brand-900',
          )}
        >
          <InlineMarkdown text={block.text ?? ''} />
        </div>
      );

    case 'divider':
      return <hr className="border-gray-200 my-8" />;

    default:
      return null;
  }
}

// ─── Inline markdown parser ────────────────────────────────────────────────────
// Supports **bold** and `code` without pulling in a full markdown library.
// For production use, consider remark/rehype or react-markdown.

function InlineMarkdown({ text }: { text: string }) {
  // Split on **bold** and `code` patterns
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i}>{part.slice(1, -1)}</code>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}