import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const PALETTE = [new THREE.Color("#22d3ee"), new THREE.Color("#818cf8"), new THREE.Color("#34d399")];

const pointVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixel;
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    vColor = color;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float size = 1.6 + 3.2 * fract(aSeed * 7.13);
    gl_PointSize = size * uPixel * (9.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
    vTwinkle = 0.55 + 0.45 * sin(uTime * 1.7 + aSeed * 40.0);
  }
`;

const pointFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    float glow = smoothstep(0.5, 0.15, d) * 0.6;
    gl_FragColor = vec4(vColor * (1.0 + core), (core + glow) * vTwinkle);
  }
`;

type Pointer = { x: number; y: number };

function Network({ count, pointer, reduced }: { count: number; pointer: React.MutableRefObject<Pointer>; reduced: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const packetsRef = useRef<THREE.Points>(null!);

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere with radial noise: an even "globe of nodes".
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * 2.399963;
      const radius = 3.1 + (Math.random() - 0.5) * 1.1;
      positions.set([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius], i * 3);
      const t = (y + 1) / 2;
      tmp.copy(PALETTE[0]).lerp(PALETTE[1], t).lerp(PALETTE[2], Math.max(0, Math.sin(theta) * 0.6));
      colors.set([tmp.r, tmp.g, tmp.b], i * 3);
      seeds[i] = Math.random();
    }

    const edges: [number, number][] = [];
    const max = 1.15 * 1.15;
    for (let i = 0; i < count; i++) {
      let links = 0;
      for (let j = i + 1; j < count && links < 4; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < max) {
          edges.push([i, j]);
          links++;
        }
      }
    }
    const linePositions = new Float32Array(edges.length * 6);
    const lineColors = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], k) => {
      linePositions.set([positions[a * 3], positions[a * 3 + 1], positions[a * 3 + 2], positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2]], k * 6);
      lineColors.set([colors[a * 3], colors[a * 3 + 1], colors[a * 3 + 2], colors[b * 3], colors[b * 3 + 1], colors[b * 3 + 2]], k * 6);
    });

    // "Data packets" that travel along random edges.
    const packetCount = Math.min(70, edges.length);
    const packets = Array.from({ length: packetCount }, () => ({
      edge: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: 0.25 + Math.random() * 0.6,
    }));
    const packetPositions = new Float32Array(packetCount * 3);
    return { positions, colors, seeds, edges, linePositions, lineColors, packets, packetPositions };
  }, [count]);

  const pointsMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uPixel: { value: Math.min(window.devicePixelRatio, 1.75) } },
        vertexShader: pointVertex,
        fragmentShader: pointFragment,
        transparent: true,
        depthWrite: false,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    pointsMaterial.uniforms.uTime.value = t;
    const scroll = window.scrollY / window.innerHeight;
    const g = group.current;
    if (!reduced) {
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, t * 0.06 + pointer.current.x * 0.45 + scroll * 0.9, 2.5, dt);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.25 + scroll * 0.25, 2.5, dt);
    }
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 9.5 + Math.min(scroll, 2) * 2.2, 3, dt);

    const { packets, edges, positions, packetPositions } = data;
    packets.forEach((p, k) => {
      p.t += dt * p.speed * (reduced ? 0 : 1);
      if (p.t > 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * edges.length);
      }
      const [a, b] = edges[p.edge];
      for (let c = 0; c < 3; c++) packetPositions[k * 3 + c] = positions[a * 3 + c] + (positions[b * 3 + c] - positions[a * 3 + c]) * p.t;
    });
    packetsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <points material={pointsMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[data.colors, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[data.seeds, 1]} />
        </bufferGeometry>
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[data.lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <points ref={packetsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.packetPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#e0f2fe" size={0.07} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.4}>
        <mesh>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.35} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.55} />
        </mesh>
      </Float>
    </group>
  );
}

export default function NetworkCanvas({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9.5], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <group position={mobile ? [0, -0.5, -2] : [2.6, 0.1, 0]}>
        <Network count={mobile ? 220 : 520} pointer={pointer} reduced={reduced} />
      </group>
      <Sparkles count={mobile ? 40 : 90} scale={[16, 10, 6]} size={1.6} speed={0.25} opacity={0.5} color="#a5f3fc" />
    </Canvas>
  );
}
