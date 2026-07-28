import { useState } from 'react'

function DetailRow({ label, children }) {
  if (!children) return null
  return (
    <section className="work-detail-row">
      <h3>{label}</h3>
      <p>{children}</p>
    </section>
  )
}

export default function WorkModal({ work, mode = 'day', onClose }) {
  const [imageIndex, setImageIndex] = useState(0)
  const images = work?.images || []


  if (!work) return null
  const hasDetails = work.form || work.materials || work.statement || work.notes

  return (
    <div className={`modal-backdrop ${mode === 'night' ? 'night-modal' : ''}`} onMouseDown={onClose}>
      <article className="work-modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="閉じる">×</button>
        {mode === 'night' && <div className="night-kicker">✦ {work.subtitle || '完成する前の星'}</div>}
        <h2>{work.title}</h2>

        {mode === 'night' && images.length > 0 && (
          <div className="night-gallery">
            <img src={images[imageIndex]} alt={`${work.title} 制作記録 ${imageIndex + 1}`} />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="gallery-arrow gallery-prev"
                  onClick={() => setImageIndex((index) => (index - 1 + images.length) % images.length)}
                  aria-label="前の画像"
                >‹</button>
                <button
                  type="button"
                  className="gallery-arrow gallery-next"
                  onClick={() => setImageIndex((index) => (index + 1) % images.length)}
                  aria-label="次の画像"
                >›</button>
                <div className="gallery-count">{imageIndex + 1} / {images.length}</div>
              </>
            )}
          </div>
        )}

        {mode === 'night' ? (
          <p className="night-description">{work.description}</p>
        ) : (
          <div className="work-details">
            {!hasDetails && <p className="placeholder-copy">現在、作品情報は準備中です。<br />詳細は実際の展示会場でご覧ください。</p>}
            <DetailRow label="作品形態">{work.form}</DetailRow>
            <DetailRow label="作品素材">{work.materials}</DetailRow>
            <DetailRow label="ステートメント">{work.statement}</DetailRow>
            <DetailRow label="鑑賞時の注意点">{work.notes}</DetailRow>
          </div>
        )}
        <button className="primary-button modal-ok" type="button" onClick={onClose}>閉じる</button>
      </article>
    </div>
  )
}
