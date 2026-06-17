import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Prevent static generation caching at build time

export async function GET() {
  const username = 'ritikteotia';
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Ritik-Kumar-Portfolio',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // 1. Fetch profile and repos in parallel with 24h cache revalidation
    const [profileRes, reposRes, momRes, bravisiRes, eventsRes, contributionsRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 86400 } }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers, next: { revalidate: 86400 } }),
      fetch(`https://api.github.com/repos/${username}/mom`, { headers, next: { revalidate: 86400 } }),
      fetch(`https://api.github.com/repos/${username}/BRAVISI`, { headers, next: { revalidate: 86400 } }),
      fetch(`https://api.github.com/users/${username}/events`, { headers, next: { revalidate: 86400 } }),
      fetch(`https://github.com/users/${username}/contributions`, { next: { revalidate: 86400 } }),
    ]);

    const profile = profileRes.status === 'fulfilled' && profileRes.value.ok ? await profileRes.value.json() : null;
    const repos = reposRes.status === 'fulfilled' && reposRes.value.ok ? await reposRes.value.json() : [];
    const repoMom = momRes.status === 'fulfilled' && momRes.value.ok ? await momRes.value.json() : null;
    const repoBravisi = bravisiRes.status === 'fulfilled' && bravisiRes.value.ok ? await bravisiRes.value.json() : null;
    const events = eventsRes.status === 'fulfilled' && eventsRes.value.ok ? await eventsRes.value.json() : [];
    
    // Parse contributions from official GitHub HTML contributions block
    let contributions = null;
    if (contributionsRes.status === 'fulfilled' && contributionsRes.value.ok) {
      try {
        const html = await contributionsRes.value.text();
        
        // Extract total count in last year
        const totalMatch = html.match(/(\d+)\s+contributions\s+in\s+the\s+last\s+year/);
        const totalCount = totalMatch ? parseInt(totalMatch[1]) : 0;

        // Extract each calendar day properties
        const dayRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
        let match;
        const parsedDays = [];
        while ((match = dayRegex.exec(html)) !== null) {
          const date = match[1];
          const level = parseInt(match[2]);
          const count = level === 0 ? 0 : level === 1 ? 1 : level === 2 ? 3 : level === 3 ? 5 : 10;
          parsedDays.push({ date, count, level });
        }

        const currentYear = new Date().getFullYear().toString();
        contributions = {
          total: { [currentYear]: totalCount },
          contributions: parsedDays,
        };
      } catch (err) {
        console.error('Error parsing GitHub contributions HTML:', err);
      }
    }

    // Calculate total stars
    let totalStars = 0;
    if (Array.isArray(repos)) {
      totalStars = repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0);
    }

    // Parse latest activity
    let latestActivity = null;
    if (Array.isArray(events) && events.length > 0) {
      const activeEvent = events.find(
        (e: any) => e.type === 'PushEvent' || e.type === 'CreateEvent' || e.type === 'IssuesEvent'
      );
      if (activeEvent) {
        const repoName = activeEvent.repo.name.replace(`${username}/`, '');
        if (activeEvent.type === 'PushEvent') {
          // Look for commits. Sometimes events don't have commits array in payload if it was created via web editor
          const commits = activeEvent.payload.commits;
          const commitMessage = Array.isArray(commits) && commits.length > 0 
            ? commits[0].message 
            : 'Pushed updates';
          latestActivity = `Pushed to ${repoName}: "${commitMessage}"`;
        } else if (activeEvent.type === 'CreateEvent') {
          latestActivity = `Created repository ${repoName}`;
        } else if (activeEvent.type === 'IssuesEvent') {
          const action = activeEvent.payload.action;
          latestActivity = `${action.charAt(0).toUpperCase() + action.slice(1)} issue in ${repoName}`;
        }
      }
    }

    return NextResponse.json({
      profile: {
        followers: profile?.followers ?? null,
      },
      contributions,
      repoMom: repoMom ? {
        stargazers_count: repoMom.stargazers_count,
        forks_count: repoMom.forks_count,
      } : null,
      repoBravisi: repoBravisi ? {
        stargazers_count: repoBravisi.stargazers_count,
        forks_count: repoBravisi.forks_count,
      } : null,
      totalStars: totalStars || null,
      latestActivity,
    });
  } catch (error) {
    console.error('Error fetching GitHub API on server:', error);
    return NextResponse.json({ error: 'Failed to fetch github data' }, { status: 500 });
  }
}
