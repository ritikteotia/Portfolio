'use client';

import Particles, { ParticlesProvider, useParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function ParticlesWrapper() {
  const { loaded } = useParticlesProvider();

  // Render particles only when the provider registers the engine is loaded
  if (!loaded) {
    return <div className="absolute inset-0 -z-10 bg-transparent" />;
  }

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10 pointer-events-none"
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ['#7B5CF0', '#22D3EE', '#ffffff'],
          },
          links: {
            enable: false,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'out',
            },
            random: true,
            speed: 0.2, // slow drift
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 50, // very sparse
          },
          opacity: {
            value: { min: 0.1, max: 0.6 },
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 2.5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default function ParticleBackground() {
  return (
    <ParticlesProvider init={async (engine) => { await loadSlim(engine); }}>
      <ParticlesWrapper />
    </ParticlesProvider>
  );
}
