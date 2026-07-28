import { useEffect, useRef, useState } from 'react'

const FACE_POINTS = [
  [0.28,0.26],[0.37,0.19],[0.50,0.16],[0.63,0.19],[0.72,0.28],
  [0.77,0.41],[0.76,0.57],[0.69,0.71],[0.58,0.81],[0.43,0.81],
  [0.31,0.72],[0.23,0.58],[0.22,0.42],[0.35,0.40],[0.43,0.39],
  [0.57,0.39],[0.65,0.40],[0.40,0.57],[0.50,0.60],[0.60,0.57],
  [0.39,0.68],[0.50,0.72],[0.61,0.68],
]

export default function HorrorGenerativeCanvas({ onComplete, onClose }) {
  const canvasRef = useRef(null)
  const pointsRef = useRef([])
  const rafRef = useRef(null)
  const [touches, setTouches] = useState(0)
  const completeRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = rect.width * ratio
      canvas.height = rect.height * ratio
      ctx.setTransform(ratio,0,0,ratio,0,0)
      if (!pointsRef.current.length) {
        pointsRef.current = Array.from({ length: 58 }, (_, index) => ({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - .5) * .35,
          vy: (Math.random() - .5) * .35,
          phase: Math.random() * Math.PI * 2,
          target: FACE_POINTS[index % FACE_POINTS.length],
        }))
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (time) => {
      const rect = canvas.getBoundingClientRect()
      ctx.fillStyle = 'rgba(1,2,4,.22)'
      ctx.fillRect(0,0,rect.width,rect.height)
      const reveal = Math.min(1, touches / 3)
      pointsRef.current.forEach((point, i) => {
        point.x += point.vx + Math.sin(time * .001 + point.phase) * .08
        point.y += point.vy + Math.cos(time * .0012 + point.phase) * .08
        if (point.x < 0 || point.x > rect.width) point.vx *= -1
        if (point.y < 0 || point.y > rect.height) point.vy *= -1
        if (reveal > 0) {
          const tx = point.target[0] * rect.width
          const ty = point.target[1] * rect.height
          point.x += (tx - point.x) * (.003 + reveal * .018)
          point.y += (ty - point.y) * (.003 + reveal * .018)
        }
        for (let j=i+1;j<pointsRef.current.length;j+=1) {
          const other=pointsRef.current[j]
          const dist=Math.hypot(point.x-other.x,point.y-other.y)
          if (dist < 52 + reveal * 24) {
            ctx.strokeStyle=`rgba(198,205,211,${(1-dist/(76))*(.08+reveal*.18)})`
            ctx.lineWidth=.7
            ctx.beginPath();ctx.moveTo(point.x,point.y);ctx.lineTo(other.x,other.y);ctx.stroke()
          }
        }
      })
      pointsRef.current.forEach((point,i)=>{
        const red=i%17===0
        ctx.fillStyle=red?'rgba(168,24,35,.95)':'rgba(224,226,222,.85)'
        ctx.fillRect(Math.round(point.x),Math.round(point.y),red?2:1,red?2:1)
      })
      if (touches >= 3) {
        ctx.font='700 18px monospace'
        ctx.textAlign='center'
        ctx.fillStyle=`rgba(152,18,30,${.45+.35*Math.sin(time*.006)})`
        ctx.fillText('03:00',rect.width/2,rect.height*.92)
      }
      // CRT noise
      for (let k=0;k<18;k+=1) {
        ctx.fillStyle=`rgba(255,255,255,${Math.random()*.04})`
        ctx.fillRect(0,Math.random()*rect.height,rect.width,1)
      }
      rafRef.current=requestAnimationFrame(draw)
    }
    ctx.fillStyle='#010204';ctx.fillRect(0,0,canvas.width,canvas.height)
    rafRef.current=requestAnimationFrame(draw)
    return ()=>{window.removeEventListener('resize',resize);cancelAnimationFrame(rafRef.current)}
  }, [touches])

  const handlePointer = () => {
    const next=Math.min(3,touches+1)
    setTouches(next)
    if (next===3 && !completeRef.current) {
      completeRef.current=true
      onComplete?.()
      navigator.vibrate?.([50,40,110])
    }
  }

  return (
    <div className="modal-backdrop night-modal">
      <article className="work-modal horror-program-modal">
        <button className="modal-close" type="button" onClick={onClose} aria-label="閉じる">×</button>
        <div className="night-kicker">✦ 深夜にだけ現れるプログラム作品</div>
        <h2>観測者のいない星座</h2>
        <p className="constellation-instruction">暗闇を3回タップして、散らばった点を観測してください。</p>
        <div className="constellation-canvas-wrap horror-canvas-wrap">
          <canvas ref={canvasRef} onPointerDown={handlePointer} />
          <div className="touch-progress">OBSERVE {touches} / 3</div>
        </div>
        <p className="night-description">観測されていない点は自由に漂います。視線を与えられた瞬間だけ、見覚えのある輪郭へ集まり、03:00を記録します。</p>
        <button className="primary-button modal-ok" type="button" onClick={onClose} disabled={touches < 3}>
          {touches < 3 ? 'まだ何かが足りない' : '作品を閉じる'}
        </button>
      </article>
    </div>
  )
}
