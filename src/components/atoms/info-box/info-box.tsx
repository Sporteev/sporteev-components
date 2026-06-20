import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  DangerCircle,
  DangerTriangle,
  InfoCircle,
} from "@solar-icons/react-perf/Linear";
import type { InfoBoxProps, InfoBoxVariant } from "./types";
import {
  INFO_BOX_BACKGROUND_CLASSES,
  INFO_BOX_BASE_CLASSES,
  INFO_BOX_DESCRIPTION_CLASSES,
  INFO_BOX_ICON_BASE_CLASSES,
  INFO_BOX_ICON_CLASSES,
  INFO_BOX_TITLE_CLASSES,
} from "./variants";

const InfoBox = ({
  variant = "info",
  title,
  children,
  className,
  icon,
}: InfoBoxProps) => {
  const defaultIcon: Record<InfoBoxVariant, ReactNode> = {
    info: (
      <InfoCircle
        className={cn(
          INFO_BOX_ICON_BASE_CLASSES,
          INFO_BOX_ICON_CLASSES.info
        )}
      />
    ),
    warning: (
      <DangerTriangle
        className={cn(
          INFO_BOX_ICON_BASE_CLASSES,
          INFO_BOX_ICON_CLASSES.warning
        )}
      />
    ),
    destructive: (
      <DangerCircle
        className={cn(
          INFO_BOX_ICON_BASE_CLASSES,
          INFO_BOX_ICON_CLASSES.destructive
        )}
      />
    ),
  };

  return (
    <div
      className={cn(
        INFO_BOX_BASE_CLASSES,
        INFO_BOX_BACKGROUND_CLASSES[variant],
        className
      )}
    >
      <div>{icon || defaultIcon[variant]}</div>
      <div>
        {title && (
          <h3 className={INFO_BOX_TITLE_CLASSES[variant]}>{title}</h3>
        )}
        {children && (
          <div className={INFO_BOX_DESCRIPTION_CLASSES[variant]}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export { InfoBox };
