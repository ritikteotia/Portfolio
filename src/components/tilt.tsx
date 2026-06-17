'use client';

import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: any;
  glowColor?: string;
  children: React.ReactNode;
}

export default function Tilt({ options, glowColor, children, ...props }: TiltProps) {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;

    // Default vanilla-tilt configurations
    const defaultOptions = {
      max: 8,
      perspective: 1200,
      scale: 1.02,
      speed: 400,
      glare: false,
      gyroscope: true,
      ...options,
    };

    VanillaTilt.init(el, defaultOptions);

    return () => {
      if ((el as any).vanillaTilt) {
        (el as any).vanillaTilt.destroy();
      }
    };
  }, [options]);

  const customStyle = glowColor
    ? {
        ...props.style,
        '--hover-glow-border': glowColor,
        '--hover-glow-shadow': glowColor.replace('0.2', '0.12'),
      } as React.CSSProperties
    : props.style;

  return (
    <div ref={tiltRef} {...props} style={customStyle}>
      {children}
    </div>
  );
}
