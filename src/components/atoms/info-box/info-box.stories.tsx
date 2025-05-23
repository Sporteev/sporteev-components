import type { Meta, StoryObj } from "@storybook/react";
import { Bell } from "lucide-react";
import { InfoBox } from ".";

const meta = {
  title: "Atoms/InfoBox",
  component: InfoBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "warning", "danger"],
      description: "The visual style of the alert box",
      defaultValue: "info",
    },
    title: {
      control: "text",
      description: "The title of the alert",
    },
    children: {
      control: "text",
      description: "The content of the alert",
    },
    className: {
      control: "text",
      description: "Additional classes to apply",
    },
  },
} satisfies Meta<typeof InfoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    children:
      "This is an informational message that provides helpful context or details about a process or feature.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children:
      "This action might have consequences. Please review the details before proceeding.",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    title: "Error",
    children:
      "This action cannot be undone. Please make sure you want to proceed with this operation.",
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: "info",
    children: "A simple alert message without a title.",
  },
};

export const CustomIcon: Story = {
  args: {
    variant: "info",
    title: "Custom Icon",
    icon: <Bell className="h-5 w-5 shrink-0 text-primary-80" />,
    children: "This alert uses a custom icon instead of the default one.",
  },
};
