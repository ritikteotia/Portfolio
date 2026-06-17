import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/smooth-scroll';
import CustomCursor from '@/components/custom-cursor';

export const metadata: Metadata = {
  title: 'Ritik Kumar',
  description: 'AI/ML builder. Building intelligent systems that work.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ritikkumar.dev',
    title: 'Ritik Kumar',
    description: 'AI/ML builder. Building intelligent systems that work.',
    siteName: 'Ritik Kumar Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ritik Kumar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritik Kumar',
    description: 'AI/ML builder. Building intelligent systems that work.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-bg text-text-1 font-sans antialiased min-h-screen">
        {/* Custom cursor dot */}
        <CustomCursor />

        {/* Lenis Smooth scrolling provider */}
        <SmoothScroll>
          <div className="relative flex flex-col min-h-screen">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
