import type { Meta, StoryObj } from "@storybook/react";
import { LabelChip } from ".";
import { CheckCircle } from "lucide-react";

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
      options: [
        "primary",
        "tertiary",
        "success",
        "warning",
        "danger",
        "gray",
        "dark",
      ],
      description: "The visual style of the button",
      defaultValue: "primary",
    },
    text: {
      control: "text",
      description: "The content inside the button",
      defaultValue: "Click here",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of the cnip",
      defaultValue: "medium",
    },
    icon: {
      description: "The icon to display inside the label",
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
    size: "medium",
    icon: <CheckCircle size={"1rem"} />,
  },
};
