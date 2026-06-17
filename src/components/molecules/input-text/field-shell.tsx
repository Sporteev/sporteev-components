import React from "react";
import { DangerCircle, InfoCircle } from "@solar-icons/react-perf/Linear";
import { cn } from "@/lib/utils";
import {
  FIELD_STACK_GAP,
  HELPER_ICON_SIZE_CLASSES,
  HELPER_SIZE_CLASSES,
  LABEL_SIZE_CLASSES,
} from "./sizes";
import type { FieldSize } from "./types";

export interface FieldShellProps {
  size: FieldSize;
  label?: string;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  fullWidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  helperTextClassName?: string;
  children: React.ReactNode;
}

export function FieldShell({
  size,
  label,
  required = false,
  helperText,
  errorMessage,
  fullWidth = true,
  containerClassName,
  labelClassName,
  helperTextClassName,
  children,
}: FieldShellProps) {
  const hasError = Boolean(errorMessage);
  const displayHelperText = hasError ? errorMessage : helperText;
  const showHelper = Boolean(displayHelperText);

  return (
    <div
      className={cn(
        "flex flex-col",
        FIELD_STACK_GAP[size],
        fullWidth && "w-full",
        containerClassName
      )}
    >
      {label ? (
        <label
          className={cn(
            "flex items-center gap-2 text-grey-900",
            LABEL_SIZE_CLASSES[size],
            labelClassName
          )}
        >
          <span>{label}</span>
          {required ? (
            <span className="text-destructive-600" aria-hidden>
              *
            </span>
          ) : null}
        </label>
      ) : null}

      {children}

      {showHelper ? (
        <div
          className={cn(
            "flex items-center gap-4",
            hasError ? "text-destructive-600" : "text-grey-700",
            HELPER_SIZE_CLASSES[size],
            helperTextClassName
          )}
          role={hasError ? "alert" : undefined}
        >
          {hasError ? (
            <DangerCircle
              className={cn("shrink-0", HELPER_ICON_SIZE_CLASSES[size])}
              aria-hidden
            />
          ) : (
            <InfoCircle
              className={cn("shrink-0", HELPER_ICON_SIZE_CLASSES[size])}
              aria-hidden
            />
          )}
          <span>{displayHelperText}</span>
        </div>
      ) : null}
    </div>
  );
}
