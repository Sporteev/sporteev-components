export interface RadioButtonProps {
  label?: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  helperText?: string;
  labelClassName?: string;
  helperTextClassName?: string;
}
