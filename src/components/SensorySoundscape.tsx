import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, CloudRain, Flame, Trees, Bell, Sparkles } from 'lucide-react';

type SoundTrack = 'rain' | 'fireplace' | 'shola';

export const SensorySoundscape: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState<SoundTrack>('rain');
  const [volume, setVolume] = useState(0.35);
  const [isExpanded, setIsExpanded] = useState(false);

  // Web Audio API context & nodes
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const generatorRef = useRef<{ stop: () => void } | null>(null);

  // Initialize or resume audio context
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      const gainNode = audioCtxRef.current.createGain();
      gainNode.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
      gainNode.connect(audioCtxRef.current.destination);
      gainNodeRef.current = gainNode;
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Stop previous generator
  const stopGenerator = () => {
    if (generatorRef.current) {
      try {
        generatorRef.current.stop();
      } catch {
        // ignore
      }
      generatorRef.current = null;
    }
  };

  // Track 1: Nilgiri Mountain Rain & Pine Whisper (Soft rain on tea leaves & pine trees)
  const playNilgiriRain = (ctx: AudioContext, destination: GainNode) => {
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const rainNoise = ctx.createBufferSource();
    rainNoise.buffer = noiseBuffer;
    rainNoise.loop = true;

    // Filter to sound like soft mountain drizzle on leaves
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 650;

    // Gentle wind swell LFO
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.15; // 6-7 second mountain breeze cycle
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 200;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const rainGain = ctx.createGain();
    rainGain.gain.value = 0.55;

    rainNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(destination);

    rainNoise.start();
    lfo.start();

    return {
      stop: () => {
        try {
          rainNoise.stop();
          lfo.stop();
          rainNoise.disconnect();
          lfo.disconnect();
        } catch {}
      }
    };
  };

  // Track 2: Colonial Fireplace & Acoustic Mountain Chords (Warm crackling hearth & guitar)
  const playColonialFireplace = (ctx: AudioContext, destination: GainNode) => {
    // Warm acoustic guitar chord: A minor 9 / Highland evening harmony
    const chordFrequencies = [220, 261.63, 329.63, 392.0, 493.88];
    const oscillators: OscillatorNode[] = [];
    const chordGain = ctx.createGain();
    chordGain.gain.value = 0.22;
    chordGain.connect(destination);

    chordFrequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;

      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (panner) {
        panner.pan.value = (i / chordFrequencies.length) * 1.4 - 0.7;
        osc.connect(panner);
        panner.connect(chordGain);
      } else {
        osc.connect(chordGain);
      }

      osc.start();
      oscillators.push(osc);
    });

    // Fireplace gentle ember crackle simulator
    const bufferSize = ctx.sampleRate * 2;
    const crackleBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = crackleBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // sparse random clicks for fire crackle
      output[i] = Math.random() > 0.994 ? (Math.random() * 2 - 1) * 0.7 : 0;
    }
    const crackleSource = ctx.createBufferSource();
    crackleSource.buffer = crackleBuffer;
    crackleSource.loop = true;
    const crackleFilter = ctx.createBiquadFilter();
    crackleFilter.type = 'bandpass';
    crackleFilter.frequency.value = 1800;
    const crackleGain = ctx.createGain();
    crackleGain.gain.value = 0.35;

    crackleSource.connect(crackleFilter);
    crackleFilter.connect(crackleGain);
    crackleGain.connect(destination);
    crackleSource.start();

    // Gentle chord tremolo
    const tremolo = ctx.createOscillator();
    tremolo.frequency.value = 0.3;
    const tremoloGain = ctx.createGain();
    tremoloGain.gain.value = 0.06;
    tremolo.connect(tremoloGain);
    tremoloGain.connect(chordGain.gain);
    tremolo.start();

    return {
      stop: () => {
        try {
          oscillators.forEach(o => o.stop());
          crackleSource.stop();
          tremolo.stop();
        } catch {}
      }
    };
  };

  // Track 3: Nilgiri Shola Dawn & Temple Bowls (Misty valley silence & resonant singing bowls)
  const playSholaDawn = (ctx: AudioContext, destination: GainNode) => {
    const root = 216; // 432 Hz sub-harmonic meditative tuning
    const harmonics = [root, root * 1.5, root * 2, root * 2.67, 432];
    const oscillators: OscillatorNode[] = [];
    const bowlGain = ctx.createGain();
    bowlGain.gain.value = 0.28;
    bowlGain.connect(destination);

    harmonics.forEach(freq => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.connect(bowlGain);
      osc.start();
      oscillators.push(osc);
    });

    // Slow meditative harmonic swell
    const pulse = ctx.createOscillator();
    pulse.frequency.value = 0.09;
    const pulseGain = ctx.createGain();
    pulseGain.gain.value = 0.14;
    pulse.connect(pulseGain);
    pulseGain.connect(bowlGain.gain);
    pulse.start();

    return {
      stop: () => {
        try {
          oscillators.forEach(o => o.stop());
          pulse.stop();
        } catch {}
      }
    };
  };

  // Start sound
  const startSound = (track: SoundTrack) => {
    const ctx = getAudioContext();
    if (!gainNodeRef.current) return;

    stopGenerator();

    if (track === 'rain') {
      generatorRef.current = playNilgiriRain(ctx, gainNodeRef.current);
    } else if (track === 'fireplace') {
      generatorRef.current = playColonialFireplace(ctx, gainNodeRef.current);
    } else if (track === 'shola') {
      generatorRef.current = playSholaDawn(ctx, gainNodeRef.current);
    }

    setIsPlaying(true);
  };

  // Handle Play/Pause
  const togglePlay = () => {
    const ctx = getAudioContext();
    if (isPlaying) {
      stopGenerator();
      setIsPlaying(false);
    } else {
      startSound(activeTrack);
    }
  };

  // Change Track
  const changeTrack = (newTrack: SoundTrack) => {
    setActiveTrack(newTrack);
    if (isPlaying) {
      startSound(newTrack);
    }
  };

  // Volume slider update
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopGenerator();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const trackLabels: { [key in SoundTrack]: string } = {
    rain: 'Nilgiri Rain',
    fireplace: 'Hearth Fire',
    shola: 'Shola Dawn'
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
      <div className="relative">
        {/* Expanded Sound Selector Popover */}
        {isExpanded && (
          <div className="absolute bottom-14 right-0 w-[calc(100vw-32px)] max-w-xs sm:w-80 p-4 rounded-xl bg-white border border-[#E7DED0] shadow-[0_12px_35px_rgba(41,36,31,0.15)] space-y-3.5 text-[#29241F] animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7DED0]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A77D4B]" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#777066] font-semibold">
                  Nilgiri Sensory Soundscape
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-[10px] text-[#777066] hover:text-[#29241F]"
              >
                Close
              </button>
            </div>

            {/* Track Selectors */}
            <div className="space-y-1.5">
              <button
                onClick={() => changeTrack('rain')}
                className={`w-full text-left p-2.5 rounded text-xs transition-all flex items-center justify-between border ${
                  activeTrack === 'rain'
                    ? 'bg-[#F7F4EE] border-[#29241F] text-[#29241F] font-semibold'
                    : 'bg-white border-[#E7DED0] text-[#777066] hover:text-[#29241F]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <CloudRain className="w-3.5 h-3.5 text-[#A77D4B]" />
                  <span>Nilgiri Rain & Pine Whisper</span>
                </span>
                {activeTrack === 'rain' && isPlaying && (
                  <span className="w-2 h-2 rounded-full bg-[#A77D4B] animate-ping" />
                )}
              </button>

              <button
                onClick={() => changeTrack('fireplace')}
                className={`w-full text-left p-2.5 rounded text-xs transition-all flex items-center justify-between border ${
                  activeTrack === 'fireplace'
                    ? 'bg-[#F7F4EE] border-[#29241F] text-[#29241F] font-semibold'
                    : 'bg-white border-[#E7DED0] text-[#777066] hover:text-[#29241F]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-[#A77D4B]" />
                  <span>Colonial Hearth & Guitar</span>
                </span>
                {activeTrack === 'fireplace' && isPlaying && (
                  <span className="w-2 h-2 rounded-full bg-[#A77D4B] animate-ping" />
                )}
              </button>

              <button
                onClick={() => changeTrack('shola')}
                className={`w-full text-left p-2.5 rounded text-xs transition-all flex items-center justify-between border ${
                  activeTrack === 'shola'
                    ? 'bg-[#F7F4EE] border-[#29241F] text-[#29241F] font-semibold'
                    : 'bg-white border-[#E7DED0] text-[#777066] hover:text-[#29241F]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-[#A77D4B]" />
                  <span>Shola Dawn & Singing Bowls</span>
                </span>
                {activeTrack === 'shola' && isPlaying && (
                  <span className="w-2 h-2 rounded-full bg-[#A77D4B] animate-ping" />
                )}
              </button>
            </div>

            {/* Volume Stepper Slider */}
            <div className="pt-2 border-t border-[#E7DED0] flex items-center justify-between text-xs text-[#777066]">
              <span className="text-[10px] uppercase font-mono">Volume</span>
              <input
                type="range"
                min="0.05"
                max="0.8"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-28 accent-[#29241F] cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Minimalist Floating Audio Pill */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E7DED0] shadow-[0_6px_25px_rgba(41,36,31,0.12)]">
          <button
            onClick={togglePlay}
            className={`p-2 rounded-full transition-all flex items-center justify-center ${
              isPlaying
                ? 'bg-[#29241F] text-[#F7F4EE]'
                : 'bg-[#F7F4EE] text-[#29241F] hover:bg-[#E7DED0]'
            }`}
            title={isPlaying ? 'Pause Sanctuary Audio' : 'Play Nilgiri Audio'}
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#777066]" />
            )}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#29241F] flex items-center gap-1.5 hover:text-[#A77D4B] transition-colors"
          >
            <span>{isPlaying ? trackLabels[activeTrack] : 'Ooty Audio'}</span>
            {isPlaying && (
              <div className="flex items-center gap-0.5">
                <span className="w-0.5 h-3 bg-[#A77D4B] animate-pulse" />
                <span className="w-0.5 h-4 bg-[#29241F] animate-pulse delay-75" />
                <span className="w-0.5 h-2 bg-[#A77D4B] animate-pulse delay-150" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
