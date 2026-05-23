# Interview Courses — Context Handoff Document
> Last updated: May 2026 | Status: MVP In Progress

---

## 1. PROJECT OVERVIEW

### What it is
A full-stack web application that replicates the UX/design of ByteByteGo's course platform (bytebytego.com/courses), rebranded as **"Interview Courses"**. It is a self-hosted, open-source coding interview preparation platform where users can navigate structured course content (chapters → lessons), read educational material with inline diagrams and code examples, and run code snippets against external online compilers.

### What it does (user journey)
1. User lands on `/` → immediately redirects to the first lesson (`/courses/coding-patterns/two-pointers/introduction-to-two-pointers`)
2. A floating glassmorphism sidebar on the left shows all 19 chapters of "Coding Interview Patterns"
3. Clicking a chapter expands it to reveal its lessons
4. Clicking a lesson loads that lesson's content in the main area without re-mounting the sidebar
5. Lesson content contains headings, paragraphs, inline SVG diagrams, multi-language code blocks, and callout boxes
6. Code blocks have a "Run" button that redirects to Python Tutor (Python) or OneCompiler (JS/Java/C++) with the code pre-loaded
7. Bottom of each lesson has Prev/Next navigation
8. A theme toggle (sun/moon icon) switches between dark and light mode, persisted to localStorage

### Problem it solves
ByteByteGo charges ~$79/year. This project aims to be a free, self-hostable alternative for the same structured coding interview preparation content.

### Target users
- Software engineers preparing for technical interviews
- Self-taught developers learning algorithms and data structures
- Students who want a structured, visual approach to coding patterns

### Current stage
**MVP — partially content-complete.** The full UI, routing, theming, diagrams, and code runner are working. However, only **one lesson has actual content** ("Introduction to Two Pointers"). All other 119 lessons show a "Coming Soon" placeholder. No auth, no backend, no user progress persistence.

---

## 2. TECH STACK & ENVIRONMENT

### Languages & Frameworks
| Layer | Technology |
|---|---|
| Framework | **Next.js 14.2.3** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS 3.4.3** + raw CSS custom properties |
| Icons | **Lucide React 0.383.0** |
| Utilities | **clsx 2.1.1** + **tailwind-merge 2.3.0** |
| Font | **Inter** + **JetBrains Mono** (Google Fonts, loaded in globals.css) |
| Runtime | **Node.js** (v18+ recommended) |
| Package manager | **npm** |

### How to run locally
```bash
cd Interview-Courses   # the cloned repo directory
npm install            # first time only
npm run dev            # starts dev server
```
Opens at: **http://localhost:3000**  
Auto-redirects to: **http://localhost:3000/courses/coding-patterns/two-pointers/introduction-to-two-pointers**

### Environment variables
**None required.** This project has no backend, no database, no API keys. Everything is static/client-side.

### Config files that matter
- `tailwind.config.ts` — extends Tailwind with `darkMode: 'class'` and Inter/JetBrains Mono fonts
- `next.config.js` — minimal, no image remotePatterns needed (images replaced with inline SVGs)
- `app/globals.css` — contains the entire design token system (CSS custom properties for theming)

---

## 3. PROJECT STRUCTURE

```
Interview-Courses/
├── app/
│   ├── layout.tsx                          # Root HTML shell. Wraps everything in ThemeProvider.
│   ├── globals.css                         # ★ THE DESIGN SYSTEM. All CSS vars, AtlasPanel theme, component classes.
│   ├── page.tsx                            # Just a redirect to first lesson. No UI.
│   └── courses/
│       └── [course]/                       # Dynamic segment: e.g. "coding-patterns"
│           ├── layout.tsx                  # ★ SERVER COMPONENT. Fetches course data, renders CourseClientLayout.
│           └── [chapter]/                  # Dynamic segment: e.g. "two-pointers"
│               └── [lesson]/               # Dynamic segment: e.g. "introduction-to-two-pointers"
│                   └── page.tsx            # ★ Renders lesson title + LessonRenderer + LessonNav + footer
│
├── components/
│   ├── providers/
│   │   └── ThemeProvider.tsx               # 'use client'. React context for dark/light. Reads/writes localStorage.
│   │
│   ├── layout/
│   │   ├── CourseClientLayout.tsx          # ★ 'use client'. Manages collapsed + mobileOpen states. Renders Sidebar + TopBar.
│   │   ├── Sidebar.tsx                     # ★ 'use client'. Floating glass sidebar. Chapter accordion. Active lesson highlight.
│   │   ├── TopBar.tsx                      # 'use client'. Sticky glassmorphism header. Hamburger + theme toggle + bell.
│   │   └── CourseFooter.tsx                # Static 4-column footer rendered at bottom of each lesson.
│   │
│   ├── content/
│   │   ├── LessonRenderer.tsx              # ★ Renders ContentBlock[] array into JSX. Handles all block types.
│   │   ├── CodeBlock.tsx                   # 'use client'. Language tabs, copy button, Run button with redirect logic.
│   │   └── LessonNav.tsx                   # Prev/Next lesson buttons. Derives links from course structure if not explicit.
│   │
│   ├── diagrams/
│   │   ├── TwoPointerDiagrams.tsx          # ★ 7 inline SVG components for Ch.01. Theme-adaptive via CSS vars.
│   │   └── index.ts                        # Registry: maps diagramId string → React component.
│   │
│   └── ui/
│       ├── ProgressBar.tsx                 # Thin gradient bar (purple→teal). Takes value 0-100.
│       └── Badge.tsx                       # Small label chip. Variants: default/active/success/muted.
│
├── lib/
│   ├── data/
│   │   ├── courses.ts                      # ★ All 19 chapters + their lessons. The course "database". Pure TS objects.
│   │   └── lessons.ts                      # ★ LessonPageData objects (ContentBlock arrays). Only Ch.01 intro has content.
│   └── utils.ts                            # cn() helper: merges Tailwind classes safely via clsx + tailwind-merge.
│
├── types/
│   └── index.ts                            # ★ All TypeScript types: ContentBlock, Lesson, Chapter, Course, LessonPageData.
│
├── public/
│   └── images/                             # Empty. Placeholder for future raster assets.
│
├── tailwind.config.ts                      # darkMode: 'class', Inter + JetBrains Mono fonts.
├── next.config.js                          # Minimal. No special config needed currently.
└── package.json                            # name: "interview-courses"
```

### Files to understand first (in this order)
1. `types/index.ts` — understand the data model
2. `lib/data/courses.ts` — understand the content structure
3. `app/globals.css` — understand the design token system
4. `app/courses/[course]/layout.tsx` + `CourseClientLayout.tsx` — understand the layout persistence architecture
5. `components/layout/Sidebar.tsx` — the most complex component

---

## 4. WHAT IS FULLY WORKING

### Navigation & Routing
- ✅ `/` redirects to `/courses/coding-patterns/two-pointers/introduction-to-two-pointers`
- ✅ URL-based routing: each lesson has a unique URL with 3 dynamic segments `[course]/[chapter]/[lesson]`
- ✅ Client-side navigation between lessons is instant (no full page reload)
- ✅ Sidebar stays **fully mounted** (no re-render) when navigating between lessons — expanded chapters and scroll position are preserved
- ✅ `generateStaticParams` pre-generates static HTML for all lesson routes at build time

### Sidebar
- ✅ Floating glassmorphism card: `position: fixed`, `top/left/bottom: 18px`, `border-radius: 26px`, `backdrop-filter: blur(22px)`
- ✅ Shows course title ("Coding Interview Patterns") + progress ("0/120 completed" + gradient progress bar)
- ✅ All 19 chapters listed with zero-padded number badges (01–19)
- ✅ Chapters expand/collapse on click, showing their lesson list
- ✅ Active chapter gets a full purple gradient background + shadow
- ✅ Active lesson gets purple left border accent + purple text + subtle tinted background
- ✅ Completed lessons show a teal checkmark (currently all 0 are complete — completion is hardcoded)
- ✅ Sidebar collapses to 80px icon-only mode when the PanelLeftClose button in TopBar is clicked
- ✅ Main content area margin transitions smoothly when sidebar collapses (`margin-left: calc(80px + 36px)`)

### Mobile
- ✅ On screens ≤860px: sidebar is off-screen (`transform: translateX(calc(-100% - 40px))`)
- ✅ Hamburger button in TopBar fires `window.dispatchEvent(new CustomEvent('open-mobile-drawer'))` → sidebar slides in
- ✅ Backdrop overlay (dark semi-transparent) appears behind sidebar; clicking it closes the sidebar
- ✅ Navigating to a lesson closes the mobile sidebar automatically

### Theme (Dark / Light Mode)
- ✅ Toggle button (Moon → Sun icon) in TopBar switches theme
- ✅ `ThemeProvider` reads `localStorage.getItem('bbg-theme')` on mount, falls back to `window.matchMedia('prefers-color-scheme')`
- ✅ Adds/removes `dark` class on `<html>` element
- ✅ All colors are CSS custom properties (defined in `:root` and `.dark`) — every component adapts automatically
- ✅ Persisted across page refreshes

### Lesson Content (Ch.01 Introduction to Two Pointers only)
- ✅ H1 lesson title rendered at top of glass card
- ✅ H2/H3 section headings
- ✅ Paragraphs with inline `**bold**` and `` `code` `` (parsed by lightweight InlineMd function)
- ✅ 7 inline SVG diagram components render at full content width, theme-adaptive, no white background artifact
- ✅ Multi-language code blocks (Python / JavaScript / Java / C++) with tab switching
- ✅ Copy button on code blocks (copies active tab's code to clipboard, shows Check icon for 2s)
- ✅ "Run" button on code blocks:
  - Python → opens **Python Tutor** with code pre-populated via URL hash encoding
  - JavaScript → opens **OneCompiler** `/javascript`
  - Java → opens **OneCompiler** `/java`
  - C++ → opens **OneCompiler** `/cpp`
  - Tooltip on hover explains what will happen before user clicks
  - Attribution bar at bottom of code block explains the platform
- ✅ Info/warning/tip callout boxes with left border accent
- ✅ "Coming soon" placeholder for lessons without content

### Prev/Next Navigation
- ✅ Bottom of each lesson: "Previous" button (ghost style) + "Next" button (gradient purple→teal)
- ✅ Links are explicit in `LessonPageData` OR auto-derived by flattening all chapters/lessons into a flat array

### Footer
- ✅ 4-column grid: Partner With Us / Support / Company & Legal / Resources
- ✅ Copyright line

### TopBar
- ✅ Sticky at `top: 18px` with glassmorphism effect
- ✅ Shows current lesson title (derived from URL slug, title-cased) + course name subtitle
- ✅ Search bar (desktop only, ≥860px) — UI only, not connected to search logic
- ✅ Theme toggle button
- ✅ Notification bell with red dot indicator — UI only, no real notifications
- ✅ Sidebar collapse toggle (desktop) + hamburger (mobile)

### Diagrams (Ch.01 only)
- ✅ `DiagramSinglePointer` — array with single `i` pointer
- ✅ `DiagramTwoPointers` — array with `i` + `j` pointers + dashed comparison box
- ✅ `DiagramSortedArray` — sorted array with prediction annotation pill
- ✅ `DiagramInwardTraversal` — left+right pointers converging
- ✅ `DiagramUnidirectional` — both pointers same direction
- ✅ `DiagramStagedTraversal` — staged phases with annotation
- ✅ `DiagramChapterOutline` — branching tree (Two Pointers → 3 strategies)
- ✅ All use CSS custom properties → work in both dark/light mode
- ✅ All render at full glass card width (no maxWidth constraint)

---

## 5. WHAT IS PARTIALLY WORKING OR BROKEN

### Content (Highest Priority Gap)
- ⚠️ **Only 1 of 120 lessons has real content.** All other lessons show:
  ```
  Content coming soon
  This lesson is part of the full course.
  ```
  The lesson data lives in `lib/data/lessons.ts`. Currently only `introToTwoPointers` is populated. The `lessonRegistry` object needs 119 more entries.

### Search Bar
- ⚠️ The search input in TopBar is **UI only**. Typing in it does nothing. No search index, no filtering, no results dropdown. The `<input>` has no `onChange` handler.

### Notification Bell
- ⚠️ **UI only.** Red dot is hardcoded. No notification system or count logic exists.

### Progress Tracking
- ⚠️ The sidebar shows "0/120 completed" and 0% — this is **hardcoded** in `courses.ts` (`completedLessons: 0`). There is no mechanism to mark a lesson complete, persist that state, or update the progress bar. The `lesson.completed` boolean field exists in the type but is always `false`.

### User Authentication
- ⚠️ **Does not exist.** No login, no signup, no user accounts. The avatar in the original ByteByteGo site shows the logged-in user; we have no such concept yet.

### Database / Backend
- ⚠️ **Does not exist.** All data is hardcoded TypeScript objects. No API routes, no database connection.

### Diagrams for Chapters 2–19
- ⚠️ No SVG diagram components exist for any chapter beyond Ch.01. When content is eventually added for Ch.02–19, new diagram files (`HashMapDiagrams.tsx`, `LinkedListDiagrams.tsx`, etc.) will need to be created and registered in `components/diagrams/index.ts`.

### Static Params for Empty Lessons
- ⚠️ Some chapters have only 1 lesson stub (the intro). `generateStaticParams` generates routes for all of them, but visiting those routes shows "coming soon." This is not a bug but may confuse developers.

### Rename Not Yet Applied
- ⚠️ As of the last session, a **rename checklist was provided** (ByteByteGo → Interview Courses) but the developer may not have fully applied it yet. Specifically check:
  - `Sidebar.tsx`: Logo letter still "B", brand name text
  - `TopBar.tsx`: aria-labels
  - `CourseFooter.tsx`: copyright line
  - `app/layout.tsx`: metadata title/description

---

## 6. EXACTLY WHERE WE LEFT OFF

### Last task completed
The **rebranding rename** from "ByteByteGo" to "Interview Courses" was documented as a checklist. The checklist was provided to the developer to execute manually. It was not applied in code by Claude — the developer needed to make those ~10 text changes across 7 files.

### Last code change made
Before the rename, the last code change was **fixing diagram sizing** — two files were updated:
1. `components/content/LessonRenderer.tsx` — removed `maxWidth: 560` from the diagram case, removed tinted background container
2. `components/diagrams/TwoPointerDiagrams.tsx` — all 7 SVG components were scaled up (font sizes +25-30%, pointer boxes taller, arrow stroke widths 2.5px → 3px, comparison box text 11px → 13.5px)

### Decisions made but not implemented
- **Progress tracking** was discussed as a future feature but no implementation was started
- **More lesson content** is the obvious next task but no new `LessonPageData` objects were written

### State of the codebase at handoff
The codebase is clean — no pending merge conflicts, no half-finished refactors. The app runs with `npm run dev` and is fully functional for the one lesson that has content.

---

## 7. KEY CODE SNIPPETS

### `types/index.ts` — The data model

```typescript
export type ContentBlockType =
  | 'h1' | 'h2' | 'h3'
  | 'paragraph'
  | 'code'
  | 'image'
  | 'diagram'
  | 'callout'
  | 'divider';

export interface CodeTab {
  label: string;
  code: string;
}

export interface ContentBlock {
  type: ContentBlockType;
  text?: string;
  tabs?: CodeTab[];
  src?: string;
  alt?: string;
  caption?: string;
  variant?: 'info' | 'warning' | 'tip';
  diagramId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  completed: boolean;
  isIntroduction?: boolean;
}

export interface Chapter {
  id: string;
  number: string;
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
```

---

### `app/globals.css` — Design token system (most critical CSS)

```css
@layer base {
  :root {
    --bg:             #f5f7fb;
    --surface:        rgba(255, 255, 255, 0.86);
    --surface-solid:  #ffffff;
    --text:           #172033;
    --muted:          #737d92;
    --border:         rgba(18, 25, 38, 0.09);
    --primary:        #6d5dfc;   /* purple */
    --primary-2:      #8f6cff;
    --accent:         #18c7a1;   /* teal */
    --danger:         #ff5d73;
    --warning:        #ffb84d;
    --shadow:         0 18px 45px rgba(18, 25, 38, 0.10);
    --shadow-soft:    0 10px 25px rgba(18, 25, 38, 0.07);
    --shadow-primary: 0 12px 26px rgba(109, 93, 252, 0.28);
    --sidebar-w:      280px;
    --sidebar-coll:   80px;
    --transition:     240ms ease;
  }

  .dark {
    --bg:            #0d1220;
    --surface:       rgba(21, 28, 45, 0.82);
    --surface-solid: #151c2d;
    --text:          #f3f6ff;
    --muted:         #9ca8bf;
    --border:        rgba(255, 255, 255, 0.09);
    --shadow:        0 18px 45px rgba(0, 0, 0, 0.30);
    --shadow-soft:   0 10px 25px rgba(0, 0, 0, 0.22);
  }

  body {
    background:
      radial-gradient(circle at top left,  rgba(109, 93, 252, 0.18), transparent 34%),
      radial-gradient(circle at top right, rgba(24, 199, 161, 0.14), transparent 30%),
      var(--bg);
    background-attachment: fixed;
  }
}

.sidebar-floating {
  position: fixed;
  top: 18px; left: 18px; bottom: 18px;
  width: var(--sidebar-w);
  z-index: 30;
  border-radius: 26px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  backdrop-filter: blur(22px);
  transition: width var(--transition), transform var(--transition);
  overflow: hidden;
}

.sidebar-floating.is-collapsed { width: var(--sidebar-coll); }

.course-main {
  margin-left: calc(var(--sidebar-w) + 36px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 18px 26px 40px;
  transition: margin-left var(--transition);
}

.course-main.is-collapsed {
  margin-left: calc(var(--sidebar-coll) + 36px);
}

@media (max-width: 860px) {
  .sidebar-floating {
    width: min(300px, calc(100vw - 32px)) !important;
    transform: translateX(calc(-100% - 40px));
  }
  .sidebar-floating.mobile-open { transform: translateX(0); }
  .course-main, .course-main.is-collapsed {
    margin-left: 0 !important;
    padding: 14px;
  }
}
```

---

### `app/courses/[course]/layout.tsx` — Layout persistence (KEY architectural file)

```tsx
// SERVER COMPONENT — fetches course data once, passes to client layout
// The sidebar NEVER re-mounts when navigating between lessons because
// Next.js App Router keeps layout.tsx mounted across child route changes.
import { courses } from '@/lib/data/courses';
import { notFound } from 'next/navigation';
import CourseClientLayout from '@/components/layout/CourseClientLayout';

export default function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { course: string };
}) {
  const course = courses[params.course];
  if (!course) notFound();
  return <CourseClientLayout course={course}>{children}</CourseClientLayout>;
}
```

---

### `components/layout/CourseClientLayout.tsx` — Central state manager

```tsx
'use client';
import { useState } from 'react';
import { Course } from '@/types';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { cn } from '@/lib/utils';

export default function CourseClientLayout({
  course,
  children,
}: {
  course: Course;
  children: React.ReactNode;
}) {
  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Sidebar
        course={course}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setCollapsed(p => !p)}
        onCloseMobile={() => setMobileOpen(false)}
      />
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
          style={{
            position: 'fixed', inset: 0, zIndex: 20,
            background: 'rgba(2, 6, 23, 0.50)',
            backdropFilter: 'blur(3px)',
          }}
        />
      )}
      <div className={cn('course-main', collapsed && 'is-collapsed')}>
        <TopBar
          courseTitle={course.title}
          onOpenMobile={() => setMobileOpen(true)}
          onToggleCollapse={() => setCollapsed(p => !p)}
        />
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    </>
  );
}
```

---

### `components/content/CodeBlock.tsx` — Code runner logic

```tsx
// The key function that builds the redirect URL for each language:
function getRunnerUrl(label: string, code: string): string {
  if (label === 'Python') {
    const encoded = encodeURIComponent(code);
    return (
      `https://pythontutor.com/render.html#code=${encoded}` +
      `&cumulative=false&heapPrimitives=nevernest&mode=display` +
      `&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false`
    );
  }
  const langMap: Record<string, string> = {
    JavaScript: 'javascript',
    Java: 'java',
    'C++': 'cpp',
  };
  return `https://onecompiler.com/${langMap[label] ?? 'python3'}`;
}
// Python Tutor: code is pre-populated via URL hash — user lands ready to step through
// OneCompiler: redirects to editor, user needs to paste code manually
```

---

### `components/diagrams/index.ts` — Diagram registry

```typescript
import React from 'react';
import {
  DiagramSinglePointer, DiagramTwoPointers, DiagramSortedArray,
  DiagramInwardTraversal, DiagramUnidirectional, DiagramStagedTraversal,
  DiagramChapterOutline,
} from './TwoPointerDiagrams';

export const DIAGRAMS: Record<string, React.ComponentType> = {
  'two-ptr-single':     DiagramSinglePointer,
  'two-ptr-comparison': DiagramTwoPointers,
  'two-ptr-sorted':     DiagramSortedArray,
  'two-ptr-inward':     DiagramInwardTraversal,
  'two-ptr-unidirect':  DiagramUnidirectional,
  'two-ptr-staged':     DiagramStagedTraversal,
  'two-ptr-outline':    DiagramChapterOutline,
};
// To add diagrams for Ch.02+: create HashMapDiagrams.tsx, import here, add entries.
```

---

### `lib/data/lessons.ts` — How to add a new lesson (template)

```typescript
// Pattern for adding any new lesson:
export const pairSumSorted: LessonPageData = {
  title: 'Pair Sum - Sorted',
  courseTitle: 'Coding Interview Patterns',
  courseSlug: 'coding-patterns',
  chapterTitle: 'Two Pointers',
  chapterSlug: 'two-pointers',
  content: [
    { type: 'h2', text: 'Problem Statement' },
    { type: 'paragraph', text: 'Given a **sorted** array and a target...' },
    { type: 'diagram', diagramId: 'two-ptr-inward' },  // reuse existing diagram
    { type: 'code', tabs: [
      { label: 'Python', code: `def pair_sum(nums, target):\n    left, right = 0, len(nums) - 1` },
      { label: 'JavaScript', code: `function pairSum(nums, target) {\n  let left = 0, right = nums.length - 1;` },
    ]},
  ],
  prevLesson: { title: 'Introduction to Two Pointers', href: '/courses/coding-patterns/two-pointers/introduction-to-two-pointers' },
  nextLesson: { title: 'Triplet Sum', href: '/courses/coding-patterns/two-pointers/triplet-sum' },
};

// Register it at the bottom:
export const lessonRegistry: Record<string, LessonPageData> = {
  'introduction-to-two-pointers': introToTwoPointers,
  'pair-sum-sorted': pairSumSorted,   // ← add here
};
```

---

## 8. ARCHITECTURE & DESIGN DECISIONS

### Decision 1: App Router layout persistence (most important)
**Decision:** Sidebar lives in `app/courses/[course]/layout.tsx`, NOT in `app/layout.tsx`.  
**Why:** Next.js App Router never unmounts a `layout.tsx` when navigating between its child routes. So the sidebar `useState` (expanded chapters, scroll position) survives navigation. If it were in the root layout it would be on every page (including the home redirect), and if it were in the page component it would re-mount on every navigation.  
**Alternative tried:** None — this was designed correctly from the start.

### Decision 2: CSS custom properties over Tailwind for theming
**Decision:** All colors are `var(--primary)`, `var(--text)`, etc. defined in `:root` and `.dark`.  
**Why:** Tailwind's `dark:` variants require knowing the class name at compile time. CSS variables can be used inside SVG `<style>` blocks (inline SVGs inherit from the document), inside inline `style={}` props, and inside complex computed styles. Tailwind dark variants cannot.  
**Critical benefit:** The 7 SVG diagram components use CSS variables inside their `<style>` blocks — this would be impossible with Tailwind.

### Decision 3: Inline SVG React components instead of image files
**Decision:** Diagrams are `.tsx` components in `components/diagrams/`, not PNG/SVG files in `public/`.  
**Why:** External SVG files (loaded via `<img src="...">`) run in an isolated browsing context and CANNOT inherit CSS custom properties from the host page. Inline SVGs are part of the React DOM tree and CAN use `var(--primary)` etc. This is the only way to make diagrams theme-adaptive.  
**Alternative abandoned:** Initially used ByteByteGo's CDN SVG URLs (`https://bytebytego.com/images/...`) loaded via `<img>` — these had white backgrounds that looked broken in dark mode, and we had no control over their theming.

### Decision 4: CourseClientLayout as the state boundary
**Decision:** A separate `CourseClientLayout` client component wraps the server `layout.tsx`.  
**Why:** In Next.js App Router, `layout.tsx` itself should ideally be a server component (to fetch course data without client overhead). But state (`collapsed`, `mobileOpen`) requires a client component. Solution: server layout fetches data, passes it to a client component that manages state and renders Sidebar + TopBar.  
**This also means:** The `children` prop (lesson page content) is server-rendered and passed into the client component — this is valid in Next.js and keeps SSR benefits for lesson content.

### Decision 5: Content as TypeScript ContentBlock arrays
**Decision:** Lesson content is stored as `ContentBlock[]` arrays in TypeScript files, not Markdown or a CMS.  
**Why:** Avoids external dependencies (no CMS setup, no markdown parser, no API calls). Easy to add inline diagram references (`{ type: 'diagram', diagramId: 'two-ptr-single' }`). Type-safe. Fast iteration.  
**Trade-off:** Less friendly for non-developers to edit. When the project scales, migrate to MDX or a headless CMS (Contentful, Sanity).

### Decision 6: MobileDrawer eliminated in favor of CourseClientLayout
**Decision:** The original design had a separate `MobileDrawer` component that used `window.dispatchEvent(new CustomEvent('open-mobile-drawer'))` to communicate with `TopBar`.  
**Why abandoned:** It required a custom event bus to avoid prop-drilling through the layout. Simpler to have `CourseClientLayout` own all state and pass `onOpenMobile` directly as a prop to `TopBar`. The `MobileDrawer.tsx` file was deleted.

### Decision 7: generateStaticParams for all routes
**Decision:** `app/courses/[course]/[chapter]/[lesson]/page.tsx` exports `generateStaticParams` that iterates all courses → chapters → lessons.  
**Why:** Pre-renders every lesson as static HTML at build time. Navigation between lessons loads pre-built HTML from the CDN — instant.

### Naming conventions
- Components: PascalCase (`CourseClientLayout`, `DiagramSinglePointer`)
- Data files: camelCase exports (`codingPatternsCourse`, `introToTwoPointers`)
- CSS classes: kebab-case BEM-ish (`.sidebar-floating`, `.course-main`, `.glass-card`)
- Diagram IDs: kebab-case with chapter prefix (`two-ptr-single`, `two-ptr-inward`)
- Route slugs: kebab-case matching content IDs (`two-pointers`, `introduction-to-two-pointers`)

---

## 9. NEXT STEPS (PRIORITY ORDER)

### Priority 1 — Complete the rename (15 minutes)
Apply these 7 file changes (search for "ByteByteGo" in each):
- `Sidebar.tsx`: Change logo letter "B" to "IC", `fontSize: 22` → `fontSize: 15`, brand name text, aria-label
- `TopBar.tsx`: aria-label
- `CourseFooter.tsx`: copyright line
- `app/layout.tsx`: metadata title and description
- `package.json`: name field
- `next.config.js`: remove ByteByteGo remotePatterns if still present
- Run `grep -r "ByteByteGo\|bytebytego" --include="*.tsx" --include="*.ts" .` to verify clean

### Priority 2 — Add content for remaining Two Pointers lessons (biggest impact)
Add `LessonPageData` objects for all 6 remaining Ch.01 lessons in `lib/data/lessons.ts`:
- `pair-sum-sorted`
- `triplet-sum`
- `largest-container`
- `is-palindrome-valid`
- `shift-zeros-to-the-end`
- `next-lexicographical-sequence`

### Priority 3 — Deploy to Vercel (makes it shareable)
```bash
git add . && git commit -m "feat: MVP complete" && git push origin main
# Then: vercel.com → Import Git Repository → Select Interview-Courses → Deploy
# No env vars needed. Build command: next build. Output: .next
```

### Priority 4 — Add user authentication
Recommended: **Clerk** (clerk.com) — easiest Next.js 14 App Router integration, free tier for personal projects. Alternatively NextAuth.js v5.

### Priority 5 — Add progress tracking
Once auth exists: store `{ userId, lessonSlug, completedAt }` in **Supabase** (free tier, built-in Postgres). Update `lesson.completed` dynamically based on database query in the lesson `page.tsx`.

### Priority 6 — Add content for all 19 chapters
This is the largest content effort. Create ~120 `LessonPageData` objects. For diagrams, create:
- `HashMapDiagrams.tsx` (Ch.02)
- `LinkedListDiagrams.tsx` (Ch.03)
- etc.

### Priority 7 — Connect the search bar
Add a search index (JSON of all lesson titles/content), implement a results dropdown component, wire `TopBar`'s `<input>` onChange to filter + display results.

### Priority 8 — SEO: dynamic metadata per lesson
```tsx
// In app/courses/[course]/[chapter]/[lesson]/page.tsx
export async function generateMetadata({ params }) {
  const data = getLessonData(params.lesson);
  return {
    title: `${data?.title} | Interview Courses`,
    description: `Learn ${data?.title} with visual diagrams and runnable code examples.`,
  };
}
```

---

*End of Context Handoff Document*