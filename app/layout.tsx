// Root layout — sets the HTML shell. All pages inherit from this.
// Sidebar is NOT here; it lives in the courses/[course]/layout.tsx so
// it only mounts when the user is inside a course.

import type { Metadata, Viewport } from 'next';
import './globals.css';

// Page metadata — title, description, social sharing, etc.
export const metadata: Metadata = {
  title: 'ByteByteGo | Technical Interview Prep',
  description: 'Ace Every Stage of Your Next Technical Interview',
};

// Viewport settings are now a SEPARATE export in Next.js 14+.
// themeColor, width, initialScale all live here instead of in metadata.
export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}