import { cn } from "@/lib/utils";
import { getFieldControlClasses } from "../input-text/field-styles";
import type { FieldSize } from "../input-text/types";
import { SCORE_BOX_SIZE_CLASSES, SCORE_BOX_WIDTH_CLASSES } from "./sizes";

export function getScoreBoxClasses(
  hasError: boolean,
  disabled: boolean,
  inFocus: boolean,
  size: FieldSize
): string {
  return cn(
    "flex shrink-0 items-center justify-center text-center font-semibold tabular-nums",
    getFieldControlClasses(hasError, disabled, false),
    SCORE_BOX_SIZE_CLASSES[size],
    SCORE_BOX_WIDTH_CLASSES[size],
    "px-0",
    hasError && !disabled && "bg-danger-accent",
    inFocus &&
      !disabled &&
      !hasError &&
      "border-primary-600 shadow-[0_0_0_2px_rgba(0,100,147,0.2)]"
  );
}
