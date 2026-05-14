'use client'

// The signature double-swirl ornament (from the brand reference image)
export function DoubleSwirlOrnament({
  className = '',
  color = '#F05A1A',
  opacity = 0.55,
  width = 380,
}: {
  className?: string
  color?: string
  opacity?: number
  width?: number
}) {
  const height = Math.round(width * 0.21)
  return (
    <div className={`flex justify-center pointer-events-none select-none ${className}`} aria-hidden>
      <svg width={width} height={height} viewBox="0 0 380 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Right swirl */}
        <path
          d="M 190,40 C 210,40 234,30 256,22 C 278,14 304,8 324,17 C 344,26 350,48 338,61 C 326,74 303,76 292,63 C 281,50 287,33 302,30 C 317,27 325,40 318,51 C 311,62 297,60 295,51"
          stroke={color} strokeWidth="2" strokeOpacity={opacity} fill="none" strokeLinecap="round" strokeLinejoin="round"
        />
        {/* Left swirl (mirror) */}
        <path
          d="M 190,40 C 170,40 146,30 124,22 C 102,14 76,8 56,17 C 36,26 30,48 42,61 C 54,74 77,76 88,63 C 99,50 93,33 78,30 C 63,27 55,40 62,51 C 69,62 83,60 85,51"
          stroke={color} strokeWidth="2" strokeOpacity={opacity} fill="none" strokeLinecap="round" strokeLinejoin="round"
        />
        {/* Center diamond */}
        <path d="M 190,32 L 196,40 L 190,48 L 184,40 Z" fill={color} opacity={opacity * 0.9} />
      </svg>
    </div>
  )
}

// Smaller swirl accent for use under section headings
export function SwirlAccent({
  className = '',
  color = '#F05A1A',
  opacity = 0.5,
}: {
  className?: string
  color?: string
  opacity?: number
}) {
  return (
    <div className={`flex justify-center pointer-events-none select-none ${className}`} aria-hidden>
      <svg width="220" height="46" viewBox="0 0 380 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 190,40 C 210,40 234,30 256,22 C 278,14 304,8 324,17 C 344,26 350,48 338,61 C 326,74 303,76 292,63 C 281,50 287,33 302,30 C 317,27 325,40 318,51 C 311,62 297,60 295,51"
          stroke={color} strokeWidth="2.5" strokeOpacity={opacity} fill="none" strokeLinecap="round"
        />
        <path
          d="M 190,40 C 170,40 146,30 124,22 C 102,14 76,8 56,17 C 36,26 30,48 42,61 C 54,74 77,76 88,63 C 99,50 93,33 78,30 C 63,27 55,40 62,51 C 69,62 83,60 85,51"
          stroke={color} strokeWidth="2.5" strokeOpacity={opacity} fill="none" strokeLinecap="round"
        />
        <path d="M 190,33 L 196,40 L 190,47 L 184,40 Z" fill={color} opacity={opacity} />
      </svg>
    </div>
  )
}

// Navbar side ornament — left side (S-scroll curling inward from left edge)
export function NavbarOrnamentLeft({
  color = '#F05A1A',
  opacity = 0.7,
}: {
  color?: string
  opacity?: number
}) {
  return (
    <svg width="110" height="52" viewBox="0 0 110 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M 2,26 C 18,26 36,19 54,13 C 72,7 92,2 106,10 C 120,18 121,34 111,43 C 101,52 82,51 73,40 C 64,29 70,16 84,14 C 98,12 105,24 99,33 C 93,42 79,40 77,32"
        stroke={color} strokeWidth="1.8" strokeOpacity={opacity} fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

// Navbar side ornament — right side (mirrored)
export function NavbarOrnamentRight({
  color = '#F05A1A',
  opacity = 0.7,
}: {
  color?: string
  opacity?: number
}) {
  return (
    <svg width="110" height="52" viewBox="0 0 110 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }} aria-hidden>
      <path
        d="M 2,26 C 18,26 36,19 54,13 C 72,7 92,2 106,10 C 120,18 121,34 111,43 C 101,52 82,51 73,40 C 64,29 70,16 84,14 C 98,12 105,24 99,33 C 93,42 79,40 77,32"
        stroke={color} strokeWidth="1.8" strokeOpacity={opacity} fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

// Subtle wavy rust line for bottom of navbar
export function NavbarSwoosh({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden ${className}`} aria-hidden style={{ height: 3 }}>
      <svg viewBox="0 0 1440 3" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0 1.5 C200 0, 400 3, 600 1.5 C800 0, 1000 3, 1200 1.5 C1300 0.5, 1370 2, 1440 1.5" stroke="#F05A1A" strokeWidth="1.2" fill="none" strokeOpacity="0.55" />
      </svg>
    </div>
  )
}

// Full-width wavy section divider
export function SwooshDivider({
  className = '',
  color = '#F05A1A',
  opacity = 0.25,
}: {
  className?: string
  color?: string
  opacity?: number
}) {
  return (
    <div className={`w-full overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <svg viewBox="0 0 1200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
        <path d="M0 30 C150 5, 300 55, 450 30 C600 5, 750 55, 900 30 C1050 5, 1150 45, 1200 30" stroke={color} strokeWidth="1.5" strokeOpacity={opacity} fill="none" />
        <path d="M0 38 C150 13, 300 63, 450 38 C600 13, 750 63, 900 38 C1050 13, 1150 53, 1200 38" stroke={color} strokeWidth="0.75" strokeOpacity={opacity * 0.6} fill="none" />
        {[150, 450, 750, 1050].map(x => (
          <g key={x} transform={`translate(${x}, 30)`} opacity={opacity * 1.4}>
            <path d="M0,-5 L1.2,-1.5 L5,-1.5 L2,1 L3.1,5 L0,2.5 L-3.1,5 L-2,1 L-5,-1.5 L-1.2,-1.5 Z" fill={color} />
          </g>
        ))}
      </svg>
    </div>
  )
}

// Dashed stitch-line divider with diamond accents
export function BootStitchBar({
  className = '',
  color = '#F05A1A',
  opacity = 0.2,
}: {
  className?: string
  color?: string
  opacity?: number
}) {
  return (
    <div className={`w-full pointer-events-none ${className}`} aria-hidden>
      <svg viewBox="0 0 800 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
        <line x1="0" y1="10" x2="800" y2="10" stroke={color} strokeWidth="0.75" strokeOpacity={opacity} strokeDasharray="4 6" />
        {[50, 150, 250, 350, 450, 550, 650, 750].map(x => (
          <path key={x} d={`M${x},5 L${x + 3},10 L${x},15 L${x - 3},10 Z`} fill={color} opacity={opacity * 1.5} />
        ))}
      </svg>
    </div>
  )
}

// Tall side scrollwork — left
export function WesternScrollLeft({
  className = '',
  color = '#F05A1A',
  opacity = 0.18,
}: {
  className?: string
  color?: string
  opacity?: number
}) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg width="120" height="200" viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 10 C60 10, 20 40, 30 80 C40 120, 90 100, 80 140 C70 180, 20 170, 10 190" stroke={color} strokeWidth="1.5" strokeOpacity={opacity} fill="none" strokeLinecap="round" />
        <path d="M80 20 C60 25, 45 45, 52 70 C60 95, 85 85, 78 115" stroke={color} strokeWidth="0.8" strokeOpacity={opacity * 0.7} fill="none" strokeLinecap="round" />
        <circle cx="100" cy="10" r="4" stroke={color} strokeWidth="1" strokeOpacity={opacity} fill="none" />
        <circle cx="10" cy="190" r="3" stroke={color} strokeWidth="1" strokeOpacity={opacity} fill="none" />
        <path d="M55 40 L56.5 44.6 L61.3 44.6 L57.4 47.4 L58.9 52 L55 49.2 L51.1 52 L52.6 47.4 L48.7 44.6 L53.5 44.6 Z" fill={color} opacity={opacity * 1.5} />
      </svg>
    </div>
  )
}

// Tall side scrollwork — right (mirror of left)
export function WesternScrollRight({
  className = '',
  color = '#F05A1A',
  opacity = 0.18,
}: {
  className?: string
  color?: string
  opacity?: number
}) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg width="120" height="200" viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
        <path d="M100 10 C60 10, 20 40, 30 80 C40 120, 90 100, 80 140 C70 180, 20 170, 10 190" stroke={color} strokeWidth="1.5" strokeOpacity={opacity} fill="none" strokeLinecap="round" />
        <path d="M80 20 C60 25, 45 45, 52 70 C60 95, 85 85, 78 115" stroke={color} strokeWidth="0.8" strokeOpacity={opacity * 0.7} fill="none" strokeLinecap="round" />
        <circle cx="100" cy="10" r="4" stroke={color} strokeWidth="1" strokeOpacity={opacity} fill="none" />
        <circle cx="10" cy="190" r="3" stroke={color} strokeWidth="1" strokeOpacity={opacity} fill="none" />
        <path d="M55 40 L56.5 44.6 L61.3 44.6 L57.4 47.4 L58.9 52 L55 49.2 L51.1 52 L52.6 47.4 L48.7 44.6 L53.5 44.6 Z" fill={color} opacity={opacity * 1.5} />
      </svg>
    </div>
  )
}

// Delicate flowing S-curve pair — lighter than DoubleSwirlOrnament, for subtle section accents
export function FlowingSwirl({
  className = '',
  color = '#F05A1A',
  opacity = 0.4,
  width = 260,
}: {
  className?: string
  color?: string
  opacity?: number
  width?: number
}) {
  const height = Math.round(width * 0.18)
  return (
    <div className={`flex justify-center pointer-events-none select-none ${className}`} aria-hidden>
      <svg width={width} height={height} viewBox="0 0 300 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Right arm */}
        <path d="M 150,27 C 168,27 188,19 208,15 C 228,11 252,14 266,23 C 274,29 272,40 262,43 C 252,46 240,41 244,33 C 248,25 261,29 259,37" stroke={color} strokeWidth="1.6" strokeOpacity={opacity} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Left arm */}
        <path d="M 150,27 C 132,27 112,19 92,15 C 72,11 48,14 34,23 C 26,29 28,40 38,43 C 48,46 60,41 56,33 C 52,25 39,29 41,37" stroke={color} strokeWidth="1.6" strokeOpacity={opacity} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Center dot */}
        <circle cx="150" cy="27" r="2.5" fill={color} opacity={opacity} />
      </svg>
    </div>
  )
}

// Infinity/lemniscate ornament — two loops crossing at center
export function InfinityOrnament({
  className = '',
  color = '#F05A1A',
  opacity = 0.4,
  width = 200,
}: {
  className?: string
  color?: string
  opacity?: number
  width?: number
}) {
  const height = Math.round(width * 0.26)
  return (
    <div className={`flex justify-center pointer-events-none select-none ${className}`} aria-hidden>
      <svg width={width} height={height} viewBox="0 0 220 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Right loop */}
        <path d="M 110,29 C 124,12 185,9 190,29 C 195,49 136,52 110,35" stroke={color} strokeWidth="1.7" strokeOpacity={opacity} fill="none" strokeLinecap="round"/>
        {/* Left loop */}
        <path d="M 110,29 C 96,12 35,9 30,29 C 25,49 84,52 110,35" stroke={color} strokeWidth="1.7" strokeOpacity={opacity} fill="none" strokeLinecap="round"/>
        {/* Center crossover accent */}
        <circle cx="110" cy="30" r="3" fill={color} opacity={opacity * 0.8}/>
      </svg>
    </div>
  )
}

// Triple-curl divider — three linked ovals, inspired by the flowing calligraphic flourish
export function TripleCurlDivider({
  className = '',
  color = '#F05A1A',
  opacity = 0.35,
  width = 240,
}: {
  className?: string
  color?: string
  opacity?: number
  width?: number
}) {
  const height = Math.round(width * 0.22)
  return (
    <div className={`flex justify-center pointer-events-none select-none ${className}`} aria-hidden>
      <svg width={width} height={height} viewBox="0 0 280 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left curl */}
        <path d="M 60,31 C 60,14 85,9 95,20 C 105,31 90,46 75,40 C 60,34 68,20 80,22 C 92,24 96,36 88,42" stroke={color} strokeWidth="1.5" strokeOpacity={opacity} fill="none" strokeLinecap="round"/>
        {/* Center curl */}
        <path d="M 140,31 C 140,14 165,9 175,20 C 185,31 170,46 155,40 C 140,34 148,20 160,22 C 172,24 176,36 168,42" stroke={color} strokeWidth="1.5" strokeOpacity={opacity} fill="none" strokeLinecap="round"/>
        {/* Right curl */}
        <path d="M 220,31 C 220,14 245,9 255,20 C 265,31 250,46 235,40 C 220,34 228,20 240,22 C 252,24 256,36 248,42" stroke={color} strokeWidth="1.5" strokeOpacity={opacity} fill="none" strokeLinecap="round"/>
        {/* Connecting line */}
        <path d="M 88,31 C 105,31 120,31 140,31 C 160,31 175,31 192,31" stroke={color} strokeWidth="0.8" strokeOpacity={opacity * 0.7} fill="none" strokeLinecap="round" strokeDasharray="3 5"/>
      </svg>
    </div>
  )
}

// Hero section bottom swoosh transition
export function HeroSwoosh({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 pointer-events-none ${className}`} style={{ height: 80 }} aria-hidden>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0 80 C240 40, 480 70, 720 50 C960 30, 1200 65, 1440 45 L1440 80 Z" fill="#0D1B2E" fillOpacity="0.6" />
        <path d="M0 80 C360 55, 600 75, 900 60 C1100 50, 1300 70, 1440 65 L1440 80 Z" fill="#0D1B2E" fillOpacity="0.4" />
        <path d="M0 55 C240 30, 480 60, 720 40 C960 20, 1200 55, 1440 35" stroke="#F05A1A" strokeWidth="1" fill="none" strokeOpacity="0.4" strokeDasharray="6 10" />
      </svg>
    </div>
  )
}
