import type React from "react";

export type FieldSize = "s" | "m" | "l" | "xl";

export const FIELD_SIZES: FieldSize[] = ["s", "m", "l", "xl"];

export interface BaseFieldProps {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  size?: FieldSize;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperTextClassName?: string;
}

export interface InputTextProps
  extends
    BaseFieldProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
}

export interface TextAreaProps
  extends
    BaseFieldProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  rows?: number;
}
