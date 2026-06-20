import { cn } from "@/lib/utils";
import type { SelectVariant } from "./types";

const SELECT_BASE_CLASSES =
  "min-w-0 inline-flex items-center justify-between rounded-8 border bg-white px-12 py-8 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";

const SELECT_VARIANT_CLASSES: Record<SelectVariant, string> = {
  default: "border-grey-400 hover:border-grey-6000",
  error:
    "border-danger-main focus:ring-danger-main focus:border-danger-main",
};

export function getSelectTriggerClasses(
  hasError: boolean,
  variant: SelectVariant = "default"
): string {
  return cn(
    SELECT_BASE_CLASSES,
    SELECT_VARIANT_CLASSES[hasError ? "error" : variant]
  );
}
