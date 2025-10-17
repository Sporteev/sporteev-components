import type { Meta, StoryObj } from "@storybook/react";
import { InputText, InputTextProps, TextAreaProps } from "./index";
import { useState } from "react";

const meta: Meta<typeof InputText> = {
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
    multiline: { control: "boolean" },
    rows: { control: "number" },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url", "search"],
    },
    inputSize: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
};

export default meta;

// Basic input
export const Default: StoryObj<typeof InputText> = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
    multiline: false,
  } as InputTextProps,
};

// Required field
export const Required: StoryObj<typeof InputText> = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    multiline: false,
  } as InputTextProps,
};

// With error
export const WithError: StoryObj<typeof InputText> = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
    errorMessage: "Please enter a valid email address",
    multiline: false,
  } as InputTextProps,
};

// With helper text
export const WithHelperText: StoryObj<typeof InputText> = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "Username must be at least 3 characters long",
    multiline: false,
  } as InputTextProps,
};

// Disabled
export const Disabled: StoryObj<typeof InputText> = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
    disabled: true,
    value: "user@example.com",
    multiline: false,
  } as InputTextProps,
};

// Read only
export const ReadOnly: StoryObj<typeof InputText> = {
  args: {
    label: "User ID",
    placeholder: "User ID",
    readOnly: true,
    value: "USR-12345",
    multiline: false,
  } as InputTextProps,
};

// Different sizes
export const Sizes: StoryObj<typeof InputText> = {
  render: () => (
    <div className="space-y-4">
      <InputText
        label="Small Input"
        placeholder="Small size"
        inputSize="small"
        multiline={false}
      />
      <InputText
        label="Medium Input"
        placeholder="Medium size (default)"
        inputSize="medium"
        multiline={false}
      />
      <InputText
        label="Large Input"
        placeholder="Large size"
        inputSize="large"
        multiline={false}
      />
    </div>
  ),
};

// Different types
export const Types: StoryObj<typeof InputText> = {
  render: () => (
    <div className="space-y-4">
      <InputText
        label="Text Input"
        placeholder="Regular text"
        type="text"
        multiline={false}
      />
      <InputText
        label="Email Input"
        placeholder="Enter email"
        type="email"
        multiline={false}
      />
      <InputText
        label="Password Input"
        placeholder="Enter password"
        type="password"
        multiline={false}
      />
      <InputText
        label="Number Input"
        placeholder="Enter number"
        type="number"
        multiline={false}
      />
      <InputText
        label="Phone Input"
        placeholder="Enter phone number"
        type="tel"
        multiline={false}
      />
      <InputText
        label="URL Input"
        placeholder="Enter URL"
        type="url"
        multiline={false}
      />
      <InputText
        label="Search Input"
        placeholder="Search..."
        type="search"
        multiline={false}
      />
    </div>
  ),
};

// With adornments
export const WithAdornments: StoryObj<typeof InputText> = {
  render: () => (
    <div className="space-y-4">
      <InputText
        label="With Start Adornment"
        placeholder="Enter amount"
        type="number"
        startAdornment="$"
        multiline={false}
      />
      <InputText
        label="With End Adornment"
        placeholder="Enter percentage"
        type="number"
        endAdornment="%"
        multiline={false}
      />
      <InputText
        label="With Both Adornments"
        placeholder="Enter price"
        type="number"
        startAdornment="$"
        endAdornment="USD"
        multiline={false}
      />
    </div>
  ),
};

// Textarea
export const Textarea: StoryObj<typeof InputText> = {
  args: {
    label: "Description",
    placeholder: "Enter your description",
    multiline: true,
    rows: 4,
  } as TextAreaProps,
};

// Controlled input component
const ControlledInputComponent = () => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Simple validation
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
      multiline={false}
    />
  );
};

// Controlled input
export const Controlled: StoryObj<typeof InputText> = {
  render: () => <ControlledInputComponent />,
};

// Full width vs auto width
export const WidthVariants: StoryObj<typeof InputText> = {
  render: () => (
    <div className="space-y-4">
      <InputText
        label="Full Width (default)"
        placeholder="This input takes full width"
        fullWidth={true}
        multiline={false}
      />
      <InputText
        label="Auto Width"
        placeholder="This input auto-sizes"
        fullWidth={false}
        multiline={false}
      />
    </div>
  ),
};
