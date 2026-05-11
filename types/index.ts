// ─── Content Blocks ────────────────────────────────────────────────────────────
// A lesson is modeled as an ordered array of ContentBlocks — this makes it easy
// to render headings, paragraphs, code, images, and callouts uniformly.

export type ContentBlockType =
  | 'h1' | 'h2' | 'h3'
  | 'paragraph'
  | 'code'
  | 'image'
  | 'callout'
  | 'divider';

export interface CodeTab {
  label: string;  // e.g. "Python", "JavaScript"
  code: string;
}

export interface ContentBlock {
  type: ContentBlockType;
  // For h1/h2/h3/paragraph — supports **bold** markdown-lite syntax
  text?: string;
  // For code blocks — first tab is shown by default
  tabs?: CodeTab[];
  // For images
  src?: string;
  alt?: string;
  caption?: string;
  // For callouts
  variant?: 'info' | 'warning' | 'tip';
}

// ─── Course Data ───────────────────────────────────────────────────────────────

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  completed: boolean;
  isIntroduction?: boolean;
}

export interface Chapter {
  id: string;
  number: string;   // zero-padded: "01", "02" …
  title: string;
  slug: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  totalLessons: number;
  completedLessons: number;
  chapters: Chapter[];
}

// ─── Lesson Page ───────────────────────────────────────────────────────────────

export interface LessonLink {
  title: string;
  href: string;
}

export interface LessonPageData {
  title: string;
  courseTitle: string;
  courseSlug: string;
  chapterTitle: string;
  chapterSlug: string;
  content: ContentBlock[];
  prevLesson?: LessonLink;
  nextLesson?: LessonLink;
}