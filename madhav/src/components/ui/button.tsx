import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200 ease',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'rounded-medium',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90',
          'active:bg-primary',
          'shadow-xsmall hover:shadow-small',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary/90',
          'active:bg-secondary',
          'shadow-xsmall hover:shadow-small',
        ],
        outline: [
          'border border-border bg-transparent',
          'hover:bg-accent-primary/10',
          'hover:text-accent-primary',
          'hover:border-accent-primary',
        ],
        ghost: [
          'bg-transparent',
          'hover:bg-accent-primary/10',
          'hover:text-accent-primary',
        ],
        link: [
          'bg-transparent underline-offset-4',
          'hover:underline',
          'text-primary',
          'hover:text-primary/80',
        ],
      },
      size: {
        small: 'h-8 px-3 text-xsmall gap-1.5',
        medium: 'h-10 px-4 text-small gap-2',
        large: 'h-12 px-6 text-medium gap-2.5',
      },
      surface: {
        default: '',
        'on-accent-primary': [
          'bg-accent-primary text-accent-primary-foreground',
          'hover:bg-accent-primary/90',
          'active:bg-accent-primary',
        ],
        'on-accent-secondary': [
          'bg-accent-secondary text-accent-secondary-foreground',
          'hover:bg-accent-secondary/90',
          'active:bg-accent-secondary',
        ],
        'on-accent-tertiary': [
          'bg-accent-tertiary text-accent-tertiary-foreground',
          'hover:bg-accent-tertiary/90',
          'active:bg-accent-tertiary',
        ],
        'on-inverse': [
          'bg-inverse text-inverse-foreground',
          'hover:bg-inverse/90',
          'active:bg-inverse',
        ],
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        surface: 'on-accent-primary',
        class: 'bg-accent-primary text-accent-primary-foreground hover:bg-accent-primary/90',
      },
      {
        variant: 'secondary',
        surface: 'on-accent-primary',
        class: 'bg-accent-primary text-accent-primary-foreground hover:bg-accent-primary/90',
      },
      {
        variant: 'primary',
        surface: 'on-accent-secondary',
        class: 'bg-accent-secondary text-accent-secondary-foreground hover:bg-accent-secondary/90',
      },
      {
        variant: 'secondary',
        surface: 'on-accent-secondary',
        class: 'bg-accent-secondary text-accent-secondary-foreground hover:bg-accent-secondary/90',
      },
      {
        variant: 'primary',
        surface: 'on-accent-tertiary',
        class: 'bg-accent-tertiary text-accent-tertiary-foreground hover:bg-accent-tertiary/90',
      },
      {
        variant: 'secondary',
        surface: 'on-accent-tertiary',
        class: 'bg-accent-tertiary text-accent-tertiary-foreground hover:bg-accent-tertiary/90',
      },
      {
        variant: 'primary',
        surface: 'on-inverse',
        class: 'bg-inverse text-inverse-foreground hover:bg-inverse/90',
      },
      {
        variant: 'secondary',
        surface: 'on-inverse',
        class: 'bg-inverse text-inverse-foreground hover:bg-inverse/90',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      surface: 'default',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, surface, fullWidth, loading, asChild, children, disabled, ...props }, ref) => {
    const baseProps = {
      className: cn(buttonVariants({ variant, size, surface, fullWidth }), className),
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
            className="animate-spin h-4 w-4"
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

Button.displayName = 'Button';

export { Button, buttonVariants };