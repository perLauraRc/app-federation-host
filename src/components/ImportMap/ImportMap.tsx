import confetti from 'https://esm.sh/canvas-confetti@1.6.0'

const ImportMap = () => {
  const showConfetti = (e: React.MouseEvent) => {
    confetti({
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
