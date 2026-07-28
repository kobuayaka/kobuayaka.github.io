import { useEffect, useRef, useState } from 'react'

const POINT_COUNT = 30

export default function ConstellationCanvas({ onComplete, onClose }) {
  const canvasRef = useRef(null)
  const pointsRef = useRef([])
  const frameRef = useRef(null)
  const touchesRef = useRef([])
  const [touchCount, setTouchCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const completedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, rect.width * ratio)
      canvas.height = Math.max(1, rect.height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const centers = [
        [rect.width * 0.24, rect.height * 0.34],
        [rect.width * 0.72, rect.height * 0.32],
        [rect.width * 0.5, rect.height * 0.72],
      ]
      if (pointsRef.current.length === 0) {
        pointsRef.current = Array.from({ length: POINT_COUNT }, (_, index) => {
          const center = centers[index % 3]
          return {
            x: center[0] + (Math.random() - 0.5) * rect.width * 0.25,
            y: center[1] + (Math.random() - 0.5) * rect.height * 0.22,
            vx: (Math.random() - 0.5) * 0.28,
            vy: (Math.random() - 0.5) * 0.28,
            phase: Math.random() * Math.PI * 2,
            group: index % 3,
          }
        })
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const render = (time) => {
      const rect = canvas.getBoundingClientRect()
      context.clearRect(0, 0, rect.width, rect.height)
      const gradient = context.createRadialGradient(rect.width / 2, rect.height / 2, 0, rect.width / 2, rect.height / 2, rect.width * 0.7)
      gradient.addColorStop(0, 'rgba(41, 44, 74, 0.45)')
      gradient.addColorStop(1, 'rgba(2, 3, 12, 0)')
      context.fillStyle = gradient
      context.fillRect(0, 0, rect.width, rect.height)

      const points = pointsRef.current
      points.forEach((point, index) => {
        point.x += point.vx + Math.sin(time * 0.0007 + point.phase) * 0.08
        point.y += point.vy + Math.cos(time * 0.0006 + point.phase) * 0.08
        if (point.x < 8 || point.x > rect.width - 8) point.vx *= -1
        if (point.y < 8 || point.y > rect.height - 8) point.vy *= -1
        const target = touchesRef.current[point.group]
        if (target) {
          point.x += (target.x - point.x) * 0.0055
          point.y += (target.y - point.y) * 0.0055
        }
        for (let j = index + 1; j < points.length; j += 1) {
          const other = points[j]
          const distance = Math.hypot(point.x - other.x, point.y - other.y)
          const threshold = touchCount >= 3 ? 135 : 82
          if (distance < threshold) {
            context.strokeStyle = `rgba(214, 223, 255, ${(1 - distance / threshold) * 0.5})`
            context.lineWidth = touchCount >= 3 ? 1.1 : 0.65
            context.beginPath()
            context.moveTo(point.x, point.y)
            context.lineTo(other.x, other.y)
            context.stroke()
          }
        }
      })

      points.forEach((point, index) => {
        const pulse = 1.2 + Math.sin(time * 0.003 + point.phase) * 0.8
        context.fillStyle = index % 6 === 0 ? 'rgba(224, 196, 255, 0.95)' : 'rgba(244, 247, 255, 0.92)'
        context.beginPath()
        context.arc(point.x, point.y, pulse + (touchCount >= 3 ? 0.7 : 0), 0, Math.PI * 2)
        context.fill()
      })
      frameRef.current = requestAnimationFrame(render)
    }
    frameRef.current = requestAnimationFrame(render)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [touchCount])

  const handlePointer = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const point = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    const nextCount = Math.min(3, touchCount + 1)
    touchesRef.current[nextCount - 1] = point
    setTouchCount(nextCount)
    if (nextCount >= 3 && !completedRef.current) {
      completedRef.current = true
      setIsComplete(true)
      onComplete?.()
    }
  }

  return (
    <div className="modal-backdrop night-modal">
      <article className="work-modal constellation-modal">
        <button className="modal-close" type="button" onClick={onClose} aria-label="閉じる">×</button>
        <div className="night-kicker">✦ 深夜に追加された作品</div>
        <h2>星座になる前</h2>
        <p className="constellation-instruction">画面を3か所タップして、30の星を結んでください。</p>
        <div className="constellation-canvas-wrap">
          <canvas ref={canvasRef} onPointerDown={handlePointer} />
          <div className="touch-progress">{touchCount} / 3</div>
        </div>
        <p className="night-description">ばらばらに動く30の点が、触れられた場所を中心に関係を結びます。同じ星座は二度と現れません。</p>
        <button className="primary-button modal-ok" type="button" onClick={onClose} disabled={!isComplete}>
          {!isComplete ? '星を3か所つなぐ' : '作品を閉じる'}
        </button>
      </article>
    </div>
  )
}
