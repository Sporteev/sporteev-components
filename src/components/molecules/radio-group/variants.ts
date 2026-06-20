import { cn } from "@/lib/utils";
import { getFieldControlClasses } from "../input-text/field-styles";
import type { FieldSize } from "../input-text/types";
import { RADIO_BLOCK_OPTION_SIZE_CLASSES } from "./sizes";

export function getBlockOptionWrapperClasses(
  hasError: boolean,
  disabled: boolean,
  size: FieldSize,
  isSelected: boolean
): string {
  return cn(
    "transition-colors duration-200",
    getFieldControlClasses(hasError && !isSelected, disabled, false),
    RADIO_BLOCK_OPTION_SIZE_CLASSES[size],
    isSelected &&
      !disabled &&
      "border-primary-600 bg-primary-200 shadow-[0_0_0_2px_rgba(0,100,147,0.2)]"
  );
}
