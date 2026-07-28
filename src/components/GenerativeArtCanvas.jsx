import { useEffect, useRef, useState } from 'react'

const TAU = Math.PI * 2
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
const noise = (x) => {
  const s = Math.sin(x * 12.9898) * 43758.5453123
  return s - Math.floor(s)
}
const HSLA = (h, s, l, a = 1) => `hsla(${h},${s}%,${l}%,${a})`

export default function GenerativeArtCanvas({ kind, onInteraction }) {
  const ref = useRef(null)
  const triggerRef = useRef(() => {})
  const interactionRef = useRef(onInteraction)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    interactionRef.current = onInteraction
  }, [onInteraction])

  useEffect(() => {
    const canvas = ref.current
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = 840
    const height = 560
    canvas.width = width * dpr
    canvas.height = height * dpr
    const g = canvas.getContext('2d')
    g.setTransform(dpr, 0, 0, dpr, 0, 0)

    let raf = 0
    let phase = 0
    let start = 0

    const trigger = () => {
      phase = 1
      start = performance.now()
      setTriggered(true)
      interactionRef.current?.()
    }
    triggerRef.current = trigger

    const progress = (now) => {
      if (phase !== 1) return 0
      const p = (now - start) / 3200
      if (p >= 1) {
        phase = 0
        return 0
      }
      return p
    }
    const clear = (alpha = 1) => {
      g.fillStyle = `rgba(3,4,8,${alpha})`
      g.fillRect(0, 0, width, height)
    }

    const eye = (t, p) => {
      const cx = width / 2
      const cy = height / 2
      clear(0.24)
      const jump = p > 0.7 ? ease((p - 0.7) / 0.3) : 0
      const pulse = 1 + 0.035 * Math.sin(t * 2.2) + jump * 1.65
      g.save()
      g.translate(cx, cy)
      g.scale(pulse, pulse)

      for (let i = 1; i < 32; i += 1) {
        const r = i * 8 + Math.sin(t * 1.6 + i * 0.7) * 3
        g.beginPath()
        for (let a = 0; a <= TAU + 0.05; a += 0.035) {
          const wob = Math.sin(a * 8 + t * 2 + i) * 1.5 + Math.sin(a * 17 - t) * 0.8
          const rr = r + wob + jump * Math.sin(a * 13 + t * 35) * 7
          const x = Math.cos(a) * rr * 1.55
          const y = Math.sin(a) * rr * 0.88
          if (a === 0) g.moveTo(x, y)
          else g.lineTo(x, y)
        }
        g.strokeStyle = `rgba(${165 + jump * 90},${205 - jump * 135},${225 - jump * 160},${0.08 + i / 90})`
        g.lineWidth = 0.5 + (i % 4 === 0 ? 1 : 0)
        g.stroke()
      }

      const open = 0.22 + 0.12 * Math.sin(t * 1.7) + p * 0.78
      g.beginPath()
      g.ellipse(0, 0, 122 + 62 * p, 28 + 102 * open, 0, 0, TAU)
      g.fillStyle = '#eef6ff'
      g.fill()
      g.beginPath()
      g.ellipse(0, 0, 62 + 82 * jump, 22 + 74 * open, 0, 0, TAU)
      g.fillStyle = '#05060a'
      g.fill()
      g.beginPath()
      g.arc(0, 0, 12 + 48 * jump, 0, TAU)
      g.fillStyle = `rgba(180,0,22,${0.45 + 0.55 * p})`
      g.fill()

      for (let i = 0; i < 12; i += 1) {
        const a = (i / 12) * TAU + t * 0.4
        g.strokeStyle = `rgba(255,255,255,${0.09 + 0.08 * Math.sin(i + t)})`
        g.beginPath()
        g.moveTo(Math.cos(a) * 30, Math.sin(a) * 10)
        g.lineTo(Math.cos(a) * (85 + jump * 40), Math.sin(a) * (22 + jump * 12))
        g.stroke()
      }
      if (jump > 0.25) {
        g.fillStyle = `rgba(255,255,255,${(jump - 0.25) * 0.55})`
        g.fillRect(-width, -height, width * 2, height * 2)
      }
      g.restore()
    }

    const signal = (t, p) => {
      clear(0.18)
      for (let y = 0; y < height; y += 3) {
        const off = (noise(y * 0.31 + t * 2) - 0.5) * (6 + p * 70)
        g.fillStyle = `rgba(180,255,205,${0.02 + noise(y + t) * 0.08})`
        g.fillRect(off, y, width, 1)
      }

      const cx = width / 2 + (noise(t * 8) - 0.5) * p * 45
      const cy = height * 0.5
      const zoom = 1 + (p > 0.65 ? ease((p - 0.65) / 0.35) * 2.4 : 0)
      g.save()
      g.translate(cx, cy)
      g.scale(zoom, zoom)
      g.strokeStyle = `rgba(215,255,230,${0.18 + 0.75 * p})`
      g.lineWidth = 2
      g.beginPath()
      for (let i = 0; i < 120; i += 1) {
        const a = (TAU * i) / 120
        const rx = 125 + 16 * Math.sin(a * 5 + t * 2) + (noise(i * 0.7 + t) - 0.5) * 30 * p
        const ry = 158 + 10 * Math.sin(a * 4 - t) + (noise(i * 0.3) - 0.5) * 18 * p
        const x = Math.cos(a) * rx
        const y = Math.sin(a) * ry
        if (i) g.lineTo(x, y)
        else g.moveTo(x, y)
      }
      g.closePath()
      g.stroke()

      for (const side of [-1, 1]) {
        g.beginPath()
        g.ellipse(side * 50, -35, 27 + 28 * p, 9 + 22 * p, 0, 0, TAU)
        g.fillStyle = '#020306'
        g.fill()
        g.stroke()
      }
      g.beginPath()
      g.arc(0, 55, 34 + 54 * p, 0, Math.PI, false)
      g.stroke()

      for (let k = 0; k < 32; k += 1) {
        if (noise(k + t * 10) < 0.52 + p * 0.3) {
          const yy = -175 + noise(k * 7.2) * 350
          g.fillStyle = `rgba(220,255,230,${0.2 + 0.7 * p})`
          g.fillRect(-175 + (noise(k * 9 + t) * 2 - 1) * 95 * p, yy, 350, 1 + noise(k) * 4)
        }
      }
      g.restore()
      if (p > 0.82) {
        g.fillStyle = `rgba(210,255,225,${(p - 0.82) * 2.5})`
        g.fillRect(0, 0, width, height)
      }
    }

    const drawPetal = (innerR, outerR, petalWidth, angle, colorA, colorB, alpha) => {
      g.save()
      g.rotate(angle)
      const grad = g.createLinearGradient(0, -innerR, 0, -outerR)
      grad.addColorStop(0, colorA)
      grad.addColorStop(1, colorB)
      g.fillStyle = grad
      g.globalAlpha = alpha
      g.beginPath()
      g.moveTo(0, -innerR)
      g.bezierCurveTo(petalWidth * 0.55, -(innerR + outerR) * 0.45, petalWidth, -outerR * 0.72, 0, -outerR)
      g.bezierCurveTo(-petalWidth, -outerR * 0.72, -petalWidth * 0.55, -(innerR + outerR) * 0.45, 0, -innerR)
      g.closePath()
      g.fill()
      g.strokeStyle = 'rgba(255,255,255,0.07)'
      g.lineWidth = 0.7
      g.stroke()
      g.restore()
      g.globalAlpha = 1
    }

    const drawRoseBloom = (x, y, scale, hue, shock, tilt = 0) => {
      g.save()
      g.translate(x, y)
      g.rotate(tilt + Math.sin((x + y) * 0.003) * 0.06)
      g.scale(scale, scale)
      const bloom = 0.08 + shock * 0.92
      const baseHue = hue + shock * 110
      for (let ring = 0; ring < 7; ring += 1) {
        const petals = 5 + ring * 3
        const innerR = 4 + ring * 4.6
        const outerR = innerR + 10 + ring * 2.4 + bloom * 2.5
        const petalWidth = 4 + ring * 1.9 + bloom
        const openness = bloom * (0.09 + ring * 0.06)
        for (let i = 0; i < petals; i += 1) {
          const a = (i / petals) * TAU + ring * 0.28 + Math.sin(ring + i * 0.6) * 0.05 + openness
          const light = 42 + ring * 3 + Math.sin(i + ring) * 4 + shock * 10
          const sat = 68 + shock * 20
          drawPetal(
            innerR,
            outerR,
            petalWidth,
            a,
            HSLA((baseHue + ring * 6 + i * 1.8) % 360, sat, light + 8, 0.88),
            HSLA((baseHue + ring * 9 + i * 2.2 + 14) % 360, sat, light - 10, 0.92),
            0.88 - ring * 0.07,
          )
        }
      }
      g.fillStyle = HSLA((baseHue + 24) % 360, 90, 78, 0.24 + 0.1 * shock)
      g.beginPath()
      g.arc(0, 0, 12 + shock * 6, 0, TAU)
      g.fill()
      g.restore()
    }

    const roses = (t, p) => {
      const shock = ease(p)
      const bg = g.createLinearGradient(0, 0, width, height)
      bg.addColorStop(0, HSLA(330 + shock * 18, 58, 8 + shock * 10, 1))
      bg.addColorStop(1, HSLA(255 - shock * 28, 46, 6 + shock * 10, 1))
      g.fillStyle = bg
      g.fillRect(0, 0, width, height)

      for (let i = 0; i < 36; i += 1) {
        const rr = 40 + i * 12
        g.strokeStyle = HSLA((320 + i * 3 + shock * 80) % 360, 80, 55, 0.03 + 0.004 * i)
        g.lineWidth = 1
        g.beginPath()
        g.arc(width * 0.5, height * 0.56, rr, 0, TAU)
        g.stroke()
      }

      const centerX = width * 0.52
      const baseY = height * 0.9
      const stems = [
        { rootX: -65, ctrlX: -44, topX: -132, topY: height * 0.5, weight: 2.2 },
        { rootX: -40, ctrlX: -26, topX: -74, topY: height * 0.44, weight: 2.4 },
        { rootX: -12, ctrlX: -8, topX: -16, topY: height * 0.36, weight: 2.6 },
        { rootX: 12, ctrlX: 10, topX: 26, topY: height * 0.34, weight: 2.8 },
        { rootX: 38, ctrlX: 34, topX: 88, topY: height * 0.42, weight: 2.4 },
        { rootX: 64, ctrlX: 60, topX: 140, topY: height * 0.5, weight: 2.2 },
        { rootX: 0, ctrlX: 0, topX: 62, topY: height * 0.28, weight: 2 },
        { rootX: -18, ctrlX: -18, topX: -92, topY: height * 0.3, weight: 2 },
      ]

      g.save()
      const wrap = g.createLinearGradient(centerX - 90, height * 0.46, centerX + 90, height * 0.92)
      wrap.addColorStop(0, `rgba(${220 + shock * 20},${215 - shock * 60},${235 - shock * 10},.18)`)
      wrap.addColorStop(1, `rgba(${145 + shock * 80},${70 + shock * 10},${140 + shock * 60},.26)`)
      g.fillStyle = wrap
      g.beginPath()
      g.moveTo(centerX - 165, height * 0.58)
      g.lineTo(centerX - 18, height * 0.92)
      g.lineTo(centerX + 10, height * 0.92)
      g.lineTo(centerX + 190, height * 0.56)
      g.lineTo(centerX + 40, height * 0.48)
      g.lineTo(centerX - 38, height * 0.47)
      g.closePath()
      g.fill()
      g.strokeStyle = 'rgba(255,255,255,.1)'
      g.stroke()
      g.restore()

      for (const stem of stems) {
        g.strokeStyle = `rgba(38,92,48,${0.5 + stem.weight * 0.08})`
        g.lineWidth = 2.5 + stem.weight
        g.beginPath()
        g.moveTo(centerX + stem.rootX, baseY)
        g.quadraticCurveTo(centerX + stem.ctrlX, (baseY + stem.topY) * 0.56, centerX + stem.topX, stem.topY)
        g.stroke()
        for (let k = 0; k < 3; k += 1) {
          const q = (k + 1) / 4
          const x = (1 - q) * (1 - q) * (centerX + stem.rootX) + 2 * (1 - q) * q * (centerX + stem.ctrlX) + q * q * (centerX + stem.topX)
          const y = (1 - q) * (1 - q) * baseY + 2 * (1 - q) * q * ((baseY + stem.topY) * 0.56) + q * q * stem.topY
          const side = k % 2 === 0 ? -1 : 1
          g.fillStyle = `rgba(${55 + 8 * k},${105 + 10 * k},${60 + 6 * k},.52)`
          g.beginPath()
          g.ellipse(x + side * 10, y, 22, 10, side * 0.7, 0, TAU)
          g.fill()
        }
      }

      const blooms = [
        { x: centerX - 135, y: height * 0.48, s: 1.08, hue: 354, tilt: -0.45 },
        { x: centerX - 76, y: height * 0.41, s: 1.16, hue: 345, tilt: -0.22 },
        { x: centerX - 6, y: height * 0.34, s: 1.28, hue: 350, tilt: -0.05 },
        { x: centerX + 34, y: height * 0.32, s: 1.22, hue: 336, tilt: 0.1 },
        { x: centerX + 92, y: height * 0.4, s: 1.12, hue: 326, tilt: 0.18 },
        { x: centerX + 144, y: height * 0.49, s: 1.02, hue: 312, tilt: 0.35 },
        { x: centerX - 88, y: height * 0.29, s: 0.96, hue: 8, tilt: -0.18 },
        { x: centerX + 68, y: height * 0.27, s: 0.92, hue: 24, tilt: 0.22 },
      ]
      blooms.forEach((bloom) => drawRoseBloom(bloom.x, bloom.y, bloom.s, bloom.hue, shock, bloom.tilt))

      g.save()
      g.translate(centerX + 12, height * 0.79)
      g.rotate(-0.05)
      g.fillStyle = HSLA(330 + shock * 70, 80, 55, 0.75)
      g.beginPath()
      g.moveTo(-18, 0)
      g.bezierCurveTo(-50, -24, -58, 8, -28, 18)
      g.closePath()
      g.fill()
      g.beginPath()
      g.moveTo(18, 0)
      g.bezierCurveTo(50, -24, 58, 8, 28, 18)
      g.closePath()
      g.fill()
      g.fillStyle = HSLA(340 + shock * 80, 90, 62, 0.85)
      g.beginPath()
      g.ellipse(0, 0, 24, 16, 0, 0, TAU)
      g.fill()
      g.restore()

      for (let i = 0; i < 120; i += 1) {
        const q = noise(i * 2.17)
        const x = (q * width + Math.sin(t + i) * 30 * shock) % width
        const y = (noise(i * 7.1 + t * 0.6) * height + t * 30 * shock + i * 3) % height
        const radius = 1 + q * 3 + shock * 3.5
        g.fillStyle = HSLA((320 + i * 4 + shock * 140) % 360, 85, 65, 0.08 + 0.18 * shock)
        g.beginPath()
        g.arc(x, y, radius, 0, TAU)
        g.fill()
      }
    }

    const mandala = (t, p) => {
      const cx = width / 2
      const cy = height / 2
      const shock = ease(p)
      const bg = g.createRadialGradient(cx, cy, 20, cx, cy, width * 0.6)
      bg.addColorStop(0, HSLA(255 + shock * 70, 55, 10 + shock * 5, 1))
      bg.addColorStop(1, HSLA(215 - shock * 40, 40, 4, 1))
      g.fillStyle = bg
      g.fillRect(0, 0, width, height)
      g.save()
      g.translate(cx, cy)
      g.rotate(t * 0.08)
      for (let layer = 0; layer < 10; layer += 1) {
        const petals = 8 + layer * 2
        const radius = 28 + layer * 22
        const hue = (190 + layer * 18 + t * 10 + shock * 120) % 360
        for (let i = 0; i < petals; i += 1) {
          const a = (i / petals) * TAU + t * 0.03 * (layer % 2 ? 1 : -1)
          g.save()
          g.rotate(a)
          g.translate(radius, 0)
          g.rotate(a * 2 + t * 0.2)
          g.fillStyle = HSLA(hue, 78, 58 + Math.sin(t * 2 + layer + i) * 10, 0.12 + 0.06 * layer)
          g.strokeStyle = HSLA(hue + 40, 90, 72, 0.35 + 0.05 * shock)
          g.lineWidth = 1.2
          g.beginPath()
          g.ellipse(0, 0, 16 + layer * 4 + shock * 8, 48 - layer * 1.8 + shock * 10, 0, 0, TAU)
          g.fill()
          g.stroke()
          g.restore()
        }
      }
      for (let ring = 1; ring <= 13; ring += 1) {
        g.strokeStyle = HSLA((150 + ring * 18 + shock * 130) % 360, 75, 65, 0.12 + 0.03 * ring)
        g.lineWidth = ring % 3 === 0 ? 1.5 : 0.7
        g.beginPath()
        g.arc(0, 0, ring * 18 + shock * 4 * Math.sin(t * 3 + ring), 0, TAU)
        g.stroke()
      }
      for (let i = 0; i < 28; i += 1) {
        const a = (i / 28) * TAU + t * 0.05
        const radius = 55 + (i % 7) * 24 + Math.sin(t * 2 + i) * 4
        g.fillStyle = HSLA((320 + i * 15 + shock * 100) % 360, 85, 70, 0.7)
        g.beginPath()
        g.arc(Math.cos(a) * radius, Math.sin(a) * radius, 2 + (i % 3) + shock * 1.5, 0, TAU)
        g.fill()
      }
      g.restore()
    }

    const draw = (now) => {
      const t = now / 1000
      const p = progress(now)
      if (kind === 'eye') eye(t, p)
      else if (kind === 'signal') signal(t, p)
      else if (kind === 'roses') roses(t, p)
      else mandala(t, p)
      raf = window.requestAnimationFrame(draw)
    }
    raf = window.requestAnimationFrame(draw)
    return () => window.cancelAnimationFrame(raf)
  }, [kind])

  const trigger = () => triggerRef.current()

  return (
    <div className={`generative-frame processing-art kind-${kind}`}>
      <button type="button" className="art-trigger" onPointerDown={trigger} aria-label="作品を変化させる">
        <canvas ref={ref} aria-label="タップで変化するプログラミングアート" />
        <span className={`art-tap-hint ${triggered ? 'is-triggered' : ''}`}>
          {triggered ? '変化しました — もう一度タップできます' : '画面をタップすると作品が変化します'}
        </span>
      </button>
    </div>
  )
}
