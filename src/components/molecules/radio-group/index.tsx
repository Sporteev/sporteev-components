import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { RadioButton } from "@/components/atoms/radio-button";

export interface RadioOption {
  label?: string;
  value: string;
  disabled?: boolean;
  helperText?: string;
}

const optionWrapperVariants = cva("", {
  variants: {
    variant: {
      simple: "",
      block:
        "border-2 border-neutral-40 rounded-lg p-3 transition-all duration-200",
    },
  },
  defaultVariants: {
    variant: "simple",
  },
});

export interface RadioGroupProps
  extends VariantProps<typeof optionWrapperVariants> {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: RadioOption[];
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  layout?: "column" | "row";
  className?: string;
}

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
      <div ref={ref} className={cn("flex flex-col gap-3", className)}>
        {label && (
          <div className="flex items-center gap-1">
            <span className="select-none font-medium">{label}</span>
            {required && <span className="text-red-500">*</span>}
          </div>
        )}

        <div
          className={cn(
            "flex",
            layout === "column" ? "flex-col gap-2" : "flex-row flex-wrap",
            layout === "row" && variant === "simple" ? "gap-4" : "gap-2",
            disabled && "pointer-events-none opacity-60"
          )}
        >
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <div
                key={option.value}
                className={cn(
                  optionWrapperVariants({ variant }),
                  layout === "row" && variant === "block" && "flex-1",
                  variant === "block" &&
                    isSelected &&
                    "border-primary-50 bg-primary-20"
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

export default RadioGroup;
