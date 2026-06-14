import type { Meta, StoryObj } from "@storybook/react";
import { Text, TEXT_PRESETS } from "./index";

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
        ...TEXT_PRESETS,
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
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
    <div className="space-y-16">
      <Text variant="h1">Header 1 — 48px desktop</Text>
      <Text variant="h2">Header 2 — 40px</Text>
      <Text variant="h3">Header 3 — 32px</Text>
      <Text variant="h4">Header 4 — 24px</Text>
      <Text variant="h5">Header 5 — 20px</Text>
      <Text variant="h6">Header 6 — 16px</Text>
    </div>
  ),
};

export const BodyAndCaptions: Story = {
  render: () => (
    <div className="space-y-16">
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
    <div className="space-y-16">
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
    <div className="space-y-16">
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
    <div className="max-w-xl space-y-16">
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
    <div className="space-y-16">
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

export const Presets: Story = {
  render: () => (
    <div className="max-w-xl space-y-16">
      <Text variant="pageTitle" as="h1" color="primary">
        pageTitle — H1 mobile/desktop
      </Text>
      <Text variant="sectionTitle" as="h2">
        sectionTitle — H2
      </Text>
      <Text variant="subsectionTitle" as="h3">
        subsectionTitle — H3
      </Text>
      <Text variant="cardTitle" as="h4">
        cardTitle — H4
      </Text>
      <Text variant="label" as="h5">
        label — H5
      </Text>
      <Text variant="overline" as="h6">
        overline — H6
      </Text>
      <Text variant="body">body — Body 1</Text>
      <Text variant="bodySmall">bodySmall — Body 2</Text>
      <Text variant="caption">caption — Body 3</Text>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-4xl space-y-32">
      <div>
        <Text variant="h1" color="primary">
          Typography 2.0
        </Text>
        <Text variant="body-1" color="neutral">
          Desktop token sizes from new-theme.mdx; use responsive variant props
          for mobile.
        </Text>
      </div>

      <div className="bg-grey-200 rounded-8 p-16">
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
