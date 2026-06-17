'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  Mail,
  ChevronDown,
  Trophy,
  Code2,
  Cpu,
  Cloud,
  FileSpreadsheet,
  Send,
  ExternalLink,
} from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

import confetti from 'canvas-confetti';
import TiltCard from '@/components/tilt-card';

// Lazy-load tsParticles after hero paints for performance
const ParticleBackground = dynamic(() => import('@/components/particle-background'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-transparent" />,
});

// Typewriter Roles Array
const typewriterRoles = [
  'I build ML systems.',
  'I ship AI products.',
  'I win hackathons.',
];

// Project items
const projects = [
  {
    title: 'MOM: AI Marketing OS',
    featured: true,
    tag: '🏆 Hackathon Winner 2025',
    categories: ['ML/AI', 'Cloud', 'NLP'],
    stack: ['AWS Bedrock', 'Lambda', 'PostgreSQL', 'Next.js', 'Python'],
    desc: 'Multi-model LLM routing on Amazon Bedrock with serverless Lambda for intelligent task classification. Similarity-based recommendation engine for campaign-audience alignment. Scalable RDS layer for real-time AI asset persistence.',
    github: 'https://github.com/ritikteotia/MOM',
    accentColor: '#7B5CF0', // Violet
    glowColor: 'rgba(123, 92, 240, 0.2)',
  },
  {
    title: 'BRAVISI: Gen AI SEO Platform',
    featured: false,
    categories: ['ML/AI', 'NLP', 'Cloud'],
    stack: ['Python', 'NLP', 'AWS SageMaker', 'Bedrock'],
    desc: 'Structured data-extraction pipeline on Amazon Bedrock parsing unstructured web data (reviews, forums) into an AI Visibility Score. Automated SageMaker pipeline monitors brand mentions across ChatGPT, Gemini, Claude. Competitive benchmarking outputs a prioritised SEO roadmap.',
    github: 'https://github.com/ritikteotia/BRAVISI',
    accentColor: '#22D3EE', // Cyan
    glowColor: 'rgba(34, 211, 238, 0.2)',
  },
  {
    title: 'Customer Segmentation System',
    featured: false,
    categories: ['ML/AI'],
    stack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'],
    desc: 'End-to-end K-Means clustering pipeline segmenting customers into 4 behavioural profiles. Validated with Elbow Method and Silhouette Scoring. Live Streamlit dashboard for real-time segment visualisation.',
    github: 'https://github.com/ritikteotia/segcy',
    accentColor: '#EC4899', // Pink
    glowColor: 'rgba(236, 72, 153, 0.2)',
  },
];

// Skills divided by categories
const skillsData = [
  {
    category: 'Machine Learning',
    icon: <Cpu className="w-5 h-5 text-brand-violet" />,
    skills: ['Scikit-learn', 'XGBoost', 'Random Forests', 'Feature Engineering', 'K-Means'],
  },
  {
    category: 'Deep Learning & NLP',
    icon: <Code2 className="w-5 h-5 text-brand-cyan" />,
    skills: ['TensorFlow', 'PyTorch', 'HuggingFace', 'LLMs', 'RAG', 'Fine-Tuning', 'Seq2Seq'],
  },
  {
    category: 'Cloud & Infra',
    icon: <Cloud className="w-5 h-5 text-brand-pink" />,
    skills: ['AWS (SageMaker, Bedrock, Lambda, RDS)', 'Docker', 'CI/CD', 'REST APIs'],
  },
  {
    category: 'Languages & Tools',
    icon: <FileSpreadsheet className="w-5 h-5 text-yellow-400" />,
    skills: ['Python', 'SQL', 'NumPy', 'Pandas', 'Git/GitHub', 'Streamlit', 'Next.js'],
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');
  const [hasScrolled, setHasScrolled] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Loader control
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    const handleScrollDetection = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScrollDetection);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScrollDetection);
    };
  }, []);

  // Typewriter Loop
  useEffect(() => {
    if (loading) return;

    const currentRole = typewriterRoles[roleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end of word
      setIsDeleting(true);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % typewriterRoles.length);
      typingSpeed = 400; // Pause before typing next word
    }

    const timer = setTimeout(() => {
      setRoleText(
        isDeleting
          ? currentRole.substring(0, charIndex - 1)
          : currentRole.substring(0, charIndex + 1)
      );
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, loading]);

  // Form Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Trigger Success Confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7B5CF0', '#22D3EE', '#EC4899'],
    });

    setFormSubmitted(true);

    // mailto Fallback
    const subject = encodeURIComponent(`Outreach from Portfolio - ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:ritikteotiaone4@gmail.com?subject=${subject}&body=${body}`;
  };

  // Stagger reveal animation for Hero H1
  const nameLetters = 'Ritik Kumar'.split('');

  // Skills section container entry trigger
  const skillsRef = useRef(null);
  const isSkillsInView = useInView(skillsRef, { once: true, margin: '-100px' });

  return (
    <>
      {/* 1. Page Loader Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col justify-center items-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative flex items-center justify-center w-28 h-28">
              {/* Circular SVG sweep outline */}
              <svg className="absolute w-full h-full transform -rotate-90">
                <motion.circle
                  cx="56"
                  cy="56"
                  r="50"
                  fill="transparent"
                  stroke="url(#loaderGrad)"
                  strokeWidth="3"
                  strokeDasharray="314"
                  initial={{ strokeDashoffset: 314 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.1, ease: 'easeInOut' }}
                />
                <defs>
                  <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7B5CF0" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Monogram logo letters */}
              <span className="text-3xl font-black font-heading text-accent-gradient tracking-tighter">
                RK
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content body */}
      {!loading && (
        <main className="flex-1 w-full">
          {/* Section 1: HERO */}
          <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
          >
            {/* Starfield Particles drift */}
            <ParticleBackground />

            {/* Content box */}
            <div className="relative z-10 max-w-4xl flex flex-col items-center">
              {/* Tag line */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="font-mono text-brand-cyan text-[13px] tracking-widest bg-brand-violet/10 px-4 py-1.5 rounded-full border border-brand-violet/20 mb-6"
              >
                &lt;/ Builder. Engineer. AI Nerd. /&gt;
              </motion.div>

              {/* H1 name stagger word-by-word */}
              <h1 className="text-6xl md:text-8.5xl font-extrabold font-heading tracking-tight mb-4 flex gap-x-4">
                {nameLetters.join('').split(' ').map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block overflow-hidden py-2">
                    <motion.span
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.12 + 0.3,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block text-accent-gradient"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              {/* Sub descriptor */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mb-4"
              >
                B.Tech AI & ML · MIET Meerut · 2× Hackathon Champion
              </motion.p>

              {/* Typewriter looping text */}
              <div className="h-8 mb-10 flex justify-center items-center">
                <span className="font-mono text-slate-400 text-base md:text-lg">
                  {roleText}
                  <span className="inline-block w-[2px] h-[18px] bg-brand-cyan ml-1 animate-pulse" />
                </span>
              </div>

              {/* CTA Row */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <a
                  href="#projects"
                  className="px-8 py-3.5 bg-gradient-to-r from-brand-violet to-brand-cyan hover:shadow-[0_0_24px_rgba(123,92,240,0.45)] text-white rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02]"
                >
                  Explore Projects
                </a>
                <a
                  href="/resume.pdf" // Placeholder or actual local path
                  download
                  className="px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02]"
                >
                  Download Resume
                </a>
              </motion.div>

              {/* Social links row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="flex items-center gap-6"
              >
                <a
                  href="https://github.com/ritikteotia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/ritikteotia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="mailto:ritikteotiaone4@gmail.com"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>
            </div>

            {/* Scroll indicator chevron */}
            <motion.div
              animate={{
                y: [0, 10, 0],
                opacity: hasScrolled ? 0 : [0.3, 1, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer pointer-events-none"
            >
              <ChevronDown className="w-6 h-6 text-slate-500" />
            </motion.div>
          </section>

          {/* Section 2: ABOUT */}
          <section id="about" className="py-24 max-w-6xl mx-auto px-6 relative z-10">
            <h1 className="text-3xl font-bold font-heading mb-12 relative display-inline text-white">
              About Me
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-start">
              {/* Left Column: Bio paragraph */}
              <div className="lg:col-span-6 text-slate-300 text-lg leading-relaxed font-light">
                <p className="mb-6">
                  I&apos;m a second-year AI & ML student at{' '}
                  <strong className="text-white font-medium">MIET Meerut</strong>, building
                  end-to-end ML systems in the time most people spend watching reels. I&apos;ve
                  won two consecutive institute hackathons and shipped three production-grade AI
                  products — from LLM orchestration pipelines on Amazon Bedrock to Gen AI SEO
                  platforms.
                </p>
                <p>
                  My obsession? Turning messy, real-world problems into clean, working systems
                  that solve real needs. I focus on optimizing model latency, robust database schema,
                  and scalable serverless backend services.
                </p>
              </div>

              {/* Right Column: 2x2 Stats Grid */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                {[
                  { num: '2', label: 'Hackathon Wins' },
                  { num: '3+', label: 'AI Products' },
                  { num: 'AWS', label: 'Cloud Infra' },
                  { num: '2028', label: 'Graduation Year' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="glass-panel p-6 rounded-2xl text-center border border-white/6 hover:border-brand-cyan/20 transition-all duration-300"
                  >
                    <div className="text-3xl font-extrabold font-heading text-accent-gradient mb-1">
                      {stat.num}
                    </div>
                    <div className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Horizontal Mini-Timeline (Glass Strip) */}
            <div className="mt-16 overflow-x-auto pb-4">
              <div className="glass-panel p-6 rounded-2xl min-w-[700px] flex items-center justify-between relative">
                {/* Connector line */}
                <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-white/10 -translate-y-1/2 z-0" />

                {[
                  { title: 'MIET Enrolled', date: '2024' },
                  { title: 'Coursera ML/DL', date: '2024' },
                  { title: 'Hackathon Win #1', date: '2025' },
                  { title: 'Hackathon Win #2', date: '2026' },
                ].map((item, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0a0a0f] border-2 border-brand-violet flex items-center justify-center text-xs text-brand-cyan font-bold mb-2">
                      {i + 1}
                    </div>
                    <div className="text-sm font-semibold text-white text-center">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: PROJECTS */}
          <section id="projects" className="py-24 max-w-6xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h1 className="text-3xl font-bold font-heading relative display-inline text-white">
                  What I&apos;ve Built
                </h1>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 bg-white/3 border border-white/6 p-1 rounded-full w-fit">
                {['All', 'ML/AI', 'Cloud', 'NLP'].map((filter) => {
                  const isActive = projectFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setProjectFilter(filter)}
                      className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                        isActive ? 'text-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeProjectTab"
                          className="absolute inset-0 bg-gradient-to-r from-brand-violet to-brand-cyan rounded-full"
                          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        />
                      )}
                      <span className="relative z-10">{filter}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Responsive Projects Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {projects
                  .filter(
                    (p) => projectFilter === 'All' || p.categories.includes(projectFilter)
                  )
                  .map((project, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={project.title}
                      className={project.featured ? 'md:col-span-2' : ''}
                    >
                      <TiltCard
                        glowColor={project.glowColor}
                        className="h-full"
                        style={{ borderColor: `${project.accentColor}30` }}
                      >
                        <div className="flex flex-col justify-between h-full gap-4">
                          <div>
                            {/* Card Tag / Header */}
                            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                              <span className="font-mono text-xs text-brand-cyan uppercase tracking-wider">
                                {project.categories.join(' · ')}
                              </span>
                              {project.tag && (
                                <span className="bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-bold px-3 py-1 rounded-full">
                                  {project.tag}
                                </span>
                              )}
                            </div>

                            {/* Card Title */}
                            <h2 className="text-2xl font-bold font-heading text-white mb-3 flex items-center gap-2">
                              {project.title}
                              {project.featured && (
                                <span className="text-xs bg-brand-violet/20 border border-brand-violet/40 text-brand-violet font-semibold px-2 py-0.5 rounded">
                                  Featured
                                </span>
                              )}
                            </h2>

                            {/* Stack Badges as Pills */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="font-mono text-[11px] bg-white/5 border border-white/8 text-slate-300 px-2.5 py-1 rounded-md"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Project description */}
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                              {project.desc}
                            </p>
                          </div>

                          {/* GitHub Link */}
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white font-semibold text-xs tracking-wider uppercase hover:text-brand-cyan transition-colors"
                          >
                            <GithubIcon className="w-4 h-4" /> View GitHub Repository{' '}
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </TiltCard>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </motion.div>
          </section>

          {/* Section 4: SKILLS */}
          <section
            id="skills"
            className="py-24 relative overflow-hidden"
          >
            {/* Dot Grid background overlay */}
            <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
              <h1 className="text-3xl font-bold font-heading mb-12 relative display-inline text-white">
                Tech Stack &amp; Skills
              </h1>

              {/* Skills Grid */}
              <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillsData.map((category, catIdx) => (
                  <div
                    key={catIdx}
                    className="glass-panel p-6 rounded-2xl border border-white/6 hover:border-brand-violet/20 transition-all duration-300 flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        {category.icon}
                      </div>
                      <h2 className="text-base font-bold font-heading text-white">
                        {category.category}
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {category.skills.map((skill, skillIdx) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isSkillsInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            delay: isSkillsInView ? (catIdx * 5 + skillIdx) * 0.04 : 0,
                          }}
                          className="font-mono text-xs text-slate-300 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 5: AWARDS */}
          <section id="awards" className="py-24 max-w-4xl mx-auto px-6 relative z-10">
            <h1 className="text-3xl font-bold font-heading mb-12 text-center text-white">
              Recognitions
            </h1>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-violet/20 to-brand-pink/10 border border-brand-violet/20 p-8 md:p-12 text-center flex flex-col items-center">
              {/* Trophy Glow Animation */}
              <div className="w-20 h-20 rounded-full bg-brand-pink/10 border border-brand-pink/30 flex items-center justify-center mb-6 animate-pulse-glow">
                <Trophy className="w-10 h-10 text-brand-pink" />
              </div>

              <h2 className="text-2xl font-bold font-heading text-white mb-4">
                College-Wide Hackathon Champion
              </h2>
              <p className="text-slate-400 max-w-xl text-sm md:text-base mb-8 font-light">
                Competed against all academic years in a college-wide open category. Designed and pitched systems matching production scalability.
              </p>

              <div className="w-full flex flex-col gap-4 max-w-xl text-left">
                {[
                  {
                    title: '🏆 1st Place — Institute Hackathon 2025',
                    desc: 'First Year Category · AI/ML Product Innovation',
                  },
                  {
                    title: '🏆 1st Place — Institute Hackathon 2026',
                    desc: 'Second Year Category · AI-Driven Solution',
                  },
                ].map((award, i) => (
                  <div
                    key={i}
                    className="glass-panel p-4 rounded-xl border border-white/6 flex flex-col md:flex-row md:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">{award.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{award.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 6: CONTACT */}
          <section id="contact" className="py-24 max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-3xl font-bold font-heading text-white mb-4">
                Let&apos;s Build Something.
              </h1>
              <p className="text-slate-400 text-lg font-light">
                Open to research collaborations, internships, and ambitious projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  label: 'Email',
                  value: 'ritikteotiaone4@gmail.com',
                  href: 'mailto:ritikteotiaone4@gmail.com',
                  icon: <Mail className="w-5 h-5 text-brand-violet" />,
                },
                {
                  label: 'GitHub',
                  value: 'github.com/ritikteotia',
                  href: 'https://github.com/ritikteotia',
                  icon: <GithubIcon className="w-5 h-5 text-brand-cyan" />,
                },
                {
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/ritikteotia',
                  href: 'https://linkedin.com/in/ritikteotia',
                  icon: <LinkedinIcon className="w-5 h-5 text-brand-pink" />,
                },
              ].map((card, i) => (
                <a
                  key={i}
                  href={card.href}
                  target={card.label !== 'Email' ? '_blank' : undefined}
                  rel={card.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="glass-panel p-6 rounded-2xl flex items-center gap-4 border border-white/6 hover:border-brand-violet/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                      {card.label}
                    </div>
                    <div className="text-sm font-semibold text-white mt-0.5 truncate max-w-[180px]">
                      {card.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Simple Contact Form */}
            <div className="glass-panel p-8 rounded-3xl border border-white/6 max-w-xl mx-auto">
              {formSubmitted ? (
                <div className="text-center py-6">
                  <h2 className="text-lg font-bold text-white mb-2">Message Sent!</h2>
                  <p className="text-xs text-slate-400">
                    Thanks for reaching out! Your mail client should open with your message details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-cyan transition-colors"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-cyan transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-cyan transition-colors resize-none"
                      placeholder="Say hello..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full py-3.5 bg-gradient-to-r from-brand-violet to-brand-cyan hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] text-white text-sm font-semibold rounded-xl tracking-wide flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
                  >
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 border-t border-white/5 text-center text-xs text-slate-500 font-mono">
            <p>&copy; {new Date().getFullYear()} Ritik Kumar. All rights reserved.</p>
            <p className="mt-1 text-[10px] text-slate-600">
              Designed &amp; Built with Next.js 14 &amp; Tailwind
            </p>
          </footer>
        </main>
      )}
    </>
  );
}
