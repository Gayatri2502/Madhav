'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const sliderVariants = cva(
  [
    'relative w-full touch-none select-none',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'h-2',
        vertical: 'w-2 h-full',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

const sliderTrackVariants = cva(
  [
    'relative h-full w-full grow overflow-hidden rounded-full bg-secondary',
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

const sliderRangeVariants = cva(
  [
    'absolute h-full bg-primary',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'rounded-full',
        vertical: 'rounded-full',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

const sliderThumbVariants = cva(
  [
    'absolute block h-5 w-5 rounded-full bg-primary',
    'border-2 border-background',
    'transition-all duration-200 ease',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'hover:scale-110',
    'active:scale-100',
  ],
  {
    variants: {
      size: {
        small: 'h-4 w-4',
        medium: 'h-5 w-5',
        large: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

const sliderArrowVariants = cva(
  [
    'flex items-center justify-center',
    'rounded-medium',
    'bg-background border border-border',
    'text-foreground',
    'transition-all duration-200',
    'hover:bg-secondary hover:border-secondary',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:opacity-50 disabled:pointer-events-none',
  ],
  {
    variants: {
      size: {
        small: 'h-8 w-8',
        medium: 'h-10 w-10',
        large: 'h-12 w-12',
      },
      variant: {
        default: '',
        inverse: 'bg-inverse text-inverse-foreground border-inverse/50 hover:bg-inverse/90',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'default',
    },
  }
);

interface SliderContextValue {
  value: number[];
  setValue: (value: number[]) => void;
  min: number;
  max: number;
  step: number;
  orientation: 'horizontal' | 'vertical';
  disabled?: boolean;
}

const SliderContext = React.createContext<SliderContextValue | null>(null);

function useSliderContext() {
  const context = React.useContext(SliderContext);
  if (!context) {
    throw new Error('Slider components must be used within Slider.Root');
  }
  return context;
}

export type SliderProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof sliderVariants> & {
    min?: number;
    max?: number;
    step?: number;
    value?: number[];
    defaultValue?: number[];
    onValueChange?: (value: number[]) => void;
    orientation?: 'horizontal' | 'vertical';
    disabled?: boolean;
    children: React.ReactNode;
  };

const SliderRoot = React.forwardRef<HTMLDivElement, SliderProps>(
  ({
    className,
    min = 0,
    max = 100,
    step = 1,
    value: controlledValue,
    defaultValue = [0],
    onValueChange,
    orientation = 'horizontal',
    disabled,
    children,
    ...props
  }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = React.useCallback((newValue: number[]) => {
      const clamped = newValue.map((v) => Math.max(min, Math.min(max, v)));
      const stepped = clamped.map((v) => Math.round(v / step) * step);
      if (!isControlled) {
        setUncontrolledValue(stepped);
      }
      onValueChange?.(stepped);
    }, [isControlled, onValueChange, min, max, step]);

    const contextValue = React.useMemo(
      () => ({
        value,
        setValue: handleValueChange,
        min,
        max,
        step,
        orientation,
        disabled,
      }),
      [value, handleValueChange, min, max, step, orientation, disabled]
    );

    return (
      <SliderContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(sliderVariants({ orientation }), className)}
          {...props}
        >
          {children}
        </div>
      </SliderContext.Provider>
    );
  }
);

SliderRoot.displayName = 'SliderRoot';

export interface SliderTrackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sliderTrackVariants> {}

const SliderTrack = React.forwardRef<HTMLDivElement, SliderTrackProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useSliderContext();

    return (
      <div
        ref={ref}
        className={cn(sliderTrackVariants(), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SliderTrack.displayName = 'SliderTrack';

export interface SliderRangeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sliderRangeVariants> {}

const SliderRange = React.forwardRef<HTMLDivElement, SliderRangeProps>(
  ({ className, ...props }, ref) => {
    const { value, min, max, orientation } = useSliderContext();

    const start = ((value[0] - min) / (max - min)) * 100;
    const end = value.length > 1 ? ((value[1] - min) / (max - min)) * 100 : 100;

    const style = orientation === 'horizontal'
      ? { left: `${start}%`, right: `${100 - end}%` }
      : { bottom: `${start}%`, top: `${100 - end}%` };

    return (
      <div
        ref={ref}
        className={cn(sliderRangeVariants({ orientation }), className)}
        style={style}
        {...props}
      />
    );
  }
);

SliderRange.displayName = 'SliderRange';

export interface SliderThumbProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sliderThumbVariants> {
  index: number;
}

const SliderThumb = React.forwardRef<HTMLButtonElement, SliderThumbProps>(
  ({ className, index, size, ...props }, ref) => {
    const { value, min, max, orientation, setValue, disabled, step } = useSliderContext();

    const position = ((value[index] - min) / (max - min)) * 100;

    const style = orientation === 'horizontal'
      ? { left: `calc(${position}% - 12px)` }
      : { bottom: `calc(${position}% - 12px)` };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;

      const currentValue = value[index];
      let newValue = currentValue;

      if (orientation === 'horizontal') {
        if (event.key === 'ArrowRight') newValue = currentValue + step;
        if (event.key === 'ArrowLeft') newValue = currentValue - step;
      } else {
        if (event.key === 'ArrowUp') newValue = currentValue + step;
        if (event.key === 'ArrowDown') newValue = currentValue - step;
      }

      if (event.key === 'Home') newValue = min;
      if (event.key === 'End') newValue = max;

      const newValues = [...value];
      newValues[index] = newValue;
      setValue(newValues);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(sliderThumbVariants({ size }), className)}
        style={style}
        tabIndex={disabled ? -1 : 0}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        aria-label={`Value ${value[index]}`}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value[index]}
        role="slider"
        {...props}
      />
    );
  }
);

SliderThumb.displayName = 'SliderThumb';

export interface SliderArrowProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sliderArrowVariants> {
  direction: 'previous' | 'next';
}

const SliderArrow = React.forwardRef<HTMLButtonElement, SliderArrowProps>(
  ({ className, direction, size, variant, ...props }, ref) => {
    const { value, min, max, step, setValue, orientation, disabled } = useSliderContext();
    const activeIndex = value.length > 1 ? 1 : 0;

    const handleClick = () => {
      if (disabled) return;
      const currentValue = value[activeIndex];
      const newValue = direction === 'next' ? currentValue + step : currentValue - step;
      const newValues = [...value];
      newValues[activeIndex] = Math.max(min, Math.min(max, newValue));
      setValue(newValues);
    };

    const Icon = direction === 'previous'
      ? (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      )
      : (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      );

    return (
      <button
        ref={ref}
        type="button"
        className={cn(sliderArrowVariants({ size, variant }), className)}
        onClick={handleClick}
        disabled={disabled}
        aria-label={direction === 'previous' ? 'Decrease value' : 'Increase value'}
        {...props}
      >
        {Icon}
      </button>
    );
  }
);

SliderArrow.displayName = 'SliderArrow';

export const Slider = {
  Root: SliderRoot,
  Track: SliderTrack,
  Range: SliderRange,
  Thumb: SliderThumb,
  Arrow: SliderArrow,
};