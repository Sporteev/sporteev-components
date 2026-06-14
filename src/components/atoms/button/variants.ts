import type { ButtonColor, ButtonVariant } from "./types";

const DISABLED_CLASSES =
  "bg-grey-300 text-grey-600 border-transparent pointer-events-none";

/** Static Tailwind classes — one entry per variant × color (required for JIT). */
const VARIANT_COLOR_CLASSES: Record<
  ButtonVariant,
  Record<ButtonColor, string>
> = {
  primary: {
    primary:
      "bg-primary-600 text-grey-100 hover:bg-primary-700 active:bg-primary-800 active:shadow-secondary",
    secondary:
      "bg-secondary-600 text-grey-100 hover:bg-secondary-700 active:bg-secondary-800 active:shadow-secondary",
    tertiary:
      "bg-tertiary-600 text-grey-100 hover:bg-tertiary-700 active:bg-tertiary-800 active:shadow-secondary",
    destructive:
      "bg-destructive-600 text-grey-100 hover:bg-destructive-700 active:bg-destructive-800 active:shadow-secondary",
    warning:
      "bg-warning-600 text-grey-100 hover:bg-warning-700 active:bg-warning-800 active:shadow-secondary",
    success:
      "bg-success-600 text-grey-100 hover:bg-success-700 active:bg-success-800 active:shadow-secondary",
  },
  secondary: {
    primary:
      "bg-primary-200 text-primary-600 hover:text-primary-700 active:text-primary-800 active:shadow-secondary",
    secondary:
      "bg-secondary-200 text-secondary-600 hover:text-secondary-700 active:text-secondary-800 active:shadow-secondary",
    tertiary:
      "bg-tertiary-200 text-tertiary-600 hover:text-tertiary-700 active:text-tertiary-800 active:shadow-secondary",
    destructive:
      "bg-destructive-200 text-destructive-600 hover:text-destructive-700 active:text-destructive-800 active:shadow-secondary",
    warning:
      "bg-warning-200 text-warning-600 hover:text-warning-700 active:text-warning-800 active:shadow-secondary",
    success:
      "bg-success-200 text-success-600 hover:text-success-700 active:text-success-800 active:shadow-secondary",
  },
  outline: {
    primary:
      "border-2 border-primary-600 text-primary-600 bg-white hover:border-primary-700 hover:bg-primary-700 hover:text-grey-100 active:border-primary-800 active:bg-primary-800 active:shadow-secondary",
    secondary:
      "border-2 border-secondary-600 text-secondary-600 bg-white hover:border-secondary-700 hover:bg-secondary-700 hover:text-grey-100 active:border-secondary-800 active:bg-secondary-800 active:shadow-secondary",
    tertiary:
      "border-2 border-tertiary-600 text-tertiary-600 bg-white hover:border-tertiary-700 hover:bg-tertiary-700 hover:text-grey-100 active:border-tertiary-800 active:bg-tertiary-800 active:shadow-secondary",
    destructive:
      "border-2 border-destructive-600 text-destructive-600 bg-white hover:border-destructive-700 hover:bg-destructive-700 hover:text-grey-100 active:border-destructive-800 active:bg-destructive-800 active:shadow-secondary",
    warning:
      "border-2 border-warning-600 text-warning-600 bg-white hover:border-warning-700 hover:bg-warning-700 hover:text-grey-100 active:border-warning-800 active:bg-warning-800 active:shadow-secondary",
    success:
      "border-2 border-success-600 text-success-600 bg-white hover:border-success-700 hover:bg-success-700 hover:text-grey-100 active:border-success-800 active:bg-success-800 active:shadow-secondary",
  },
  ghost: {
    primary:
      "bg-transparent text-primary-600 hover:text-primary-700 active:text-primary-800 active:shadow-secondary",
    secondary:
      "bg-transparent text-secondary-600 hover:text-secondary-700 active:text-secondary-800 active:shadow-secondary",
    tertiary:
      "bg-transparent text-tertiary-600 hover:text-tertiary-700 active:text-tertiary-800 active:shadow-secondary",
    destructive:
      "bg-transparent text-destructive-600 hover:text-destructive-700 active:text-destructive-800 active:shadow-secondary",
    warning:
      "bg-transparent text-warning-600 hover:text-warning-700 active:text-warning-800 active:shadow-secondary",
    success:
      "bg-transparent text-success-600 hover:text-success-700 active:text-success-800 active:shadow-secondary",
  },
};

export function getButtonVariantClasses(
  variant: ButtonVariant,
  color: ButtonColor,
  disabled: boolean
): string {
  if (disabled) {
    return DISABLED_CLASSES;
  }

  return VARIANT_COLOR_CLASSES[variant][color];
}

export const BUTTON_BASE_CLASSES =
  "btn inline-flex cursor-pointer items-center justify-center rounded-8 font-semibold transition-colors duration-150 ease-in-out focus:outline-none";
