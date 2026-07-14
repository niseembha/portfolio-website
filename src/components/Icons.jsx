export function ArrowUpRight({ size = 18 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function ArrowDown({ size = 18 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none">
      <path d="M12 4v15m0 0 6-6m-6 6-6-6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function CloseIcon({ size = 22 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none">
      <path d="m5 5 14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

export function GithubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.19c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.13.08 1.73 1.17 1.73 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.5-.29-5.14-1.25-5.14-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.73 10.73 0 0 1 5.64 0c2.15-1.46 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.04.76 2.1v3.12c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
    </svg>
  )
}

export function LinkedinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.47 7.48H1.72V19.5h3.75V7.48ZM3.6 1.5a2.17 2.17 0 1 0 0 4.34 2.17 2.17 0 0 0 0-4.34ZM19.5 7.2c-2 0-3.34 1.1-3.9 2.14h-.06V7.48h-3.6V19.5h3.75v-5.95c0-1.57.3-3.09 2.25-3.09 1.92 0 1.94 1.8 1.94 3.19v5.85h3.75v-6.6c0-3.25-.7-5.7-4.13-5.7Z" />
    </svg>
  )
}

export function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M3 5.5h18v13H3v-13Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}
