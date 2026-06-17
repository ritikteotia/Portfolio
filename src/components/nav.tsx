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
    <header className="sticky top-0 z-50 w-full h-16 bg-[#FFFDF8] border-b border-[#E8DDD3] flex items-center justify-between px-[5vw]">
      {/* LEFT: Name */}
      <a
        href="#"
        onClick={scrollToTop}
        className="font-heading text-lg font-bold text-[#111111] hover:text-[#E8531A] transition-colors"
      >
        Ritik Kumar
      </a>

      {/* RIGHT: Connect Button */}
      <a
        href="#connect"
        onClick={scrollToConnect}
        className="bg-[#E8531A] hover:bg-[#F5A623] text-white font-heading text-sm font-semibold rounded-full px-5 py-2 transition-colors duration-300"
      >
        Connect ↗
      </a>
    </header>
  );
}
