import { useEffect, useRef, useState } from 'react'
import { links } from '../data/portfolio.js'
import { ArrowUpRight } from './Icons.jsx'

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen((wasOpen) => {
          if (wasOpen) requestAnimationFrame(() => toggleRef.current?.focus())
          return false
        })
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 761px)')
    const closeAtDesktop = (event) => {
      if (event.matches) setOpen(false)
    }
    desktopQuery.addEventListener('change', closeAtDesktop)
    return () => desktopQuery.removeEventListener('change', closeAtDesktop)
  }, [])

  useEffect(() => {
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')
    let trapFocus
    if (open) {
      document.body.classList.add('menu-open-body')
      main.inert = true
      footer.inert = true
      menuRef.current?.querySelector('a')?.focus()
      trapFocus = (event) => {
        if (event.key !== 'Tab') return
        const focusable = [toggleRef.current, ...menuRef.current.querySelectorAll('a')]
        const first = focusable[0]
        const last = focusable.at(-1)
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
      document.addEventListener('keydown', trapFocus)
    } else {
      document.body.classList.remove('menu-open-body')
      main.inert = false
      footer.inert = false
    }

    return () => {
      if (trapFocus) document.removeEventListener('keydown', trapFocus)
      document.body.classList.remove('menu-open-body')
      main.inert = false
      footer.inert = false
    }
  }, [open])

  const closeMenu = () => {
    setOpen(false)
    requestAnimationFrame(() => toggleRef.current?.focus())
  }

  return (
    <header className={`site-header ${open ? 'menu-open' : ''}`}>
      <a className="monogram" href="#top" aria-label="Niseem Bhattacharya — home" tabIndex={open ? -1 : 0}>
        NB<span className="monogram-dot">.</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-resume" href={links.resume} target="_blank" rel="noreferrer">
        Résumé <ArrowUpRight size={15} />
      </a>
      <button
        ref={toggleRef}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
      <div
        className="mobile-menu"
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
      >
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu} tabIndex={open ? 0 : -1}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <p>Dallas, Texas · Building for useful impact.</p>
      </div>
    </header>
  )
}
