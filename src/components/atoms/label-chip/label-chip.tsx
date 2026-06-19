import { cva } from "class-variance-authority";
import type { LabelChipProps } from "./types";

const labelVariants = cva(
  "flex items-center gap-4 rounded-8 font-medium w-fit",
  {
    variants: {
      color: {
        primary: "bg-primary-200 text-primary-600",
        tertiary: "bg-tertiary-300 text-tertiary-700",
        success: "bg-success-accent text-success-main",
        warning: "bg-warning-accent text-warning-main",
        danger: "bg-danger-accent text-danger-main",
        gray: "bg-grey-400 text-grey-800",
        dark: "bg-grey-700 text-grey-300",
      },
      size: {
        small: "h-24 px-8 text-xs",
        medium: "h-32 px-12 text-sm",
        large: "h-40 px-12 text-md",
      },
    },
  }
);

const LabelChip = ({
  text,
  icon,
  color = "primary",
  size = "medium",
}: LabelChipProps) => {
  return (
    <div className={labelVariants({ color, size })}>
      {icon}
      {text}
    </div>
  );
};

export { LabelChip };
