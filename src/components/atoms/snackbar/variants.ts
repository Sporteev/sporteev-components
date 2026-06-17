import type { ToastVariant } from "./types";

export const TOAST_CONTAINER_CLASSES: Record<ToastVariant, string> = {
  success: "bg-success-100",
  destructive: "bg-destructive-100",
  warning: "bg-warning-100",
  info: "bg-primary-100",
  promises: "bg-primary-100",
};

export const TOAST_TITLE_CLASSES: Record<ToastVariant, string> = {
  success: "text-success-600",
  destructive: "text-destructive-600",
  warning: "text-warning-600",
  info: "text-primary-600",
  promises: "text-grey-900",
};

export function getToastContainerClasses(variant: ToastVariant): string {
  return TOAST_CONTAINER_CLASSES[variant];
}

export function getToastTitleClasses(variant: ToastVariant): string {
  return TOAST_TITLE_CLASSES[variant];
}
