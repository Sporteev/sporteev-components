import type { Meta, StoryObj } from "@storybook/react";
import { CircleHelp } from "lucide-react";
import { IconButton } from "./icon-button";
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from "./types";

const meta = {
  title: "Atoms/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: BUTTON_VARIANTS,
    },
    color: {
      control: "select",
      options: BUTTON_COLORS,
    },
    size: {
      control: "select",
      options: BUTTON_SIZES,
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const HelpIcon = () => <CircleHelp className="size-full" />;

export const Default: Story = {
  args: {
    variant: "primary",
    color: "primary",
    size: "m",
    icon: <HelpIcon />,
    "aria-label": "Help",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-12">
      {BUTTON_SIZES.map((size) => (
        <IconButton
          key={size}
          size={size}
          variant="primary"
          color="primary"
          icon={<HelpIcon />}
          aria-label={`Help size ${size}`}
        />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-12">
      {BUTTON_VARIANTS.map((variant) => (
        <IconButton
          key={variant}
          variant={variant}
          color="primary"
          size="m"
          icon={<HelpIcon />}
          aria-label={variant}
        />
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
            <IconButton
              key={`${color}-${variant}`}
              variant={variant}
              color={color}
              size="m"
              icon={<HelpIcon />}
              aria-label={`${color} ${variant}`}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-12">
      {BUTTON_VARIANTS.map((variant) => (
        <IconButton
          key={variant}
          variant={variant}
          color="primary"
          size="m"
          icon={<HelpIcon />}
          aria-label={variant}
          disabled
        />
      ))}
    </div>
  ),
};
