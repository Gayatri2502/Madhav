'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tabsVariants = cva('w-full', {
  variants: {},
  defaultVariants: {},
});

const tabsListVariants = cva(
  [
    'inline-flex h-10 items-center justify-center',
    'bg-secondary rounded-medium p-1',
    'data-[orientation=vertical]:flex-col data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-10',
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-small',
    'font-medium text-sm transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=active]:bg-background data-[state=active]:shadow-small data-[state=active]:text-foreground',
    'data-[state=inactive]:text-muted-foreground hover:data-[state=inactive]:text-foreground',
  ],
  {
    variants: {
      size: {
        small: 'h-8 px-3 text-xsmall',
        medium: 'h-10 px-4 text-small',
        large: 'h-12 px-6 text-medium',
      },
      variant: {
        default: '',
        line: 'bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary',
      },
      surface: {
        default: '',
        'on-accent-primary': 'data-[state=active]:bg-accent-primary data-[state=active]:text-accent-primary-foreground',
        'on-accent-secondary': 'data-[state=active]:bg-accent-secondary data-[state=active]:text-accent-secondary-foreground',
        'on-accent-tertiary': 'data-[state=active]:bg-accent-tertiary data-[state=active]:text-accent-tertiary-foreground',
        'on-inverse': 'data-[state=active]:bg-inverse data-[state=active]:text-inverse-foreground',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'default',
      surface: 'default',
    },
  }
);

const tabsContentVariants = cva(
  [
    'mt-4 ring-offset-background',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'animate-in fade-in-0 duration-200',
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
  variant: 'default' | 'line';
  size: 'small' | 'medium' | 'large';
  surface: 'default' | 'on-accent-primary' | 'on-accent-secondary' | 'on-accent-tertiary' | 'on-inverse';
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within Tabs.Root');
  }
  return context;
}

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsVariants> {
  value: string;
  onValueChange: (value: string) => void;
  defaultValue?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'line';
  size?: 'small' | 'medium' | 'large';
  surface?: 'default' | 'on-accent-primary' | 'on-accent-secondary' | 'on-accent-tertiary' | 'on-inverse';
  children: React.ReactNode;
}

const TabsRoot = React.forwardRef<HTMLDivElement, TabsProps>(
  ({
    className,
    value,
    onValueChange,
    orientation = 'horizontal',
    variant = 'default',
    size = 'medium',
    surface = 'default',
    children,
    ...props
  }, ref) => {
    const contextValue = React.useMemo(
      () => ({
        value,
        onValueChange,
        orientation,
        variant,
        size,
        surface,
      }),
      [value, onValueChange, orientation, variant, size, surface]
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(tabsVariants(), className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

TabsRoot.displayName = 'TabsRoot';

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {
  children: React.ReactNode;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useTabsContext();

    return (
      <div
        ref={ref}
        className={cn(tabsListVariants(), className)}
        role="tablist"
        aria-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = 'TabsList';

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  value: string;
  children: React.ReactNode;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, variant, size, surface, ...props }, ref) => {
    const { value: contextValue, onValueChange, orientation } = useTabsContext();
    const isActive = contextValue === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`tabs-content-${value}`}
        id={`tabs-trigger-${value}`}
        data-state={isActive ? 'active' : 'inactive'}
        data-orientation={orientation}
        className={cn(tabsTriggerVariants({ variant, size, surface }), className)}
        onClick={() => onValueChange(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsContentVariants> {
  value: string;
  children: React.ReactNode;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: contextValue } = useTabsContext();
    const isActive = contextValue === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        id={`tabs-content-${value}`}
        role="tabpanel"
        aria-labelledby={`tabs-trigger-${value}`}
        className={cn(tabsContentVariants(), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};