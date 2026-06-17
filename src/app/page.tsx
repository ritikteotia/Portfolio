import dynamic from 'next/dynamic';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconMail,
  IconArrowUpRight,
} from '@tabler/icons-react';

import Nav from '@/components/nav';
import HeroContent from '@/components/hero-content';
import Tilt from '@/components/tilt';
import YouTubeBento, { YouTubeVideo } from '@/components/youtube-bento';
import GithubBento from '@/components/github-bento';
import BentoStats from '@/components/bento-stats';
import ContactForm from '@/components/contact-form';
import { xPosts } from '@/data/posts';


// Server-side YouTube Data API v3 fetch at build time (getStaticProps behavior in App Router)
async function getLatestVideos(): Promise<YouTubeVideo[] | null> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) return null;

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=2&type=video`,
      { next: { revalidate: 86400 } } // Revalidate cache daily
    );
    if (!res.ok) throw new Error('YouTube API request failed');
    const data = await res.json();
    
    if (!data.items) return null;

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      views: 'Latest Video',
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return null;
  }
}

// Projects list data
const projects = [
  {
    num: '01',
    title: 'MOM: AI Marketing OS',
    status: 'Live',
    tags: ['AWS Bedrock', 'Lambda', 'PostgreSQL', 'Next.js', 'Python'],
    desc: 'Multi-model LLM routing with intelligent campaign orchestration.',
    github: 'https://github.com/ritikteotia/MOM',
    badge: '🏆 Hackathon Winner 2025',
    accentColor: 'border-t-2 border-accent',
    glowColor: 'rgba(255, 92, 0, 0.2)',
  },
  {
    num: '02',
    title: 'BRAVISI: Gen AI SEO Platform',
    status: 'Open Source',
    tags: ['SageMaker', 'Bedrock', 'NLP', 'Python'],
    desc: 'AI Visibility Score engine tracking brand presence across LLMs.',
    github: 'https://github.com/ritikteotia/BRAVISI',
    accentColor: 'border-t-2 border-brand-purple',
    glowColor: 'rgba(167, 139, 250, 0.2)',
  },
  {
    num: '03',
    title: 'Customer Segmentation System',
    status: 'Open Source',
    tags: ['Scikit-learn', 'K-Means', 'Pandas', 'Streamlit'],
    desc: 'Unsupervised ML pipeline segmenting customers into 4 profiles.',
    github: 'https://github.com/ritikteotia/segcy',
    accentColor: 'border-t-2 border-brand-amber',
    glowColor: 'rgba(255, 193, 7, 0.2)',
  },
];

// Skills Arrays
const marqueeRow1 = [
  'Python',
  'TensorFlow',
  'PyTorch',
  'HuggingFace Transformers',
  'Scikit-learn',
  'Amazon Bedrock',
  'AWS SageMaker',
  'AWS Lambda',
  'LLM Fine-Tuning',
  'RAG',
  'XGBoost',
  'NLP',
  'Seq2Seq',
  'Bayesian Inference',
];

const marqueeRow2 = [
  'Next.js',
  'TypeScript',
  'SQL',
  'Docker',
  'NumPy',
  'Pandas',
  'Git',
  'K-Means Clustering',
  'Feature Engineering',
  'REST APIs',
  'Streamlit',
  'Random Forests',
  'PostgreSQL',
  'Computer Vision',
];

export default async function Home() {
  const latestVideos = await getLatestVideos();

  return (
    <>
      {/* Sticky header navbar */}
      <Nav />

      {/* Main page body */}
      <main className="flex-1 w-full bg-bg text-text-1 overflow-x-hidden relative">

        {/* SECTION 1: HERO */}
        <section id="hero" className="w-full relative">
          <HeroContent />
        </section>

        {/* SECTION 2: STATUS BAR */}
        <section className="w-full bg-surface border-y border-border-warm py-6 px-[5vw] flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-mono text-[10px] text-text-2 uppercase tracking-[0.14em] font-semibold">
              NOW
            </span>
            <span className="text-sm font-medium text-text-1">
              Building MOM — AI Marketing OS on Amazon Bedrock.
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[11px] text-brand-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full">
              🟢 In process
            </span>
            <span className="font-mono text-[11px] text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
              ⚡ Building in public
            </span>
            <span className="font-mono text-[11px] text-text-2 bg-surface-2 border border-border-warm px-3 py-1 rounded-full">
              📍 Meerut, IN
            </span>
          </div>
        </section>

        {/* SECTION 3: WORK PROJECTS */}
        <section id="projects" className="py-24 px-[5vw] max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] font-semibold">
              SELECTED WORK
            </span>
            <h2 className="font-heading text-4xl md:text-[52px] font-bold text-text-1 tracking-tight mt-2">
              What I ship.
            </h2>
          </div>

          {/* Project cards responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <Tilt
                key={project.num}
                glowColor={project.glowColor}
                className={`bento-cell flex flex-col justify-between p-6 min-h-[360px] ${project.accentColor} relative group`}
              >
                {/* 3D Depth layering items */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-heading text-5xl font-bold text-text-3 select-none transform translate-z-[-5px]">
                      {project.num}
                    </span>
                    <span className={`font-mono text-[11px] px-2.5 py-1 rounded-full border ${
                      project.status === 'Live'
                        ? 'text-brand-green bg-brand-green/10 border-brand-green/20'
                        : 'text-brand-amber bg-brand-amber/10 border-brand-amber/20'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-semibold text-text-1 mb-2 transform translate-z-[10px]">
                    {project.title}
                  </h3>
                  
                  <p className="text-text-2 text-sm leading-relaxed mb-6 font-light">
                    {project.desc}
                  </p>
                </div>

                <div>
                  {/* Pills stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-text-2 bg-surface-2 border border-border-warm px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-border-warm pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-text-2 hover:text-accent group-hover:text-accent transition-colors"
                    >
                      GitHub Repository ↗
                    </a>
                    {project.badge && (
                      <span className="text-[10px] font-bold text-brand-amber transform translate-z-[15px]">
                        {project.badge}
                      </span>
                    )}
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </section>

        {/* SECTION 4: DISTRIBUTION HUB */}
        <section className="py-24 px-[5vw] bg-surface-2/20 border-y border-border-warm relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <span className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] font-semibold">
                DISTRIBUTION
              </span>
              <h2 className="font-heading text-4xl md:text-[52px] font-bold text-text-1 tracking-tight mt-2">
                Where I publish.
              </h2>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* CELL A: YouTube */}
              <YouTubeBento videos={latestVideos} />

              {/* CELL B: X / Twitter */}
              <Tilt className="bento-cell p-6 flex flex-col justify-between min-h-[300px] border-t-2 border-[#F5F5F5]">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <IconBrandX className="w-5 h-5 text-text-1" />
                    <span className="font-heading font-semibold text-text-1 text-sm tracking-wide">X (Twitter)</span>
                  </div>

                  <a
                    href="https://x.com/RitikTeotia_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-text-2 hover:text-accent transition-colors block mb-4"
                  >
                    @RitikTeotia_
                  </a>

                  {/* Curated posts */}
                  <div className="flex flex-col gap-4">
                    {xPosts.map((post) => (
                      <div key={post.id} className="border-l border-border-warm pl-3 py-1 flex flex-col gap-1">
                        <p className="text-xs text-text-2 leading-relaxed font-light">
                          {post.text}
                        </p>
                        <div className="flex gap-4 font-mono text-[9px] text-text-3 mt-1">
                          <span>💬 {post.replies}</span>
                          <span>🔁 {post.retweets}</span>
                          <span>❤️ {post.likes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="https://x.com/RitikTeotia_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-accent hover:opacity-80 transition-opacity mt-4 flex items-center gap-1"
                >
                  Follow on X ↗
                </a>
              </Tilt>

              {/* CELL C: LinkedIn */}
              <Tilt className="bento-cell p-6 flex flex-col justify-between min-h-[300px] border-t-2 border-[#0A66C2]">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <IconBrandLinkedin className="w-5 h-5 text-[#0A66C2]" />
                    <span className="font-heading font-semibold text-text-1 text-sm tracking-wide">LinkedIn</span>
                  </div>

                  <div className="flex items-center gap-3 bg-surface-2/40 border border-border-warm rounded-xl p-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent-dim border border-accent/20 flex items-center justify-center font-heading font-bold text-accent text-sm select-none">
                      RK
                    </div>
                    <div>
                      <div className="text-xs font-heading font-bold text-text-1">Ritik Kumar</div>
                      <div className="text-[10px] text-text-3 font-mono mt-0.5">AI Engineer · MIET Meerut</div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://linkedin.com/in/ritikteotia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#0A66C2]/15 border border-[#0A66C2]/30 hover:bg-[#0A66C2]/25 text-white font-mono text-xs font-semibold rounded-xl text-center transition-all flex items-center justify-center gap-1.5"
                >
                  Connect ↗
                </a>
              </Tilt>

              {/* CELL D: GitHub client API details */}
              <GithubBento />

              {/* CELL E: Stats row */}
              <BentoStats />
            </div>
          </div>
        </section>

        {/* SECTION 5: SKILLS MARQUEE */}
        <section id="skills" className="py-24 overflow-hidden relative z-10">
          <div className="px-[5vw] max-w-6xl mx-auto mb-12">
            <span className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] font-semibold">
              TECH STACK
            </span>
            <h2 className="font-heading text-4xl md:text-[52px] font-bold text-text-1 tracking-tight mt-2">
              Things I know.
            </h2>
          </div>

          <div className="marquee-container-v3">
            {/* Row 1 fast loop */}
            <div className="marquee-track-v3 marquee-row-speed1">
              {[...marqueeRow1, ...marqueeRow1].map((skill, i) => (
                <div
                  key={i}
                  className="bg-surface-2 border border-border-warm text-text-1 hover:border-accent hover:text-accent font-mono text-xs font-semibold px-4.5 py-2 rounded-full cursor-default transition-colors whitespace-nowrap"
                >
                  {skill}
                </div>
              ))}
            </div>

            {/* Row 2 slow loop */}
            <div className="marquee-track-v3 marquee-row-speed2">
              {[...marqueeRow2, ...marqueeRow2].map((concept, i) => (
                <div
                  key={i}
                  className="bg-surface-2 border border-border-warm text-text-1 hover:border-accent hover:text-accent font-mono text-xs font-semibold px-4.5 py-2 rounded-full cursor-default transition-colors whitespace-nowrap"
                >
                  {concept}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: CONNECT */}
        <section id="connect" className="py-24 px-[5vw] max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start">
            
            {/* LEFT: Connect links panel */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <span className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] font-semibold">
                  CONNECT
                </span>
                <h2 className="font-heading text-4xl md:text-[52px] font-bold text-text-1 tracking-tight mt-2">
                  Let&apos;s talk.
                </h2>
              </div>
              
              <p className="text-text-2 text-base font-light leading-relaxed">
                Find me across the internet. Feel free to shoot a message for collaborations, AI integrations, or project brainstorming.
              </p>

              {/* Six glass cards row links */}
              <div className="flex flex-col border-t border-border-warm mt-4">
                {[
                  {
                    name: 'GitHub',
                    handle: 'github.com/ritikteotia',
                    href: 'https://github.com/ritikteotia',
                    icon: <IconBrandGithub className="w-5 h-5 text-text-2 group-hover:text-accent transition-colors" />,
                  },
                  {
                    name: 'LinkedIn',
                    handle: 'linkedin.com/in/ritikteotia',
                    href: 'https://linkedin.com/in/ritikteotia',
                    icon: <IconBrandLinkedin className="w-5 h-5 text-text-2 group-hover:text-accent transition-colors" />,
                  },
                  {
                    name: 'X',
                    handle: 'x.com/RitikTeotia_',
                    href: 'https://x.com/RitikTeotia_',
                    icon: <IconBrandX className="w-5 h-5 text-text-2 group-hover:text-accent transition-colors" />,
                  },
                  {
                    name: 'YouTube',
                    handle: 'youtube.com/@ritikteotia',
                    href: 'https://youtube.com/@ritikteotia',
                    icon: <IconBrandYoutube className="w-5 h-5 text-text-2 group-hover:text-accent transition-colors" />,
                  },
                  {
                    name: 'Email',
                    handle: 'ritikteotiaone4@gmail.com',
                    href: 'mailto:ritikteotiaone4@gmail.com',
                    icon: <IconMail className="w-5 h-5 text-text-2 group-hover:text-accent transition-colors" />,
                  },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.name !== 'Email' ? '_blank' : undefined}
                    rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between py-5 border-b border-border-warm hover:bg-accent-dim hover:px-4 transition-all duration-300 group rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {link.icon}
                      <span className="font-sans font-semibold text-text-1 text-sm tracking-wide">
                        {link.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs font-mono text-text-3 group-hover:text-accent">
                      <span className="hidden sm:inline">{link.handle}</span>
                      <IconArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT: Dynamic contact form */}
            <div className="lg:col-span-5 w-full">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border-warm py-8 px-[5vw] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 bg-bg">
          <div className="font-mono text-xs text-text-3">Ritik Kumar</div>
          
          {/* Five footer social links */}
          <div className="flex gap-4">
            {[
              { href: 'https://github.com/ritikteotia', icon: <IconBrandGithub className="w-4.5 h-4.5" /> },
              { href: 'https://linkedin.com/in/ritikteotia', icon: <IconBrandLinkedin className="w-4.5 h-4.5" /> },
              { href: 'https://x.com/RitikTeotia_', icon: <IconBrandX className="w-4.5 h-4.5" /> },
              { href: 'https://youtube.com/@ritikteotia', icon: <IconBrandYoutube className="w-4.5 h-4.5" /> },
              { href: 'mailto:ritikteotiaone4@gmail.com', icon: <IconMail className="w-4.5 h-4.5" /> },
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                target={soc.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="text-text-3 hover:text-accent transition-colors duration-200"
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </>
  );
}
