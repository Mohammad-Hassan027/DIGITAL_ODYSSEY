import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const SECTIONS = [
  { id: 'hero',   label: 'Intro' },
  { id: 'portal', label: 'Portal' },
  { id: 'spark',  label: 'The Spark' },
  { id: 'boom',   label: 'The Boom' },
  { id: 'social', label: 'Social Web' },
  { id: 'mobile', label: 'Mobile Shift' },
  { id: 'future', label: 'The Future' },
]

export default function SectionNav({ activeSection }) {
  const navRef = useRef(null)

  useEffect(() => {
    gsap.from(navRef.current, {
      x: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: 'power3.out',
    })
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav ref={navRef} className="section-nav" aria-label="Section navigation">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          id={`nav-dot-${id}`}
          className={`section-nav-dot ${activeSection === id ? 'active' : ''}`}
          onClick={() => scrollTo(id)}
          title={label}
          aria-label={`Navigate to ${label}`}
        />
      ))}
    </nav>
  )
}
