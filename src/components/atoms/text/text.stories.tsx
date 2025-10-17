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
        "bold-large-text",
        "regular-large-text",
        "multiline-large-text",
        "bold-medium-text",
        "regular-medium-text",
        "multiline-medium-text",
        "bold-small-text",
        "regular-small-text",
        "multiline-small-text",
      ],
    },
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "neutral",
        "danger",
        "success",
        "warning",
      ],
    },
    weight: {
      control: { type: "select" },
      options: ["normal", "medium", "semibold", "bold"],
    },
    as: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// Basic Text
export const Default: Story = {
  args: {
    children: "This is default text",
    variant: "regular-medium-text",
  },
};

// Headings
export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="h1">Heading 1 - Main Page Title</Text>
      <Text variant="h2">Heading 2 - Section Title</Text>
      <Text variant="h3">Heading 3 - Subsection Title</Text>
      <Text variant="h4">Heading 4 - Card Title</Text>
      <Text variant="h5">Heading 5 - Small Title</Text>
      <Text variant="h6">Heading 6 - Tiny Title</Text>
    </div>
  ),
};

// Large Text Variants
export const LargeText: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="bold-large-text">Bold Large Text - Important content</Text>
      <Text variant="regular-large-text">
        Regular Large Text - Body content
      </Text>
      <Text variant="multiline-large-text">
        Multiline Large Text - This is a longer paragraph that demonstrates how
        multiline text looks with increased line height for better readability.
      </Text>
    </div>
  ),
};

// Medium Text Variants
export const MediumText: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="bold-medium-text">Bold Medium Text - Subheadings</Text>
      <Text variant="regular-medium-text">
        Regular Medium Text - Standard body text
      </Text>
      <Text variant="multiline-medium-text">
        Multiline Medium Text - This paragraph shows how medium text looks with
        increased line height for better readability in longer content.
      </Text>
    </div>
  ),
};

// Small Text Variants
export const SmallText: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="bold-small-text">
        Bold Small Text - Labels and captions
      </Text>
      <Text variant="regular-small-text">
        Regular Small Text - Secondary information
      </Text>
      <Text variant="multiline-small-text">
        Multiline Small Text - This is a longer paragraph in small text that
        demonstrates how multiline small text looks with increased line height.
      </Text>
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="h3" color="primary">
        Primary Color Text
      </Text>
      <Text variant="h4" color="secondary">
        Secondary Color Text
      </Text>
      <Text variant="regular-medium-text" color="neutral">
        Neutral Color Text
      </Text>
      <Text variant="regular-medium-text" color="danger">
        Danger Color Text
      </Text>
      <Text variant="regular-medium-text" color="success">
        Success Color Text
      </Text>
      <Text variant="regular-medium-text" color="warning">
        Warning Color Text
      </Text>
    </div>
  ),
};

// Custom Weights
export const CustomWeights: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="regular-large-text" weight="normal">
        Normal Weight
      </Text>
      <Text variant="regular-large-text" weight="medium">
        Medium Weight
      </Text>
      <Text variant="regular-large-text" weight="semibold">
        Semibold Weight
      </Text>
      <Text variant="regular-large-text" weight="bold">
        Bold Weight
      </Text>
    </div>
  ),
};

// Semantic HTML Elements
export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="h1" as="h1">
        This renders as an H1 element
      </Text>
      <Text variant="regular-medium-text" as="p">
        This renders as a P element
      </Text>
      <Text variant="regular-small-text" as="span">
        This renders as a SPAN element
      </Text>
      <Text variant="regular-medium-text" as="div">
        This renders as a DIV element
      </Text>
    </div>
  ),
};

// Responsive Example
export const ResponsiveExample: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Text variant="h1" color="primary">
          Responsive Typography
        </Text>
        <Text variant="regular-large-text" color="neutral">
          This heading and text will scale from mobile to desktop sizes
          automatically.
        </Text>
      </div>

      <div className="rounded-lg bg-neutral-20 p-4">
        <Text variant="h3" color="secondary">
          Mobile First Design
        </Text>
        <Text variant="multiline-medium-text" color="neutral">
          The typography system is built with mobile-first responsive design.
          Text sizes automatically adjust based on screen size for optimal
          readability.
        </Text>
      </div>
    </div>
  ),
};

// All Variants Overview
export const AllVariants: Story = {
  render: () => (
    <div className="max-w-4xl space-y-8">
      <div>
        <Text variant="h1" color="primary">
          Typography System Overview
        </Text>
        <Text variant="regular-large-text" color="neutral">
          Complete typography scale from the Sporteev design system
        </Text>
      </div>

      <div className="space-y-6">
        <div>
          <Text variant="h2" color="secondary">
            Headings
          </Text>
          <div className="mt-2 space-y-2">
            <Text variant="h1">H1 - 36px/64px</Text>
            <Text variant="h2">H2 - 32px/56px</Text>
            <Text variant="h3">H3 - 28px/48px</Text>
            <Text variant="h4">H4 - 24px/36px</Text>
            <Text variant="h5">H5 - 20px/24px</Text>
            <Text variant="h6">H6 - 18px/20px</Text>
          </div>
        </div>

        <div>
          <Text variant="h2" color="secondary">
            Large Text
          </Text>
          <div className="mt-2 space-y-2">
            <Text variant="bold-large-text">Bold Large - 16px/18px</Text>
            <Text variant="regular-large-text">Regular Large - 16px/18px</Text>
            <Text variant="multiline-large-text">
              Multiline Large - 16px/18px
            </Text>
          </div>
        </div>

        <div>
          <Text variant="h2" color="secondary">
            Medium Text
          </Text>
          <div className="mt-2 space-y-2">
            <Text variant="bold-medium-text">Bold Medium - 14px/16px</Text>
            <Text variant="regular-medium-text">
              Regular Medium - 14px/16px
            </Text>
            <Text variant="multiline-medium-text">
              Multiline Medium - 14px/16px
            </Text>
          </div>
        </div>

        <div>
          <Text variant="h2" color="secondary">
            Small Text
          </Text>
          <div className="mt-2 space-y-2">
            <Text variant="bold-small-text">Bold Small - 12px/14px</Text>
            <Text variant="regular-small-text">Regular Small - 12px/14px</Text>
            <Text variant="multiline-small-text">
              Multiline Small - 12px/14px
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
};
