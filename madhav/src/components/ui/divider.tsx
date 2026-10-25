import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const dividerVariants = cva(
  [
    'border-t',
    'transition-colors duration-200',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'w-full',
        vertical: 'h-full w-px border-t-0 border-l',
      },
      variant: {
        default: 'border-border',
        secondary: 'border-secondary/50',
        accent: 'border-accent-primary/50',
      },
      thickness: {
        thin: 'border-[1px]',
        medium: 'border-[2px]',
        thick: 'border-[3px]',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'default',
      thickness: 'thin',
    },
  }
);

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation, variant, thickness, ...props }, ref) => {
    const ariaOrientation = orientation === 'horizontal' ? 'horizontal' : 'vertical';
    return (
      <div
        ref={ref}
        className={cn(dividerVariants({ orientation, variant, thickness }), className)}
        role="separator"
        aria-orientation={ariaOrientation}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export { Divider, dividerVariants };