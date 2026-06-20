export type RadioGroupVariant = "simple" | "block";

export const RADIO_GROUP_VARIANTS: RadioGroupVariant[] = ["simple", "block"];

export interface RadioOption {
  label?: string;
  value: string;
  disabled?: boolean;
  helperText?: string;
}

export interface RadioGroupProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: RadioOption[];
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  layout?: "column" | "row";
  variant?: RadioGroupVariant;
  className?: string;
}
