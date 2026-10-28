import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Room } from '../types/hotel';
import { formatINR } from '../utils/formatters';
import { 
  X, 
  Sun, 
  Sunset, 
  Moon, 
  RotateCw, 
  Maximize2, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';

interface Room3DViewerProps {
  room: Room;
  onClose: () => void;
  onBookNow: (room: Room) => void;
}

export const Room3DViewer: React.FC<Room3DViewerProps> = ({ room, onClose, onBookNow }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setSelectedRoomForBooking } = useHotel();

  // Lighting mode: daylight | sunset | dusk
  const [lightingMode, setLightingMode] = useState<'daylight' | 'sunset' | 'night'>('daylight');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene setup with Mediterranean coastal atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(
      lightingMode === 'night' ? 0x221d19 : lightingMode === 'sunset' ? 0xdfcbba : 0xf1ebe1
    );
    scene.fog = new THREE.FogExp2(scene.background.getHex(), 0.035);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(7, 5, 8);
    camera.lookAt(0, 0.8, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Natural Mediterranean Lighting
    const ambientLight = new THREE.AmbientLight(
      lightingMode === 'night' ? 0x473b32 : lightingMode === 'sunset' ? 0xf4cca4 : 0xfcf9f2,
      lightingMode === 'night' ? 0.7 : lightingMode === 'sunset' ? 1.1 : 1.35
    );
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(
      lightingMode === 'sunset' ? 0xd99559 : lightingMode === 'night' ? 0x7a8c99 : 0xfffaee,
      lightingMode === 'night' ? 0.8 : 2.2
    );
    sunLight.position.set(8, 12, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // Bedside Warm Ceramic Lamps
    const bedLampLight = new THREE.PointLight(0xa77d4b, 1.8, 6);
    bedLampLight.position.set(-1.8, 1.6, -1.8);
    scene.add(bedLampLight);

    // 5. Room Geometry Model Root
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // --- Floor: Natural Honed Travertine Limestone (#ded5c5) ---
    const floorGeo = new THREE.BoxGeometry(8, 0.3, 8);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xded5c5,
      roughness: 0.55,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.15;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // Natural Handwoven Sisal / Jute Rug
    const rugGeo = new THREE.PlaneGeometry(5, 4.5);
    const rugMat = new THREE.MeshStandardMaterial({
      color: 0xc8bcab,
      roughness: 0.95,
    });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0.2, 0.01, 0);
    rug.receiveShadow = true;
    roomGroup.add(rug);

    // Subtle Antique Bronze inlay band
    const bronzeTrimGeo = new THREE.RingGeometry(2.8, 2.83, 32);
    const bronzeTrimMat = new THREE.MeshStandardMaterial({
      color: 0xa77d4b,
      metalness: 0.65,
      roughness: 0.35,
    });
    const bronzeTrim = new THREE.Mesh(bronzeTrimGeo, bronzeTrimMat);
    bronzeTrim.rotation.x = -Math.PI / 2;
    bronzeTrim.position.set(0.2, 0.015, 0);
    roomGroup.add(bronzeTrim);

    // --- Back Wall & Side Wall: Organic Stucco / Lime Plaster (#efe9de) ---
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xefe9de,
      roughness: 0.9,
    });

    const backWallGeo = new THREE.BoxGeometry(8, 4, 0.2);
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 2, -4);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    const leftWallGeo = new THREE.BoxGeometry(0.2, 4, 8);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.position.set(-4, 2, 0);
    leftWall.receiveShadow = true;
    roomGroup.add(leftWall);

    // Architectural Minimalist Artwork (Antique Bronze Thin Frame)
    const artFrameGeo = new THREE.BoxGeometry(2.8, 1.8, 0.06);
    const artFrameMat = new THREE.MeshStandardMaterial({
      color: 0xa77d4b,
      metalness: 0.7,
      roughness: 0.3,
    });
    const artFrame = new THREE.Mesh(artFrameGeo, artFrameMat);
    artFrame.position.set(0, 2.5, -3.88);
    roomGroup.add(artFrame);

    const artCanvasGeo = new THREE.PlaneGeometry(2.68, 1.68);
    const artCanvasMat = new THREE.MeshStandardMaterial({
      color: 0xfbf8f3,
      roughness: 0.7,
    });
    const artCanvas = new THREE.Mesh(artCanvasGeo, artCanvasMat);
    artCanvas.position.set(0, 2.5, -3.84);
    roomGroup.add(artCanvas);

    // --- Floor-to-Ceiling Coastal Glass Window ---
    const glassFrameGeo = new THREE.BoxGeometry(0.1, 4, 8);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xcfe6ec,
      transmission: 0.92,
      opacity: 0.28,
      transparent: true,
      roughness: 0.05,
      reflectivity: 0.85,
    });
    const glassWindow = new THREE.Mesh(glassFrameGeo, glassMat);
    glassWindow.position.set(4, 2, 0);
    roomGroup.add(glassWindow);

    // Terracotta / Limestone Balcony
    if (room.threeDConfig.hasBalconyView) {
      const balconyFloorGeo = new THREE.BoxGeometry(2.5, 0.2, 6);
      const balconyFloorMat = new THREE.MeshStandardMaterial({
        color: 0xd6cbb8,
        roughness: 0.6,
      });
      const balconyFloor = new THREE.Mesh(balconyFloorGeo, balconyFloorMat);
      balconyFloor.position.set(5.2, -0.1, 0);
      roomGroup.add(balconyFloor);

      const railPostGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.2, 16);
      const bronzeMetalMat = new THREE.MeshStandardMaterial({
        color: 0xa77d4b,
        metalness: 0.8,
        roughness: 0.25,
      });
      for (let i = -2.5; i <= 2.5; i += 1.25) {
        const post = new THREE.Mesh(railPostGeo, bronzeMetalMat);
        post.position.set(6.4, 0.6, i);
        roomGroup.add(post);
      }

      const handrailGeo = new THREE.BoxGeometry(0.08, 0.06, 6);
      const handrail = new THREE.Mesh(handrailGeo, bronzeMetalMat);
      handrail.position.set(6.4, 1.2, 0);
      roomGroup.add(handrail);
    }

    // --- Minimalist Mediterranean Platform Bed ---
    const bedGroup = new THREE.Group();
    bedGroup.position.set(-1.2, 0, -2);
    roomGroup.add(bedGroup);

    // Headboard: Natural Walnut Wood
    const headboardGeo = new THREE.BoxGeometry(3.2, 1.8, 0.15);
    const headboardMat = new THREE.MeshStandardMaterial({
      color: 0x4a3a2f,
      roughness: 0.65,
    });
    const headboard = new THREE.Mesh(headboardGeo, headboardMat);
    headboard.position.set(0, 0.9, -0.6);
    headboard.castShadow = true;
    bedGroup.add(headboard);

    // Bed frame: Low Mediterranean platform
    const bedFrameGeo = new THREE.BoxGeometry(2.8, 0.35, 3.2);
    const bedFrameMat = new THREE.MeshStandardMaterial({
      color: 0x4a3a2f,
      roughness: 0.65,
    });
    const bedFrame = new THREE.Mesh(bedFrameGeo, bedFrameMat);
    bedFrame.position.set(0, 0.18, 1.0);
    bedFrame.castShadow = true;
    bedFrame.receiveShadow = true;
    bedGroup.add(bedFrame);

    // Belgian Flax Linen Mattress & Duvet (#F7F4EE)
    const mattressGeo = new THREE.BoxGeometry(2.6, 0.4, 3.0);
    const mattressMat = new THREE.MeshStandardMaterial({
      color: 0xf7f4ee,
      roughness: 0.85,
    });
    const mattress = new THREE.Mesh(mattressGeo, mattressMat);
    mattress.position.set(0, 0.52, 1.0);
    mattress.castShadow = true;
    mattress.receiveShadow = true;
    bedGroup.add(mattress);

    // Natural Taupe Linen Bed Runner (#777066)
    const runnerGeo = new THREE.BoxGeometry(2.62, 0.03, 0.8);
    const runnerMat = new THREE.MeshStandardMaterial({
      color: 0x8a7f72,
      roughness: 0.9,
    });
    const runner = new THREE.Mesh(runnerGeo, runnerMat);
    runner.position.set(0, 0.73, 2.0);
    bedGroup.add(runner);

    // Pillows
    const pillowGeo = new THREE.BoxGeometry(0.9, 0.2, 0.55);
    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xfbf8f3, roughness: 0.8 });
    const pillow1 = new THREE.Mesh(pillowGeo, pillowMat);
    pillow1.position.set(-0.65, 0.78, -0.1);
    pillow1.rotation.x = 0.3;
    bedGroup.add(pillow1);

    const pillow2 = new THREE.Mesh(pillowGeo, pillowMat);
    pillow2.position.set(0.65, 0.78, -0.1);
    pillow2.rotation.x = 0.3;
    bedGroup.add(pillow2);

    // Bedside walnut floating stands
    const standGeo = new THREE.BoxGeometry(0.65, 0.45, 0.55);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x4a3a2f, roughness: 0.65 });
    
    const standL = new THREE.Mesh(standGeo, standMat);
    standL.position.set(-1.8, 0.22, -0.3);
    standL.castShadow = true;
    bedGroup.add(standL);

    const standR = new THREE.Mesh(standGeo, standMat);
    standR.position.set(1.8, 0.22, -0.3);
    standR.castShadow = true;
    bedGroup.add(standR);

    // Ceramic bedside lamps
    const lampStemGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.35, 16);
    const lampStemMat = new THREE.MeshStandardMaterial({ color: 0xe5dfd4, roughness: 0.6 });
    const lampShadeGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.28, 16);
    const lampShadeMat = new THREE.MeshStandardMaterial({
      color: 0xf7f4ee,
      roughness: 0.7,
      emissive: 0xa77d4b,
      emissiveIntensity: 0.45,
    });

    const lampL = new THREE.Mesh(lampStemGeo, lampStemMat);
    lampL.position.set(-1.8, 0.55, -0.3);
    bedGroup.add(lampL);

    const shadeL = new THREE.Mesh(lampShadeGeo, lampShadeMat);
    shadeL.position.set(-1.8, 0.8, -0.3);
    bedGroup.add(shadeL);

    const lampR = new THREE.Mesh(lampStemGeo, lampStemMat);
    lampR.position.set(1.8, 0.55, -0.3);
    bedGroup.add(lampR);

    const shadeR = new THREE.Mesh(lampShadeGeo, lampShadeMat);
    shadeR.position.set(1.8, 0.8, -0.3);
    bedGroup.add(shadeR);

    // --- Mediterranean Lounge Area (Organic Linen Sofa & Low Oak Table) ---
    if (room.threeDConfig.hasLoungeSofa) {
      const loungeGroup = new THREE.Group();
      loungeGroup.position.set(2.0, 0, 1.5);
      roomGroup.add(loungeGroup);

      const sofaGeo = new THREE.BoxGeometry(2.4, 0.42, 1.0);
      const sofaMat = new THREE.MeshStandardMaterial({
        color: 0xd9cebe,
        roughness: 0.85,
      });
      const sofa = new THREE.Mesh(sofaGeo, sofaMat);
      sofa.position.set(0, 0.21, 0);
      sofa.castShadow = true;
      loungeGroup.add(sofa);

      const sofaBackGeo = new THREE.BoxGeometry(2.4, 0.55, 0.3);
      const sofaBack = new THREE.Mesh(sofaBackGeo, sofaMat);
      sofaBack.position.set(0, 0.6, 0.35);
      sofaBack.castShadow = true;
      loungeGroup.add(sofaBack);

      const tableGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.3, 32);
      const tableMat = new THREE.MeshStandardMaterial({
        color: 0x4a3a2f,
        roughness: 0.7,
      });
      const table = new THREE.Mesh(tableGeo, tableMat);
      table.position.set(0, 0.15, -0.9);
      table.castShadow = true;
      loungeGroup.add(table);
    }

    // --- Freestanding Honed Travertine Stone Tub ---
    if (room.threeDConfig.hasMarbleJacuzzi) {
      const tubGroup = new THREE.Group();
      tubGroup.position.set(-2.2, 0, 2.0);
      roomGroup.add(tubGroup);

      const outerTubGeo = new THREE.CylinderGeometry(1.1, 0.9, 0.8, 32);
      const tubMat = new THREE.MeshStandardMaterial({
        color: 0xe5dcce,
        roughness: 0.5,
        metalness: 0.05,
      });
      const outerTub = new THREE.Mesh(outerTubGeo, tubMat);
      outerTub.position.y = 0.4;
      outerTub.castShadow = true;
      tubGroup.add(outerTub);

      // Natural sea-salt pool water
      const waterGeo = new THREE.CylinderGeometry(0.98, 0.98, 0.1, 32);
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x76b5c5,
        roughness: 0.15,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
      });
      const water = new THREE.Mesh(waterGeo, waterMat);
      water.position.y = 0.65;
      tubGroup.add(water);

      // Antique Bronze Faucet
      const faucetBaseGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.7, 16);
      const faucetMat = new THREE.MeshStandardMaterial({ color: 0xa77d4b, metalness: 0.8, roughness: 0.3 });
      const faucet = new THREE.Mesh(faucetBaseGeo, faucetMat);
      faucet.position.set(0.9, 0.6, 0);
      tubGroup.add(faucet);
    }

    // --- Subtle Pin Markers ---
    const hotspotObjects: { id: string; mesh: THREE.Mesh; label: string }[] = [];
    room.threeDConfig.hotspots.forEach(hp => {
      const markerGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const markerMat = new THREE.MeshStandardMaterial({
        color: 0xa77d4b,
        roughness: 0.3,
        metalness: 0.5,
      });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(...hp.position);
      roomGroup.add(marker);

      const ringGeo = new THREE.RingGeometry(0.18, 0.21, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xa77d4b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(...hp.position);
      ring.rotation.x = Math.PI / 2;
      roomGroup.add(ring);

      hotspotObjects.push({ id: hp.id, mesh: marker, label: hp.title });
    });

    // 6. Interaction Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationSpeed = 0.005;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      roomGroup.rotation.y += deltaX * rotationSpeed;
      const newY = camera.position.y + deltaY * 0.01;
      if (newY >= 2.5 && newY <= 9) {
        camera.position.y = newY;
        camera.lookAt(0, 0.8, 0);
      }

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.005;
      const currentDist = camera.position.length();
      if ((currentDist > 4 && zoomFactor < 0) || (currentDist < 16 && zoomFactor > 0)) {
        camera.position.multiplyScalar(1 + zoomFactor);
        camera.lookAt(0, 0.8, 0);
      }
    };

    const domElement = canvasRef.current;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (isAutoRotating && !isDragging) {
        roomGroup.rotation.y += 0.002;
      }

      hotspotObjects.forEach((hp, idx) => {
        hp.mesh.position.y = room.threeDConfig.hotspots[idx].position[1] + Math.sin(elapsedTime * 2.5 + idx) * 0.03;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [room, lightingMode, isAutoRotating]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#29241F]/80 backdrop-blur-sm animate-fadeIn">
      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl h-[88vh] max-h-[800px] bg-white border border-[#E7DED0] rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row text-[#29241F]"
      >
        {/* Main 3D Canvas Area */}
        <div className="relative flex-1 h-full min-h-[360px] cursor-grab active:cursor-grabbing select-none overflow-hidden bg-[#F7F4EE]">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Top Overlays */}
          <div className="absolute top-5 left-5 z-20 flex flex-col gap-1 pointer-events-none">
            <span className="text-[10px] uppercase tracking-[0.22em] font-medium text-[#A77D4B] font-sans">
              3D Spatial Preview • {room.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-serif-luxury text-[#29241F]">
              {room.name}
            </h2>
            <p className="text-xs text-[#777066] font-light">
              {room.sizeSqFt} sq ft • {room.floor} • {room.view}
            </p>
          </div>

          {/* Top Right: Close Button */}
          <button
            onClick={onClose}
            aria-label="Close 3D Viewer"
            className="absolute top-5 right-5 z-20 p-2 rounded bg-white text-[#29241F] border border-[#E7DED0] hover:bg-[#F7F4EE] transition-all shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Lighting Selector Overlay at Bottom Center */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-white/95 border border-[#E7DED0] rounded px-3 py-1.5 shadow-md">
            <span className="text-[10px] uppercase tracking-wider text-[#777066] font-mono hidden sm:inline">Lighting</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLightingMode('daylight')}
                className={`py-1 px-2.5 rounded text-[11px] font-medium transition-all ${
                  lightingMode === 'daylight'
                    ? 'bg-[#29241F] text-[#F7F4EE]'
                    : 'text-[#777066] hover:text-[#29241F]'
                }`}
              >
                Daylight
              </button>
              <button
                onClick={() => setLightingMode('sunset')}
                className={`py-1 px-2.5 rounded text-[11px] font-medium transition-all ${
                  lightingMode === 'sunset'
                    ? 'bg-[#A77D4B] text-white'
                    : 'text-[#777066] hover:text-[#29241F]'
                }`}
              >
                Sunset
              </button>
              <button
                onClick={() => setLightingMode('night')}
                className={`py-1 px-2.5 rounded text-[11px] font-medium transition-all ${
                  lightingMode === 'night'
                    ? 'bg-[#302820] text-white'
                    : 'text-[#777066] hover:text-[#29241F]'
                }`}
              >
                Night
              </button>
            </div>

            <div className="h-3 w-px bg-[#E7DED0]" />

            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className="text-[11px] text-[#777066] hover:text-[#29241F] flex items-center gap-1 font-mono"
            >
              <RotateCw className={`w-3 h-3 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
              <span className="hidden sm:inline">{isAutoRotating ? 'Rotate' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* Right Sidebar: Suite Specs & Direct Reservation */}
        <div className="w-full md:w-96 bg-[#F7F4EE] border-t md:border-t-0 md:border-l border-[#E7DED0] p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A77D4B] font-semibold">
                Architecture & Craft
              </span>
              <h3 className="text-2xl font-normal font-serif-luxury text-[#29241F] mt-1">
                {room.name}
              </h3>
              <p className="text-xs text-[#777066] mt-2 font-light leading-relaxed">
                {room.tagline}
              </p>
            </div>

            {/* Rate */}
            <div className="p-4 rounded border border-[#E7DED0] bg-white flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#777066] block">Direct Rate</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-normal font-serif-luxury text-[#29241F]">{formatINR(room.pricePerNight)}</span>
                  <span className="text-xs text-[#777066]">/ night</span>
                </div>
              </div>
              <span className="text-xs font-mono text-[#A77D4B]">
                {room.availableInventory} Available
              </span>
            </div>

            {/* Hotspots */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#777066] font-medium block">
                Spatial Highlights
              </span>
              <div className="space-y-2">
                {room.threeDConfig.hotspots.map((hp) => (
                  <div
                    key={hp.id}
                    className="p-3 rounded border border-[#E7DED0] bg-white text-xs space-y-1"
                  >
                    <div className="font-medium text-[#29241F]">{hp.title}</div>
                    <p className="text-[11px] text-[#777066] font-light leading-relaxed">
                      {hp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#777066] font-medium block">
                Privileges
              </span>
              <ul className="space-y-1.5 text-xs text-[#29241F]">
                {room.amenities.slice(0, 4).map((amenity, idx) => (
                  <li key={idx} className="flex items-start gap-2 font-light">
                    <span className="text-[#A77D4B] font-serif">•</span>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action */}
          <div className="pt-6 border-t border-[#E7DED0] space-y-3">
            <button
              onClick={() => {
                onClose();
                setSelectedRoomForBooking(room);
                onBookNow(room);
              }}
              className="w-full btn-primary-espresso flex items-center justify-center gap-2"
            >
              <span>Reserve Suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
