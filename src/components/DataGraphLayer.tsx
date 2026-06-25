'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './DataGraphLayer.module.css';

/**
 * Signature visual element: a drifting node-and-edge graph, evoking a
 * scatter plot / network diagram breathing in the dark. Nodes drift on
 * slow sine paths; edges connect nearby nodes and fade with distance;
 * occasional pulses travel along edges. Mouse position gently parallaxes
 * the camera. This stands in for the "talking head" hero asset, but ties
 * the cinematic motion directly to the subject (data) instead of generic
 * bokeh particles.
 */

const NODE_COUNT = 90;
const MAX_LINK_DIST = 1.6;
const FIELD_RADIUS = 9;

export default function DataGraphLayer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 11;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Node field ---
    const colorMustard = new THREE.Color('#E8A33D');
    const colorBurnt = new THREE.Color('#E8924A');
    const colorPaper = new THREE.Color('#F4F1EA');

    type Node = {
      base: THREE.Vector3;
      phase: number;
      speed: number;
      amp: number;
    };

    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const r = FIELD_RADIUS * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const base = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta) * 1.4,
        r * Math.sin(phi) * Math.sin(theta) * 0.9,
        r * Math.cos(phi) * 0.6 - 2
      );
      nodes.push({
        base,
        phase: Math.random() * Math.PI * 2,
        speed: 0.15 + Math.random() * 0.18,
        amp: 0.25 + Math.random() * 0.35,
      });
    }

    const positions = new Float32Array(NODE_COUNT * 3);
    const colors = new Float32Array(NODE_COUNT * 3);
    const sizes = new Float32Array(NODE_COUNT);

    for (let i = 0; i < NODE_COUNT; i++) {
      const c = Math.random();
      const col = c < 0.55 ? colorPaper : c < 0.85 ? colorMustard : colorBurnt;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
      sizes[i] = 3 + Math.random() * 5;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    pointsGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const pointsMat = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const pointCloud = new THREE.Points(pointsGeo, pointsMat);
    scene.add(pointCloud);

    // --- Edges (line segments between near nodes) ---
    const maxEdges = NODE_COUNT * 6;
    const edgePositions = new Float32Array(maxEdges * 2 * 3);
    const edgeOpacities = new Float32Array(maxEdges * 2);
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(edgePositions, 3)
    );
    edgeGeo.setAttribute(
      'opacity',
      new THREE.BufferAttribute(edgeOpacities, 1)
    );

    const edgeMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color('#E8A33D') },
      },
      vertexShader: `
        attribute float opacity;
        varying float vOpacity;
        void main() {
          vOpacity = opacity;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vOpacity;
        void main() {
          gl_FragColor = vec4(uColor, vOpacity * 0.1);
        }
      `,
    });

    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edgeLines);

    // --- Mouse parallax ---
    const mouse = { x: 0, y: 0 };
    const targetCamRot = { x: 0, y: 0 };

    function handlePointerMove(e: PointerEvent) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener('pointermove', handlePointerMove);

    // --- Resize ---
    function handleResize() {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', handleResize);

    // --- Animation loop ---
    let frameId: number;
    const clock = new THREE.Clock();
    const tmpVecs: THREE.Vector3[] = nodes.map(() => new THREE.Vector3());

    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const dt = prefersReducedMotion ? 0 : 1;

      // Update node positions (sine drift)
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];
        const drift = dt
          ? new THREE.Vector3(
              Math.sin(t * n.speed + n.phase) * n.amp,
              Math.cos(t * n.speed * 0.8 + n.phase) * n.amp,
              Math.sin(t * n.speed * 0.6 + n.phase) * n.amp * 0.6
            )
          : new THREE.Vector3();
        const p = tmpVecs[i].copy(n.base).add(drift);
        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;
      }
      pointsGeo.attributes.position.needsUpdate = true;

      // Rebuild edges among near neighbors (throttled by recomputation each frame; cheap due to N=70)
      let edgeIdx = 0;
      for (let i = 0; i < NODE_COUNT && edgeIdx < maxEdges; i++) {
        for (let j = i + 1; j < NODE_COUNT && edgeIdx < maxEdges; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < MAX_LINK_DIST) {
            const o = 1 - dist / MAX_LINK_DIST;
            edgePositions[edgeIdx * 6] = positions[i * 3];
            edgePositions[edgeIdx * 6 + 1] = positions[i * 3 + 1];
            edgePositions[edgeIdx * 6 + 2] = positions[i * 3 + 2];
            edgePositions[edgeIdx * 6 + 3] = positions[j * 3];
            edgePositions[edgeIdx * 6 + 4] = positions[j * 3 + 1];
            edgePositions[edgeIdx * 6 + 5] = positions[j * 3 + 2];
            edgeOpacities[edgeIdx * 2] = o;
            edgeOpacities[edgeIdx * 2 + 1] = o;
            edgeIdx++;
          }
        }
      }
      // Zero out unused edge slots
      for (let k = edgeIdx; k < maxEdges; k++) {
        edgeOpacities[k * 2] = 0;
        edgeOpacities[k * 2 + 1] = 0;
      }
      edgeGeo.attributes.position.needsUpdate = true;
      edgeGeo.attributes.opacity.needsUpdate = true;

      // Camera parallax
      targetCamRot.x += (mouse.y * 0.15 - targetCamRot.x) * 0.04;
      targetCamRot.y += (mouse.x * 0.2 - targetCamRot.y) * 0.04;
      camera.position.x = targetCamRot.y * 1.2;
      camera.position.y = -targetCamRot.x * 1.2;
      camera.lookAt(0, 0, -2);

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      pointsGeo.dispose();
      pointsMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.canvasHost} aria-hidden="true" />;
}
