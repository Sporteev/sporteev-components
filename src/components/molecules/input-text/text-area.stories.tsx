import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextArea } from "./text-area";
import { FIELD_SIZES } from "./types";

const meta = {
  title: "Molecules/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    errorMessage: { control: "text" },
    helperText: { control: "text" },
    required: { control: "boolean" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    rows: { control: "number" },
    size: {
      control: { type: "select" },
      options: FIELD_SIZES,
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Description",
    placeholder: "Enter your description",
    rows: 4,
    size: "m",
  },
};

export const Required: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    required: true,
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: "Description",
    placeholder: "Enter your description",
    errorMessage: "Description must be at least 10 characters",
    rows: 4,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Notes",
    placeholder: "Add any additional notes",
    helperText: "Maximum 500 characters",
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    label: "Description",
    value: "This content cannot be edited",
    disabled: true,
    rows: 4,
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Description",
    value: "This is read-only content",
    readOnly: true,
    rows: 4,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-320 space-y-16">
      {FIELD_SIZES.map((size) => (
        <TextArea
          key={size}
          label={`${size.toUpperCase()} Text Area`}
          placeholder={`Size ${size}`}
          size={size}
          rows={4}
        />
      ))}
    </div>
  ),
};

const ControlledTextAreaComponent = () => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.length > 0 && newValue.length < 10) {
      setErrorMessage("Description must be at least 10 characters");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <TextArea
      label="Controlled Text Area"
      placeholder="Type a longer description..."
      value={value}
      onChange={handleChange}
      errorMessage={errorMessage}
      helperText="Minimum 10 characters required"
      rows={4}
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledTextAreaComponent />,
};

export const WidthVariants: Story = {
  render: () => (
    <div className="space-y-16">
      <TextArea
        label="Full Width (default)"
        placeholder="This text area takes full width"
        fullWidth
        rows={4}
      />
      <TextArea
        label="Auto Width"
        placeholder="This text area auto-sizes"
        fullWidth={false}
        rows={4}
      />
    </div>
  ),
};
