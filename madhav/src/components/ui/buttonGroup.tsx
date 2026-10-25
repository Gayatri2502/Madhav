import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from './button';

const buttonGroupVariants = cva('flex flex-wrap gap-xsmall', {
  variants: {
    align: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      stretch: 'justify-stretch',
    },
    direction: {
      horizontal: 'flex-row',
      vertical: 'flex-col gap-ysmall',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    align: 'left',
    direction: 'horizontal',
    wrap: true,
  },
});

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  children: React.ReactNode;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, align, direction, wrap, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(buttonGroupVariants({ align, direction, wrap }), className)}
        role="group"
        aria-label="Button group"
        {...props}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? React.cloneElement(child, {}) : child
        )}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup, buttonGroupVariants };