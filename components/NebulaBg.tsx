'use client'

const variants = {
  hero: [
    { color: 'from-orange-500/20 to-red-500/10', w: 'w-[700px]', h: 'h-[500px]', pos: '-top-40 -left-40', delay: '0s', duration: '20s' },
    { color: 'from-cyan-500/15 to-blue-500/10', w: 'w-[600px]', h: 'h-[400px]', pos: '-top-20 -right-32', delay: '3s', duration: '25s' },
    { color: 'from-violet-500/10 to-purple-500/10', w: 'w-[500px]', h: 'h-[350px]', pos: 'top-1/3 left-1/4', delay: '6s', duration: '22s' },
  ],
  section: [
    { color: 'from-orange-500/10 to-red-500/5', w: 'w-[500px]', h: 'h-[350px]', pos: '-top-32 -right-24', delay: '0s', duration: '25s' },
    { color: 'from-cyan-500/10 to-blue-500/5', w: 'w-[400px]', h: 'h-[300px]', pos: '-bottom-20 -left-20', delay: '4s', duration: '28s' },
  ],
  subtle: [
    { color: 'from-orange-500/5 to-transparent', w: 'w-[400px]', h: 'h-[300px]', pos: '-top-20 left-1/2 -translate-x-1/2', delay: '0s', duration: '30s' },
  ],
} as const

export function NebulaBg({ variant = 'hero' }: { variant?: keyof typeof variants }) {
  const blobs = variants[variant]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`absolute ${blob.pos} ${blob.w} ${blob.h} rounded-full bg-gradient-to-r ${blob.color} blur-[150px] animate-drift`}
          style={{
            animationDelay: blob.delay,
            animationDuration: blob.duration,
          }}
        />
      ))}
    </div>
  )
}
