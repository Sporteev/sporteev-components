import { cn } from "@/lib/utils";

export function getFieldControlClasses(
  hasError: boolean,
  disabled: boolean,
  readOnly: boolean
): string {
  return cn(
    "w-full border bg-white text-grey-900 transition-colors duration-200 placeholder:text-grey-500",
    "focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_2px_rgba(0,100,147,0.2)]",
    {
      "border-grey-400": !hasError && !disabled,
      "border-destructive-600": hasError && !disabled,
      "border-grey-400 bg-grey-300 text-grey-600 pointer-events-none cursor-not-allowed":
        disabled,
      "bg-grey-200": readOnly && !disabled,
    }
  );
}
