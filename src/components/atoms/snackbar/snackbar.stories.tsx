import type { Meta, StoryObj } from "@storybook/react";
import { Snackbar } from ".";

const meta: Meta<typeof Snackbar> = {
  title: "Atoms/Snackbar",
  component: Snackbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 200,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "2rem",
          position: "relative",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "relative",
            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "tertiary",
        "success",
        "warning",
        "danger",
        "gray",
        "dark",
        "light",
      ],
      description: "The visual style of the snackbar",
    },
    title: {
      control: "text",
      description: "The main message of the snackbar",
      defaultValue: "Snackbar Title",
    },
    body: {
      control: "text",
      description: "Additional details or description",
      defaultValue: "This is the body of the snackbar",
    },
    duration: {
      control: false,
      description: "Duration in milliseconds before auto-closing",
    },
    action: {
      control: false,
      description: "The action button to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

const textBody =
  "The sun was shining brightly in the clear blue sky. Birds were chirping melodiously as they flitted from tree to tree.";

export const Primary: Story = {
  args: {
    title: "Primary Snackbar",
    body: textBody,
    variant: "primary",
  },
};

export const Tertiary: Story = {
  args: {
    title: "Tertiary Snackbar",
    body: "This is a tertiary snackbar message",
    variant: "tertiary",
  },
};

export const Success: Story = {
  args: {
    title: "Success Message",
    body: "Operation completed successfully",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    title: "Warning Message",
    body: "Please check your input",
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    title: "Error Message",
    body: "Something went wrong",
    variant: "danger",
  },
};

export const Gray: Story = {
  args: {
    title: "Gray Message",
    body: textBody,
    variant: "gray",
  },
};

export const Dark: Story = {
  args: {
    title: "Dark Message",
    body: textBody,
    variant: "dark",
  },
};

export const Light: Story = {
  args: {
    title: "Light Message",
    body: textBody,
    variant: "light",
  },
};
