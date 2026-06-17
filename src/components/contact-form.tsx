'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [dynamicQuestion, setDynamicQuestion] = useState('What are you working on?');
  const [destinationEmail, setDestinationEmail] = useState('ritikteotiaone4@gmail.com');

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Retrieve custom question and destination email from settings dashboard in localStorage
    const storedQuestion = localStorage.getItem('portfolio_question');
    const storedEmail = localStorage.getItem('portfolio_email');
    if (storedQuestion) setDynamicQuestion(storedQuestion);
    if (storedEmail) setDestinationEmail(storedEmail);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // EmailJS credentials should be loaded from env
    // NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
    // NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
    // NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

    // If EmailJS keys are not provided, fallback to direct mailto client
    if (!serviceId || !templateId || !publicKey) {
      setTimeout(() => {
        const subject = encodeURIComponent(`Outreach from Portfolio - ${name}`);
        const mailBody = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\nQuestion: ${dynamicQuestion}\nMessage:\n${answer}`
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
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setFormStatus('error');
        }
      );
  };

  return (
    <div className="bg-surface border border-border-warm p-8 rounded-2xl flex flex-col gap-6 w-full">
      <label className="font-heading font-semibold text-xl md:text-2xl text-text-1 leading-tight">
        {dynamicQuestion}
      </label>

      <AnimatePresence mode="wait">
        {formStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-sm text-brand-green py-8 text-center"
          >
            Sent. I&apos;ll get back to you.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-5"
          >
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className="font-mono text-[10px] font-semibold text-text-2 tracking-widest uppercase"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-3 bg-surface-2 border border-border-warm rounded-xl text-sm text-text-1 focus:outline-none focus:border-accent transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                className="font-mono text-[10px] font-semibold text-text-2 tracking-widest uppercase"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 bg-surface-2 border border-border-warm rounded-xl text-sm text-text-1 focus:outline-none focus:border-accent transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Answer Textarea */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-answer"
                className="font-mono text-[10px] font-semibold text-text-2 tracking-widest uppercase"
              >
                Answer
              </label>
              <textarea
                id="contact-answer"
                rows={4}
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="px-4 py-3 bg-surface-2 border border-border-warm rounded-xl text-sm text-text-1 focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Tell me more..."
              />
            </div>

            {formStatus === 'error' && (
              <div className="text-xs text-red-500 font-mono text-center">
                Something went wrong. Try again.
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={formStatus === 'sending'}
              whileHover={{ scale: 0.99 }}
              className="mt-2 w-full py-3.5 bg-accent hover:opacity-88 text-white font-mono text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-opacity"
            >
              {formStatus === 'sending' ? 'Sending...' : 'Send it →'}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
