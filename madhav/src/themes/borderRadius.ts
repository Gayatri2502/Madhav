export const borderRadius = {
  none: '0',
  xxsmall: '0.125rem',
  xsmall: '0.25rem',
  small: '0.375rem',
  medium: '0.5rem',
  large: '0.75rem',
  xlarge: '1rem',
  xxlarge: '1.5rem',
  full: '9999px',
} as const;

export type BorderRadius = typeof borderRadius;
export type BorderRadiusKey = keyof typeof borderRadius;