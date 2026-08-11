import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Each part: assembled Y position, explode direction, and a cylinder profile
// [radiusTop, radiusBottom, height, radialSegments].
const PARTS = [
  { name: "Injector",   baseY: 1.78, dir: 1.15, prof: [0.22, 0.55, 0.34, 40] },
  { name: "Plate",      baseY: 1.46, dir: 0.7,  prof: [0.6, 0.6, 0.12, 44] },
  { name: "Chamber",    baseY: 0.55, dir: 0.0,  prof: [0.55, 0.55, 1.5, 44] },
  { name: "Throat",     baseY: -0.42, dir: -0.7, prof: [0.55, 0.26, 0.5, 40] },
  { name: "Bell nozzle", baseY: -1.4, dir: -1.25, prof: [0.26, 0.95, 1.35, 48] },
];

function Engine({ targetRef }) {
  const group = useRef();
  const refs = useRef([]);
  const cur = useRef(0);

  useFrame(() => {
    // Ease current explode toward the slider target.
    cur.current += (targetRef.current - cur.current) * 0.12;
    const e = cur.current;
    PARTS.forEach((p, i) => {
      const m = refs.current[i];
      if (m) m.position.y = p.baseY + p.dir * e;
    });
  });

  return (
    <group ref={group} rotation={[0, 0, 0]}>
      {PARTS.map((p, i) => (
        <mesh
          key={p.name}
          ref={(el) => (refs.current[i] = el)}
          position={[0, p.baseY, 0]}
        >
          <cylinderGeometry args={p.prof} />
          <meshStandardMaterial
            color="#aebecb"
            metalness={0.65}
            roughness={0.34}
            flatShading={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function EngineViewer() {
  const targetRef = useRef(0);
  const [pct, setPct] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="viewer">
      <span className="v-corner tl">Bi-propellant engine · 1 kN</span>
      <span className="v-corner tr">Capstone</span>

      <Canvas
        camera={{ position: [3.3, 1.1, 3.7], fov: 42 }}
        dpr={[1, 2]}
        onPointerDown={() => setShowHint(false)}
      >
        <color attach="background" args={["#0d141a"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 3]} intensity={1.1} />
        <pointLight position={[-4, 2, -2]} intensity={40} color="#7fa8be" />
        <Engine targetRef={targetRef} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={!reduce}
          autoRotateSpeed={0.9}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={0.4}
          maxPolarAngle={Math.PI - 0.4}
        />
      </Canvas>

      <span className={"v-hint" + (showHint ? "" : " hide")}>Drag to rotate</span>

      <div className="v-controls">
        <label htmlFor="ex">
          Exploded view <b>{pct}%</b>
        </label>
        <input
          id="ex"
          type="range"
          min="0"
          max="100"
          value={pct}
          aria-label="Exploded view amount"
          onChange={(e) => {
            const v = Number(e.target.value);
            targetRef.current = v / 100;
            setPct(v);
            setShowHint(false);
          }}
        />
      </div>
    </div>
  );
}
