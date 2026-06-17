'use client';

import useSWR from 'swr';
import { IconBrandGithub, IconStar, IconGitFork } from '@tabler/icons-react';
import Tilt from './tilt';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsData {
  total: { [year: string]: number };
  contributions: ContributionDay[];
}

export default function GithubBento() {
  // Fetch unified GitHub details from local API proxy
  const { data, error } = useSWR<any>('/api/github', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  const profile = data?.profile;
  const contributions = data?.contributions;
  const repoMom = data?.repoMom;
  const repoBravisi = data?.repoBravisi;
  const latestActivity = data?.latestActivity;

  // Filter contributions for the last 6 months (approx 180 days)
  const getHeatmapDays = (): ContributionDay[] => {
    if (!contributions?.contributions) return [];
    
    // Get last 130 days to fit nicely on grid (e.g. 26 weeks * 5 rows or custom grids)
    // 22 weeks * 7 days = 154 days
    const totalDays = contributions.contributions.length;
    return contributions.contributions.slice(Math.max(0, totalDays - 154));
  };

  const heatmapDays = getHeatmapDays();

  // Map levels (0-4) to opacity classes
  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-accent/30';
      case 2:
        return 'bg-accent/60';
      case 3:
        return 'bg-accent/80';
      case 4:
        return 'bg-accent';
      default:
        return 'bg-surface-2';
    }
  };

  const followerCount = profile?.followers ?? 142; // Fallback

  return (
    <Tilt className="bento-cell lg:col-span-2 p-6 flex flex-col justify-between min-h-[300px] border-t-2 border-text-1">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <IconBrandGithub className="w-5 h-5 text-text-1" />
          <span className="font-heading font-semibold text-text-1 text-sm tracking-wide">GitHub</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 gap-2">
          <a
            href="https://github.com/ritikteotia"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-text-2 hover:text-accent transition-colors"
          >
            github.com/ritikteotia
          </a>
          <span className="font-mono text-xs text-text-3">
            <span className="text-text-1 font-semibold">{followerCount}</span> followers
          </span>
        </div>

        {/* Contribution Heatmap */}
        <div className="mb-6">
          <div className="text-[10px] font-mono text-text-3 uppercase tracking-wider mb-2">
            Last 6 Months Contributions
          </div>
          {heatmapDays.length > 0 ? (
            <div className="grid grid-flow-col grid-rows-7 gap-[3px] w-fit">
              {heatmapDays.map((day, idx) => (
                <div
                  key={day.date + idx}
                  className={`w-[7px] h-[7px] rounded-[1px] ${getLevelColor(day.level)}`}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-[3px] flex-wrap">
              {Array.from({ length: 110 }).map((_, i) => (
                <div key={i} className="w-[7px] h-[7px] rounded-[1px] bg-surface-2" />
              ))}
            </div>
          )}
        </div>

        {latestActivity && (
          <div className="mb-4 bg-surface-2/30 border border-border-warm rounded-xl p-3 flex flex-col gap-1 select-none">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-green"></span>
              </span>
              <span className="text-[9px] font-mono text-text-3 uppercase tracking-wider">
                LIVE ACTIVITY
              </span>
            </div>
            <p className="text-xs text-text-1 font-mono leading-relaxed line-clamp-1">
              {latestActivity}
            </p>
          </div>
        )}
      </div>

      {/* Pinned Repositories */}
      <div className="flex flex-col sm:flex-row gap-4">
        {[
          {
            name: 'MOM',
            stars: repoMom?.stargazers_count ?? 0,
            forks: repoMom?.forks_count ?? 0,
            lang: 'Python / Next.js',
            link: 'https://github.com/ritikteotia/mom',
          },
          {
            name: 'BRAVISI',
            stars: repoBravisi?.stargazers_count ?? 0,
            forks: repoBravisi?.forks_count ?? 0,
            lang: 'Python / NLP',
            link: 'https://github.com/ritikteotia/BRAVISI',
          },
        ].map((repo) => (
          <a
            key={repo.name}
            href={repo.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-surface-2/40 border border-border-warm rounded-xl p-3 hover:border-accent/40 hover:bg-surface-2/80 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-heading font-semibold text-text-1">{repo.name}</div>
              <div className="text-[10px] text-text-3 font-mono mt-0.5">{repo.lang}</div>
            </div>

            <div className="flex gap-3 text-[10px] font-mono text-text-2 mt-4">
              <span className="flex items-center gap-1">
                <IconStar className="w-3 h-3 text-brand-amber fill-brand-amber" /> {repo.stars}
              </span>
              <span className="flex items-center gap-1">
                <IconGitFork className="w-3 h-3 text-text-3" /> {repo.forks}
              </span>
            </div>
          </a>
        ))}
      </div>
    </Tilt>
  );
}
