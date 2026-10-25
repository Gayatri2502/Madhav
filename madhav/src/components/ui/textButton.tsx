import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textButtonVariants = cva(
  [
    'inline-flex items-center justify-center gap-1.5',
    'font-medium transition-all duration-200 ease',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'rounded-small',
  ],
  {
    variants: {
      variant: {
        primary: [
          'text-primary',
          'hover:text-primary/80',
          'hover:bg-primary/10',
        ],
        secondary: [
          'text-secondary',
          'hover:text-secondary/80',
          'hover:bg-secondary/10',
        ],
      },
      size: {
        small: 'h-7 px-2 text-xsmall gap-1',
        medium: 'h-9 px-3 text-small gap-1.5',
      },
      surface: {
        default: '',
        'on-accent-primary': [
          'text-accent-primary',
          'hover:text-accent-primary/80',
          'hover:bg-accent-primary/10',
        ],
        'on-accent-secondary': [
          'text-accent-secondary',
          'hover:text-accent-secondary/80',
          'hover:bg-accent-secondary/10',
        ],
        'on-accent-tertiary': [
          'text-accent-tertiary',
          'hover:text-accent-tertiary/80',
          'hover:bg-accent-tertiary/10',
        ],
        'on-inverse': [
          'text-inverse-foreground',
          'hover:text-inverse-foreground/80',
          'hover:bg-inverse/10',
        ],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      surface: 'default',
    },
  }
);

export interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof textButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  ({ className, variant, size, surface, loading, asChild, children, disabled, ...props }, ref) => {
    const baseProps = {
      className: cn(textButtonVariants({ variant, size, surface }), className),
      disabled: disabled || loading,
      'aria-busy': loading,
      ...props,
    };

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement;
      return React.cloneElement(child, baseProps);
    }

    return (
      <button
        ref={ref}
        {...baseProps}
      >
        {loading && (
          <svg
            className="animate-spin h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

TextButton.displayName = 'TextButton';

export { TextButton, textButtonVariants };