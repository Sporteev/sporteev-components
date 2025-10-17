import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode } from "react";

// Available chip colors
export const CHIP_COLORS = [
  "primary",
  "tertiary",
  "success",
  "warning",
  "danger",
  "gray",
  "dark",
] as const;

export type ChipColor = (typeof CHIP_COLORS)[number];

const labelVariants = cva(
  "flex items-center gap-1 rounded-lg font-medium w-fit",
  {
    variants: {
      color: {
        primary: "bg-primary-20 text-primary-80",
        tertiary: "bg-tertiary-30 text-tertiary-70",
        success: "bg-success-accent text-success-main",
        warning: "bg-warning-accent text-warning-main",
        danger: "bg-danger-accent text-danger-main",
        gray: "bg-neutral-40 text-neutral-80",
        dark: "bg-neutral-70 text-neutral-30",
      },
      size: {
        small: "h-6 px-2 text-xs",
        medium: "h-8 px-3 text-sm",
        large: "h-10 px-3 text-md",
      },
    },
  }
);

interface LabelChipProps extends VariantProps<typeof labelVariants> {
  text: string;
  icon?: ReactNode;
}

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
