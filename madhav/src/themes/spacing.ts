export const spacing = {
  // More generous editorial spacing
  xxsmall: '0.25rem',
  xsmall: '0.5rem',
  small: '0.875rem',
  medium: '1.25rem',
  large: '2rem',
  xlarge: '3rem',
  xxlarge: '4.5rem',
  xxxlarge: '7rem',
  // Editorial specific
  gutter: '2rem',
  section: '6rem',
  sectionSm: '4rem',
  sectionLg: '9rem',
} as const;

export const spacingScale = [
  'xxsmall',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
  'xxxlarge',
] as const;

export type Spacing = typeof spacing;
export type SpacingKey = keyof typeof spacing;