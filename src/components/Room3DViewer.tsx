import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Room } from '../types/hotel';
import { 
  X, 
  Sun, 
  Sunset, 
  Moon, 
  RotateCw, 
  Maximize2, 
  Sparkles, 
  Info, 
  Check, 
  ArrowRight,
  ShieldCheck
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

  // Lighting mode: sunset | night | day
  const [lightingMode, setLightingMode] = useState<'sunset' | 'night' | 'day'>('sunset');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene setup with Emerald atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(
      lightingMode === 'night' ? 0x071513 : lightingMode === 'sunset' ? 0x14201c : 0x0e2b26
    );
    scene.fog = new THREE.FogExp2(scene.background.getHex(), 0.04);

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

    // 4. Lighting based on mode
    const ambientLight = new THREE.AmbientLight(
      lightingMode === 'night' ? 0x122924 : lightingMode === 'sunset' ? 0xf4cca4 : 0xf6f1e7,
      lightingMode === 'night' ? 0.7 : lightingMode === 'sunset' ? 1.0 : 1.3
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(
      lightingMode === 'sunset' ? 0xc6a76b : lightingMode === 'night' ? 0x5eead4 : 0xfffaed,
      lightingMode === 'night' ? 0.9 : 2.1
    );
    dirLight.position.set(8, 12, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Architectural Mood Lights (Champagne Gold Glow)
    const bedLampLight = new THREE.PointLight(0xc6a76b, 2.8, 6);
    bedLampLight.position.set(-1.8, 1.6, -1.8);
    scene.add(bedLampLight);

    const jacuzziGlow = new THREE.PointLight(
      lightingMode === 'night' ? 0x2dd4bf : 0x5eead4,
      2.0,
      5
    );
    jacuzziGlow.position.set(-2, 0.8, 1.8);
    scene.add(jacuzziGlow);

    // 5. Room Geometry Model Root
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // --- Floor: Deep Emerald Hardwood / Italian Travertine ---
    const floorGeo = new THREE.BoxGeometry(8, 0.3, 8);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f2420,
      roughness: 0.25,
      metalness: 0.15,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.15;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // Decorative luxury area rug
    const rugGeo = new THREE.PlaneGeometry(5, 4.5);
    const rugMat = new THREE.MeshStandardMaterial({
      color: 0x193b32,
      roughness: 0.85,
    });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0.2, 0.01, 0);
    rug.receiveShadow = true;
    roomGroup.add(rug);

    // Champagne gold brass inlay perimeter
    const brassTrimGeo = new THREE.RingGeometry(2.8, 2.85, 32);
    const brassTrimMat = new THREE.MeshStandardMaterial({
      color: 0xc6a76b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const brassTrim = new THREE.Mesh(brassTrimGeo, brassTrimMat);
    brassTrim.rotation.x = -Math.PI / 2;
    brassTrim.position.set(0.2, 0.015, 0);
    roomGroup.add(brassTrim);

    // --- Back Wall & Side Wall ---
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x13302a,
      roughness: 0.75,
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

    // Wall Art with Champagne Gold Frame
    const artFrameGeo = new THREE.BoxGeometry(2.8, 1.8, 0.08);
    const artFrameMat = new THREE.MeshStandardMaterial({
      color: 0xc6a76b,
      metalness: 0.95,
      roughness: 0.15,
    });
    const artFrame = new THREE.Mesh(artFrameGeo, artFrameMat);
    artFrame.position.set(0, 2.5, -3.88);
    roomGroup.add(artFrame);

    const artCanvasGeo = new THREE.PlaneGeometry(2.6, 1.6);
    const artCanvasMat = new THREE.MeshStandardMaterial({
      color: 0x102a26,
      roughness: 0.5,
    });
    const artCanvas = new THREE.Mesh(artCanvasGeo, artCanvasMat);
    artCanvas.position.set(0, 2.5, -3.83);
    roomGroup.add(artCanvas);

    // --- Panoramic Floor-to-Ceiling Glass Window on Right ---
    const glassFrameGeo = new THREE.BoxGeometry(0.1, 4, 8);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x99f6e4,
      transmission: 0.9,
      opacity: 0.35,
      transparent: true,
      roughness: 0.05,
      reflectivity: 0.8,
    });
    const glassWindow = new THREE.Mesh(glassFrameGeo, glassMat);
    glassWindow.position.set(4, 2, 0);
    roomGroup.add(glassWindow);

    // Balcony Railing (Glass with Champagne Gold Cap)
    if (room.threeDConfig.hasBalconyView) {
      const balconyFloorGeo = new THREE.BoxGeometry(2.5, 0.2, 6);
      const balconyFloorMat = new THREE.MeshStandardMaterial({
        color: 0x193b32,
        roughness: 0.4,
      });
      const balconyFloor = new THREE.Mesh(balconyFloorGeo, balconyFloorMat);
      balconyFloor.position.set(5.2, -0.1, 0);
      roomGroup.add(balconyFloor);

      const railPostGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 16);
      const goldMetalMat = new THREE.MeshStandardMaterial({
        color: 0xc6a76b,
        metalness: 0.95,
        roughness: 0.15,
      });
      for (let i = -2.5; i <= 2.5; i += 1.25) {
        const post = new THREE.Mesh(railPostGeo, goldMetalMat);
        post.position.set(6.4, 0.6, i);
        roomGroup.add(post);
      }

      // Handrail bar
      const handrailGeo = new THREE.BoxGeometry(0.08, 0.06, 6);
      const handrail = new THREE.Mesh(handrailGeo, goldMetalMat);
      handrail.position.set(6.4, 1.2, 0);
      roomGroup.add(handrail);
    }

    // --- Emperor Luxury Bed ---
    const bedGroup = new THREE.Group();
    bedGroup.position.set(-1.2, 0, -2);
    roomGroup.add(bedGroup);

    // Headboard
    const headboardGeo = new THREE.BoxGeometry(3.2, 2.0, 0.25);
    const headboardMat = new THREE.MeshStandardMaterial({
      color: 0x16332c,
      roughness: 0.7,
    });
    const headboard = new THREE.Mesh(headboardGeo, headboardMat);
    headboard.position.set(0, 1.0, -0.6);
    headboard.castShadow = true;
    bedGroup.add(headboard);

    // Headboard Gold trim
    const headboardTrimGeo = new THREE.BoxGeometry(3.26, 2.06, 0.15);
    const headboardTrimMat = new THREE.MeshStandardMaterial({
      color: 0xc6a76b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const headboardTrim = new THREE.Mesh(headboardTrimGeo, headboardTrimMat);
    headboardTrim.position.set(0, 1.0, -0.65);
    bedGroup.add(headboardTrim);

    // Bed frame
    const bedFrameGeo = new THREE.BoxGeometry(2.8, 0.45, 3.2);
    const bedFrameMat = new THREE.MeshStandardMaterial({
      color: 0x102a26,
      roughness: 0.5,
    });
    const bedFrame = new THREE.Mesh(bedFrameGeo, bedFrameMat);
    bedFrame.position.set(0, 0.22, 1.0);
    bedFrame.castShadow = true;
    bedFrame.receiveShadow = true;
    bedGroup.add(bedFrame);

    // Mattress & Silk Linens (Warm Ivory #F6F1E7)
    const mattressGeo = new THREE.BoxGeometry(2.6, 0.4, 3.0);
    const mattressMat = new THREE.MeshStandardMaterial({
      color: 0xf6f1e7,
      roughness: 0.35,
    });
    const mattress = new THREE.Mesh(mattressGeo, mattressMat);
    mattress.position.set(0, 0.55, 1.0);
    mattress.castShadow = true;
    mattress.receiveShadow = true;
    bedGroup.add(mattress);

    // Champagne gold silk bed runner
    const runnerGeo = new THREE.BoxGeometry(2.62, 0.04, 0.8);
    const runnerMat = new THREE.MeshStandardMaterial({
      color: 0xc6a76b,
      metalness: 0.4,
      roughness: 0.3,
    });
    const runner = new THREE.Mesh(runnerGeo, runnerMat);
    runner.position.set(0, 0.76, 2.0);
    bedGroup.add(runner);

    // Pillows
    const pillowGeo = new THREE.BoxGeometry(0.9, 0.2, 0.55);
    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xf6f1e7, roughness: 0.3 });
    const pillow1 = new THREE.Mesh(pillowGeo, pillowMat);
    pillow1.position.set(-0.65, 0.8, -0.1);
    pillow1.rotation.x = 0.3;
    bedGroup.add(pillow1);

    const pillow2 = new THREE.Mesh(pillowGeo, pillowMat);
    pillow2.position.set(0.65, 0.8, -0.1);
    pillow2.rotation.x = 0.3;
    bedGroup.add(pillow2);

    // Accent velvet cushions
    const cushionGeo = new THREE.BoxGeometry(0.5, 0.16, 0.4);
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0xc6a76b, roughness: 0.6 });
    const cushion1 = new THREE.Mesh(cushionGeo, cushionMat);
    cushion1.position.set(-0.6, 0.88, 0.15);
    cushion1.rotation.x = 0.4;
    bedGroup.add(cushion1);

    const cushion2 = new THREE.Mesh(cushionGeo, cushionMat);
    cushion2.position.set(0.6, 0.88, 0.15);
    cushion2.rotation.x = 0.4;
    bedGroup.add(cushion2);

    // Bedside tables & glowing lamps
    const nightstandGeo = new THREE.BoxGeometry(0.65, 0.55, 0.6);
    const nightstandMat = new THREE.MeshStandardMaterial({ color: 0x193b32, metalness: 0.2 });
    
    const nightstandL = new THREE.Mesh(nightstandGeo, nightstandMat);
    nightstandL.position.set(-1.8, 0.27, -0.3);
    nightstandL.castShadow = true;
    bedGroup.add(nightstandL);

    const nightstandR = new THREE.Mesh(nightstandGeo, nightstandMat);
    nightstandR.position.set(1.8, 0.27, -0.3);
    nightstandR.castShadow = true;
    bedGroup.add(nightstandR);

    // Designer lamp base & shade
    const lampStemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 16);
    const lampStemMat = new THREE.MeshStandardMaterial({ color: 0xc6a76b, metalness: 0.95, roughness: 0.1 });
    const lampShadeGeo = new THREE.CylinderGeometry(0.2, 0.28, 0.3, 16);
    const lampShadeMat = new THREE.MeshStandardMaterial({
      color: 0xf6f1e7,
      roughness: 0.3,
      emissive: 0xc6a76b,
      emissiveIntensity: 0.6,
    });

    const lampL = new THREE.Mesh(lampStemGeo, lampStemMat);
    lampL.position.set(-1.8, 0.75, -0.3);
    bedGroup.add(lampL);

    const shadeL = new THREE.Mesh(lampShadeGeo, lampShadeMat);
    shadeL.position.set(-1.8, 1.0, -0.3);
    bedGroup.add(shadeL);

    const lampR = new THREE.Mesh(lampStemGeo, lampStemMat);
    lampR.position.set(1.8, 0.75, -0.3);
    bedGroup.add(lampR);

    const shadeR = new THREE.Mesh(lampShadeGeo, lampShadeMat);
    shadeR.position.set(1.8, 1.0, -0.3);
    bedGroup.add(shadeR);

    // --- Luxury Lounge Area ---
    if (room.threeDConfig.hasLoungeSofa) {
      const loungeGroup = new THREE.Group();
      loungeGroup.position.set(2.0, 0, 1.5);
      roomGroup.add(loungeGroup);

      const sofaGeo = new THREE.BoxGeometry(2.4, 0.45, 1.0);
      const sofaMat = new THREE.MeshStandardMaterial({
        color: 0x163830,
        roughness: 0.65,
      });
      const sofa = new THREE.Mesh(sofaGeo, sofaMat);
      sofa.position.set(0, 0.22, 0);
      sofa.castShadow = true;
      loungeGroup.add(sofa);

      const sofaBackGeo = new THREE.BoxGeometry(2.4, 0.6, 0.3);
      const sofaBack = new THREE.Mesh(sofaBackGeo, sofaMat);
      sofaBack.position.set(0, 0.65, 0.35);
      sofaBack.castShadow = true;
      loungeGroup.add(sofaBack);

      const tableGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.35, 32);
      const tableMat = new THREE.MeshPhysicalMaterial({
        color: 0x102a26,
        roughness: 0.1,
        metalness: 0.8,
        transmission: 0.7,
      });
      const table = new THREE.Mesh(tableGeo, tableMat);
      table.position.set(0, 0.2, -0.9);
      table.castShadow = true;
      loungeGroup.add(table);

      const bucketGeo = new THREE.CylinderGeometry(0.12, 0.08, 0.2, 16);
      const bucketMat = new THREE.MeshStandardMaterial({ color: 0xc6a76b, metalness: 0.95 });
      const bucket = new THREE.Mesh(bucketGeo, bucketMat);
      bucket.position.set(0.1, 0.45, -0.9);
      loungeGroup.add(bucket);
    }

    // --- Freestanding Marble Jacuzzi / Tub ---
    if (room.threeDConfig.hasMarbleJacuzzi) {
      const tubGroup = new THREE.Group();
      tubGroup.position.set(-2.2, 0, 2.0);
      roomGroup.add(tubGroup);

      const outerTubGeo = new THREE.CylinderGeometry(1.1, 0.9, 0.8, 32);
      const tubMat = new THREE.MeshStandardMaterial({
        color: 0xf7f4ed,
        roughness: 0.2,
        metalness: 0.1,
      });
      const outerTub = new THREE.Mesh(outerTubGeo, tubMat);
      outerTub.position.y = 0.4;
      outerTub.castShadow = true;
      tubGroup.add(outerTub);

      const waterGeo = new THREE.CylinderGeometry(0.98, 0.98, 0.1, 32);
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x2dd4bf,
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
      });
      const water = new THREE.Mesh(waterGeo, waterMat);
      water.position.y = 0.65;
      tubGroup.add(water);

      const faucetBaseGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.7, 16);
      const faucetMat = new THREE.MeshStandardMaterial({ color: 0xc6a76b, metalness: 0.95 });
      const faucet = new THREE.Mesh(faucetBaseGeo, faucetMat);
      faucet.position.set(0.9, 0.6, 0);
      tubGroup.add(faucet);
    }

    // --- Interactive Hotspot Markers ---
    const hotspotObjects: { id: string; mesh: THREE.Mesh; label: string }[] = [];
    room.threeDConfig.hotspots.forEach(hp => {
      const markerGeo = new THREE.SphereGeometry(0.16, 16, 16);
      const markerMat = new THREE.MeshStandardMaterial({
        color: 0xc6a76b,
        emissive: 0xc6a76b,
        emissiveIntensity: 0.8,
        metalness: 0.5,
      });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(...hp.position);
      roomGroup.add(marker);

      const ringGeo = new THREE.RingGeometry(0.22, 0.26, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xc6a76b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(...hp.position);
      ring.rotation.x = Math.PI / 2;
      roomGroup.add(ring);

      hotspotObjects.push({ id: hp.id, mesh: marker, label: hp.title });
    });

    // 6. Mouse Orbit & Touch Drag Interaction
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
        roomGroup.rotation.y += 0.0025;
      }

      hotspotObjects.forEach((hp, idx) => {
        hp.mesh.position.y = room.threeDConfig.hotspots[idx].position[1] + Math.sin(elapsedTime * 3 + idx) * 0.04;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn text-[#F6F1E7]">
      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl h-[90vh] max-h-[820px] bg-[#102A26] border border-[#C6A76B]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        {/* Main 3D Canvas Area */}
        <div className="relative flex-1 h-full min-h-[360px] cursor-grab active:cursor-grabbing select-none overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Top Overlays */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-[#102A26]/90 text-[#C6A76B] border border-[#C6A76B]/40 rounded-full backdrop-blur-md flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A76B]" />
                3D Virtual Suite Tour
              </span>
              <span className="px-3 py-1 text-xs font-medium bg-[#193B32]/90 text-white border border-[#C6A76B]/30 rounded-full backdrop-blur-md font-mono">
                {room.sizeSqFt} sq. ft • {room.floor}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-serif-luxury text-white drop-shadow-md">
              {room.name}
            </h2>
            <p className="text-xs text-[#C6A76B] max-w-md drop-shadow">
              {room.view}
            </p>
          </div>

          {/* Top Right: Close Button */}
          <button
            onClick={onClose}
            aria-label="Close 3D Viewer"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#193B32] hover:bg-[#1f473c] text-white border border-[#C6A76B]/30 backdrop-blur-md transition-all shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Interactive Controls Overlay at Bottom Center */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-[#102A26]/95 border border-[#C6A76B]/40 rounded-2xl px-4 py-2 backdrop-blur-xl shadow-2xl">
            <span className="text-xs text-[#C6A76B] mr-1 hidden sm:inline font-mono">Lighting:</span>
            <div className="flex items-center gap-1 bg-[#193B32] rounded-xl p-1 border border-[#C6A76B]/30">
              <button
                onClick={() => setLightingMode('sunset')}
                title="Golden Sunset Mode"
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                  lightingMode === 'sunset'
                    ? 'bg-[#C6A76B] text-[#102A26] shadow-md font-bold'
                    : 'text-[#F6F1E7]/70 hover:text-[#C6A76B]'
                }`}
              >
                <Sunset className="w-4 h-4" />
                <span className="hidden sm:inline">Sunset</span>
              </button>
              <button
                onClick={() => setLightingMode('night')}
                title="Midnight Mood Mode"
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                  lightingMode === 'night'
                    ? 'bg-[#102A26] text-[#C6A76B] border border-[#C6A76B]/50 shadow-md font-bold'
                    : 'text-[#F6F1E7]/70 hover:text-[#C6A76B]'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span className="hidden sm:inline">Night</span>
              </button>
              <button
                onClick={() => setLightingMode('day')}
                title="Natural Daylight Mode"
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                  lightingMode === 'day'
                    ? 'bg-[#DFCA9B] text-[#102A26] shadow-md font-bold'
                    : 'text-[#F6F1E7]/70 hover:text-[#C6A76B]'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span className="hidden sm:inline">Day</span>
              </button>
            </div>

            <div className="h-4 w-px bg-[#C6A76B]/30 mx-1" />

            {/* Auto Rotate Toggle */}
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`p-2 rounded-xl text-xs flex items-center gap-1.5 border transition-all ${
                isAutoRotating
                  ? 'border-[#C6A76B] bg-[#193B32] text-[#C6A76B]'
                  : 'border-[#C6A76B]/30 text-[#F6F1E7]/70 hover:text-white'
              }`}
              title={isAutoRotating ? 'Pause Rotation' : 'Auto Rotate'}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
              <span className="hidden sm:inline font-mono">{isAutoRotating ? 'Rotating' : 'Static'}</span>
            </button>
          </div>

          {/* Mouse Drag Hint Badge */}
          <div className="absolute bottom-5 left-4 z-20 hidden md:flex items-center gap-1.5 text-[11px] text-[#F6F1E7]/70 bg-[#102A26]/80 border border-[#C6A76B]/30 rounded-lg px-2.5 py-1 backdrop-blur-md pointer-events-none">
            <Maximize2 className="w-3 h-3 text-[#C6A76B]" />
            <span>Click & drag to rotate 360° • Scroll to zoom</span>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-96 bg-[#193B32] border-t md:border-t-0 md:border-l border-[#C6A76B]/30 p-5 md:p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#C6A76B] font-bold font-mono">
                  {room.category} Class
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-[#102A26] px-2 py-0.5 rounded-full border border-emerald-600/40 font-mono">
                  {room.availableInventory} Suites Available
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif-luxury text-white mt-1">
                {room.name}
              </h3>
              <p className="text-xs text-[#F6F1E7]/75 mt-1 leading-relaxed">
                {room.tagline}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-3.5 rounded-2xl bg-[#102A26] border border-[#C6A76B]/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#C6A76B] block uppercase tracking-wider font-mono">Starting Rate</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black text-[#C6A76B] font-mono">${room.pricePerNight}</span>
                  <span className="text-xs text-[#F6F1E7]/70">/ night</span>
                  {room.originalPrice && (
                    <span className="text-xs text-[#F6F1E7]/50 line-through">
                      ${room.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#C6A76B] flex items-center gap-1 font-semibold">
                  ★ {room.rating} <span className="text-[#F6F1E7]/60 font-normal">({room.reviewsCount})</span>
                </span>
                <span className="text-[10px] text-[#F6F1E7]/60 block font-mono">Best Rate Guarantee</span>
              </div>
            </div>

            {/* Interactive Hotspots List */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                <Info className="w-3.5 h-3.5 text-[#C6A76B]" />
                Key Suite Highlights in 3D
              </h4>
              <div className="space-y-2">
                {room.threeDConfig.hotspots.map((hp) => (
                  <button
                    key={hp.id}
                    onClick={() => setActiveHotspot(activeHotspot === hp.id ? null : hp.id)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                      activeHotspot === hp.id
                        ? 'bg-[#102A26] border-[#C6A76B] text-[#C6A76B]'
                        : 'bg-[#102A26]/50 border-[#C6A76B]/20 text-[#F6F1E7] hover:border-[#C6A76B]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{hp.title}</span>
                      <span className="text-[10px] text-[#C6A76B] font-mono">3D Pin</span>
                    </div>
                    <p className="text-[11px] text-[#F6F1E7]/70 mt-1 leading-snug">
                      {hp.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Signature Amenities */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 font-mono">
                Included Privileges
              </h4>
              <ul className="grid grid-cols-1 gap-1.5 text-xs text-[#F6F1E7]/80">
                {room.amenities.slice(0, 4).map((amenity, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C6A76B] mt-0.5 shrink-0" />
                    <span className="text-[11px] leading-tight">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Action: Direct Book */}
          <div className="mt-6 pt-4 border-t border-[#C6A76B]/25 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] text-[#F6F1E7]/70 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6A76B]" />
              <span>Complimentary Cancellation up to 48 hrs prior</span>
            </div>
            <button
              onClick={() => {
                onClose();
                setSelectedRoomForBooking(room);
                onBookNow(room);
              }}
              className="w-full py-3.5 px-4 rounded-xl gold-gradient-btn font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 group shadow-xl"
            >
              <span>Reserve This Suite</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
