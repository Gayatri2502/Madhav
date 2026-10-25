import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textLinkVariants = cva(
  [
    'inline-flex items-center justify-center gap-1',
    'font-medium transition-all duration-200 ease',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'underline-offset-2 hover:underline',
  ],
  {
    variants: {
      variant: {
        primary: 'text-primary hover:text-primary/80',
        secondary: 'text-secondary hover:text-secondary/80',
      },
      size: {
        small: 'text-xsmall',
        medium: 'text-small',
      },
      surface: {
        default: '',
        'on-accent-primary': 'text-accent-primary hover:text-accent-primary/80',
        'on-accent-secondary': 'text-accent-secondary hover:text-accent-secondary/80',
        'on-accent-tertiary': 'text-accent-tertiary hover:text-accent-tertiary/80',
        'on-inverse': 'text-inverse-foreground hover:text-inverse-foreground/80',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      surface: 'default',
    },
  }
);

export interface TextLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof textLinkVariants> {
  asChild?: boolean;
}

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ className, variant, size, surface, asChild, children, ...props }, ref) => {
    const baseProps = {
      className: cn(textLinkVariants({ variant, size, surface }), className),
      ...props,
    };

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement;
      return React.cloneElement(child, baseProps);
    }

    return (
      <a
        ref={ref}
        {...baseProps}
      >
        {children}
      </a>
    );
  }
);

TextLink.displayName = 'TextLink';

export { TextLink, textLinkVariants };