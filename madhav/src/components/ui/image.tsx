import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const imageVariants = cva(
  [
    'block',
    'rounded-medium',
  ],
  {
    variants: {
      fit: {
        cover: 'object-cover',
        contain: 'object-contain',
        fill: 'object-fill',
        none: 'object-none',
        scaleDown: 'object-scale-down',
      },
      radius: {
        none: 'rounded-none',
        small: 'rounded-small',
        medium: 'rounded-medium',
        large: 'rounded-large',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      fit: 'cover',
      radius: 'medium',
    },
  }
);

const imageCoverVariants = cva(
  [
    'absolute inset-0 w-full h-full object-cover',
    'rounded-medium',
  ],
  {
    variants: {
      ratio: {
        '1x1': 'aspect-square',
        '16x9': 'aspect-video',
        '3x2': 'aspect-[3/2]',
        '4x3': 'aspect-[4/3]',
        '2x2.5': 'aspect-[2/2.5]',
        '2x3': 'aspect-[2/3]',
      },
      radius: {
        none: 'rounded-none',
        small: 'rounded-small',
        medium: 'rounded-medium',
        large: 'rounded-large',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      radius: 'medium',
    },
  }
);

const ratioVariants = cva('', {
  variants: {
    ratio: {
      '1x1': 'aspect-square',
      '16x9': 'aspect-video',
      '3x2': 'aspect-[3/2]',
      '4x3': 'aspect-[4/3]',
      '2x2.5': 'aspect-[2/2.5]',
      '2x3': 'aspect-[2/3]',
    },
  },
  defaultVariants: {},
});

interface ImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof imageVariants> {
  src: string;
  alt: string;
  priority?: boolean;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, fit, radius, priority = false, ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(imageVariants({ fit, radius }), className)}
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
    );
  }
);

Image.displayName = 'Image';

interface ImageCoverProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof imageCoverVariants> {
  src: string;
  alt: string;
  priority?: boolean;
}

const ImageCover = React.forwardRef<HTMLDivElement, ImageCoverProps>(
  ({ className, src, alt, ratio, radius, priority = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', imageCoverVariants({ ratio, radius }), className)}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          loading={priority ? 'eager' : 'lazy'}
          aria-hidden={!!children}
        />
        {children}
      </div>
    );
  }
);

ImageCover.displayName = 'ImageCover';

interface RatioProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ratioVariants> {
  children: React.ReactNode;
}

const Ratio = React.forwardRef<HTMLDivElement, RatioProps>(
  ({ className, ratio, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(ratioVariants({ ratio }), 'relative', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Ratio.displayName = 'Ratio';

export { Image, ImageCover, Ratio, imageVariants, imageCoverVariants, ratioVariants };