export const breakpoints = {
  mobile: '320px',
  'mobile-l': '480px',
  tablet: '768px',
  desktop: '1024px',
  'desktop-l': '1280px',
  wide: '1536px',
} as const;

export type Breakpoints = typeof breakpoints;
export type BreakpointKey = keyof typeof breakpoints;