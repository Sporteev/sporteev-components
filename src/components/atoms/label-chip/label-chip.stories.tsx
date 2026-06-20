import type { Meta, StoryObj } from "@storybook/react";
import { LabelChip } from ".";
import { CheckCircle } from "@solar-icons/react-perf/Linear";
import { CHIP_COLORS, LABEL_CHIP_SIZES } from "./types";

const meta: Meta<typeof LabelChip> = {
  title: "Atoms/LabelChip",
  component: LabelChip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: CHIP_COLORS,
      description: "Chip color palette",
      defaultValue: "primary",
    },
    text: {
      control: "text",
      description: "Label text",
      defaultValue: "Label",
    },
    size: {
      control: "select",
      options: LABEL_CHIP_SIZES,
      description: "Chip size",
      defaultValue: "m",
    },
    icon: {
      description: "Optional icon",
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof LabelChip>;

export const Primary: Story = {
  args: {
    text: "Primary Label",
    color: "primary",
    size: "m",
    icon: <CheckCircle size={16} />,
  },
};
