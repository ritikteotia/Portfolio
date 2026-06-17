'use client';

export default function Nav() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    const connectSection = document.getElementById('connect');
    if (connectSection) {
      connectSection.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-[#080807]/85 backdrop-blur-md border-b border-white/7 flex items-center justify-between px-[5vw]">
      {/* LEFT: Logo Monogram */}
      <a
        href="#"
        onClick={scrollToTop}
        className="font-mono text-base font-bold text-accent tracking-[0.08em] hover:opacity-80 transition-opacity"
      >
        Ritik Kumar
      </a>

      {/* RIGHT: Connect Button */}
      <button
        onClick={scrollToConnect}
        className="border border-accent text-accent bg-transparent hover:bg-accent-dim font-sans text-sm font-semibold rounded-full px-5 py-2 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
      >
        Connect <span>↗</span>
      </button>
    </header>
  );
}
