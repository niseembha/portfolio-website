// Change this one value to 'original' to restore the preserved launch colorway.
export const ACTIVE_THEME = 'orange'

export function applyTheme(theme = ACTIVE_THEME) {
  document.documentElement.dataset.theme = theme

  requestAnimationFrame(() => {
    const themeColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--visual-theme-color')
      .trim()
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor)
    document.querySelectorAll('link[rel~="icon"]').forEach((link) => {
      const filename = theme === 'original' ? 'favicon-original.svg' : 'favicon.svg'
      link.setAttribute('href', `${filename}?v=20260714`)
    })
  })
}
