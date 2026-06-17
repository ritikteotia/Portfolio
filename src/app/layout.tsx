import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/smooth-scroll';
import CustomCursor from '@/components/custom-cursor';
import Nav from '@/components/nav';

export const metadata: Metadata = {
  title: 'Ritik Kumar — AI/ML Engineer & Builder',
  description:
    'Award-winning AI/ML student at MIET Meerut. Building production-grade ML systems, LLM pipelines, and Gen AI platforms. 2× Hackathon Champion.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ritikkumar.dev', // Placeholder domain or production URL
    title: 'Ritik Kumar — AI/ML Engineer & Builder',
    description:
      'Award-winning AI/ML student at MIET Meerut. Building production-grade ML systems, LLM pipelines, and Gen AI platforms. 2× Hackathon Champion.',
    siteName: 'Ritik Kumar Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ritik Kumar — AI/ML Engineer & Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritik Kumar — AI/ML Engineer & Builder',
    description:
      'Award-winning AI/ML student at MIET Meerut. Building production-grade ML systems, LLM pipelines, and Gen AI platforms. 2× Hackathon Champion.',
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
      <body className="bg-brand-bg text-white font-sans antialiased min-h-screen">
        {/* Background gradient blurred orbs */}
        <div className="bg-orb-container">
          <div className="bg-orb-violet" />
          <div className="bg-orb-cyan" />
          <div className="bg-orb-pink" />
        </div>

        {/* Custom cursor for desktop */}
        <CustomCursor />

        {/* Floating pill navigation */}
        <Nav />

        {/* Lenis Smooth scrolling provider */}
        <SmoothScroll>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
