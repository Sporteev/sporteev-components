import type { Meta, StoryObj } from "@storybook/react";
import { ScoreIncreaseDecrease } from "./index";
import { useState } from "react";
import { SCORE_INCREASE_DECREASE_SIZES } from "./types";

const meta: Meta<typeof ScoreIncreaseDecrease> = {
  title: "Molecules/ScoreIncreaseDecrease",
  component: ScoreIncreaseDecrease,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: SCORE_INCREASE_DECREASE_SIZES,
      description: "Component size",
      defaultValue: "m",
    },
    score: {
      control: { type: "number" },
      description: "The current score value",
      defaultValue: 0,
    },
    onIncrease: {
      action: "increased",
      description: "Callback function when increase button is clicked",
    },
    onDecrease: {
      action: "decreased",
      description: "Callback function when decrease button is clicked",
    },
    scoreInputEditable: {
      control: { type: "boolean" },
      description: "Render score as editable input",
      defaultValue: false,
    },
    onScoreChange: {
      action: "score changed",
      description: "Callback when score input changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScoreIncreaseDecrease>;

export const Default: Story = {
  args: {
    score: 0,
    size: "m",
    onIncrease: () => {},
    onDecrease: () => {},
  },
};

export const Small: Story = {
  args: {
    score: 3,
    size: "s",
    onIncrease: () => {},
    onDecrease: () => {},
  },
};

export const Medium: Story = {
  args: {
    score: 7,
    size: "m",
    onIncrease: () => {},
    onDecrease: () => {},
  },
};

export const Large: Story = {
  args: {
    score: 10,
    size: "l",
    onIncrease: () => {},
    onDecrease: () => {},
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-32">
      {SCORE_INCREASE_DECREASE_SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-8">
          <span className="text-sm font-medium text-gray-600">
            {size.toUpperCase()}
          </span>
          <ScoreIncreaseDecrease
            score={5}
            size={size}
            onIncrease={() => {}}
            onDecrease={() => {}}
          />
        </div>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const ControlledScore = () => {
      const [score, setScore] = useState(0);

      const handleIncrease = () => {
        setScore((prev) => prev + 1);
      };

      const handleDecrease = () => {
        setScore((prev) => Math.max(0, prev - 1));
      };

      return (
        <div className="flex flex-col items-center gap-16">
          <ScoreIncreaseDecrease
            score={score}
            size="m"
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
          <div className="text-sm text-gray-600">
            Current score: <strong className="text-gray-900">{score}</strong>
          </div>
        </div>
      );
    };

    return <ControlledScore />;
  },
};

export const EditableScoreInput: Story = {
  render: () => {
    const EditableScore = () => {
      const [score, setScore] = useState(2);

      return (
        <div className="flex flex-col items-center gap-16">
          <ScoreIncreaseDecrease
            score={score}
            size="m"
            editable={false}
            scoreInputEditable
            onIncrease={() => {}}
            onDecrease={() => {}}
            onScoreChange={(nextScore) => setScore(nextScore)}
          />
          <div className="text-sm text-gray-600">
            Typed score: <strong className="text-gray-900">{score}</strong>
          </div>
        </div>
      );
    };

    return <EditableScore />;
  },
};
