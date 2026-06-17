'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isHidden = true;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (isHidden) {
        cursor.style.opacity = '1';
        isHidden = false;
      }
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
      isHidden = true;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId = 0;
    const animateCursor = () => {
      const ease = 0.15; // smooth delay multiplier
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animationFrameId = requestAnimationFrame(animateCursor);

    // Make cursor disappear on clickable components
    const handleLinkHover = () => {
      cursor.style.width = '24px';
      cursor.style.height = '24px';
      cursor.style.backgroundColor = 'rgba(34, 211, 238, 0.4)';
    };

    const handleLinkLeave = () => {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      cursor.style.backgroundColor = '';
    };

    const addHoverListeners = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], input, textarea');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', handleLinkHover);
        el.addEventListener('mouseleave', handleLinkLeave);
      });
    };

    addHoverListeners();

    // Set up observer for dynamically added buttons
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden md:block opacity-0 transition-opacity duration-300"
    />
  );
}
