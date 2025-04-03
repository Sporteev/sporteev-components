import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost"],
      description: "The visual style of the button",
      defaultValue: "primary",
    },
    danger: {
      control: "boolean",
      description: "Visual style for danger state",
      defaultValue: false,
    },
    size: {
      control: "select",
      options: ["large", "medium", "small"],
      description: "The size of the button",
      defaultValue: "medium",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
      defaultValue: false,
    },
    children: {
      control: "text",
      description: "The content inside the button",
      defaultValue: "Click here",
    },
    className: {
      control: "text",
      description: "Additional tailwind style to apply",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click here",
    variant: "primary",
    size: "medium",
  },
};
