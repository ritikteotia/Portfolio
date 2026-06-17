'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Settings states
  const [contactQuestion, setContactQuestion] = useState('');
  const [inboxEmail, setInboxEmail] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Check sessionStorage authentication on load
    const authStatus = sessionStorage.getItem('admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadSettings();
    }
  }, []);

  const loadSettings = () => {
    const question = localStorage.getItem('portfolio_question') || 'What would you like to work on together?';
    const email = localStorage.getItem('portfolio_email') || 'ritikteotiaone4@gmail.com';
    setContactQuestion(question);
    setInboxEmail(email);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'; // fallback for dev
    
    if (password === correctPassword) {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setPasswordError(false);
      loadSettings();
    } else {
      setPasswordError(true);
      // Reset error after 0.5s (to allow shake animation to repeat)
      setTimeout(() => setPasswordError(false), 500);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('portfolio_question', contactQuestion);
    localStorage.setItem('portfolio_email', inboxEmail);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setPassword('');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex items-center justify-center p-6 text-[#111111]">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* Step 1: Password Gate Form */
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-sm bg-[#FFF7EE] border border-[#E8DDD3] p-8 rounded-2xl"
          >
            <h1 className="font-heading text-2xl font-bold mb-6 text-center text-[#111111]">
              Admin Login
            </h1>

            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-[#6B6055] tracking-widest uppercase">
                  Password
                </label>
                <motion.input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`px-4 py-3 bg-[#FFFDF8] border rounded-xl text-sm focus:outline-none focus:border-[#E8531A] transition-colors ${
                    passwordError ? 'border-red-500 animate-shake' : 'border-[#E8DDD3]'
                  }`}
                  placeholder="••••••••"
                  animate={passwordError ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {passwordError && (
                <div className="text-xs text-red-500 text-center font-medium">
                  Incorrect password.
                </div>
              )}

              <button
                type="submit"
                className="py-3 bg-[#E8531A] hover:bg-[#F5A623] text-white font-heading text-sm font-semibold rounded-xl transition-colors w-full cursor-pointer"
              >
                Enter
              </button>
            </form>
          </motion.div>
        ) : (
          /* Step 2: Settings Panel UI */
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-lg bg-[#FFF7EE] border border-[#E8DDD3] p-8 rounded-2xl flex flex-col gap-6"
          >
            <div>
              <h1 className="font-heading text-3xl font-extrabold text-[#111111] mb-1">
                Portfolio Settings
              </h1>
              <p className="text-xs text-[#6B6055]">Customize your homepage contact parameters</p>
            </div>

            <form onSubmit={handleSaveSettings} className="flex flex-col gap-5">
              {/* Question Textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-[#6B6055] tracking-widest uppercase">
                  Contact Question
                </label>
                <textarea
                  rows={3}
                  required
                  value={contactQuestion}
                  onChange={(e) => setContactQuestion(e.target.value)}
                  className="px-4 py-3 bg-[#FFFDF8] border border-[#E8DDD3] rounded-xl text-sm text-[#111111] focus:outline-none focus:border-[#E8531A] transition-colors resize-none"
                  placeholder="What would you like to work on together?"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-[#6B6055] tracking-widest uppercase">
                  Your Email (receives messages)
                </label>
                <input
                  type="email"
                  required
                  value={inboxEmail}
                  onChange={(e) => setInboxEmail(e.target.value)}
                  className="px-4 py-3 bg-[#FFFDF8] border border-[#E8DDD3] rounded-xl text-sm text-[#111111] focus:outline-none focus:border-[#E8531A] transition-colors"
                  placeholder="ritikteotiaone4@gmail.com"
                />
              </div>

              {/* Submit Button & Confirmation */}
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className="py-3 bg-[#E8531A] hover:bg-[#F5A623] text-white font-heading text-sm font-semibold rounded-xl transition-colors w-full cursor-pointer"
                >
                  Save Changes
                </button>

                <AnimatePresence>
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-green-600 font-medium text-center"
                    >
                      Saved!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>

            <div className="border-t border-[#E8DDD3] pt-4 flex flex-col items-center gap-4">
              <a
                href="#"
                onClick={handleLogout}
                className="text-xs text-[#E8531A] hover:text-[#F5A623] font-semibold font-heading transition-colors"
              >
                Log out
              </a>
              
              <div className="text-[10px] text-[#6B6055] text-center leading-normal max-w-xs">
                Settings are stored in this browser. Open /admin on any device to update the question and email.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
