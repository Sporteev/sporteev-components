import { cn } from "@/lib/utils";
import { LABEL_CHIP_BASE_CLASSES, LABEL_CHIP_SIZE_CLASSES } from "./sizes";
import type { LabelChipProps } from "./types";
import { LABEL_CHIP_COLOR_CLASSES } from "./variants";

const LabelChip = ({
  text,
  icon,
  color = "primary",
  size = "m",
}: LabelChipProps) => {
  return (
    <div
      className={cn(
        LABEL_CHIP_BASE_CLASSES,
        LABEL_CHIP_SIZE_CLASSES[size],
        LABEL_CHIP_COLOR_CLASSES[color]
      )}
    >
      {icon}
      {text}
    </div>
  );
};

export { LabelChip };
