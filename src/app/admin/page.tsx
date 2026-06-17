'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Settings states
  const [contactQuestion, setContactQuestion] = useState('');
  const [inboxEmail, setInboxEmail] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    // Check authentication on mount
    const authStatus = sessionStorage.getItem('rk_admin');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadSettings();
    }
  }, []);

  const loadSettings = () => {
    const question = localStorage.getItem('portfolio_question') || 'What are you working on?';
    const email = localStorage.getItem('portfolio_email') || 'ritikteotiaone4@gmail.com';
    setContactQuestion(question);
    setInboxEmail(email);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    
    if (password === correctPassword) {
      sessionStorage.setItem('rk_admin', 'true');
      setIsAuthenticated(true);
      setPasswordError(false);
      loadSettings();
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 500);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('portfolio_question', contactQuestion);
    localStorage.setItem('portfolio_email', inboxEmail);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleResetSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('portfolio_question');
    localStorage.removeItem('portfolio_email');
    setContactQuestion('What are you working on?');
    setInboxEmail('ritikteotiaone4@gmail.com');
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2000);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.removeItem('rk_admin');
    setIsAuthenticated(false);
    setPassword('');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 text-text-1">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* Step 1: Password Gate Card */
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm bg-surface border border-border-warm p-8 rounded-2xl flex flex-col items-center"
          >
            <div className="font-heading text-3.5xl font-black text-accent tracking-tighter mb-6">
              Ritik Kumar
            </div>

            <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] font-semibold text-text-2 tracking-widest uppercase">
                  Password
                </label>
                <motion.input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`px-4 py-3 bg-surface-2 border rounded-xl text-sm focus:outline-none focus:border-accent transition-colors ${
                    passwordError ? 'border-red-500' : 'border-border-warm'
                  }`}
                  placeholder="••••••••"
                  animate={passwordError ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {passwordError && (
                <div className="text-xs text-red-500 text-center font-medium font-mono">
                  Incorrect password
                </div>
              )}

              <button
                type="submit"
                className="py-3 bg-accent hover:opacity-88 text-white font-heading text-sm font-semibold rounded-xl cursor-pointer transition-opacity"
              >
                Enter
              </button>
            </form>
          </motion.div>
        ) : (
          /* Step 2: Settings Panel UI */
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg bg-surface border border-border-warm p-8 rounded-2xl flex flex-col gap-6"
          >
            <div>
              <h1 className="font-heading text-2.5xl font-bold text-text-1">
                Site Settings
              </h1>
              <div className="h-[0.5px] bg-border-warm mt-4" />
            </div>

            <form onSubmit={handleSaveSettings} className="flex flex-col gap-5">
              {/* Question Textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] font-semibold text-text-2 tracking-widest uppercase">
                  Contact question shown to visitors
                </label>
                <textarea
                  rows={3}
                  required
                  value={contactQuestion}
                  onChange={(e) => setContactQuestion(e.target.value)}
                  className="px-4 py-3 bg-surface-2 border border-border-warm rounded-xl text-sm text-text-1 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="What are you working on?"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] font-semibold text-text-2 tracking-widest uppercase">
                  Your email (receives messages)
                </label>
                <input
                  type="email"
                  required
                  value={inboxEmail}
                  onChange={(e) => setInboxEmail(e.target.value)}
                  className="px-4 py-3 bg-surface-2 border border-border-warm rounded-xl text-sm text-text-1 focus:outline-none focus:border-accent transition-colors"
                  placeholder="ritikteotiaone4@gmail.com"
                />
              </div>

              {/* Submit & Feedbacks */}
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className="py-3 bg-accent hover:opacity-88 text-white font-heading text-sm font-semibold rounded-xl cursor-pointer transition-opacity w-full"
                >
                  Save
                </button>

                <AnimatePresence>
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-brand-green font-medium text-center font-mono"
                    >
                      Saved ✓
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>

            {/* Danger Zone */}
            <div className="h-[0.5px] bg-border-warm my-2" />

            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-6 text-xs font-semibold font-heading">
                <a
                  href="#"
                  onClick={handleLogout}
                  className="text-accent hover:opacity-80 transition-opacity"
                >
                  Log out
                </a>
                
                <a
                  href="#"
                  onClick={handleResetSettings}
                  className="text-text-2 hover:text-text-1 transition-colors"
                >
                  Reset to defaults
                </a>
              </div>

              <AnimatePresence>
                {resetSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-brand-green font-mono"
                  >
                    Reset ✓
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="font-mono text-[11px] text-text-3 text-center">
                Settings live in this browser&apos;s localStorage.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
