import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'ByteByteGo | Technical Interview Prep',
  description: 'Ace Every Stage of Your Next Technical Interview',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/*
          ThemeProvider is a client component that reads localStorage + system pref on
          mount and toggles the `dark` class on <html>. It must wrap the full tree so
          any component can call useTheme().
        */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}