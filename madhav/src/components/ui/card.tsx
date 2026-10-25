import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  [
    'rounded-large border bg-background text-foreground',
    'transition-all duration-200',
  ],
  {
    variants: {
      variant: {
        default: 'border-border shadow-xsmall',
        elevated: 'border-border shadow-medium',
        outlined: 'border-border shadow-none',
        filled: 'bg-secondary border-transparent shadow-none',
      },
      surface: {
        default: '',
        primary: 'border-primary/20 bg-primary/5',
        secondary: 'border-secondary/20 bg-secondary/5',
        inverse: 'border-inverse/20 bg-inverse/5 text-inverse-foreground',
        'accent-primary': 'border-accent-primary/20 bg-accent-primary/5',
        'accent-secondary': 'border-accent-secondary/20 bg-accent-secondary/5',
        'accent-tertiary': 'border-accent-tertiary/20 bg-accent-tertiary/5',
      },
      padding: {
        none: '',
        small: 'p-small',
        medium: 'p-medium',
        large: 'p-large',
      },
      featured: {
        true: 'ring-2 ring-primary ring-offset-2',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      surface: 'default',
      padding: 'medium',
      featured: false,
    },
  }
);

const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5',
  {
    variants: {
      align: {
        left: 'items-start',
        center: 'items-center',
        right: 'items-end',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  }
);

const cardTitleVariants = cva(
  'font-semibold leading-none tracking-tight',
  {
    variants: {
      size: {
        small: 'text-large',
        medium: 'text-xlarge',
        large: 'text-xxlarge',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

const cardDescriptionVariants = cva('text-muted-foreground', {
  variants: {
    size: {
      small: 'text-xsmall',
      medium: 'text-small',
      large: 'text-medium',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const cardContentVariants = cva('pt-0', {
  variants: {},
  defaultVariants: {},
});

const cardFooterVariants = cva(
  'flex items-center mt-4 gap-xsmall',
  {
    variants: {
      align: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        between: 'justify-between',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  }
);

const cardBodyVariants = cva('', {
  variants: {
    size: {
      small: 'p-small',
      medium: 'p-medium',
      large: 'p-large',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const cardLinkVariants = cva(
  [
    'group relative block rounded-large border border-border bg-background text-foreground',
    'transition-all duration-200',
    'hover:shadow-medium hover:border-primary/50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ],
  {
    variants: {
      surface: {
        default: '',
        primary: 'border-primary/20 bg-primary/5 hover:border-primary/50 hover:bg-primary/10',
        secondary: 'border-secondary/20 bg-secondary/5 hover:border-secondary/50 hover:bg-secondary/10',
        inverse: 'border-inverse/20 bg-inverse/5 text-inverse-foreground hover:border-inverse/50 hover:bg-inverse/10',
        'accent-primary': 'border-accent-primary/20 bg-accent-primary/5 hover:border-accent-primary/50 hover:bg-accent-primary/10',
        'accent-secondary': 'border-accent-secondary/20 bg-accent-secondary/5 hover:border-accent-secondary/50 hover:bg-accent-secondary/10',
        'accent-tertiary': 'border-accent-tertiary/20 bg-accent-tertiary/5 hover:border-accent-tertiary/50 hover:bg-accent-tertiary/10',
      },
      padding: {
        small: 'p-small',
        medium: 'p-medium',
        large: 'p-large',
      },
    },
    defaultVariants: {
      surface: 'default',
      padding: 'medium',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, surface, padding, featured, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, surface, padding, featured }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardRoot.displayName = 'Card';

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, align, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardHeaderVariants({ align }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof cardTitleVariants> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(cardTitleVariants({ size }), className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof cardDescriptionVariants> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(cardDescriptionVariants({ size }), className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardContentVariants(), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, align, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardFooterVariants({ align }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export interface CardBodyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardBodyVariants> {}

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardBodyVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export interface CardLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof cardLinkVariants> {}

const CardLink = React.forwardRef<HTMLAnchorElement, CardLinkProps>(
  ({ className, surface, padding, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(cardLinkVariants({ surface, padding }), className)}
        {...props}
      >
        {children}
      </a>
    );
  }
);

CardLink.displayName = 'CardLink';

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
  Body: CardBody,
  Link: CardLink,
};