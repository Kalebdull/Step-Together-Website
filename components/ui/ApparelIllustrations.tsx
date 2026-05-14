'use client'

import { motion } from 'framer-motion'

const CREAM = '#F5F0E5'
const RUST = '#F05A1A'

// Reusable animated path — draws in, holds, draws out, loops
function Stroke({
  d,
  delay = 0,
  width = 2,
  color = CREAM,
  fill = 'none',
  fo = 0,
}: {
  d: string
  delay?: number
  width?: number
  color?: string
  fill?: string
  fo?: number
}) {
  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
      fillOpacity={fo}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.9, 0.85, 0] }}
      transition={{
        duration: 4.5,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: 'easeInOut',
        times: [0, 0.3, 0.78, 1],
      }}
    />
  )
}

// ── Step Together Tee ──────────────────────────────────────────
export function TeeIllustration() {
  return (
    <svg width="120" height="110" viewBox="0 0 120 110" fill="none">
      {/* Body + sleeves */}
      <Stroke
        d="M 46,20 L 24,27 L 4,50 L 27,56 L 27,106 L 93,106 L 93,56 L 116,50 L 96,27 L 74,20 C 68,30 52,30 46,20 Z"
        fill={CREAM} fo={0.04}
      />
      {/* Neckline detail */}
      <Stroke d="M 46,20 C 50,31 70,31 74,20" delay={0.9} color={RUST} width={1.5} />
      {/* Hem line */}
      <Stroke d="M 27,98 L 93,98" delay={1.4} width={0.8} color={`${CREAM}60`} />
    </svg>
  )
}

// ── Signature Hoodie ───────────────────────────────────────────
export function HoodieIllustration() {
  return (
    <svg width="120" height="115" viewBox="0 0 120 115" fill="none">
      {/* Body + sleeves */}
      <Stroke
        d="M 40,28 L 22,32 L 2,57 L 25,63 L 25,110 L 95,110 L 95,63 L 118,57 L 98,32 L 80,28 C 76,6 44,6 40,28 Z"
        fill={CREAM} fo={0.04}
      />
      {/* Hood inner curve */}
      <Stroke d="M 40,28 C 44,22 76,22 80,28" delay={0.8} color={RUST} width={1.5} />
      {/* Kangaroo pocket */}
      <Stroke d="M 44,80 L 76,80 L 76,102 L 44,102 Z" delay={1.2} width={1.2} />
      {/* Drawstrings */}
      <Stroke d="M 53,29 L 49,44" delay={1.6} width={1.2} color={RUST} />
      <Stroke d="M 67,29 L 71,44" delay={1.6} width={1.2} color={RUST} />
    </svg>
  )
}

// ── Branded Cap ────────────────────────────────────────────────
export function CapIllustration() {
  return (
    <svg width="120" height="88" viewBox="0 0 120 88" fill="none">
      {/* Crown dome */}
      <Stroke
        d="M 15,54 C 15,10 105,10 105,54 L 15,54 Z"
        fill={CREAM} fo={0.05}
      />
      {/* Brim */}
      <Stroke
        d="M 5,57 Q 60,72 115,57 L 105,54 L 15,54 Z"
        delay={0.6} fill={CREAM} fo={0.04}
      />
      {/* Sweatband */}
      <Stroke d="M 15,51 Q 60,55 105,51" delay={1} width={1.5} color={RUST} />
      {/* Panel seams */}
      <Stroke d="M 60,12 Q 60,34 60,54" delay={1.3} width={0.8} color={`${CREAM}55`} />
      <Stroke d="M 60,12 Q 42,30 20,52" delay={1.5} width={0.8} color={`${CREAM}55`} />
      <Stroke d="M 60,12 Q 78,30 100,52" delay={1.5} width={0.8} color={`${CREAM}55`} />
      {/* Top button */}
      <motion.circle cx="60" cy="12" r="4"
        stroke={CREAM} strokeWidth="1.5" fill={CREAM} fillOpacity="0.12"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.85, 0.85, 0], scale: [0, 1, 1, 0] }}
        transition={{ duration: 4.5, delay: 0.3, repeat: Infinity, repeatDelay: 1.2, times: [0, 0.25, 0.78, 1] }}
      />
    </svg>
  )
}

// ── Dance Bandana ──────────────────────────────────────────────
export function BandanaIllustration() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
      {/* Outer diamond */}
      <motion.path
        d="M 55,8 L 102,55 L 55,102 L 8,55 Z"
        stroke={CREAM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        fill={CREAM} fillOpacity="0.04"
        initial={{ pathLength: 0, opacity: 0, rotate: 0 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.85, 0.85, 0], rotate: [0, 0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut', times: [0, 0.3, 0.78, 1] }}
        style={{ transformOrigin: '55px 55px' }}
      />
      {/* Inner diamond */}
      <Stroke d="M 55,22 L 88,55 L 55,88 L 22,55 Z" delay={0.8} width={1} color={RUST} />
      {/* Corner fold lines */}
      <Stroke d="M 55,8 L 55,22" delay={1.2} width={1} color={`${RUST}80`} />
      <Stroke d="M 102,55 L 88,55" delay={1.2} width={1} color={`${RUST}80`} />
      <Stroke d="M 8,55 L 22,55" delay={1.2} width={1} color={`${RUST}80`} />
      {/* Center diamond */}
      <motion.circle cx="55" cy="55" r="5"
        fill={RUST} fillOpacity="0.7"
        animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}

// ── Boot Bag ───────────────────────────────────────────────────
export function BootBagIllustration() {
  return (
    <svg width="108" height="112" viewBox="0 0 108 112" fill="none">
      {/* Left handle */}
      <Stroke d="M 32,44 C 32,22 48,22 48,44" width={2} />
      {/* Right handle */}
      <Stroke d="M 60,44 C 60,22 76,22 76,44" delay={0.3} width={2} />
      {/* Bag body */}
      <Stroke
        d="M 18,44 L 90,44 L 98,108 L 10,108 Z"
        delay={0.5} fill={CREAM} fo={0.05}
      />
      {/* Front patch */}
      <Stroke d="M 34,62 L 74,62 L 74,90 L 34,90 Z" delay={1.1} width={1.2} color={RUST} />
      {/* Western star inside patch */}
      <Stroke
        d="M 54,67 L 56.2,73.2 L 62.8,73.2 L 57.5,77.1 L 59.7,83.4 L 54,79.5 L 48.3,83.4 L 50.5,77.1 L 45.2,73.2 L 51.8,73.2 Z"
        delay={1.6} width={1.2} color={RUST} fill={RUST} fo={0.15}
      />
    </svg>
  )
}

// ── Community Vest ─────────────────────────────────────────────
export function VestIllustration() {
  return (
    <svg width="108" height="114" viewBox="0 0 108 114" fill="none">
      {/* Body (no sleeves) */}
      <Stroke
        d="M 34,20 L 16,26 L 16,108 L 92,108 L 92,26 L 74,20 C 68,32 40,32 34,20 Z"
        fill={CREAM} fo={0.04}
      />
      {/* V-neckline */}
      <Stroke d="M 34,20 L 54,50 L 74,20" delay={0.7} color={RUST} width={1.6} />
      {/* Button placket */}
      <Stroke d="M 54,50 L 54,108" delay={1} width={0.8} color={`${CREAM}50`} />
      {/* Buttons */}
      {[62, 78, 94].map((y, i) => (
        <motion.circle key={y} cx="54" cy={y} r="3.5"
          stroke={RUST} strokeWidth="1.3" fill="none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.8, 0.8, 0], scale: [0, 1, 1, 0] }}
          transition={{ duration: 4.5, delay: 1.3 + i * 0.2, repeat: Infinity, repeatDelay: 1.2, times: [0, 0.2, 0.78, 1] }}
        />
      ))}
      {/* Left chest pocket */}
      <Stroke d="M 26,48 L 46,48 L 46,68 L 26,68 Z" delay={1.5} width={1.2} />
    </svg>
  )
}
