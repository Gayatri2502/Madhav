import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputFieldVariants = cva(
  [
    'flex w-full rounded-medium border bg-background',
    'text-sm transition-all duration-200',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[invalid]:border-red-500 data-[invalid]:focus-visible:ring-red-500',
  ],
  {
    variants: {
      variant: {
        default: 'border-border',
        error: 'border-red-500 focus-visible:ring-red-500',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
      size: {
        small: 'h-8 px-3 text-xsmall',
        medium: 'h-10 px-4 text-small',
        large: 'h-12 px-5 text-medium',
      },
      surface: {
        default: '',
        'on-inverse': 'bg-inverse/10 border-inverse/20 text-inverse-foreground placeholder:inverse-foreground/50',
        'on-accent-primary': 'bg-accent-primary/10 border-accent-primary/20 text-accent-primary-foreground placeholder:accent-primary-foreground/50',
        'on-accent-secondary': 'bg-accent-secondary/10 border-accent-secondary/20 text-accent-secondary-foreground placeholder:accent-secondary-foreground/50',
        'on-accent-tertiary': 'bg-accent-tertiary/10 border-accent-tertiary/20 text-accent-tertiary-foreground placeholder:accent-tertiary-foreground/50',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      surface: 'default',
    },
  }
);

const inputLabelVariants = cva(
  'text-sm font-medium mb-1.5 block',
  {
    variants: {
      surface: {
        default: 'text-foreground',
        'on-inverse': 'text-inverse-foreground',
        'on-accent-primary': 'text-accent-primary-foreground',
        'on-accent-secondary': 'text-accent-secondary-foreground',
        'on-accent-tertiary': 'text-accent-tertiary-foreground',
      },
    },
    defaultVariants: {
      surface: 'default',
    },
  }
);

const inputWrapperVariants = cva('w-full', {
  variants: {},
  defaultVariants: {},
});

const textareaVariants = cva(
  [
    'flex min-h-[80px] w-full rounded-medium border bg-background resize-none',
    'text-sm transition-all duration-200',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'border-border',
        error: 'border-red-500 focus-visible:ring-red-500',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
      size: {
        small: 'px-3 py-2 text-xsmall',
        medium: 'px-4 py-3 text-small',
        large: 'px-5 py-4 text-medium',
      },
      surface: {
        default: '',
        'on-inverse': 'bg-inverse/10 border-inverse/20 text-inverse-foreground placeholder:inverse-foreground/50',
        'on-accent-primary': 'bg-accent-primary/10 border-accent-primary/20 text-accent-primary-foreground placeholder:accent-primary-foreground/50',
        'on-accent-secondary': 'bg-accent-secondary/10 border-accent-secondary/20 text-accent-secondary-foreground placeholder:accent-secondary-foreground/50',
        'on-accent-tertiary': 'bg-accent-tertiary/10 border-accent-tertiary/20 text-accent-tertiary-foreground placeholder:accent-tertiary-foreground/50',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      surface: 'default',
    },
  }
);

const selectVariants = cva(
  [
    'flex w-full rounded-medium border bg-background appearance-none',
    'text-sm transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'border-border',
        error: 'border-red-500 focus-visible:ring-red-500',
      },
      size: {
        small: 'h-8 px-3 text-xsmall pr-8',
        medium: 'h-10 px-4 text-small pr-10',
        large: 'h-12 px-5 text-medium pr-10',
      },
      surface: {
        default: '',
        'on-inverse': 'bg-inverse/10 border-inverse/20 text-inverse-foreground',
        'on-accent-primary': 'bg-accent-primary/10 border-accent-primary/20 text-accent-primary-foreground',
        'on-accent-secondary': 'bg-accent-secondary/10 border-accent-secondary/20 text-accent-secondary-foreground',
        'on-accent-tertiary': 'bg-accent-tertiary/10 border-accent-tertiary/20 text-accent-tertiary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      surface: 'default',
    },
  }
);

const checkboxVariants = cva(
  [
    'peer h-4 w-4 shrink-0 rounded-small',
    'border border-border bg-background',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary',
  ],
  {
    variants: {
      size: {
        small: 'h-3.5 w-3.5',
        medium: 'h-4 w-4',
        large: 'h-5 w-5',
      },
      surface: {
        default: '',
        'on-inverse': 'border-inverse/30 bg-inverse/10 data-[state=checked]:bg-inverse data-[state=checked]:border-inverse data-[state=checked]:text-inverse-foreground',
        'on-accent-primary': 'border-accent-primary/30 bg-accent-primary/10 data-[state=checked]:bg-accent-primary data-[state=checked]:border-accent-primary data-[state=checked]:text-accent-primary-foreground',
        'on-accent-secondary': 'border-accent-secondary/30 bg-accent-secondary/10 data-[state=checked]:bg-accent-secondary data-[state=checked]:border-accent-secondary data-[state=checked]:text-accent-secondary-foreground',
        'on-accent-tertiary': 'border-accent-tertiary/30 bg-accent-tertiary/10 data-[state=checked]:bg-accent-tertiary data-[state=checked]:border-accent-tertiary data-[state=checked]:text-accent-tertiary-foreground',
      },
    },
    defaultVariants: {
      size: 'medium',
      surface: 'default',
    },
  }
);

const checkboxLabelVariants = cva(
  'text-sm font-medium cursor-pointer select-none',
  {
    variants: {
      surface: {
        default: 'text-foreground',
        'on-inverse': 'text-inverse-foreground',
        'on-accent-primary': 'text-accent-primary-foreground',
        'on-accent-secondary': 'text-accent-secondary-foreground',
        'on-accent-tertiary': 'text-accent-tertiary-foreground',
      },
    },
    defaultVariants: {
      surface: 'default',
    },
  }
);

const checkboxWrapperVariants = cva(
  'inline-flex items-start gap-2',
  {
    variants: {},
    defaultVariants: {},
  }
);

const radioVariants = cva(
  [
    'peer h-4 w-4 shrink-0 rounded-full',
    'border border-border bg-background',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
    'data-[state=checked]:after:content-[""] data-[state=checked]:after:block data-[state=checked]:after:h-1.5 data-[state=checked]:after:w-1.5 data-[state=checked]:after:rounded-full data-[state=checked]:after:bg-primary-foreground',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        small: 'h-3.5 w-3.5',
        medium: 'h-4 w-4',
        large: 'h-5 w-5',
      },
      surface: {
        default: '',
        'on-inverse': 'border-inverse/30 bg-inverse/10 data-[state=checked]:bg-inverse data-[state=checked]:border-inverse data-[state=checked]:after:bg-inverse-foreground',
        'on-accent-primary': 'border-accent-primary/30 bg-accent-primary/10 data-[state=checked]:bg-accent-primary data-[state=checked]:border-accent-primary data-[state=checked]:after:bg-accent-primary-foreground',
        'on-accent-secondary': 'border-accent-secondary/30 bg-accent-secondary/10 data-[state=checked]:bg-accent-secondary data-[state=checked]:border-accent-secondary data-[state=checked]:after:bg-accent-secondary-foreground',
        'on-accent-tertiary': 'border-accent-tertiary/30 bg-accent-tertiary/10 data-[state=checked]:bg-accent-tertiary data-[state=checked]:border-accent-tertiary data-[state=checked]:after:bg-accent-tertiary-foreground',
      },
    },
    defaultVariants: {
      size: 'medium',
      surface: 'default',
    },
  }
);

const radioLabelVariants = cva(
  'text-sm font-medium cursor-pointer select-none',
  {
    variants: {
      surface: {
        default: 'text-foreground',
        'on-inverse': 'text-inverse-foreground',
        'on-accent-primary': 'text-accent-primary-foreground',
        'on-accent-secondary': 'text-accent-secondary-foreground',
        'on-accent-tertiary': 'text-accent-tertiary-foreground',
      },
    },
    defaultVariants: {
      surface: 'default',
    },
  }
);

const radioWrapperVariants = cva(
  'inline-flex items-center gap-2',
  {
    variants: {},
    defaultVariants: {},
  }
);

const formMessageVariants = cva(
  'text-sm mt-1.5',
  {
    variants: {
      type: {
        error: 'text-red-600',
        success: 'text-green-600',
        info: 'text-blue-600',
      },
    },
    defaultVariants: {
      type: 'error',
    },
  }
);

const formSuccessMessageVariants = cva(
  'text-green-600 text-sm mt-1.5 flex items-center gap-1.5',
  {
    variants: {},
    defaultVariants: {},
  }
);

const formErrorMessageVariants = cva(
  'text-red-600 text-sm mt-1.5 flex items-center gap-1.5',
  {
    variants: {},
    defaultVariants: {},
  }
);

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  Omit<VariantProps<typeof inputFieldVariants>, 'size'> & {
    size?: VariantProps<typeof inputFieldVariants>['size'];
  };

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, variant, size, surface, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputFieldVariants({ variant, size, surface }), className)}
        {...props}
      />
    );
  }
);

InputField.displayName = 'InputField';

interface InputLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof inputLabelVariants> {}

const InputLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(
  ({ className, surface, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(inputLabelVariants({ surface }), className)}
        {...props}
      >
        {children}
      </label>
    );
  }
);

InputLabel.displayName = 'InputLabel';

interface InputWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputWrapperVariants> {}

const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(inputWrapperVariants(), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InputWrapper.displayName = 'InputWrapper';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  Omit<VariantProps<typeof textareaVariants>, 'size'> & {
    size?: VariantProps<typeof textareaVariants>['size'];
  };

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, size, surface, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ variant, size, surface }), className)}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  Omit<VariantProps<typeof selectVariants>, 'size'> & {
    size?: VariantProps<typeof selectVariants>['size'];
  };

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, size, surface, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(selectVariants({ variant, size, surface }), className)}
        {...props}
      />
    );
  }
);

Select.displayName = 'Select';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> &
  Omit<VariantProps<typeof checkboxVariants>, 'size'> & {
    size?: VariantProps<typeof checkboxVariants>['size'];
  };

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, surface, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={cn(checkboxVariants({ size, surface }), className)}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';

interface CheckboxLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof checkboxLabelVariants> {}

const CheckboxLabel = React.forwardRef<HTMLLabelElement, CheckboxLabelProps>(
  ({ className, surface, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(checkboxLabelVariants({ surface }), className)}
        {...props}
      >
        {children}
      </label>
    );
  }
);

CheckboxLabel.displayName = 'CheckboxLabel';

interface CheckboxWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof checkboxWrapperVariants> {}

const CheckboxWrapper = React.forwardRef<HTMLDivElement, CheckboxWrapperProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(checkboxWrapperVariants(), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CheckboxWrapper.displayName = 'CheckboxWrapper';

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> &
  Omit<VariantProps<typeof radioVariants>, 'size'> & {
    size?: VariantProps<typeof radioVariants>['size'];
  };

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size, surface, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="radio"
        className={cn(radioVariants({ size, surface }), className)}
        {...props}
      />
    );
  }
);

Radio.displayName = 'Radio';

interface RadioLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof radioLabelVariants> {}

const RadioLabel = React.forwardRef<HTMLLabelElement, RadioLabelProps>(
  ({ className, surface, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(radioLabelVariants({ surface }), className)}
        {...props}
      >
        {children}
      </label>
    );
  }
);

RadioLabel.displayName = 'RadioLabel';

interface RadioWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radioWrapperVariants> {}

const RadioWrapper = React.forwardRef<HTMLDivElement, RadioWrapperProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(radioWrapperVariants(), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

RadioWrapper.displayName = 'RadioWrapper';

interface FormMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formMessageVariants> {}

const FormMessage = React.forwardRef<HTMLDivElement, FormMessageProps>(
  ({ className, type, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formMessageVariants({ type }), className)}
        role="alert"
        {...props}
      >
        {children}
      </div>
    );
  }
);

FormMessage.displayName = 'FormMessage';

const FormSuccessMessage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formSuccessMessageVariants(), className)}
        role="status"
        {...props}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {children}
      </div>
    );
  }
);

FormSuccessMessage.displayName = 'FormSuccessMessage';

const FormErrorMessage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formErrorMessageVariants(), className)}
        role="alert"
        {...props}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {children}
      </div>
    );
  }
);

FormErrorMessage.displayName = 'FormErrorMessage';

export {
  InputField,
  InputLabel,
  InputWrapper,
  TextArea,
  Select,
  Checkbox,
  CheckboxLabel,
  CheckboxWrapper,
  Radio,
  RadioLabel,
  RadioWrapper,
  FormMessage,
  FormSuccessMessage,
  FormErrorMessage,
};