import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./index";
import { useState } from "react";

const meta: Meta<typeof RadioGroup> = {
  title: "Molecules/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: { type: "select" },
      options: ["column", "row"],
    },
    variant: {
      control: { type: "select" },
      options: ["simple", "block"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const sampleOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

export const Default: Story = {
  args: {
    label: "Select an option",
    options: sampleOptions,
    value: "option1",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Select your preference",
    options: [
      {
        label: "Option A",
        value: "a",
        helperText: "This is option A description",
      },
      {
        label: "Option B",
        value: "b",
        helperText: "This is option B description",
      },
      {
        label: "Option C",
        value: "c",
        helperText: "This is option C description",
      },
    ],
    value: "a",
  },
};

export const Required: Story = {
  args: {
    label: "Required Selection",
    options: sampleOptions,
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Selection with Error",
    options: sampleOptions,
    errorMessage: "Please select an option",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Radio Group",
    options: sampleOptions,
    value: "option1",
    disabled: true,
  },
};

export const RowLayout: Story = {
  args: {
    label: "Row Layout",
    options: sampleOptions,
    value: "option2",
    layout: "row",
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: "With Disabled Option",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2", disabled: true },
      { label: "Option 3", value: "option3" },
    ],
    value: "option1",
  },
};

export const ControlledExample: Story = {
  render: () => {
    const ControlledRadioGroup = () => {
      const [selectedValue, setSelectedValue] = useState("option1");

      return (
        <div className="space-y-4">
          <RadioGroup
            label="Controlled Radio Group"
            options={sampleOptions}
            value={selectedValue}
            onChange={setSelectedValue}
          />
          <div className="text-sm text-gray-600">
            Current value: <strong>{selectedValue}</strong>
          </div>
        </div>
      );
    };

    return <ControlledRadioGroup />;
  },
};

export const MultipleGroups: Story = {
  render: () => {
    const MultipleGroupsExample = () => {
      const [group1Value, setGroup1Value] = useState("option1");
      const [group2Value, setGroup2Value] = useState("option2");

      return (
        <div className="space-y-6">
          <RadioGroup
            label="First Group"
            options={sampleOptions}
            value={group1Value}
            onChange={setGroup1Value}
          />

          <RadioGroup
            label="Second Group"
            options={[
              { label: "Choice A", value: "choiceA" },
              { label: "Choice B", value: "choiceB" },
              { label: "Choice C", value: "choiceC" },
            ]}
            value={group2Value}
            onChange={setGroup2Value}
            layout="row"
          />
        </div>
      );
    };

    return <MultipleGroupsExample />;
  },
};

export const BlockVariant: Story = {
  args: {
    label: "Block Style Radio Group",
    options: sampleOptions,
    value: "option2",
    variant: "block",
  },
};

export const BlockVariantWithError: Story = {
  args: {
    label: "Block Style with Error",
    options: sampleOptions,
    errorMessage: "Please select an option",
    variant: "block",
  },
};

export const BlockVariantRow: Story = {
  args: {
    label: "Block Style Row Layout",
    options: sampleOptions,
    value: "option1",
    variant: "block",
    layout: "row",
  },
};

export const SimpleVariantRow: Story = {
  args: {
    label: "Simple Variant Row Layout",
    options: sampleOptions,
    value: "option2",
    variant: "simple",
    layout: "row",
  },
};
