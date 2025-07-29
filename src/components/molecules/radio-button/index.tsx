import React from "react";
import { cn } from "../../../lib/utils";
import { Text } from "@/components/atoms";

export interface RadioButtonProps {
  label?: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  className?: string;
  labelClassName?: string;
  helperTextClassName?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked = false,
  onChange,
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  helperText,
  labelClassName,
  helperTextClassName,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.value);
    }
  };

  const baseContainerClasses = "flex flex-col items-start gap-2 mt-1";
  const baseInputClasses = "transition-colors duration-200 w-4 h-4 m-0 my-auto";
  const baseHelperTextClasses = "";

  const containerStateClasses = {
    disabled: "opacity-50 cursor-not-allowed",
    enabled: "cursor-pointer",
  };

  const inputStateClasses = {
    error: "accent-danger-main",
    normal: "accent-primary-70",
  };

  const helperTextStateClasses = {
    error: "text-danger-main",
    normal: "text-neutral-60",
  };

  const getContainerClasses = () => {
    return disabled
      ? containerStateClasses.disabled
      : containerStateClasses.enabled;
  };

  const getInputClasses = () => {
    return error ? inputStateClasses.error : inputStateClasses.normal;
  };

  const getHelperTextClasses = () => {
    return error ? helperTextStateClasses.error : helperTextStateClasses.normal;
  };

  const containerClasses = cn(baseContainerClasses, getContainerClasses());

  const inputClasses = cn(baseInputClasses, getInputClasses());

  const labelClasses = cn(
    "font-medium select-none",
    {
      "text-danger-main": error,
      "text-neutral-100": !error && !disabled,
      "text-neutral-80": disabled,
    },
    labelClassName
  );

  const helperTextClasses = cn(
    baseHelperTextClasses,
    getHelperTextClasses(),
    helperTextClassName
  );

  const displayHelperText = error && errorMessage ? errorMessage : helperText;

  return (
    <div className="flex flex-col justify-center">
      <label className={containerClasses}>
        <div className="flex flex-row gap-2">
          <input
            type="radio"
            value={value}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className={inputClasses}
          />
          {label && (
            <Text variant="bold-medium-text" className={labelClasses}>
              {label}
              {required && <span className="ml-1 text-red-500">*</span>}
            </Text>
          )}
        </div>
        {displayHelperText && (
          <Text variant="multiline-small-text" className={helperTextClasses}>
            {displayHelperText}
          </Text>
        )}
      </label>
    </div>
  );
};

export default RadioButton;
