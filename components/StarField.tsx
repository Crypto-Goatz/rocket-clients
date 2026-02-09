'use client'

import { useMemo } from 'react'

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => {
      const seed = i + 1
      const x = seededRandom(seed * 1) * 100
      const y = seededRandom(seed * 2) * 100
      const size = seededRandom(seed * 3) * 2 + 1
      const delay = seededRandom(seed * 4) * 5
      const duration = seededRandom(seed * 5) * 3 + 2
      const isBright = i < 8
      const isBlue = seededRandom(seed * 6) > 0.6
      return { x, y, size, delay, duration, isBright, isBlue }
    })
  }, [])

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((star, i) => (
        <div
          key={i}
          className={star.isBright ? 'animate-glow-pulse' : 'animate-twinkle'}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.isBright ? star.size + 1 : star.size}px`,
            height: `${star.isBright ? star.size + 1 : star.size}px`,
            borderRadius: '50%',
            backgroundColor: star.isBlue ? '#a5f3fc' : '#ffffff',
            opacity: star.isBright ? 0.8 : 0.4,
            boxShadow: star.isBright
              ? `0 0 ${star.size * 3}px ${star.isBlue ? 'rgba(165,243,252,0.6)' : 'rgba(255,255,255,0.5)'}`
              : 'none',
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      {/* Occasional shooting star */}
      <div
        className="absolute w-px h-px bg-white"
        style={{
          top: '15%',
          left: '10%',
          boxShadow: '0 0 4px 1px rgba(255,255,255,0.6)',
          animation: 'shootingStar 6s linear infinite',
          animationDelay: '8s',
        }}
      />
      <div
        className="absolute w-px h-px bg-white"
        style={{
          top: '40%',
          left: '60%',
          boxShadow: '0 0 4px 1px rgba(255,255,255,0.6)',
          animation: 'shootingStar 6s linear infinite',
          animationDelay: '20s',
        }}
      />
    </div>
  )
}
