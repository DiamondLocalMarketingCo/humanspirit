"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties, Ref } from "react";

type GlobeControls = {
  autoRotate: boolean;
  autoRotateSpeed: number;
  enableZoom: boolean;
  enablePan: boolean;
};

type GlobeRef = {
  controls: () => GlobeControls;
};

const Globe = dynamic(
  () => import("react-globe.gl").then((mod) => mod.default as unknown as ComponentType<{ style: CSSProperties; ref?: Ref<GlobeRef>; [key: string]: unknown }>),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-[#020407]" />,
  }
) as ComponentType<{ style: CSSProperties; ref?: Ref<GlobeRef>; [key: string]: unknown }>;

const arcsData = [
  { startLat: 37.7749, startLng: -122.4194, endLat: 51.5074, endLng: -0.1278 },
  { startLat: 34.0522, startLng: -118.2437, endLat: 35.6895, endLng: 139.6917 },
  { startLat: 55.7558, startLng: 37.6173, endLat: -33.8688, endLng: 151.2093 },
  { startLat: 1.3521, startLng: 103.8198, endLat: 48.8566, endLng: 2.3522 },
  { startLat: -23.5505, startLng: -46.6333, endLat: 40.7128, endLng: -74.0060 },
];

export default function GlobeClient() {
  const globeRef = useRef<GlobeRef | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 520, height: 520 });

  const handleGlobeReady = useCallback(() => {
    requestAnimationFrame(() => {
      const controls = globeRef.current?.controls?.();
      if (!controls) return;

      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.22;
      controls.enableZoom = false;
      controls.enablePan = false;
    });
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      const width = Math.max(420, Math.min(1400, Math.round(rect.width)));
      const height = Math.max(420, Math.min(1400, Math.round(rect.height)));
      setDimensions({ width, height });
    };

    updateSize();

    const observer = new ResizeObserver(() => requestAnimationFrame(updateSize));
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full min-h-[320px]">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ width: "100%", height: "100%" }}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="rgba(94,234,255,0.16)"
        atmosphereAltitude={0.22}
        onGlobeReady={handleGlobeReady}
        arcsData={arcsData}
        arcColor={() => ["rgba(94,214,255,0.92)", "rgba(10,16,23,0.0)"]}
        arcStroke={0.6}
        arcAltitude={0.12}
        arcDashLength={0.32}
        arcDashGap={2}
        arcDashAnimateTime={5000}
        arcDashInitialGap={1}
        arcsTransitionDuration={0}
        enablePointerInteraction
        enableDefocus
        globeGlowColor="rgba(94,214,255,0.08)"
      />
    </div>
  );
}
