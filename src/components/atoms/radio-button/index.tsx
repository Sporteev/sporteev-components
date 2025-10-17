import React from "react";
import { cn } from "../../../lib/utils";
import { Text } from "@/components/atoms";

export interface RadioButtonProps {
  label?: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  helperText?: string;
  labelClassName?: string;
  helperTextClassName?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked = false,
  onChange,
  disabled = false,
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
    normal: "accent-primary-70",
  };

  const helperTextStateClasses = {
    normal: "text-neutral-60",
  };

  const getContainerClasses = () => {
    return disabled
      ? containerStateClasses.disabled
      : containerStateClasses.enabled;
  };

  const getInputClasses = () => {
    return inputStateClasses.normal;
  };

  const getHelperTextClasses = () => {
    return helperTextStateClasses.normal;
  };

  const containerClasses = cn(baseContainerClasses, getContainerClasses());

  const inputClasses = cn(baseInputClasses, getInputClasses());

  const labelClasses = cn(
    "font-medium select-none",
    {
      "text-neutral-100": !disabled,
      "text-neutral-80": disabled,
    },
    labelClassName
  );

  const helperTextClasses = cn(
    baseHelperTextClasses,
    getHelperTextClasses(),
    helperTextClassName
  );

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
            className={inputClasses}
          />
          {label && (
            <Text variant="bold-medium-text" className={labelClasses}>
              {label}
            </Text>
          )}
        </div>
        {helperText && (
          <Text variant="multiline-small-text" className={helperTextClasses}>
            {helperText}
          </Text>
        )}
      </label>
    </div>
  );
};

export default RadioButton;
