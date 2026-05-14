'use client'

import { useState, useEffect } from 'react'

interface HeroPhotoPanelProps {
  photos: string[]
}

export function HeroPhotoPanel({ photos }: HeroPhotoPanelProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % photos.length)
    }, 3800)
    return () => clearInterval(timer)
  }, [photos.length])

  return (
    <div className="w-full h-full flex items-center justify-center px-4 py-6">
      <div
        className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
        style={{
          height: '330px',
          border: '1px solid rgba(245,237,214,0.16)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(245,237,214,0.08)',
        }}
      >
        {photos.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === current ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
            }}
          />
        ))}
        {/* Subtle top/bottom fade so edges feel soft */}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
