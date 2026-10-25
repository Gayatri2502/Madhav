'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Image } from './image';

const avatarVariants = cva(
  [
    'inline-flex items-center justify-center overflow-hidden rounded-full',
    'bg-secondary',
    'font-medium',
    'flex-shrink-0',
  ],
  {
    variants: {
      size: {
        small: 'h-8 w-8 text-xsmall',
        medium: 'h-10 w-10 text-small',
        large: 'h-12 w-12 text-medium',
        xlarge: 'h-16 w-16 text-large',
        xxlarge: 'h-24 w-24 text-xlarge',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-large',
      },
    },
    defaultVariants: {
      size: 'medium',
      shape: 'circle',
    },
  }
);

const avatarImageVariants = cva(
  'w-full h-full object-cover',
  {
    variants: {},
    defaultVariants: {},
  }
);

const avatarFallbackVariants = cva(
  'w-full h-full flex items-center justify-center bg-secondary text-muted-foreground',
  {
    variants: {},
    defaultVariants: {},
  }
);

interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size, shape, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape }), className)}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt || ''}
            className={cn(avatarImageVariants(), 'rounded-full')}
            priority={false}
          />
        ) : children ? (
          <div className={cn(avatarFallbackVariants(), 'rounded-full')}>
            {children}
          </div>
        ) : fallback ? (
          <div className={cn(avatarFallbackVariants(), 'rounded-full')}>
            {fallback}
          </div>
        ) : (
          <div className={cn(avatarFallbackVariants(), 'rounded-full')}>
            <svg className="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  overlap?: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, overlap = 8, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = max ? childArray.slice(0, max) : childArray;
    const remainingCount = max && childArray.length > max ? childArray.length - max : 0;

    return (
      <div
        ref={ref}
        className={cn('flex -space-x-2', className)}
        {...props}
      >
        {visibleChildren.map((child, index) => {
          if (!React.isValidElement(child)) return child;
          
          const childProps = child.props as Record<string, unknown> & { style?: React.CSSProperties };
          const newStyle: React.CSSProperties = {
            ...childProps.style,
            zIndex: visibleChildren.length - index,
            marginLeft: index > 0 ? `-${overlap}px` : 0,
          };
          return React.cloneElement(child, { style: newStyle } as Record<string, unknown>);
        })}
        {remainingCount > 0 && (
          <div
            className={cn(avatarVariants({ size: 'medium' }), 'border-2 border-background')}
            style={{ zIndex: 0, marginLeft: visibleChildren.length > 0 ? `-${overlap}px` : 0 }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarGroup, avatarVariants };