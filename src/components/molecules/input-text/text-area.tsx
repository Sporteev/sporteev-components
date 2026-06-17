import React from "react";
import { cn } from "@/lib/utils";
import { FieldShell } from "./field-shell";
import { getFieldControlClasses } from "./field-styles";
import { TEXTAREA_FIELD_SIZE_CLASSES } from "./sizes";
import type { TextAreaProps } from "./types";

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
      rows,
      containerClassName,
      labelClassName,
      inputClassName,
      helperTextClassName,
      ...restProps
    },
    ref
  ) => {
    const hasError = Boolean(errorMessage);

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
        <textarea
          ref={ref}
          className={cn(
            "resize-y align-top",
            getFieldControlClasses(hasError, disabled, readOnly),
            TEXTAREA_FIELD_SIZE_CLASSES[size],
            inputClassName
          )}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          aria-invalid={hasError || undefined}
          aria-required={required || undefined}
          {...restProps}
        />
      </FieldShell>
    );
  }
);

TextArea.displayName = "TextArea";
