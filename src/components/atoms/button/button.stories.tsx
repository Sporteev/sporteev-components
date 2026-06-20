import type { Meta, StoryObj } from "@storybook/react";
import { QuestionCircle } from "@solar-icons/react-perf/Linear";
import { Button } from ".";
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from "./types";

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
      options: BUTTON_VARIANTS,
      description: "Visual style",
    },
    color: {
      control: "select",
      options: BUTTON_COLORS,
      description: "Token palette (600 / 700 / 800)",
    },
    size: {
      control: "select",
      options: BUTTON_SIZES,
      description: "Button size",
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button Text",
    variant: "primary",
    color: "primary",
    size: "m",
  },
};

export const WithIcons: Story = {
  args: {
    children: "Button Text",
    variant: "primary",
    color: "primary",
    size: "m",
    startIcon: <QuestionCircle className="size-full" />,
    endIcon: <QuestionCircle className="size-full" />,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-12">
      {BUTTON_SIZES.map((size) => (
        <Button key={size} size={size} variant="primary" color="primary">
          Size {size.toUpperCase()}
        </Button>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-12">
      {BUTTON_VARIANTS.map((variant) => (
        <Button key={variant} variant={variant} color="primary" size="m">
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const ColorPalettes: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      {BUTTON_COLORS.map((color) => (
        <div key={color} className="flex flex-wrap items-center gap-12">
          {BUTTON_VARIANTS.map((variant) => (
            <Button
              key={`${color}-${variant}`}
              variant={variant}
              color={color}
              size="m"
            >
              {color} / {variant}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12">
      {BUTTON_VARIANTS.map((variant) => (
        <Button
          key={variant}
          variant={variant}
          color="primary"
          size="m"
          disabled
        >
          {variant}
        </Button>
      ))}
    </div>
  ),
};
