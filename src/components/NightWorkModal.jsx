import { useState } from 'react'
import GenerativeArtCanvas from './GenerativeArtCanvas'

export default function NightWorkModal({ work, onClose }) {
  const [imageIndex, setImageIndex] = useState(0)
  const [canClose, setCanClose] = useState(work.type === 'altered')
  const [interacted, setInteracted] = useState(false)


  const altered = work.type === 'altered'
  const images = work.images || []
  const handleInteraction = () => {
    if (interacted) return
    setInteracted(true)
    window.setTimeout(() => setCanClose(true), 1200)
  }

  return (
    <div className={`modal-backdrop sequence-modal ${altered ? 'altered-category' : 'added-category'}`}>
      <article className="night-work-card" aria-labelledby="night-work-title">
        <div className="category-label">{altered ? '展示作品の別の姿' : '深夜の追加アート'}</div>
        <h2 id="night-work-title">{work.title}</h2>
        {altered && <p className="source-label">展覧会で展示されていた「{work.title}」の別の姿</p>}
        {altered ? (
          <div className="night-gallery">
            <img src={images[imageIndex]} alt={`${work.title}の別の姿 ${imageIndex + 1}`} />
            {images.length > 1 && (
              <>
                <button type="button" className="gallery-arrow prev" onClick={() => setImageIndex((imageIndex - 1 + images.length) % images.length)} aria-label="前の画像">‹</button>
                <button type="button" className="gallery-arrow next" onClick={() => setImageIndex((imageIndex + 1) % images.length)} aria-label="次の画像">›</button>
                <span className="gallery-count">{imageIndex + 1} / {images.length}</span>
              </>
            )}
          </div>
        ) : (
          <GenerativeArtCanvas kind={work.art} onInteraction={handleInteraction} />
        )}
        <p className="night-work-description">{work.description}</p>
        <button className="primary-button modal-close-button" type="button" disabled={!canClose} onClick={onClose}>
          {altered || interacted ? (canClose ? '確認を終える' : '変化を確認中……') : '作品をタップしてください'}
        </button>
      </article>
    </div>
  )
}
