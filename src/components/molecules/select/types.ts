export type SelectVariant = "default" | "error";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  photoUrl?: string;
  chip?: string;
}

export interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[] | undefined | null;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  variant?: SelectVariant;
  className?: string;
  emptyLabel?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
}
