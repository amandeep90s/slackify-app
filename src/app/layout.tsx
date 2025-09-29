import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';

import { Toaster } from '@/components/ui/sonner';
import { ConvexClientProvider } from '@/components/ConvexClientProvider';

import '../styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Slackify',
  description: 'A Slack clone built with Next.js, Tailwind CSS, and Shadcn UI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
