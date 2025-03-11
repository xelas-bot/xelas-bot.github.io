/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rust: '#dea584',
        'arduino-c': '#1aa1a7',
        javascript: '#f1e05a',
        vue: '#41b883',
        typescript: '#2b7489',
        svelte: '#ff3e00',
        python: '#3572a5',
        java: '#b07219',
        csharp: '#178600',
        racket: '#3c5caa',
        astro: '#ff5a03',
        ocaml: '#ef7a08',
        clang: '#555555',
        assembly: '#6e4c13',
        emacslisp: '#c065db',
        swift: '#f05138',
        none: '#8b949e',
        react: '#61dafb',
        'content-black': '#18181b',
        'content-gray': '#27272a',
        'content-light-gray': '#3f3f46',
        'content-lighter-gray': '#71717a',
        'background': '#F7F7F7',
        'blockquote-bg': '#ebf1f7',
        'blockquote-border': '#cbd5e1',
        'aside-bg': '#ebe5f5',
        'aside-border': '#dbd5e5',
        'code-bg': '#e2e8f0',
        'src-bg': '#f3f3f3',
      },
      fontFamily: {
        'inter': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Roboto', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        'preamble': '24rem',
        'content': '40rem',
      },
    },
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Roboto', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
} 