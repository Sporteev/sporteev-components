import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./index";
import React from "react";

const meta: Meta<typeof Select> = {
  title: "Molecules/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "error"],
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
type Story = StoryObj<typeof Select>;

const sampleOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
  { label: "Option 5", value: "option5" },
];

export const Default: Story = {
  args: {
    label: "Select an option",
    options: sampleOptions,
    placeholder: "Choose an option",
  },
};

export const WithValue: Story = {
  args: {
    label: "Select with value",
    options: sampleOptions,
    value: "option2",
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
    label: "Select with Error",
    options: sampleOptions,
    errorMessage: "Please select an option",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Select",
    options: sampleOptions,
    value: "option1",
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: "With Disabled Option",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2", disabled: true },
      { label: "Option 3", value: "option3" },
      { label: "Option 4", value: "option4" },
    ],
  },
};

const ControlledSelectComponent = () => {
  const [value, setValue] = React.useState("");

  return (
    <Select
      label="Controlled Select"
      options={sampleOptions}
      value={value}
      onChange={setValue}
      placeholder="Select an option"
    />
  );
};

export const ControlledExample: Story = {
  render: () => <ControlledSelectComponent />,
};

export const MultipleSelects: Story = {
  render: () => (
    <div className="space-y-4">
      <Select
        label="First Select"
        options={sampleOptions}
        placeholder="Choose first option"
      />
      <Select
        label="Second Select"
        options={[
          { label: "Red", value: "red" },
          { label: "Blue", value: "blue" },
          { label: "Green", value: "green" },
        ]}
        placeholder="Choose second option"
      />
    </div>
  ),
};

export const LongOptions: Story = {
  args: {
    label: "Select with Long Options",
    options: [
      {
        label:
          "This is a very long option text that might wrap or be truncated",
        value: "long1",
      },
      {
        label: "Another long option with lots of text content",
        value: "long2",
      },
      { label: "Short", value: "short" },
      { label: "Medium length option", value: "medium" },
    ],
  },
};
