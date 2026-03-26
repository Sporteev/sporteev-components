import type { Meta, StoryObj } from "@storybook/react";
import { ScoreIncreaseDecrease } from "./index";
import { useState } from "react";

const meta: Meta<typeof ScoreIncreaseDecrease> = {
  title: "Molecules/ScoreIncreaseDecrease",
  component: ScoreIncreaseDecrease,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "The size variant of the component",
      defaultValue: "medium",
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
    variant: "medium",
    onIncrease: () => {},
    onDecrease: () => {},
  },
};

export const Small: Story = {
  args: {
    score: 3,
    variant: "small",
    onIncrease: () => {},
    onDecrease: () => {},
  },
};

export const Medium: Story = {
  args: {
    score: 7,
    variant: "medium",
    onIncrease: () => {},
    onDecrease: () => {},
  },
};

export const Large: Story = {
  args: {
    score: 10,
    variant: "large",
    onIncrease: () => {},
    onDecrease: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Small</span>
        <ScoreIncreaseDecrease
          score={5}
          variant="small"
          onIncrease={() => {}}
          onDecrease={() => {}}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Medium</span>
        <ScoreIncreaseDecrease
          score={5}
          variant="medium"
          onIncrease={() => {}}
          onDecrease={() => {}}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Large</span>
        <ScoreIncreaseDecrease
          score={5}
          variant="large"
          onIncrease={() => {}}
          onDecrease={() => {}}
        />
      </div>
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
        <div className="flex flex-col items-center gap-4">
          <ScoreIncreaseDecrease
            score={score}
            variant="medium"
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
        <div className="flex flex-col items-center gap-4">
          <ScoreIncreaseDecrease
            score={score}
            variant="medium"
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
