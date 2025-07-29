import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioButton } from "./index";

const meta: Meta<typeof RadioButton> = {
  title: "Molecules/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

// Basic Radio Button
export const Default: Story = {
  args: {
    label: "Option 1",
    value: "option1",
    checked: false,
  },
};

// Checked Radio Button
export const Checked: Story = {
  args: {
    label: "Selected Option",
    value: "option1",
    checked: true,
  },
};

// Required Field
export const Required: Story = {
  args: {
    label: "Required Option",
    value: "required",
    required: true,
  },
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: "Option with Helper Text",
    value: "option1",
    helperText: "This is helpful information about this option",
  },
};

// Error State
export const Error: Story = {
  args: {
    label: "Error Option",
    value: "error",
    error: true,
    errorMessage: "This field is required",
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: "Disabled Option",
    value: "disabled",
    disabled: true,
  },
};

// Disabled Checked
export const DisabledChecked: Story = {
  args: {
    label: "Disabled Checked Option",
    value: "disabled-checked",
    checked: true,
    disabled: true,
  },
};

// Radio Group Example
const RadioGroupComponent = () => {
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <div className="space-y-3">
      <h3 className="mb-4 text-lg font-medium">Select your preference:</h3>
      <RadioButton
        label="Option 1"
        value="option1"
        checked={selectedValue === "option1"}
        onChange={setSelectedValue}
      />
      <RadioButton
        label="Option 2"
        value="option2"
        checked={selectedValue === "option2"}
        onChange={setSelectedValue}
      />
      <RadioButton
        label="Option 3"
        value="option3"
        checked={selectedValue === "option3"}
        onChange={setSelectedValue}
      />
      <p className="mt-4 text-sm text-gray-600">Selected: {selectedValue}</p>
    </div>
  );
};

export const RadioGroup: Story = {
  render: () => <RadioGroupComponent />,
};

// Controlled Example
const ControlledComponent = () => {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-4">
      <RadioButton
        label="Controlled Option 1"
        value="controlled1"
        checked={value === "controlled1"}
        onChange={setValue}
      />
      <RadioButton
        label="Controlled Option 2"
        value="controlled2"
        checked={value === "controlled2"}
        onChange={setValue}
      />
      <p className="text-sm text-gray-600">
        Current value: {value || "None selected"}
      </p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledComponent />,
};
