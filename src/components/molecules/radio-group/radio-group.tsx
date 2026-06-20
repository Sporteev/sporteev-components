import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { RadioButton } from "@/components/atoms/radio-button";
import { FieldShell } from "@/components/molecules/input-text/field-shell";
import type { RadioGroupProps } from "./types";
import {
  RADIO_GROUP_COLUMN_GAP_CLASSES,
  RADIO_GROUP_ROW_GAP_CLASSES,
} from "./sizes";
import { getBlockOptionWrapperClasses } from "./variants";

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      value,
      onChange,
      options,
      required = false,
      errorMessage,
      helperText,
      disabled = false,
      size = "m",
      fullWidth = true,
      layout = "column",
      variant = "simple",
      className,
    },
    ref
  ) => {
    const groupName = useId();
    const hasError = Boolean(errorMessage);

    const handleOptionChange = (optionValue: string) => {
      if (!disabled && onChange) {
        onChange(optionValue);
      }
    };

    return (
      <div ref={ref} className={cn(fullWidth && "w-full", className)}>
        <FieldShell
          size={size}
          label={label}
          required={required}
          helperText={helperText}
          errorMessage={errorMessage}
          fullWidth={fullWidth}
        >
          <div
            role="radiogroup"
            aria-required={required || undefined}
            aria-invalid={hasError || undefined}
            className={cn(
              "flex flex-wrap",
              layout === "column"
                ? cn("flex-col", RADIO_GROUP_COLUMN_GAP_CLASSES[size])
                : cn("flex-row", RADIO_GROUP_ROW_GAP_CLASSES[size]),
              disabled && "pointer-events-none opacity-50"
            )}
          >
            {options.map((option) => {
              const isSelected = value === option.value;
              const isOptionDisabled = disabled || option.disabled;

              return (
                <div
                  key={option.value}
                  className={cn(
                    variant === "block" &&
                      getBlockOptionWrapperClasses(
                        hasError,
                        Boolean(isOptionDisabled),
                        size,
                        isSelected
                      ),
                    layout === "row" && variant === "block" && "min-w-0 flex-1"
                  )}
                >
                  <RadioButton
                    label={option.label}
                    value={option.value}
                    name={groupName}
                    checked={isSelected}
                    onChange={handleOptionChange}
                    disabled={isOptionDisabled}
                    size={size}
                    helperText={option.helperText}
                  />
                </div>
              );
            })}
          </div>
        </FieldShell>
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
