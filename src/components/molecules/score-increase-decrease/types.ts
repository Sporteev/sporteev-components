export type ScoreIncreaseDecreaseSize = "small" | "medium" | "large";

export const SCORE_INCREASE_DECREASE_SIZES: ScoreIncreaseDecreaseSize[] = [
  "small",
  "medium",
  "large",
];

export interface ScoreIncreaseDecreaseProps {
  score: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onScoreChange?: (score: number) => void;
  variant?: ScoreIncreaseDecreaseSize;
  disabled?: boolean;
  danger?: boolean;
  inFocus?: boolean;
  editable?: boolean;
  scoreInputEditable?: boolean;
  min?: number;
  max?: number;
}
