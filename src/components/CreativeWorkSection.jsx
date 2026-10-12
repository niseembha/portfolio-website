import { useEffect, useRef } from 'react'
import sportsVideo from '../../assets/creative-section/sports-edit-trimmed.mp4'
import animeVideo from '../../assets/creative-section/anime-edit-web.mp4'
import sportsPoster from '../../assets/creative-section/sports-poster.jpg'
import animePoster from '../../assets/creative-section/anime-poster.jpg'
import bbuImage from '../../assets/creative-section/bbu.png'
import { ArrowUpRight } from './Icons.jsx'

// Replace this value when the performance video is ready.
const YOUTUBE_VIDEO_PLACEHOLDER = 'YOUTUBE_VIDEO_PLACEHOLDER'

const creativeWork = [
  {
    video: sportsVideo, poster: sportsPoster,
    id: 'sports', title: 'editsbyseem', category: 'Video Editing · Sports Media',
    role: 'Sports Video Editor',
    description: 'Self-taught in Premiere Pro and After Effects; creating sports mixtapes for Division I football and basketball athletes and an NBA player, earning 100K+ views.',
    metric: '100K+', metricLabel: 'Total views', tools: 'Premiere Pro · After Effects',
    preview: 'Sports mixtapes', previewNote: 'Watch featured edit on Instagram',
    previewHref: 'https://www.instagram.com/p/DTlulGykQQ3/',
    action: 'View edits', href: 'https://www.instagram.com/editsbyseem/',
  },
  {
    video: animeVideo, poster: animePoster,
    id: 'anime', title: 'Anime Edits', category: 'Video Editing · Animation · Short-form Media',
    description: 'A separate TikTok account for experimenting with pacing, music synchronization, transitions, effects, and short-form visual storytelling.',
    metric: '30K+', metricLabel: 'Total views', tools: 'Pacing · Motion · Music',
    preview: 'In rhythm.', previewNote: 'Watch featured edit on TikTok',
    previewHref: 'https://www.tiktok.com/@meesin_editss2/video/7665584255015128333?lang=en',
    action: 'View TikTok', href: 'https://www.tiktok.com/@meesin_editss2?lang=en',
  },
  {
    id: 'piano', title: 'Piano', category: 'Music · Performance',
    description: 'About eight years at the piano—a space to interpret music and keep growing artistically. I play in recitals several times a year and perform at senior living communities.',
    metric: '~8', metricLabel: 'Years of piano', tools: 'Recitals · Community performances',
    preview: 'My favorite to play.', previewNote: 'A playful performance · Coming soon',
    performanceNote: 'I know many songs; this upcoming video is a playful take on my favorite song to play.',
    action: 'Watch performance', href: YOUTUBE_VIDEO_PLACEHOLDER,
  },
  {
    image: bbuImage, imageAlt: 'BBU Food Reviews collage featuring noodle bowls, dumplings, and friends sharing a meal',
    id: 'bbu', title: 'BBU Food Reviews', category: 'Food · Friends · Just for Fun',
    description: 'A casual food-review account my friends and I made just for fun—trying restaurants, rating what we eat, and keeping a visual journal of the places we visit together.',
    preview: 'At the table.', previewNote: 'Our food journal on Instagram',
    previewHref: 'https://www.instagram.com/bbufoodreviews/',
    action: 'View BBU', href: 'https://www.instagram.com/bbufoodreviews/',
  },
]

export function CreativeWorkSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const videos = sectionRef.current.querySelectorAll('video')
    const visibleVideos = new Set()
    const updatePlayback = (video) => {
      if (visibleVideos.has(video) && !document.hidden) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visibleVideos.add(target)
        else visibleVideos.delete(target)
        updatePlayback(target)
      })
    }, { threshold: 0.25 })
    videos.forEach((video) => observer.observe(video))
    const onVisibilityChange = () => videos.forEach(updatePlayback)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      videos.forEach((video) => video.pause())
    }
  }, [])

  return (
    <section ref={sectionRef} className="creative-section section-pad" id="creative" aria-labelledby="creative-title">
      <div className="shell">
        <div className="creative-heading" data-reveal>
          <p className="detail-label">Creative Work</p>
          <h2 id="creative-title">Beyond engineering.</h2>
          <p>Visual storytelling, rhythm, and a little room to experiment.</p>
        </div>
        <div className="creative-grid">
          {creativeWork.map((item) => {
            const pending = item.href.endsWith('_PLACEHOLDER')
            const Preview = item.previewHref ? 'a' : 'div'
            return (
              <article className={`creative-item creative-${item.id}`} key={item.id} data-reveal>
                {item.video ? (
                  <div className="creative-video-preview">
                    <video controls muted loop playsInline preload="none" poster={item.poster} aria-label={`${item.title} featured edit`}>
                      <source src={item.video} type="video/mp4" />
                      <a href={item.previewHref}>Watch the featured edit</a>
                    </video>
                  </div>
                ) : item.image ? (
                  <a className="creative-image-preview" href={item.href} target="_blank" rel="noreferrer" aria-label="View BBU on Instagram">
                    <img src={item.image} alt={item.imageAlt} loading="lazy" />
                  </a>
                ) : (
                <Preview className="creative-preview" href={item.previewHref} target={item.previewHref ? '_blank' : undefined} rel={item.previewHref ? 'noreferrer' : undefined} role={item.previewHref ? undefined : 'img'} aria-label={item.previewNote} data-video-placeholder={item.id === 'piano' ? item.href : undefined}>
                  {item.id !== 'bbu' && <span className="creative-play" aria-hidden="true">▷</span>}
                  <span className="creative-preview__title">{item.preview}</span>
                  <span className="creative-preview__note">{item.previewNote}</span>
                </Preview>
                )}
                <div className="creative-body">
                  <p className="detail-label">{item.category}</p>
                  <h3>{item.title}</h3>
                  {item.role && <p className="creative-role">{item.role}</p>}
                  <p className="creative-description">{item.description}</p>
                  {item.performanceNote && <p className="creative-performance-note">{item.performanceNote}</p>}
                  {item.metric && <p className="creative-metric"><strong>{item.metric}</strong><span>{item.metricLabel}</span></p>}
                  {item.tools && <p className="creative-tools">{item.tools}</p>}
                  <a className="creative-action" href={item.href} target={pending ? undefined : '_blank'} rel={pending ? undefined : 'noreferrer'} aria-disabled={pending || undefined} onClick={pending ? (event) => event.preventDefault() : undefined}>
                    {item.action} <ArrowUpRight size={16} />
                  </a>
                  {pending && <span className="creative-pending">Link coming soon</span>}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
