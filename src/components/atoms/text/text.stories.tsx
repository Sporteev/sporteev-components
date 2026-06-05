import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./index";

const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "h7",
        "h8",
        "body-1",
        "body-2",
        "body-3",
        "caption-1",
        "caption-2",
      ],
    },
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "tertiary",
        "neutral",
        "destructive",
        "danger",
        "success",
        "warning",
      ],
    },
    weight: {
      control: { type: "select" },
      options: ["regular", "semibold", "bold"],
    },
    as: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "This is default body text",
    variant: "body-2",
  },
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="h1">Header 1 — 64px desktop</Text>
      <Text variant="h2">Header 2 — 48px</Text>
      <Text variant="h3">Header 3 — 40px</Text>
      <Text variant="h4">Header 4 — 36px</Text>
      <Text variant="h5">Header 5 — 32px</Text>
      <Text variant="h6">Header 6 — 24px</Text>
      <Text variant="h7">Header 7 — 20px</Text>
      <Text variant="h8">Header 8 — 16px</Text>
    </div>
  ),
};

export const BodyAndCaptions: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="body-1">Body 1 — 16px</Text>
      <Text variant="body-2">Body 2 — 14px</Text>
      <Text variant="body-3">Body 3 — 12px</Text>
      <Text variant="caption-1">Caption 1 — 10px</Text>
      <Text variant="caption-2">Caption 2 — 8px</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="h3" color="primary">
        Primary
      </Text>
      <Text variant="h4" color="secondary">
        Secondary
      </Text>
      <Text variant="body-2" color="tertiary">
        Tertiary
      </Text>
      <Text variant="body-2" color="neutral">
        Neutral (grey scale)
      </Text>
      <Text variant="body-2" color="destructive">
        Destructive
      </Text>
      <Text variant="body-2" color="success">
        Success
      </Text>
      <Text variant="body-2" color="warning">
        Warning
      </Text>
    </div>
  ),
};

export const CustomWeights: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="body-1" weight="regular">
        Regular (400)
      </Text>
      <Text variant="body-1" weight="semibold">
        Semibold (600)
      </Text>
      <Text variant="body-1" weight="bold">
        Bold (700)
      </Text>
    </div>
  ),
};

export const ResponsiveTypography: Story = {
  render: () => (
    <div className="max-w-xl space-y-4">
      <Text variant={{ base: "h3", lg: "h1" }} color="primary">
        Mobile H1 → Desktop H1
      </Text>
      <Text variant={{ base: "body-2", lg: "body-1" }} color="neutral">
        Body scales up at the lg breakpoint using explicit responsive props — no
        *-desktop tokens in the theme.
      </Text>
    </div>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="h1" as="h1">
        Renders as H1
      </Text>
      <Text variant="body-2" as="p">
        Renders as P
      </Text>
      <Text variant="caption-1" as="span">
        Renders as SPAN
      </Text>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-4xl space-y-8">
      <div>
        <Text variant="h1" color="primary">
          Typography 2.0
        </Text>
        <Text variant="body-1" color="neutral">
          Desktop token sizes from new-theme.mdx; use responsive variant props
          for mobile.
        </Text>
      </div>

      <div className="bg-grey-200 rounded-lg p-4">
        <Text variant={{ base: "h5", lg: "h3" }} color="secondary">
          Example preset pattern
        </Text>
        <Text variant={{ base: "body-3", lg: "body-1" }} color="neutral">
          base: h5/body-3 on small screens, lg: h3/body-1 at lg+.
        </Text>
      </div>
    </div>
  ),
};
