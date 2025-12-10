import { Text } from "@/components/atoms";
import { Button } from "@/components/atoms/button";
import { MinusIcon, PlusIcon } from "lucide-react";

export type ScoreIncreaseDecreaseProps = {
  score: number;
  onIncrease: () => void;
  onDecrease: () => void;
  variant?: "small" | "medium" | "large";
  disabled?: boolean;
  editable?: boolean;
  min?: number;
  max?: number;
};

const variantStyles = {
  small: {
    button: "!h-5 !w-5 sm:!h-6 sm:!w-6",
    score: "h-7 w-8 sm:h-8 sm:w-9",
    icon: "h-3 w-3 sm:h-4 sm:w-4",
    text: "bold-small-text" as const,
  },
  medium: {
    button: "!h-6 !w-6 sm:!h-8 sm:!w-8",
    score: "h-9 w-10 sm:h-11 sm:w-12",
    icon: "h-3.5 w-3.5 sm:h-4 sm:w-4",
    text: "bold-medium-text" as const,
  },
  large: {
    button: "!h-8 !w-8 sm:!h-10 sm:!w-10",
    score: "h-12 w-14 sm:h-14 sm:w-16",
    icon: "h-4 w-4 sm:h-5 sm:w-5",
    text: "bold-large-text" as const,
  },
};

export const ScoreIncreaseDecrease = ({
  score,
  onIncrease,
  onDecrease,
  variant = "medium",
  disabled = false,
  editable = true,
  min,
  max,
}: ScoreIncreaseDecreaseProps) => {
  const styles = variantStyles[variant];

  const isDecreaseDisabled = disabled || (min !== undefined && score <= min);
  const isIncreaseDisabled = disabled || (max !== undefined && score >= max);

  return (
    <div className="flex w-full items-center justify-center gap-1 sm:gap-2">
      {editable && (
        <Button
          variant="outline"
          size="small"
          className={`${styles.button} rounded-md !border p-0`}
          onClick={onDecrease}
          disabled={isDecreaseDisabled}
        >
          <MinusIcon className={styles.icon} />
        </Button>
      )}
      <Text
        variant={styles.text}
        className={`flex ${styles.score} items-center justify-center rounded-md border border-neutral-40`}
      >
        {score}
      </Text>
      {editable && (
        <Button
          variant="primary"
          size="small"
          className={`${styles.button} rounded-md p-0`}
          onClick={onIncrease}
          disabled={isIncreaseDisabled}
        >
          <PlusIcon className={styles.icon} />
        </Button>
      )}
    </div>
  );
};
