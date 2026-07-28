import { useEffect, useMemo, useState } from 'react'
import { portraitPaths } from '../data/works'

export default function TypewriterDialogue({ lines, onComplete, night = false, portraitSide = 'left' }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(0)
  const line = lines[lineIndex]
  const fullText = line?.text ?? ''
  const speed = line?.red ? 65 : night ? 42 : 30
  const complete = visibleCount >= fullText.length


  useEffect(() => {
    if (!line || complete) return undefined
    const timer = window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + 1, fullText.length))
    }, speed)
    return () => window.clearTimeout(timer)
  }, [line, complete, fullText.length, speed, visibleCount])

  const portrait = useMemo(() => {
    if (!line || line.system) return null
    return portraitPaths[line.emotion || 'smile']
  }, [line])

  const advance = () => {
    if (!complete) {
      setVisibleCount(fullText.length)
      return
    }
    if (lineIndex < lines.length - 1) {
      setLineIndex((index) => index + 1)
      setVisibleCount(0)
      return
    }
    onComplete?.()
  }

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!line) return null

  return (
    <div
      className={`dialogue-layer ${night ? 'is-night' : ''} ${line.system ? 'is-system' : ''}`}
      onClick={advance}
      role="button"
      tabIndex={0}
      aria-label="会話を進める"
    >
      {portrait && (
        <img
          className={`dialogue-portrait is-${portraitSide} emotion-${line.emotion || 'smile'}`}
          src={portrait}
          alt="春日さん"
          draggable="false"
        />
      )}
      <div className={`dialogue-box ${line.red ? 'is-red' : ''}`}>
        {!line.system && <div className="dialogue-speaker">春日さん</div>}
        <div className="dialogue-text">
          {fullText.slice(0, visibleCount)}
          {!complete && <span className="typing-caret" aria-hidden="true" />}
        </div>
        {complete && <div className="dialogue-next" aria-hidden="true">▼</div>}
      </div>
    </div>
  )
}
