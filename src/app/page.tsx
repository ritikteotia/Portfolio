'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Nav from '@/components/nav';

// Project items data
const projects = [
  {
    num: '01',
    title: 'MOM — AI Marketing OS',
    tag: '🏆 Hackathon Winner 2025',
    tags: ['AWS Bedrock', 'Lambda', 'PostgreSQL', 'Next.js'],
    desc: 'Multi-model LLM routing on Amazon Bedrock with serverless Lambda for intelligent task classification. Similarity-based recommendation engine for campaign-audience alignment.',
    github: 'https://github.com/ritikteotia/MOM',
  },
  {
    num: '02',
    title: 'BRAVISI — Gen AI SEO Platform',
    tags: ['SageMaker', 'Bedrock', 'NLP', 'Python'],
    desc: 'Structured data-extraction pipeline on Amazon Bedrock that parses unstructured web content into an AI Visibility Score. Tracks brand presence across ChatGPT, Gemini, and Claude.',
    github: 'https://github.com/ritikteotia/BRAVISI',
  },
  {
    num: '03',
    title: 'Customer Segmentation System',
    tags: ['Scikit-learn', 'K-Means', 'Pandas', 'Streamlit'],
    desc: 'End-to-end unsupervised ML pipeline clustering customers into 4 behavioural profiles. Validated with Elbow Method and Silhouette Scoring. Live Streamlit dashboard.',
    github: 'https://github.com/ritikteotia/segcy',
  },
];

// Skills marquee items
const marqueeRow1 = [
  'Python',
  'TensorFlow',
  'PyTorch',
  'HuggingFace',
  'Scikit-learn',
  'AWS SageMaker',
  'Amazon Bedrock',
  'LLM Fine-Tuning',
  'RAG',
  'XGBoost',
  'NLP',
  'Random Forests',
];

const marqueeRow2 = [
  'Next.js',
  'SQL',
  'Docker',
  'NumPy',
  'Pandas',
  'Git',
  'K-Means Clustering',
  'Bayesian Inference',
  'REST APIs',
  'Streamlit',
  'Lambda',
  'Feature Engineering',
];

// Stagger Animation configurations
const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [dynamicQuestion, setDynamicQuestion] = useState('What would you like to work on together?');
  const [destinationEmail, setDestinationEmail] = useState('ritikteotiaone4@gmail.com');

  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Detect scroll to fade out down cue
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Retrieve settings configured in /admin
    const storedQuestion = localStorage.getItem('portfolio_question');
    const storedEmail = localStorage.getItem('portfolio_email');
    if (storedQuestion) setDynamicQuestion(storedQuestion);
    if (storedEmail) setDestinationEmail(storedEmail);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // EmailJS keys are retrieved from environment variables.
    // Configure these inside your .env.local file:
    // NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
    // NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
    // NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

    // If API keys are not supplied in variables, mock sending email with local inbox fallback
    if (!serviceId || !templateId || !publicKey) {
      setTimeout(() => {
        // Fallback: trigger standard mail client fallback if no API key is specified
        const subject = encodeURIComponent(`Message from Portfolio - ${name}`);
        const mailBody = encodeURIComponent(
          `Sender: ${name} (${email})\nQuestion asked: ${dynamicQuestion}\nAnswer:\n${answer}`
        );
        window.location.href = `mailto:${destinationEmail}?subject=${subject}&body=${mailBody}`;
        setFormStatus('success');
      }, 800);
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: name,
          from_email: email,
          question: dynamicQuestion,
          message: answer,
          to_email: destinationEmail,
        },
        publicKey
      )
      .then(
        () => {
          setFormStatus('success');
          setName('');
          setEmail('');
          setAnswer('');
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setFormStatus('error');
        }
      );
  };

  // Split name for stagger reveal
  const titleWords = ['I build AI', 'systems that work.'];

  return (
    <>
      {/* Sticky pill layout nav header wrapper */}
      <Nav />

      {/* Main page content wrapper */}
      <main className="flex-1 w-full bg-[#FFFDF8] text-[#111111] overflow-x-hidden">
        
        {/* Section 1: HERO */}
        <section
          id="hero"
          className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center items-start px-[5vw]"
        >
          <div className="max-w-5xl flex flex-col items-start text-left">
            {/* Small tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="font-mono text-xs tracking-normal text-[#E8531A] mb-4"
            >
              &lt;builder /&gt;
            </motion.div>

            {/* H1 Main title stagger */}
            <h1 className="text-[#111111] font-heading font-extrabold leading-[1.05] tracking-tight mb-6 text-[clamp(42px,7.5vw,88px)]">
              {titleWords.map((line, lineIdx) => (
                <span key={lineIdx} className="block overflow-hidden py-1">
                  {line.split(' ').map((word, wordIdx) => (
                    <motion.span
                      key={wordIdx}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: (lineIdx * 3 + wordIdx) * 0.07,
                        duration: 0.65,
                        ease: [0.25, 0.46, 0.45, 0.94] as const,
                      }}
                      className="inline-block mr-4 last:mr-0"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Sub line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-base md:text-lg text-[#6B6055] font-normal tracking-wide max-w-xl"
            >
              Second-year CS student. ML builder. Meerut.
            </motion.p>
          </div>

          {/* Bottom border & arrow scroll indicator */}
          <div className="absolute bottom-0 left-[5vw] right-[5vw] border-b border-[#E8DDD3] pb-6 flex items-center justify-between pointer-events-none">
            <span className="text-[10px] font-mono text-[#6B6055] uppercase tracking-widest">
              Scroll Down
            </span>
            <motion.div
              animate={{
                y: [0, 6, 0],
                opacity: hasScrolled ? 0 : 0.6,
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-4 h-4 text-[#E8531A] transition-opacity duration-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </motion.div>
          </div>
        </section>

        {/* Section 2: PROJECTS */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionReveal}
          className="py-24 px-[5vw]"
        >
          {/* Section labels */}
          <div className="mb-10">
            <span className="text-[11px] font-bold font-mono tracking-[0.12em] text-[#6B6055] uppercase">
              SELECTED WORK
            </span>
            <h2 className="text-3xl md:text-[42px] font-heading font-bold text-[#111111] mt-2">
              What I&apos;ve built.
            </h2>
          </div>

          {/* Stacked Row list projects */}
          <motion.div variants={staggerContainer} className="flex flex-col border-t border-[#E8DDD3]">
            {projects.map((project, idx) => (
              <motion.div
                variants={sectionReveal}
                key={project.num}
                className="card-row flex flex-col md:flex-row items-start justify-between py-10 gap-8"
              >
                {/* Number label */}
                <div className="text-[48px] font-heading font-bold text-[#E8DDD3] leading-none md:w-16">
                  {project.num}
                </div>

                {/* Content body info */}
                <div className="flex-1 max-w-2xl flex flex-col gap-3">
                  <div className="flex items-center gap-4 flex-wrap">
                    <h3 className="text-xl md:text-2xl font-bold font-heading text-[#111111]">
                      {project.title}
                    </h3>
                    {project.tag && (
                      <span className="text-[11px] font-bold text-[#E8531A] bg-[#FFF0E5] border border-[#FFDCCA] px-3 py-1 rounded-full">
                        {project.tag}
                      </span>
                    )}
                  </div>

                  {/* Pills stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] bg-[#FFF7EE] border border-[#E8DDD3] text-[#E8531A] px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-[#6B6055] text-sm leading-relaxed font-normal mt-2">
                    {project.desc}
                  </p>
                </div>

                {/* Right external arrow link */}
                <div className="flex items-center">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6B6055] hover:text-[#E8531A] p-2 hover:bg-[#FFF0E5] rounded-full transition-colors duration-300"
                    aria-label={`View GitHub for ${project.title}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="28"
                      height="28"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Section 3: SKILLS (Infinite loop marquees) */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionReveal}
          className="py-24 bg-[#FFF7EE] border-y border-[#E8DDD3]"
        >
          <div className="px-[5vw] mb-12">
            <span className="text-[11px] font-bold font-mono tracking-[0.12em] text-[#6B6055] uppercase">
              SKILLS &amp; CONCEPTS
            </span>
            <h2 className="text-3xl md:text-[42px] font-heading font-bold text-[#111111] mt-2">
              Things I know.
            </h2>
          </div>

          <div className="marquee-container">
            {/* Row 1 marquee tape */}
            <div className="marquee-track marquee-row-1">
              {[...marqueeRow1, ...marqueeRow1].map((skill, index) => (
                <div
                  key={index}
                  className="bg-[#FFF7EE] border border-[#E8DDD3] text-[#111111] hover:bg-[#FFF0E5] hover:text-[#E8531A] font-heading text-[13px] font-medium px-5 py-2.5 rounded-full whitespace-nowrap transition-colors cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>

            {/* Row 2 marquee tape */}
            <div className="marquee-track marquee-row-2">
              {[...marqueeRow2, ...marqueeRow2].map((concept, index) => (
                <div
                  key={index}
                  className="bg-[#FFF7EE] border border-[#E8DDD3] text-[#111111] hover:bg-[#FFF0E5] hover:text-[#E8531A] font-heading text-[13px] font-medium px-5 py-2.5 rounded-full whitespace-nowrap transition-colors cursor-default"
                >
                  {concept}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 4: CONNECT */}
        <motion.section
          id="connect"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionReveal}
          className="py-24 px-[5vw] max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* LEFT: Social outreach */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-[11px] font-bold font-mono tracking-[0.12em] text-[#6B6055] uppercase">
                  GET IN TOUCH
                </span>
                <h2 className="text-3xl md:text-[42px] font-heading font-bold text-[#111111] mt-2">
                  Find me here
                </h2>
              </div>

              <div className="flex flex-col border-t border-[#E8DDD3]">
                {[
                  {
                    name: 'GitHub',
                    handle: 'github.com/ritikteotia',
                    href: 'https://github.com/ritikteotia',
                    path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
                  },
                  {
                    name: 'LinkedIn',
                    handle: 'linkedin.com/in/ritikteotia',
                    href: 'https://linkedin.com/in/ritikteotia',
                    path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z',
                  },
                  {
                    name: 'Email',
                    handle: 'ritikteotiaone4@gmail.com',
                    href: 'mailto:ritikteotiaone4@gmail.com',
                    path: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between py-6 border-b border-[#E8DDD3] hover:bg-[#FFF0E5] hover:px-4 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#6B6055] group-hover:text-[#E8531A] transition-colors"
                      >
                        {social.name === 'Email' ? (
                          <>
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </>
                        ) : (
                          <path d={social.path} />
                        )}
                      </svg>
                      <span className="font-heading font-bold text-[#111111]">
                        {social.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#6B6055] group-hover:text-[#E8531A]">
                      <span className="hidden sm:inline">{social.handle}</span>
                      <span>↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT: Message Form */}
            <div className="bg-[#FFF7EE] border border-[#E8DDD3] p-8 rounded-2xl flex flex-col gap-6">
              <label className="font-heading font-semibold text-lg md:text-xl text-[#111111] leading-tight">
                {dynamicQuestion}
              </label>

              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-green-700 bg-green-50 border border-green-200 px-4 py-4 rounded-xl font-medium"
                >
                  Message sent! I&apos;ll reply soon.
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="form-name" className="text-[10px] font-bold font-mono text-[#6B6055] uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-4 py-3 bg-[#FFFDF8] border border-[#E8DDD3] rounded-xl text-sm focus:outline-none focus:border-[#E8531A] transition-colors"
                      placeholder="Name"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="form-email" className="text-[10px] font-bold font-mono text-[#6B6055] uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-3 bg-[#FFFDF8] border border-[#E8DDD3] rounded-xl text-sm focus:outline-none focus:border-[#E8531A] transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="form-answer" className="text-[10px] font-bold font-mono text-[#6B6055] uppercase tracking-wider">
                      Your Answer
                    </label>
                    <textarea
                      id="form-answer"
                      rows={4}
                      required
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="px-4 py-3 bg-[#FFFDF8] border border-[#E8DDD3] rounded-xl text-sm focus:outline-none focus:border-[#E8531A] transition-colors resize-none"
                      placeholder="Type your message here..."
                    />
                  </div>

                  {formStatus === 'error' && (
                    <div className="text-xs text-red-600 font-medium">
                      Something went wrong. Try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="py-3.5 bg-[#E8531A] hover:bg-[#F5A623] text-white font-heading text-sm font-semibold rounded-xl tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300"
                  >
                    {formStatus === 'sending' ? 'Sending...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-[#E8DDD3] py-8 px-[5vw] flex items-center justify-between text-xs font-mono text-[#6B6055]">
          <div>&copy; 2026 Ritik Kumar</div>
          <div>Built with Next.js</div>
        </footer>
      </main>
    </>
  );
}
