export type ScoreIncreaseDecreaseSize = "s" | "m" | "l";

export const SCORE_INCREASE_DECREASE_SIZES: ScoreIncreaseDecreaseSize[] = [
  "s",
  "m",
  "l",
];

export interface ScoreIncreaseDecreaseProps {
  score: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onScoreChange?: (score: number) => void;
  size?: ScoreIncreaseDecreaseSize;
  disabled?: boolean;
  destructive?: boolean;
  inFocus?: boolean;
  editable?: boolean;
  scoreInputEditable?: boolean;
  min?: number;
  max?: number;
}
