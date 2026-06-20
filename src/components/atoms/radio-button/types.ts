import type { FieldSize } from "@/components/molecules/input-text/types";

export interface RadioButtonProps {
  label?: string;
  value: string;
  name?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: FieldSize;
  helperText?: string;
  className?: string;
}
