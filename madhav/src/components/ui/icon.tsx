import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iconVariants = cva(
  [
    'inline-flex items-center justify-center',
    'flex-shrink-0',
    'transition-colors duration-200',
  ],
  {
    variants: {
      size: {
        xsmall: 'h-3.5 w-3.5',
        small: 'h-4 w-4',
        medium: 'h-5 w-5',
        large: 'h-6 w-6',
        xlarge: 'h-8 w-8',
      },
      surface: {
        default: 'text-foreground',
        'on-inverse': 'text-inverse-foreground',
        'on-accent-primary': 'text-accent-primary',
        'on-accent-secondary': 'text-accent-secondary',
        'on-accent-tertiary': 'text-accent-tertiary',
      },
      background: {
        false: '',
        true: 'rounded-medium bg-current/10 p-1',
      },
    },
    defaultVariants: {
      size: 'medium',
      surface: 'default',
      background: false,
    },
  }
);

interface IconProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof iconVariants> {
  children: React.ReactNode;
  'aria-label'?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size, surface, background, children, 'aria-label': ariaLabel, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn(iconVariants({ size, surface, background }), className)}
        aria-hidden={!ariaLabel}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

interface IconContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconVariants> {
  children: React.ReactNode;
}

const IconContainer = React.forwardRef<HTMLDivElement, IconContainerProps>(
  ({ className, size, surface, background, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center justify-center', iconVariants({ size, surface, background: true }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

IconContainer.displayName = 'IconContainer';

export { Icon, IconContainer, iconVariants };