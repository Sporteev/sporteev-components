import React, { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle, Info, AlertTriangle } from "lucide-react";

const infoBoxVariants = cva("flex items-start gap-2 rounded-lg p-4", {
  variants: {
    variant: {
      info: "bg-primary-10",
      warning: "bg-warning-accent",
      danger: "bg-danger-accent",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const iconVariants = cva("h-6 w-6 shrink-0", {
  variants: {
    variant: {
      info: "text-primary-80",
      warning: "text-warning-main",
      danger: "text-danger-main",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const titleVariants = cva("font-bold mb-2 mt-0", {
  variants: {
    variant: {
      info: "text-primary-70",
      warning: "text-warning-main",
      danger: "text-danger-main",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const descriptionVariants = cva("h-full text-sm mt-[2px]", {
  variants: {
    variant: {
      info: "text-primary-70",
      warning: "text-warning-main",
      danger: "text-danger-main",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

interface InfoBoxProps extends VariantProps<typeof infoBoxVariants> {
  title?: string;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
}

const InfoBox = ({
  variant = "info",
  title,
  children,
  className,
  icon,
}: InfoBoxProps) => {
  const defaultIcon = {
    info: <Info className={cn(iconVariants({ variant }))} />,
    warning: <AlertTriangle className={cn(iconVariants({ variant }))} />,
    danger: <AlertCircle className={cn(iconVariants({ variant }))} />,
  };

  return (
    <div className={cn(infoBoxVariants({ variant }), className)}>
      <div>{icon || defaultIcon[variant]}</div>
      <div>
        {title && <h3 className={cn(titleVariants({ variant }))}>{title}</h3>}
        {children && (
          <div className={cn(descriptionVariants({ variant }))}>{children}</div>
        )}
      </div>
    </div>
  );
};

export { InfoBox };
export type { InfoBoxProps };
