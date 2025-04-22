import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode } from "react";

const labelVariants = cva(
  "flex items-center gap-2 rounded-lg font-medium w-fit",
  {
    variants: {
      color: {
        primary: "bg-primary-20 text-primary-80",
        tertiary: "bg-tertiary-30 text-tertiary-70",
        success: "bg-success-accent text-success-primary",
        warning: "bg-warning-accent text-warning-primary",
        danger: "bg-danger-accent text-danger-primary",
        gray: "bg-neutral-40 text-neutral-80",
        dark: "bg-neutral-70 text-neutral-30",
      },
      size: {
        small: "py-1 px-2 text-sm",
        medium: "py-2 px-3 text-sm",
        large: "py-2 px-3 text-md",
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
