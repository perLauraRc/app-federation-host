import { useEffect, useState } from 'react'

type ConfettiFunction = (options?: unknown) => void

const ImportMap = () => {
  const [confettiFn, setConfettiFn] = useState<ConfettiFunction | null>(null)

  useEffect(() => {
    const loadConfettiModule = async () => {
      try {
        const module = await import('https://esm.sh/canvas-confetti@1.6.0')
        setConfettiFn(() => module.default)
      } catch (err) {
        console.error('Failed to load confetti module', err)
      }
    }

    loadConfettiModule()
  }, [])

  const showConfetti = (e: React.MouseEvent) => {
    if (!confettiFn) return

    confettiFn?.({
      particleCount: 5,
      origin: {
        x: e.pageX / window.innerWidth,
        y: (e.pageY + 20) / window.innerHeight
      },
      zIndex: 9999,
      colors: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#e0e7ff']
    })
  }

  return (
    <div
      className="z-gridCellHovered absolute h-full w-full bg-transparent"
      onMouseMove={showConfetti}
    ></div>
  )
}

export default ImportMap
