import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputText } from "./input-text";
import { FIELD_SIZES } from "./types";

const meta = {
  title: "Molecules/InputText",
  component: InputText,
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
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url", "search"],
    },
    size: {
      control: { type: "select" },
      options: FIELD_SIZES,
    },
  },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
    size: "m",
  },
};

export const Required: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
    errorMessage: "Please enter a valid email address",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "Username must be at least 3 characters long",
  },
};

export const Disabled: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
    disabled: true,
    value: "user@example.com",
  },
};

export const ReadOnly: Story = {
  args: {
    label: "User ID",
    placeholder: "User ID",
    readOnly: true,
    value: "USR-12345",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-320 space-y-16">
      {FIELD_SIZES.map((size) => (
        <InputText
          key={size}
          label={`${size.toUpperCase()} Input`}
          placeholder={`Size ${size}`}
          size={size}
        />
      ))}
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="w-320 space-y-16">
      <InputText label="Text Input" placeholder="Regular text" type="text" />
      <InputText label="Email Input" placeholder="Enter email" type="email" />
      <InputText
        label="Password Input"
        placeholder="Enter password"
        type="password"
      />
      <InputText label="Number Input" placeholder="Enter number" type="number" />
      <InputText label="Phone Input" placeholder="Enter phone number" type="tel" />
      <InputText label="URL Input" placeholder="Enter URL" type="url" />
      <InputText label="Search Input" placeholder="Search..." type="search" />
    </div>
  ),
};

export const WithAdornments: Story = {
  render: () => (
    <div className="w-320 space-y-16">
      <InputText
        label="With Start Adornment"
        placeholder="Enter amount"
        type="number"
        startAdornment="$"
      />
      <InputText
        label="With End Adornment"
        placeholder="Enter percentage"
        type="number"
        endAdornment="%"
      />
      <InputText
        label="With Both Adornments"
        placeholder="Enter price"
        type="number"
        startAdornment="$"
        endAdornment="USD"
      />
    </div>
  ),
};

const ControlledInputComponent = () => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.length > 0 && newValue.length < 3) {
      setErrorMessage("Input must be at least 3 characters long");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <InputText
      label="Controlled Input"
      placeholder="Type something..."
      value={value}
      onChange={handleChange}
      errorMessage={errorMessage}
      helperText="This input is controlled and has validation"
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledInputComponent />,
};

export const WidthVariants: Story = {
  render: () => (
    <div className="space-y-16">
      <InputText
        label="Full Width (default)"
        placeholder="This input takes full width"
        fullWidth
      />
      <InputText
        label="Auto Width"
        placeholder="This input auto-sizes"
        fullWidth={false}
      />
    </div>
  ),
};
