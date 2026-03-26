import { useEffect, useState } from "react";
import { Text } from "@/components/atoms";
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";

export type ScoreIncreaseDecreaseProps = {
  score: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onScoreChange?: (score: number) => void;
  variant?: "small" | "medium" | "large";
  disabled?: boolean;
  danger?: boolean;
  inFocus?: boolean;
  editable?: boolean;
  scoreInputEditable?: boolean;
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
  danger = false,
  inFocus = false,
  editable = true,
  scoreInputEditable = false,
  onScoreChange,
  min,
  max,
}: ScoreIncreaseDecreaseProps) => {
  const styles = variantStyles[variant];
  const [inputScore, setInputScore] = useState(score.toString());

  const isDecreaseDisabled = disabled || (min !== undefined && score <= min);
  const isIncreaseDisabled = disabled || (max !== undefined && score >= max);

  useEffect(() => {
    setInputScore(score.toString());
  }, [score]);

  // Score box styling based on disabled, inFocus, and danger states
  const getScoreBoxClassName = () => {
    const baseClasses = `flex ${styles.score} items-center justify-center rounded-md border`;

    if (disabled) {
      return `${baseClasses} border-neutral-40 bg-neutral-30 text-neutral-50`;
    }

    if (inFocus) {
      return `${baseClasses} border-primary-30 bg-primary-20`;
    }

    if (danger) {
      return `${baseClasses} border-danger-main bg-danger-accent`;
    }

    return `${baseClasses} border-neutral-40`;
  };

  return (
    <div className="flex w-full items-center justify-center gap-1 sm:gap-2">
      {editable && (
        <Button
          variant={disabled ? "ghost" : "outline"}
          size="small"
          className={cn(
            `${styles.button} rounded-md p-0`,
            disabled ? "bg-neutral-30 text-neutral-50" : "!border"
          )}
          onClick={onDecrease}
          disabled={isDecreaseDisabled}
          danger={danger}
        >
          <MinusIcon className={styles.icon} />
        </Button>
      )}
      {scoreInputEditable ? (
        <input
          type="number"
          value={inputScore}
          onChange={(event) => {
            const nextValue = event.target.value;
            setInputScore(nextValue);

            const parsedValue = Number(nextValue);
            if (!Number.isNaN(parsedValue)) {
              onScoreChange?.(parsedValue);
            }
          }}
          className={cn(
            getScoreBoxClassName(),
            "bg-transparent text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          )}
          disabled={disabled}
        />
      ) : (
        <Text variant={styles.text} className={getScoreBoxClassName()}>
          {score}
        </Text>
      )}
      {editable && (
        <Button
          variant="primary"
          size="small"
          className={`${styles.button} rounded-md p-0`}
          onClick={onIncrease}
          disabled={isIncreaseDisabled}
          danger={danger}
        >
          <PlusIcon className={styles.icon} />
        </Button>
      )}
    </div>
  );
};
