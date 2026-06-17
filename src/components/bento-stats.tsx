'use client';

import useSWR from 'swr';
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandLinkedin,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { staticStats } from '@/data/stats';
import CountUp from './count-up';

export default function BentoStats() {
  // Fetch unified GitHub details from local API proxy
  const { data } = useSWR<any>('/api/github', (url) => fetch(url).then((res) => res.json()), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  const starsCount = data?.totalStars ?? staticStats.githubStarsFallback;

  const stats = [
    {
      label: 'GitHub Stars',
      value: starsCount ?? staticStats.githubStarsFallback,
      icon: <IconBrandGithub className="w-5 h-5 text-text-1" />,
    },
    {
      label: 'X Followers',
      value: staticStats.xFollowers,
      icon: <IconBrandX className="w-5 h-5 text-text-1" />,
    },
    {
      label: 'LinkedIn Followers',
      value: staticStats.linkedInFollowers,
      icon: <IconBrandLinkedin className="w-5 h-5 text-brand-green" />,
    },
    {
      label: 'YouTube Subs',
      value: staticStats.youtubeSubs,
      icon: <IconBrandYoutube className="w-5 h-5 text-accent" />,
    },
  ];

  return (
    <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-surface-2 border border-border-warm rounded-2xl p-5 flex flex-col justify-between hover:border-accent/30 transition-colors"
        >
          {/* Top row */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10px] text-text-2 uppercase tracking-wider">
              {stat.label}
            </span>
            {stat.icon}
          </div>

          {/* Value CountUp */}
          <div className="font-heading text-3xl font-bold text-accent tracking-tighter">
            <CountUp end={stat.value} duration={1.5} />
          </div>
        </div>
      ))}
    </div>
  );
}
