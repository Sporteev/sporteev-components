import type { ReactNode } from "react";
import type { ButtonColor } from "../button/types";

export type ToastVariant =
  | "success"
  | "destructive"
  | "warning"
  | "info"
  | "promises";

export const TOAST_VARIANTS: ToastVariant[] = [
  "success",
  "destructive",
  "warning",
  "info",
  "promises",
];

export interface ToastProps {
  title: string;
  body?: string;
  variant?: ToastVariant;
  action?: ReactNode;
  duration?: number;
  onClose: () => void;
  icon?: ReactNode;
  showIcon?: boolean;
  showClose?: boolean;
}

/** Maps toast variant to Button `color` for action slots (promises uses custom styling). */
export const TOAST_ACTION_BUTTON_COLOR: Record<
  ToastVariant,
  ButtonColor | undefined
> = {
  success: "success",
  destructive: "destructive",
  warning: "warning",
  info: "primary",
  promises: undefined,
};
