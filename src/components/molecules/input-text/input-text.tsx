import React from "react";
import { cn } from "@/lib/utils";
import { FieldShell } from "./field-shell";
import { getFieldControlClasses } from "./field-styles";
import {
  ADORNMENT_ICON_SIZE_CLASSES,
  INPUT_ADORNMENT_PADDING,
  INPUT_FIELD_SIZE_CLASSES,
} from "./sizes";
import type { InputTextProps } from "./types";

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      label,
      placeholder,
      errorMessage,
      helperText,
      required = false,
      fullWidth = true,
      disabled = false,
      readOnly = false,
      size = "m",
      type = "text",
      iconLeft,
      iconRight,
      containerClassName,
      labelClassName,
      inputClassName,
      helperTextClassName,
      ...restProps
    },
    ref
  ) => {
    const hasError = Boolean(errorMessage);
    const adornmentSize = ADORNMENT_ICON_SIZE_CLASSES[size];

    return (
      <FieldShell
        size={size}
        label={label}
        required={required}
        helperText={helperText}
        errorMessage={errorMessage}
        fullWidth={fullWidth}
        containerClassName={containerClassName}
        labelClassName={labelClassName}
        helperTextClassName={helperTextClassName}
      >
        <div className="relative flex w-full items-center">
          {iconLeft ? (
            <div
              className={cn(
                "text-grey-500 pointer-events-none absolute left-8 flex items-center",
                adornmentSize
              )}
            >
              {iconLeft}
            </div>
          ) : null}

          <input
            ref={ref}
            type={type}
            className={cn(
              "flex items-center",
              getFieldControlClasses(hasError, disabled, readOnly),
              INPUT_FIELD_SIZE_CLASSES[size],
              iconLeft && INPUT_ADORNMENT_PADDING[size].start,
              iconRight && INPUT_ADORNMENT_PADDING[size].end,
              inputClassName
            )}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            {...restProps}
          />

          {iconRight ? (
            <div
              className={cn(
                "pointer-events-none absolute right-8 flex items-center",
                adornmentSize
              )}
            >
              {iconRight}
            </div>
          ) : null}
        </div>
      </FieldShell>
    );
  }
);

InputText.displayName = "InputText";
