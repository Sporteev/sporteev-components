import React from "react";
import { cn } from "../../../lib/utils";
import { HelpCircle } from "lucide-react";

export interface BaseInputProps {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  inputSize?: "small" | "medium" | "large";
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperTextClassName?: string;
}

export interface InputTextProps
  extends
    BaseInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  multiline?: false;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  rows?: never;
}

export interface TextAreaProps
  extends
    BaseInputProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  multiline: true;
  rows?: number;
  type?: never;
}

export type InputTextComponentProps = InputTextProps | TextAreaProps;

export const InputText = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputTextComponentProps
>((props, ref) => {
  const {
    label,
    placeholder,
    errorMessage,
    helperText,
    required = false,
    fullWidth = true,
    disabled = false,
    readOnly = false,
    multiline = false,
    rows,
    type = "text",
    startAdornment,
    endAdornment,
    inputSize = "medium",
    containerClassName,
    labelClassName,
    inputClassName,
    helperTextClassName,
    ...restProps
  } = props;

  // Determine error state from errorMessage presence
  const hasError = Boolean(errorMessage);

  // Determine which helper text to show
  const displayHelperText = hasError ? errorMessage : helperText;
  const showHelperIcon = displayHelperText && !hasError;

  // Size classes
  const sizeClasses = {
    small: "px-8 py-4 text-sm",
    medium: "px-12 py-8 text-base",
    large: "px-16 py-12 text-lg",
  };

  // Base input classes
  const baseInputClasses = cn(
    "border rounded-8 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-grey-400 bg-white hover:border-grey-400 focus:border-primary-500",
    sizeClasses[inputSize],
    {
      "border-red-500": hasError,
      "border-gray-300 bg-gray-50": disabled,
      "w-full": fullWidth,
      "cursor-not-allowed opacity-50": disabled,
      "bg-gray-100": readOnly,
    },
    inputClassName
  );

  // Container classes
  const containerClasses = cn(
    "flex flex-col",
    {
      "w-full": fullWidth,
    },
    containerClassName
  );

  // Label classes
  const labelClasses = cn(
    "text-sm font-medium mb-4",
    {
      "text-red-600": hasError,
      "text-gray-700": !hasError,
    },
    labelClassName
  );

  // Helper text classes (for tooltip)
  const helperTextClasses = cn(
    "text-xs",
    {
      "text-red-600": hasError,
      "text-gray-500": !hasError,
    },
    helperTextClassName
  );

  if (multiline) {
    return (
      <div className={containerClasses}>
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className="ml-4 text-red-500">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {startAdornment && (
            <div className="absolute left-12 flex items-center text-gray-400">
              {startAdornment}
            </div>
          )}

          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={cn(baseInputClasses, {
              "pl-40": startAdornment,
              "pr-40": endAdornment || showHelperIcon,
            })}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            rows={rows || 3}
            {...(restProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />

          {endAdornment && (
            <div className="absolute right-12 flex items-center text-gray-400">
              {endAdornment}
            </div>
          )}

          {showHelperIcon && (
            <div className="group absolute top-8 right-12 flex items-start text-gray-400">
              <HelpCircle className="h-16 w-16 cursor-help" />
              <div className="rounded-8 absolute right-0 bottom-full mb-8 hidden w-[256px] bg-gray-800 p-8 text-white shadow-lg group-hover:block">
                <p className={helperTextClasses}>{displayHelperText}</p>
                <div className="absolute top-full right-8 h-0 w-0 border-t-4 border-r-4 border-l-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          )}
        </div>

        {hasError && <p className={helperTextClasses}>{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="ml-4 text-red-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {startAdornment && (
          <div className="absolute left-12 flex items-center text-gray-400">
            {startAdornment}
          </div>
        )}

        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          className={cn(baseInputClasses, {
            "pl-40": startAdornment,
            "pr-40": endAdornment || showHelperIcon,
          })}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          {...(restProps as React.InputHTMLAttributes<HTMLInputElement>)}
        />

        {endAdornment && (
          <div className="absolute right-12 flex items-center text-gray-400">
            {endAdornment}
          </div>
        )}

        {showHelperIcon && (
          <div className="group absolute right-12 flex items-center text-gray-400">
            <HelpCircle className="h-16 w-16 cursor-help" />
            <div className="rounded-8 absolute right-0 bottom-full mb-8 hidden w-[256px] bg-gray-800 p-8 text-white shadow-lg group-hover:block">
              <p className={helperTextClasses}>{displayHelperText}</p>
              <div className="absolute top-full right-8 h-0 w-0 border-t-4 border-r-4 border-l-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        )}
      </div>

      {hasError && <p className={helperTextClasses}>{errorMessage}</p>}
    </div>
  );
});

InputText.displayName = "InputText";

export default InputText;
