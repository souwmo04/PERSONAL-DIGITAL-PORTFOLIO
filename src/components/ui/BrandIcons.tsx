/**
 * Small brand glyphs. Lucide dropped brand icons, so these are minimal
 * hand-drawn equivalents that inherit `currentColor`.
 */
type P = { className?: string; "aria-hidden"?: boolean };

export function GithubIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.06c0-1.21-.02-2.76-1.68-2.76-1.69 0-1.95 1.32-1.95 2.67V21h-4V9.75Z" />
    </svg>
  );
}

export function OrcidIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22ZM8.1 17.2H6.6V8.3h1.5v8.9Zm-.75-10.1a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9Zm3.2 10.1V8.3h3.4c3.24 0 4.66 2.32 4.66 4.45 0 2.32-1.82 4.45-4.64 4.45h-3.42Zm1.5-1.36h1.77c2.53 0 3.26-1.94 3.26-3.09 0-1.9-1.2-3.09-3.33-3.09h-1.7v6.18Z" />
    </svg>
  );
}
