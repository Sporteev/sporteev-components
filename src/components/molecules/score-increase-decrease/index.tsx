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
    button: "!h-20 !w-20 sm:!h-24 sm:!w-24",
    score: "h-28 w-32 sm:h-32 sm:w-36",
    icon: "h-12 w-12 sm:h-16 sm:w-16",
    text: "body-3" as const,
  },
  medium: {
    button: "!h-24 !w-24 sm:!h-32 sm:!w-32",
    score: "h-36 w-40 sm:h-44 sm:w-48",
    icon: "h-14 w-14 sm:h-16 sm:w-16",
    text: "body-2" as const,
  },
  large: {
    button: "!h-32 !w-32 sm:!h-40 sm:!w-40",
    score: "h-48 w-56 sm:h-56 sm:w-64",
    icon: "h-16 w-16 sm:h-20 sm:w-20",
    text: "body-1" as const,
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
    const baseClasses = `flex ${styles.score} items-center justify-center rounded-6 border`;

    if (disabled) {
      return `${baseClasses} border-grey-400 bg-grey-300 text-grey-500`;
    }

    if (inFocus) {
      return `${baseClasses} border-primary-300 bg-primary-200`;
    }

    if (danger) {
      return `${baseClasses} border-danger-main bg-danger-accent`;
    }

    return `${baseClasses} border-grey-400`;
  };

  return (
    <div className="flex w-full items-center justify-center gap-4 sm:gap-8">
      {editable && (
        <Button
          type="button"
          variant={disabled ? "ghost" : "outline"}
          size="s"
          color={danger ? "destructive" : "primary"}
          className={cn(
            `${styles.button} rounded-6 p-0`,
            disabled ? "bg-grey-300 text-grey-500" : "!border"
          )}
          onClick={onDecrease}
          disabled={isDecreaseDisabled}
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
            "[appearance:textfield] bg-transparent text-center outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          )}
          disabled={disabled}
        />
      ) : (
        <Text
          variant={styles.text}
          weight="semibold"
          className={getScoreBoxClassName()}
        >
          {score}
        </Text>
      )}
      {editable && (
        <Button
          type="button"
          variant="primary"
          size="s"
          color={danger ? "destructive" : "primary"}
          className={`${styles.button} rounded-6 p-0`}
          onClick={onIncrease}
          disabled={isIncreaseDisabled}
        >
          <PlusIcon className={styles.icon} />
        </Button>
      )}
    </div>
  );
};
