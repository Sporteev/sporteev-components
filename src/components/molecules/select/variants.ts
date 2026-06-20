import { cn } from "@/lib/utils";
import { getFieldControlClasses } from "../input-text/field-styles";
import type { FieldSize } from "../input-text/types";
import { SELECT_TRIGGER_SIZE_CLASSES } from "./sizes";

export function getSelectTriggerClasses(
  hasError: boolean,
  disabled: boolean,
  size: FieldSize,
  isOpen: boolean
): string {
  return cn(
    "box-border flex w-full min-w-0 items-center justify-between",
    getFieldControlClasses(hasError, disabled, false),
    SELECT_TRIGGER_SIZE_CLASSES[size],
    isOpen &&
      !disabled &&
      "border-primary-600 shadow-[0_0_0_2px_rgba(0,100,147,0.2)]"
  );
}
