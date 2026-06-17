'use client';

import { Play } from 'lucide-react';
import Tilt from './tilt';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  link: string;
  views: string;
}

interface YouTubeBentoProps {
  videos: YouTubeVideo[] | null;
}

const fallbackVideos: YouTubeVideo[] = [
  {
    id: 'placeholder-1',
    title: 'Building a Multi-Model Router on Amazon Bedrock from Scratch',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800',
    views: '1.2K views',
    link: 'https://youtube.com/@ritikteotia',
  },
  {
    id: 'placeholder-2',
    title: 'How I Won 2 Consecutive Hackathons: Complete AI/ML Stack & Strategy',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800',
    views: '840 views',
    link: 'https://youtube.com/@ritikteotia',
  },
];

export default function YouTubeBento({ videos }: YouTubeBentoProps) {
  const displayVideos = videos || fallbackVideos;
  const isFallback = !videos;

  return (
    <Tilt className="bento-cell lg:col-span-2 p-6 flex flex-col justify-between min-h-[300px] border-t-2 border-[#FF0000]">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          {/* YouTube logo inline SVG */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#FF0000]">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837z" />
            <polygon points="9.545 15.568 15.818 12 9.545 8.432" className="fill-white" />
          </svg>
          <span className="font-heading font-semibold text-text-1 text-sm tracking-wide">YouTube</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 gap-2">
          <a
            href="https://youtube.com/@ritikteotia"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-text-2 hover:text-accent transition-colors"
          >
            youtube.com/@ritikteotia
          </a>
          {isFallback && (
            <span className="font-mono text-[10px] text-brand-amber bg-brand-amber/10 border border-brand-amber/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Missing YouTube API Key
            </span>
          )}
        </div>
      </div>

      {/* Videos List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayVideos.map((video) => (
          <a
            key={video.id}
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 bg-surface-2/40 border border-border-warm rounded-xl p-2.5 hover:border-accent/40 hover:bg-surface-2/80 transition-all"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-surface-2">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white shadow-lg">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Title & Stats */}
            <div className="flex flex-col gap-1">
              <h4 className="text-xs font-semibold text-text-1 leading-normal line-clamp-2 group-hover:text-accent transition-colors">
                {video.title}
              </h4>
              <span className="font-mono text-[9px] text-text-3">{video.views}</span>
            </div>
          </a>
        ))}
      </div>
    </Tilt>
  );
}
