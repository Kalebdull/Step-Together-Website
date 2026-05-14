'use client'

import { motion } from 'framer-motion'

const R = '#F05A1A'

// Dancing footsteps for In-Person Classes
export function ClassesIllustration() {
  const steps = [
    { x: 20, y: 46, rot: -18, delay: 0 },
    { x: 38, y: 28, rot: 18, delay: 0.2 },
    { x: 58, y: 46, rot: -18, delay: 0.4 },
    { x: 76, y: 28, rot: 18, delay: 0.6 },
    { x: 96, y: 46, rot: -18, delay: 0.8 },
  ]
  return (
    <svg width="120" height="68" viewBox="0 0 116 68" fill="none">
      {steps.map(({ x, y, rot, delay }, i) => (
        <motion.ellipse
          key={i}
          cx={x} cy={y} rx={7} ry={11}
          transform={`rotate(${rot} ${x} ${y})`}
          stroke={R} strokeWidth="1.4"
          fill={R} fillOpacity="0.1"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 0.8, 0.8, 0], scale: [0.4, 1, 1, 0.4] }}
          transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}

// Sparkle burst for Events & Socials
export function EventsIllustration() {
  const sparks = [
    { x: 22, y: 22, s: 11, delay: 0 },
    { x: 58, y: 12, s: 15, delay: 0.25 },
    { x: 96, y: 24, s: 10, delay: 0.5 },
    { x: 36, y: 50, s: 9, delay: 0.75 },
    { x: 80, y: 50, s: 12, delay: 0.38 },
    { x: 58, y: 36, s: 7, delay: 0.9 },
  ]
  return (
    <svg width="120" height="68" viewBox="0 0 120 68" fill="none">
      {sparks.map(({ x, y, s, delay }, i) => (
        <motion.g key={i}
          animate={{ scale: [0.7, 1.2, 0.7], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <line x1={x} y1={y - s / 2} x2={x} y2={y + s / 2} stroke={R} strokeWidth="1.5" strokeLinecap="round" />
          <line x1={x - s / 2} y1={y} x2={x + s / 2} y2={y} stroke={R} strokeWidth="1.5" strokeLinecap="round" />
          <line x1={x - s * 0.35} y1={y - s * 0.35} x2={x + s * 0.35} y2={y + s * 0.35} stroke={R} strokeWidth="1" strokeLinecap="round" />
          <line x1={x + s * 0.35} y1={y - s * 0.35} x2={x - s * 0.35} y2={y + s * 0.35} stroke={R} strokeWidth="1" strokeLinecap="round" />
        </motion.g>
      ))}
    </svg>
  )
}

// Signal arcs expanding outward for Online Platform
export function OnlineIllustration() {
  const arcs = [8, 17, 26, 35]
  const cx = 60, cy = 60
  return (
    <svg width="120" height="68" viewBox="0 0 120 68" fill="none">
      <motion.circle cx={cx} cy={cy} r="4" fill={R}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {arcs.map((r, i) => (
        <motion.path
          key={i}
          d={`M ${cx - r},${cy} a ${r},${r} 0 0,1 ${r * 2},0`}
          stroke={R} strokeWidth="1.6" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.75, 0] }}
          transition={{ duration: 2.4, delay: i * 0.28, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </svg>
  )
}

// Cowboy hat drawing itself for Apparel
export function ApparelIllustration() {
  return (
    <svg width="120" height="68" viewBox="0 0 120 68" fill="none">
      {/* Crown */}
      <motion.path
        d="M 38,46 L 42,16 Q 60,9 78,16 L 82,46 Z"
        stroke={R} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        fill={R} fillOpacity="0.07"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.9, 0.9, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
      />
      {/* Brim */}
      <motion.path
        d="M 14,46 Q 60,56 106,46 Q 106,40 82,42 L 38,42 Q 14,40 14,46 Z"
        stroke={R} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        fill={R} fillOpacity="0.07"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.9, 0.9, 0] }}
        transition={{ duration: 3, delay: 0.4, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
      />
      {/* Hat band */}
      <motion.line
        x1="40" y1="41" x2="80" y2="41"
        stroke={R} strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }}
        transition={{ duration: 1, delay: 0.9, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
      />
    </svg>
  )
}

// Mountain peaks + rising sun for Workshops & Retreats
export function WorkshopsIllustration() {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg width="120" height="68" viewBox="0 0 120 68" fill="none">
      {/* Back mountain */}
      <motion.path
        d="M 5,64 L 46,22 L 87,64 Z"
        fill={R} fillOpacity="0.08" stroke={R} strokeWidth="1.4" strokeLinejoin="round"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: [0, 0.9, 0.9, 0], y: [6, 0, 0, 6] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
      />
      {/* Front mountain */}
      <motion.path
        d="M 50,64 L 82,24 L 114,64 Z"
        fill={R} fillOpacity="0.12" stroke={R} strokeWidth="1.4" strokeLinejoin="round"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: [0, 0.9, 0.9, 0], y: [6, 0, 0, 6] }}
        transition={{ duration: 4, delay: 0.2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
      />
      {/* Sun */}
      <motion.circle cx="46" cy="16" r="6" fill={R} fillOpacity="0.18" stroke={R} strokeWidth="1.4"
        animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {rays.map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        return (
          <motion.line key={angle}
            x1={46 + Math.cos(rad) * 9} y1={16 + Math.sin(rad) * 9}
            x2={46 + Math.cos(rad) * 14} y2={16 + Math.sin(rad) * 14}
            stroke={R} strokeWidth="1.2" strokeLinecap="round"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 3, delay: i * 0.12, repeat: Infinity, ease: 'easeInOut' }}
          />
        )
      })}
    </svg>
  )
}

// Two interlocking rings pulsing for Community Partnerships
export function PartnershipsIllustration() {
  return (
    <svg width="120" height="68" viewBox="0 0 120 68" fill="none">
      <motion.circle
        cx="44" cy="34" r="22"
        stroke={R} strokeWidth="1.7" fill={R} fillOpacity="0.07"
        animate={{ x: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="76" cy="34" r="22"
        stroke={R} strokeWidth="1.7" fill={R} fillOpacity="0.07"
        animate={{ x: [0, 5, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Center glow where rings overlap */}
      <motion.ellipse cx="60" cy="34" rx="6" ry="14"
        fill={R} fillOpacity="0"
        animate={{ fillOpacity: [0.03, 0.12, 0.03] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}
