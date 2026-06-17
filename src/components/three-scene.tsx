'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 5;

    // Create WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Grid Plane depth cue
    const gridHelper = new THREE.GridHelper(40, 40, 0x1A1914, 0x1A1914);
    gridHelper.position.y = -2.5;
    scene.add(gridHelper);

    // 2. Wireframe Icosahedron
    const icoGeom = new THREE.IcosahedronGeometry(2.2, 1);
    const wireframe = new THREE.WireframeGeometry(icoGeom);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xFF5C00,
      opacity: 0.06,
      transparent: true,
    });
    const icoLine = new THREE.LineSegments(wireframe, lineMat);
    scene.add(icoLine);

    // 3. Floating Rings Torus Geometries
    const torusMat = new THREE.LineBasicMaterial({
      color: 0xFFFFFF,
      opacity: 0.04,
      transparent: true,
    });

    const ring1Geom = new THREE.TorusGeometry(1.4, 0.003, 8, 100);
    const ring1 = new THREE.Line(ring1Geom, torusMat);
    ring1.position.set(-0.2, 0.1, 0);
    ring1.rotation.set(Math.PI / 4, Math.PI / 6, 0);
    scene.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(0.9, 0.003, 8, 60);
    const ring2 = new THREE.Line(ring2Geom, torusMat);
    ring2.position.set(0.3, -0.2, 0);
    ring2.rotation.set(-Math.PI / 3, Math.PI / 4, 0);
    scene.add(ring2);

    const ring3Geom = new THREE.TorusGeometry(2.0, 0.002, 8, 80);
    const ring3 = new THREE.Line(ring3Geom, torusMat);
    ring3.position.set(-0.1, -0.3, 0);
    ring3.rotation.set(Math.PI / 2, -Math.PI / 5, 0);
    scene.add(ring3);

    // 4. Particle Network (limit count on mobile for performance)
    const isMobile = width < 768;
    const particleCount = isMobile ? 400 : 800;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);

    const radius = 3.2;
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * Math.cbrt(Math.random());

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xFF5C00,
      size: 0.015,
      opacity: 0.4,
      transparent: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Mouse positions
    const mouse = new THREE.Vector2(-999, -999);
    const targetMouse = new THREE.Vector2(-999, -999);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation frames loop
    let animationFrameId = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Lerp mouse positions
      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;

      // Rotations
      particles.rotation.y += 0.0003;
      icoLine.rotation.x += 0.0005;
      icoLine.rotation.y += 0.0003;

      ring1.rotation.x += 0.0002;
      ring1.rotation.y += 0.0003;
      ring2.rotation.y -= 0.0004;
      ring2.rotation.z += 0.0002;
      ring3.rotation.x -= 0.0001;
      ring3.rotation.z += 0.0003;

      // Particle attraction pull
      if (mouse.x !== -999) {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const target = new THREE.Vector3();
        raycaster.ray.intersectPlane(planeZ, target);

        const posAttr = particleGeom.attributes.position;
        const array = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          const initX = initialPositions[idx];
          const initY = initialPositions[idx + 1];
          const initZ = initialPositions[idx + 2];

          const rotY = particles.rotation.y;
          const rotatedX = initX * Math.cos(rotY) - initZ * Math.sin(rotY);
          const rotatedZ = initX * Math.sin(rotY) + initZ * Math.cos(rotY);

          const dx = target.x - rotatedX;
          const dy = target.y - initY;
          const dz = target.z - rotatedZ;
          const distance = Math.hypot(dx, dy, dz);

          const pullRadius = 1.8;
          if (distance < pullRadius) {
            const pullForce = (pullRadius - distance) / pullRadius;
            const pullOffset = 0.3 * pullForce; // max pull offset is 0.3
            array[idx] = rotatedX + (dx / distance) * pullOffset;
            array[idx + 1] = initY + (dy / distance) * pullOffset;
            array[idx + 2] = rotatedZ + (dz / distance) * pullOffset;
          } else {
            array[idx] = rotatedX;
            array[idx + 1] = initY;
            array[idx + 2] = rotatedZ;
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      icoGeom.dispose();
      wireframe.dispose();
      lineMat.dispose();
      torusMat.dispose();
      ring1Geom.dispose();
      ring2Geom.dispose();
      ring3Geom.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 bg-transparent"
    />
  );
}
