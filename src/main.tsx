import "./styles.css";
import "./dev.css";

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Select, InputText } from "./components/molecules";
import { Text } from "@/components/atoms/text";
import { Mail, Lock, Phone, Globe, HelpCircle } from "lucide-react";

const Page = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [preselectedValue, setPreselectedValue] = useState("option2");
  const [requiredValue, setRequiredValue] = useState("");
  const [disabledOptionValue, setDisabledOptionValue] = useState("");
  const [longOptionsValue, setLongOptionsValue] = useState("");

  const sampleOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
    { label: "Option 5", value: "option5" },
  ];

  const colorOptions = [
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
  ];

  const longOptions = [
    {
      label: "This is a very long option text that might wrap or be truncated",
      value: "long1",
    },
    { label: "Another long option with lots of text content", value: "long2" },
    { label: "Short", value: "short" },
    { label: "Medium length option", value: "medium" },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <Text variant="h1" color="primary">
            Component Library Demo
          </Text>
          <Text variant="regular-medium-text" className="mt-2">
            Compare InputText and Select components for consistency
          </Text>
        </div>

        {/* InputText Component Demo */}
        <section className="mb-8">
          <Text variant="h3" className="mb-4">
            InputText Component
          </Text>

          <div className="space-y-6">
            {/* Basic InputText */}
            <div>
              <Text variant="h5" className="mb-2">
                Basic InputText
              </Text>
              <InputText
                label="Basic Input"
                placeholder="Enter some text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            {/* With Value */}
            <div>
              <Text variant="h5" className="mb-2">
                With Pre-filled Value
              </Text>
              <InputText label="Input with value" value="Pre-filled text" />
            </div>

            {/* Required */}
            <div>
              <Text variant="h5" className="mb-2">
                Required Field
              </Text>
              <InputText
                label="Required Input"
                placeholder="This field is required"
                required
              />
            </div>

            {/* With Error */}
            <div>
              <Text variant="h5" className="mb-2">
                With Error State
              </Text>
              <InputText
                label="Input with Error"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                error={showError}
                errorMessage={showError ? "Please enter a valid email" : ""}
              />
            </div>

            {/* With Helper Text */}
            <div>
              <Text variant="h5" className="mb-2">
                With Helper Text
              </Text>
              <InputText
                label="Input with Helper"
                placeholder="Enter your email"
                helperText="We'll never share your email with anyone else"
              />
            </div>

            {/* With Icons */}
            <div>
              <Text variant="h5" className="mb-2">
                With Icons
              </Text>
              <InputText
                label="Email Input"
                type="email"
                placeholder="Enter your email"
                startAdornment={<Mail className="h-4 w-4" />}
                endAdornment={<HelpCircle className="h-4 w-4" />}
                helperText="Click the question mark for help"
              />
            </div>

            {/* Disabled */}
            <div>
              <Text variant="h5" className="mb-2">
                Disabled InputText
              </Text>
              <InputText
                label="Disabled Input"
                value="Disabled text"
                disabled
              />
            </div>

            {/* Read Only */}
            <div>
              <Text variant="h5" className="mb-2">
                Read Only InputText
              </Text>
              <InputText
                label="Read Only Input"
                value="This text cannot be edited"
                readOnly
              />
            </div>

            {/* Multiline */}
            <div>
              <Text variant="h5" className="mb-2">
                Multiline InputText
              </Text>
              <InputText
                label="Description"
                placeholder="Enter a description"
                multiline
                rows={3}
                helperText="This is a textarea for longer content"
              />
            </div>

            {/* Different Types */}
            <div>
              <Text variant="h5" className="mb-2">
                Different Input Types
              </Text>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputText
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  startAdornment={<Mail className="h-4 w-4" />}
                />
                <InputText
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  startAdornment={<Lock className="h-4 w-4" />}
                />
                <InputText
                  label="Phone"
                  type="tel"
                  placeholder="Enter phone number"
                  startAdornment={<Phone className="h-4 w-4" />}
                />
                <InputText
                  label="Website"
                  type="url"
                  placeholder="Enter website URL"
                  startAdornment={<Globe className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Select Component Demo */}
        <section className="mb-8">
          <Text variant="h3" className="mb-4">
            Select Component
          </Text>

          <div className="space-y-6">
            {/* Basic Select */}
            <div>
              <Text variant="h5" className="mb-2">
                Basic Select
              </Text>
              <Select
                label="Select an option"
                options={sampleOptions}
                value={selectedValue}
                onChange={setSelectedValue}
                placeholder="Choose an option"
              />
            </div>

            {/* With Value */}
            <div>
              <Text variant="h5" className="mb-2">
                With Pre-selected Value
              </Text>
              <Select
                label="Select with value"
                options={sampleOptions}
                value={preselectedValue}
                onChange={setPreselectedValue}
              />
            </div>

            {/* Required */}
            <div>
              <Text variant="h5" className="mb-2">
                Required Field
              </Text>
              <Select
                label="Required Selection"
                options={sampleOptions}
                value={requiredValue}
                onChange={setRequiredValue}
                required
              />
            </div>

            {/* With Error */}
            <div>
              <Text variant="h5" className="mb-2">
                With Error State
              </Text>
              <Select
                label="Select with Error"
                options={sampleOptions}
                value={errorValue}
                onChange={setErrorValue}
                errorMessage={showError ? "Please select an option" : ""}
              />
            </div>

            {/* Disabled */}
            <div>
              <Text variant="h5" className="mb-2">
                Disabled Select
              </Text>
              <Select
                label="Disabled Select"
                options={sampleOptions}
                value="option1"
                disabled
              />
            </div>

            {/* With Disabled Option */}
            <div>
              <Text variant="h5" className="mb-2">
                With Disabled Option
              </Text>
              <Select
                label="With Disabled Option"
                options={[
                  { label: "Option 1", value: "option1" },
                  { label: "Option 2", value: "option2", disabled: true },
                  { label: "Option 3", value: "option3" },
                  { label: "Option 4", value: "option4" },
                ]}
                value={disabledOptionValue}
                onChange={setDisabledOptionValue}
              />
            </div>

            {/* Multiple Selects */}
            <div>
              <Text variant="h5" className="mb-2">
                Multiple Selects
              </Text>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                  label="First Select"
                  options={sampleOptions}
                  value={selectedValue}
                  onChange={setSelectedValue}
                />
                <Select
                  label="Second Select"
                  options={colorOptions}
                  value={selectedColor}
                  onChange={setSelectedColor}
                />
              </div>
            </div>

            {/* Long Options */}
            <div>
              <Text variant="h5" className="mb-2">
                Long Options
              </Text>
              <Select
                label="Select with Long Options"
                options={longOptions}
                value={longOptionsValue}
                onChange={setLongOptionsValue}
              />
            </div>

            {/* Empty Options Test Cases */}
            <div>
              <Text variant="h5" className="mb-2">
                Empty Options Test Cases
              </Text>
              <div className="space-y-4">
                {/* Empty Array */}
                <div>
                  <Text variant="h6" className="mb-2">
                    Empty Array Options
                  </Text>
                  <Select
                    label="Empty Array Test"
                    options={[]}
                    placeholder="Should show emptyLabel"
                    emptyLabel="No options available (empty array)"
                  />
                </div>

                {/* Undefined Options */}
                <div>
                  <Text variant="h6" className="mb-2">
                    Undefined Options
                  </Text>
                  <Select
                    label="Undefined Options Test"
                    options={undefined}
                    placeholder="Should show emptyLabel"
                    emptyLabel="No options available (undefined)"
                  />
                </div>

                {/* Null Options */}
                <div>
                  <Text variant="h6" className="mb-2">
                    Null Options
                  </Text>
                  <Select
                    label="Null Options Test"
                    options={null}
                    placeholder="Should show emptyLabel"
                    emptyLabel="No options available (null)"
                  />
                </div>

                {/* With Custom Empty Label */}
                <div>
                  <Text variant="h6" className="mb-2">
                    Custom Empty Label
                  </Text>
                  <Select
                    label="Custom Empty Label"
                    options={[]}
                    placeholder="Custom placeholder"
                    emptyLabel="🚫 No data available - please try again later"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="mb-8">
          <Text variant="h3" className="mb-4">
            Side-by-Side Comparison
          </Text>

          <div className="space-y-6">
            {/* Basic Comparison */}
            <div>
              <Text variant="h5" className="mb-2">
                Basic Inputs
              </Text>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputText label="Text Input" placeholder="Enter text" />
                <Select
                  label="Dropdown Select"
                  options={sampleOptions}
                  placeholder="Choose option"
                />
              </div>
            </div>

            {/* Required Comparison */}
            <div>
              <Text variant="h5" className="mb-2">
                Required Fields
              </Text>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputText
                  label="Required Text Input"
                  placeholder="This field is required"
                  required
                />
                <Select
                  label="Required Select"
                  options={sampleOptions}
                  required
                />
              </div>
            </div>

            {/* Error Comparison */}
            <div>
              <Text variant="h5" className="mb-2">
                Error States
              </Text>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputText
                  label="Input with Error"
                  error={true}
                  errorMessage="This field has an error"
                />
                <Select
                  label="Select with Error"
                  options={sampleOptions}
                  errorMessage="This field has an error"
                />
              </div>
            </div>

            {/* Disabled Comparison */}
            <div>
              <Text variant="h5" className="mb-2">
                Disabled States
              </Text>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputText
                  label="Disabled Input"
                  value="Disabled text"
                  disabled
                />
                <Select
                  label="Disabled Select"
                  options={sampleOptions}
                  value="option1"
                  disabled
                />
              </div>
            </div>

            {/* Helper Text Comparison */}
            <div>
              <Text variant="h5" className="mb-2">
                Helper Text
              </Text>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputText
                  label="Input with Helper"
                  placeholder="Enter some text"
                  helperText="This is helper text for the input"
                />
                <Select
                  label="Select with Helper"
                  options={sampleOptions}
                  placeholder="Choose an option"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Error Toggle Button */}
        <div className="text-center">
          <button
            onClick={() => setShowError(!showError)}
            className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            Toggle Error States
          </button>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
