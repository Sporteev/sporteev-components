import React from "react";
import { cn } from "@/lib/utils";
import { RadioButton } from "@/components/atoms/radio-button";
import type { RadioGroupProps } from "./types";
import { OPTION_WRAPPER_VARIANT_CLASSES } from "./variants";

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      value,
      onChange,
      options,
      required = false,
      errorMessage,
      disabled = false,
      layout = "column",
      variant = "simple",
      className,
    },
    ref
  ) => {
    const handleOptionChange = (optionValue: string) => {
      if (!disabled && onChange) {
        onChange(optionValue);
      }
    };

    return (
      <div ref={ref} className={cn("flex flex-col gap-12", className)}>
        {label && (
          <div className="flex items-center gap-4">
            <span className="font-medium select-none">{label}</span>
            {required && <span className="text-red-500">*</span>}
          </div>
        )}

        <div
          className={cn(
            "flex",
            layout === "column" ? "flex-col gap-8" : "flex-row flex-wrap",
            layout === "row" && variant === "simple" ? "gap-16" : "gap-8",
            disabled && "pointer-events-none opacity-60"
          )}
        >
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <div
                key={option.value}
                className={cn(
                  OPTION_WRAPPER_VARIANT_CLASSES[variant],
                  layout === "row" && variant === "block" && "flex-1",
                  variant === "block" &&
                    isSelected &&
                    "border-primary-500 bg-primary-200 shadow-secondary"
                )}
              >
                <RadioButton
                  label={option.label}
                  value={option.value}
                  checked={isSelected}
                  onChange={handleOptionChange}
                  disabled={disabled || option.disabled}
                  helperText={option.helperText}
                />
              </div>
            );
          })}
        </div>

        {errorMessage && (
          <span className="text-xs text-red-500">{errorMessage}</span>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
