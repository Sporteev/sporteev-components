import React from "react";
import { cn } from "@/lib/utils";
import type { RadioButtonProps } from "./types";
import {
  RADIO_CONTROL_SIZE_CLASSES,
  RADIO_DOT_SIZE_CLASSES,
  RADIO_HELPER_SIZE_CLASSES,
  RADIO_LABEL_SIZE_CLASSES,
  RADIO_OPTION_HELPER_INDENT_CLASSES,
  RADIO_OPTION_STACK_GAP_CLASSES,
  RADIO_ROW_GAP_CLASSES,
} from "./sizes";

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  name,
  checked = false,
  onChange,
  disabled = false,
  size = "m",
  helperText,
  className,
  labelClassName,
  helperTextClassName,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <label
      className={cn(
        "group flex flex-col",
        RADIO_OPTION_STACK_GAP_CLASSES[size],
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      <div className={cn("flex items-center", RADIO_ROW_GAP_CLASSES[size])}>
        <span
          className={cn(
            "relative flex shrink-0 items-center justify-center rounded-full border bg-white transition-colors duration-200",
            RADIO_CONTROL_SIZE_CLASSES[size],
            checked ? "border-primary-600" : "border-grey-400",
            !disabled &&
              "group-focus-within:border-primary-600 group-focus-within:shadow-[0_0_0_2px_rgba(0,100,147,0.2)]",
            disabled && "border-grey-400 bg-grey-300"
          )}
          aria-hidden
        >
          <span
            className={cn(
              "rounded-full bg-primary-600 transition-transform duration-200",
              RADIO_DOT_SIZE_CLASSES[size],
              checked ? "scale-100" : "scale-0",
              disabled && "bg-grey-600"
            )}
          />
        </span>

        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
        />

        {label ? (
          <span
            className={cn(
              "text-grey-900 select-none",
              RADIO_LABEL_SIZE_CLASSES[size],
              disabled && "text-grey-600",
              labelClassName
            )}
          >
            {label}
          </span>
        ) : null}
      </div>

      {helperText ? (
        <span
          className={cn(
            "text-grey-700",
            RADIO_HELPER_SIZE_CLASSES[size],
            RADIO_OPTION_HELPER_INDENT_CLASSES[size],
            helperTextClassName
          )}
        >
          {helperText}
        </span>
      ) : null}
    </label>
  );
};
