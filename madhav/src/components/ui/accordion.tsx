'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const accordionVariants = cva('w-full', {
  variants: {},
  defaultVariants: {},
});

const accordionItemVariants = cva('border-b border-border last:border-b-0', {
  variants: {
    variant: {
      default: '',
      bordered: 'border border-border rounded-large first:rounded-t-large last:rounded-b-large border-b-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionTriggerVariants = cva(
  [
    'flex w-full items-center justify-between px-4 py-4 text-left',
    'font-medium text-foreground transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'hover:bg-accent-primary/5',
    'data-[state=open]:bg-accent-primary/5',
  ],
  {
    variants: {
      size: {
        small: 'py-2 text-xsmall',
        medium: 'py-4 text-small',
        large: 'py-6 text-medium',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

const accordionContentVariants = cva(
  [
    'overflow-hidden transition-all duration-300 ease-in-out',
    'data-[state=open]:animate-accordion-down',
    'data-[state=closed]:animate-accordion-up',
  ],
  {
    variants: {
      padding: {
        small: 'px-4 pb-2',
        medium: 'px-4 pb-4',
        large: 'px-6 pb-6',
      },
    },
    defaultVariants: {
      padding: 'medium',
    },
  }
);

const accordionIconVariants = cva(
  [
    'h-4 w-4 flex-shrink-0 transition-transform duration-200',
    'data-[state=open]:rotate-180',
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

interface AccordionContextValue {
  type: 'single' | 'multiple';
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  disabled?: string | string[];
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within Accordion.Root');
  }
  return context;
}

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  type?: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: string | string[];
  children: React.ReactNode;
}

const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({
    className,
    type = 'single',
    value: controlledValue,
    defaultValue,
    onValueChange,
    disabled,
    children,
    ...props
  }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(defaultValue || (type === 'single' ? '' : []));
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = React.useCallback((newValue: string | string[]) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    }, [isControlled, onValueChange]);

    const contextValue = React.useMemo(
      () => ({
        type,
        value,
        onValueChange: handleValueChange,
        disabled,
      }),
      [type, value, handleValueChange, disabled]
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(accordionVariants(), className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

AccordionRoot.displayName = 'AccordionRoot';

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionItemVariants> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, variant, children, ...props }, ref) => {
    const { type, value: contextValue, onValueChange, disabled } = useAccordionContext();

    const isOpen = type === 'single'
      ? contextValue === value
      : Array.isArray(contextValue) && contextValue.includes(value);

    const isDisabled = disabled && (type === 'single' ? disabled === value : Array.isArray(disabled) && disabled.includes(value));

    const handleTriggerClick = () => {
      if (isDisabled) return;

      if (type === 'single') {
        onValueChange(isOpen ? '' : value);
      } else {
        const currentValues = Array.isArray(contextValue) ? contextValue : [];
        onValueChange(
          isOpen
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value]
        );
      }
    };

    const childArray = React.Children.toArray(children);
    const processedChildren = childArray.map((child) => {
      if (!React.isValidElement(child)) return child;
      
      if (child.type === AccordionTrigger) {
        return React.cloneElement(child, { isOpen, onTriggerClick: handleTriggerClick, disabled: isDisabled } as React.ComponentProps<typeof AccordionTrigger>);
      }
      
      if (child.type === AccordionContent) {
        return React.cloneElement(child, { isOpen } as React.ComponentProps<typeof AccordionContent>);
      }
      
      return child;
    });

    return (
      <div
        ref={ref}
        className={cn(accordionItemVariants({ variant }), className)}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        {processedChildren}
      </div>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof accordionTriggerVariants> {
  children: React.ReactNode;
  isOpen?: boolean;
  onTriggerClick?: () => void;
  disabled?: boolean;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, size, children, isOpen, onTriggerClick, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(accordionTriggerVariants({ size }), className)}
        onClick={onTriggerClick}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${children}`}
        id={`accordion-trigger-${children}`}
        {...props}
      >
        {children}
        <svg
          className={cn(accordionIconVariants(), 'ml-4 text-muted-foreground')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionContentVariants> {
  children: React.ReactNode;
  isOpen?: boolean;
  padding?: 'small' | 'medium' | 'large';
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, padding, children, isOpen, ...props }, ref) => {
    const triggerId = React.useId();

    return (
      <div
        ref={ref}
        id={`accordion-content-${triggerId}`}
        role="region"
        aria-labelledby={`accordion-trigger-${triggerId}`}
        className={cn(accordionContentVariants({ padding }), className)}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        <div className="pt-2">{children}</div>
      </div>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};