export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    heading: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xxsmall: ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],
    xsmall: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
    small: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0' }],
    medium: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
    large: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
    xlarge: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
    xxlarge: ['1.5rem', { lineHeight: '2rem', letterSpacing: '0' }],
    xxxlarge: ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
    display: ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.03em' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.1',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.04em',
    widest: '0.1em',
  },
} as const;

export type Typography = typeof typography;