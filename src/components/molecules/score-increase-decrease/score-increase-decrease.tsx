import { useEffect, useState } from "react";
import { IconButton } from "@/components/atoms/button";
import { FieldShell } from "@/components/molecules/input-text/field-shell";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "@/components/icons/custom";
import type { ScoreIncreaseDecreaseProps } from "./types";
import { SCORE_BUTTON_SIZE_MAP, SCORE_ROW_GAP_CLASSES } from "./sizes";
import { getScoreBoxClasses } from "./variants";

export const ScoreIncreaseDecrease = ({
  score,
  onIncrease,
  onDecrease,
  onScoreChange,
  label,
  required = false,
  helperText,
  errorMessage,
  size = "m",
  disabled = false,
  destructive = false,
  inFocus = false,
  editable = true,
  scoreInputEditable = false,
  min,
  max,
  className,
}: ScoreIncreaseDecreaseProps) => {
  const [inputScore, setInputScore] = useState(score.toString());
  const hasError = Boolean(errorMessage) || destructive;

  const isDecreaseDisabled = disabled || (min !== undefined && score <= min);
  const isIncreaseDisabled = disabled || (max !== undefined && score >= max);

  useEffect(() => {
    setInputScore(score.toString());
  }, [score]);

  const scoreBoxClassName = getScoreBoxClasses(
    hasError,
    disabled,
    inFocus,
    size
  );

  const buttonColor = destructive ? "destructive" : "primary";
  const buttonSize = SCORE_BUTTON_SIZE_MAP[size];

  return (
    <FieldShell
      size={size}
      label={label}
      required={required}
      helperText={helperText}
      errorMessage={errorMessage}
      fullWidth={false}
      containerClassName={className}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          SCORE_ROW_GAP_CLASSES[size]
        )}
      >
        {editable ? (
          <IconButton
            type="button"
            variant={disabled ? "ghost" : "outline"}
            color={buttonColor}
            size={buttonSize}
            onClick={onDecrease}
            disabled={isDecreaseDisabled}
            icon={<MinusIcon className="size-full" />}
            aria-label="Decrease score"
          />
        ) : null}

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
              scoreBoxClassName,
              "[appearance:textfield] bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            )}
            disabled={disabled}
            aria-invalid={hasError || undefined}
          />
        ) : (
          <span className={scoreBoxClassName} aria-live="polite">
            {score}
          </span>
        )}

        {editable ? (
          <IconButton
            type="button"
            variant="primary"
            color={buttonColor}
            size={buttonSize}
            onClick={onIncrease}
            disabled={isIncreaseDisabled}
            icon={<PlusIcon className="size-full" />}
            aria-label="Increase score"
          />
        ) : null}
      </div>
    </FieldShell>
  );
};
