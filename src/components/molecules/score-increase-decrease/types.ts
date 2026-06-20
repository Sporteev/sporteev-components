import type { FieldSize } from "../input-text/types";

export type ScoreIncreaseDecreaseSize = FieldSize;

export { FIELD_SIZES as SCORE_INCREASE_DECREASE_SIZES } from "../input-text/types";

export interface ScoreIncreaseDecreaseProps {
  score: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onScoreChange?: (score: number) => void;
  label?: string;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  size?: ScoreIncreaseDecreaseSize;
  disabled?: boolean;
  destructive?: boolean;
  inFocus?: boolean;
  editable?: boolean;
  scoreInputEditable?: boolean;
  min?: number;
  max?: number;
  className?: string;
}
