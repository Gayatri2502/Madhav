'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from './button';

const dropdownVariants = cva('relative inline-block', {
  variants: {},
  defaultVariants: {},
});

const dropdownToggleVariants = cva(
  [
    'inline-flex items-center justify-center gap-1.5',
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
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary/90',
          'active:bg-secondary',
        ],
        outline: [
          'border border-border bg-transparent',
          'hover:bg-accent-primary/10',
          'hover:text-accent-primary',
        ],
        ghost: [
          'bg-transparent',
          'hover:bg-accent-primary/10',
          'hover:text-accent-primary',
        ],
      },
      size: {
        small: 'h-8 px-3 text-xsmall gap-1',
        medium: 'h-10 px-4 text-small gap-1.5',
        large: 'h-12 px-6 text-medium gap-2',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'medium',
    },
  }
);

const dropdownListVariants = cva(
  [
    'absolute z-50 min-w-[160px]',
    'bg-background border border-border rounded-large shadow-large',
    'overflow-hidden',
    'animate-in fade-in-0 zoom-in-95 duration-150 ease-out',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-100',
  ],
  {
    variants: {
      align: {
        left: 'left-0',
        right: 'right-0',
      },
      side: {
        bottom: 'top-full mt-1.5',
        top: 'bottom-full mb-1.5',
      },
    },
    defaultVariants: {
      align: 'left',
      side: 'bottom',
    },
  }
);

const dropdownItemVariants = cva(
  [
    'flex w-full items-center px-3 py-2 text-small',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:bg-accent-primary/10',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    'data-[selected]:bg-accent-primary/10 data-[selected]:text-accent-primary',
  ],
  {
    variants: {
      variant: {
        default: 'text-foreground',
        destructive: 'text-red-600 focus-visible:bg-red-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const dropdownSeparatorVariants = cva('h-px bg-border my-1');

interface DropdownContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within Dropdown.Root');
  }
  return context;
}

export interface DropdownProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownVariants> {
  children: React.ReactNode;
}

const DropdownRoot = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    const contextValue = React.useMemo(
      () => ({
        open,
        onOpenChange: setOpen,
        triggerRef,
        contentRef,
      }),
      [open]
    );

    React.useEffect(() => {
      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          setOpen(false);
          triggerRef.current?.focus();
        }
      }

      if (open) {
        document.addEventListener('keydown', handleKeyDown);
      }
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open]);

    return (
      <DropdownContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(dropdownVariants(), className)}
          {...props}
        >
          {children}
        </div>
      </DropdownContext.Provider>
    );
  }
);

DropdownRoot.displayName = 'DropdownRoot';

export interface DropdownTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownToggleVariants> {
  children: React.ReactNode;
}

const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const { open, onOpenChange, triggerRef } = useDropdownContext();

    return (
      <Button
        ref={(el) => {
          triggerRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref && 'current' in ref) ref.current = el;
        }}
        type="button"
        variant={variant}
        size={size}
        className={cn(dropdownToggleVariants({ variant, size }), className)}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        {...props}
      >
        {children}
        <svg
          className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
    );
  }
);

DropdownTrigger.displayName = 'DropdownTrigger';

export interface DropdownContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownListVariants> {
  children: React.ReactNode;
  align?: 'left' | 'right';
  side?: 'top' | 'bottom';
}

const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, align, side, children, ...props }, ref) => {
    const { open, onOpenChange, contentRef } = useDropdownContext();

    if (!open) return null;

    return (
      <div
        ref={(el) => {
          contentRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref && 'current' in ref) ref.current = el;
        }}
        className={cn(dropdownListVariants({ align, side }), className)}
        role="menu"
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownContent.displayName = 'DropdownContent';

export interface DropdownItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownItemVariants> {
  onSelect?: () => void;
}

const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, variant, onSelect, children, ...props }, ref) => {
    const { onOpenChange } = useDropdownContext();

    return (
      <div
        ref={ref}
        className={cn(dropdownItemVariants({ variant }), className)}
        role="menuitem"
        tabIndex={-1}
        onClick={() => {
          onSelect?.();
          onOpenChange(false);
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';

export interface DropdownSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownSeparatorVariants> {}

const DropdownSeparator = React.forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dropdownSeparatorVariants(), className)}
        role="separator"
        {...props}
      />
    );
  }
);

DropdownSeparator.displayName = 'DropdownSeparator';

export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
  Separator: DropdownSeparator,
};