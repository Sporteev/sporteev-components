import "./styles.css";
import "./dev.css";

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Button,
  IconButton,
  InfoBox,
  LabelChip,
  RadioButton,
  Text,
  Toast,
  useToast,
  CHIP_COLORS,
  type ToastVariant,
} from "@/components/atoms";
import {
  TOAST_VARIANTS,
  TOAST_ACTION_BUTTON_COLOR,
} from "@/components/atoms/snackbar";
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from "@/components/atoms/button/types";
import {
  InputText,
  TextArea,
  Select,
  Modal,
  RadioGroup,
  ScoreIncreaseDecrease,
} from "@/components/molecules";
import { FIELD_SIZES } from "@/components/molecules/input-text";
import {
  ChevronIcon,
  CloseIcon,
  FootballIcon,
  GoogleIcon,
  InstagramIcon,
  LogoFlat,
  SearchIcon,
  SportsIcon,
  ThreadsIcon,
  TikTokIcon,
  WhatsAppIcon,
  TelegramIcon,
  XIcon,
} from "@/components/icons";
import { HelpCircle, Mail, Plus, Settings } from "lucide-react";

const SECTIONS = [
  { id: "text", label: "Text" },
  { id: "buttons", label: "Buttons" },
  { id: "chips", label: "Label Chips" },
  { id: "info-box", label: "InfoBox" },
  { id: "radio", label: "Radio" },
  { id: "fields", label: "InputText / TextArea" },
  { id: "select", label: "Select" },
  { id: "score", label: "Score" },
  { id: "modal", label: "Modal" },
  { id: "toast", label: "Toast" },
  { id: "icons", label: "Icons" },
] as const;

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-grey-400 scroll-mt-24 border-b pb-32">
      <Text variant="h3" className="mb-16">
        {title}
      </Text>
      {children}
    </section>
  );
}

function Sub({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-24">
      <Text variant="h5" className="text-grey-800 mb-12">
        {title}
      </Text>
      {children}
    </div>
  );
}

const sampleOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

function toastAction(variant: ToastVariant) {
  const color = TOAST_ACTION_BUTTON_COLOR[variant];
  if (variant === "promises") {
    return (
      <Button
        variant="primary"
        size="m"
        className="bg-grey-900 hover:bg-grey-800 w-full md:w-auto"
      >
        Lihat Detail
      </Button>
    );
  }
  return (
    <Button
      variant="primary"
      color={color}
      size="m"
      className="w-full md:w-auto"
    >
      Lihat Detail
    </Button>
  );
}

const Page = () => {
  const [selectValue, setSelectValue] = useState("");
  const [radioValue, setRadioValue] = useState("a");
  const [blockRadioValue, setBlockRadioValue] = useState("x");
  const [score, setScore] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFieldError, setShowFieldError] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  return (
    <div className="bg-grey-100 min-h-screen p-16 md:p-24">
      <div className="mx-auto max-w-5xl space-y-32">
        <header className="space-y-12 text-center">
          <Text variant="h1" color="primary">
            Component Library Showcase
          </Text>
          <Text variant="body-2" className="text-grey-700">
            All components in one page — scroll or jump via nav
          </Text>
          <nav className="flex flex-wrap justify-center gap-8">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-8 border-grey-400 text-body-3 text-primary-600 hover:bg-primary-100 border bg-white px-12 py-6"
              >
                {label}
              </a>
            ))}
          </nav>
        </header>

        <Section id="text" title="Text">
          <div className="space-y-8">
            <Text variant="h1">Heading 1</Text>
            <Text variant="h2">Heading 2</Text>
            <Text variant="h3">Heading 3</Text>
            <Text variant="body-1">Body 1 — primary paragraph text</Text>
            <Text variant="body-2">Body 2 — secondary paragraph text</Text>
            <Text variant="body-3">Body 3 — compact text</Text>
            <Text variant="caption-1">Caption 1</Text>
            <Text variant="caption-2">Caption 2</Text>
          </div>
        </Section>

        <Section id="buttons" title="Button & IconButton">
          <Sub title="Primary × colors">
            <div className="flex flex-wrap gap-8">
              {BUTTON_COLORS.map((color) => (
                <Button key={color} variant="primary" color={color} size="m">
                  {color}
                </Button>
              ))}
            </div>
          </Sub>
          <Sub title="Variants (primary color)">
            <div className="flex flex-wrap gap-8">
              {BUTTON_VARIANTS.map((variant) => (
                <Button
                  key={variant}
                  variant={variant}
                  color="primary"
                  size="m"
                >
                  {variant}
                </Button>
              ))}
            </div>
          </Sub>
          <Sub title="Sizes">
            <div className="flex flex-wrap items-end gap-8">
              {BUTTON_SIZES.map((size) => (
                <Button
                  key={size}
                  variant="primary"
                  color="primary"
                  size={size}
                >
                  {size.toUpperCase()}
                </Button>
              ))}
            </div>
          </Sub>
          <Sub title="States">
            <div className="flex flex-wrap gap-8">
              <Button variant="primary" color="primary">
                Default
              </Button>
              <Button variant="primary" color="primary" disabled>
                Disabled
              </Button>
              <Button
                variant="primary"
                color="primary"
                fullWidth
                className="max-w-320"
              >
                Full width
              </Button>
            </div>
          </Sub>
          <Sub title="IconButton">
            <div className="flex flex-wrap items-center gap-8">
              {BUTTON_SIZES.map((size) => (
                <IconButton
                  key={size}
                  icon={<Settings />}
                  aria-label={`Settings ${size}`}
                  variant="primary"
                  color="primary"
                  size={size}
                />
              ))}
              <IconButton
                icon={<Plus />}
                aria-label="Add"
                variant="outline"
                color="secondary"
                size="m"
              />
            </div>
          </Sub>
        </Section>

        <Section id="chips" title="LabelChip">
          <div className="flex flex-wrap gap-8">
            {CHIP_COLORS.map((color) => (
              <LabelChip key={color} text={color} color={color} size="medium" />
            ))}
          </div>
        </Section>

        <Section id="info-box" title="InfoBox">
          <div className="space-y-12">
            <InfoBox variant="info" title="Info">
              Informational message for the user.
            </InfoBox>
            <InfoBox variant="warning" title="Warning">
              Something needs attention.
            </InfoBox>
            <InfoBox variant="danger" title="Error">
              Something went wrong.
            </InfoBox>
          </div>
        </Section>

        <Section id="radio" title="RadioButton & RadioGroup">
          <Sub title="RadioButton">
            <div className="flex flex-col gap-12">
              <RadioButton
                label="Selected"
                value="on"
                checked
                onChange={() => {}}
              />
              <RadioButton
                label="Unselected"
                value="off"
                checked={false}
                onChange={() => {}}
              />
              <RadioButton
                label="Disabled"
                value="disabled"
                checked={false}
                disabled
                helperText="Not available"
              />
            </div>
          </Sub>
          <Sub title="RadioGroup — simple">
            <RadioGroup
              label="Choose one"
              value={radioValue}
              onChange={setRadioValue}
              options={[
                { label: "Option A", value: "a" },
                { label: "Option B", value: "b" },
                { label: "Option C", value: "c", disabled: true },
              ]}
            />
          </Sub>
          <Sub title="RadioGroup — block">
            <RadioGroup
              label="Block layout"
              variant="block"
              value={blockRadioValue}
              onChange={setBlockRadioValue}
              options={[
                {
                  label: "Block X",
                  value: "x",
                  helperText: "First block option",
                },
                {
                  label: "Block Y",
                  value: "y",
                  helperText: "Second block option",
                },
              ]}
            />
          </Sub>
        </Section>

        <Section id="fields" title="InputText & TextArea">
          <Sub title="InputText sizes">
            <div className="space-y-12">
              {FIELD_SIZES.map((size) => (
                <InputText
                  key={size}
                  size={size}
                  label={`Size ${size.toUpperCase()}`}
                  placeholder={`Input size ${size}`}
                />
              ))}
            </div>
          </Sub>
          <Sub title="InputText states">
            <div className="grid gap-16 md:grid-cols-2">
              <InputText label="Default" placeholder="Enter text" />
              <InputText label="Required" placeholder="Required" required />
              <InputText
                label="With helper"
                placeholder="Email"
                helperText="We will never share your email"
              />
              <InputText
                label="With error"
                placeholder="Email"
                errorMessage={
                  showFieldError ? "Please enter a valid email" : undefined
                }
              />
              <InputText label="Disabled" value="Cannot edit" disabled />
              <InputText
                label="With adornments"
                type="email"
                placeholder="Email"
                startAdornment={<Mail className="size-16" />}
                endAdornment={<HelpCircle className="size-16" />}
              />
            </div>
          </Sub>
          <Sub title="TextArea">
            <div className="grid gap-16 md:grid-cols-2">
              <TextArea
                label="Description"
                placeholder="Enter description"
                rows={3}
                helperText="Multiline field"
              />
              <TextArea
                label="With error"
                placeholder="Too short"
                rows={3}
                errorMessage="Minimum 10 characters"
              />
            </div>
          </Sub>
        </Section>

        <Section id="select" title="Select">
          <div className="grid gap-16 md:grid-cols-2">
            <Select
              label="Default"
              options={sampleOptions}
              value={selectValue}
              onChange={setSelectValue}
              placeholder="Choose an option"
            />
            <Select
              label="Required"
              options={sampleOptions}
              required
              placeholder="Required select"
            />
            <Select
              label="With error"
              options={sampleOptions}
              errorMessage={showFieldError ? "Selection required" : undefined}
            />
            <Select
              label="Disabled"
              options={sampleOptions}
              value="option1"
              disabled
            />
          </div>
        </Section>

        <Section id="score" title="ScoreIncreaseDecrease">
          <div className="flex flex-wrap items-center gap-24">
            {(["small", "medium", "large"] as const).map((variant) => (
              <ScoreIncreaseDecrease
                key={variant}
                variant={variant}
                score={score}
                onIncrease={() => setScore((s) => s + 1)}
                onDecrease={() => setScore((s) => Math.max(0, s - 1))}
              />
            ))}
            <ScoreIncreaseDecrease
              variant="medium"
              score={1}
              danger
              onIncrease={() => {}}
              onDecrease={() => {}}
            />
          </div>
        </Section>

        <Section id="modal" title="Modal">
          <Button
            variant="primary"
            color="primary"
            onClick={() => setModalOpen(true)}
          >
            Open Modal
          </Button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            size="m"
            actionLayout="row"
            title="Example Modal"
            actions={[
              {
                children: "Cancel",
                variant: "ghost",
                color: "primary",
                onClick: () => setModalOpen(false),
              },
              {
                children: "Confirm",
                variant: "primary",
                color: "primary",
                onClick: () => setModalOpen(false),
              },
            ]}
          >
            <Text variant="body-2">
              Modal content goes here. Click outside or Cancel to close.
            </Text>
          </Modal>
        </Section>

        <Section id="toast" title="Toast">
          <div className="flex flex-wrap gap-8">
            {TOAST_VARIANTS.map((variant) => (
              <Button
                key={variant}
                variant="secondary"
                color="primary"
                size="s"
                onClick={() =>
                  showToast({
                    variant,
                    title: `${variant} toast`,
                    body: "Sample notification message.",
                    action: toastAction(variant),
                    duration: 5000,
                  })
                }
              >
                {variant}
              </Button>
            ))}
          </div>
          {toast ? <Toast {...toast} onClose={hideToast} /> : null}
        </Section>

        <Section id="icons" title="Icons">
          <Sub title="Logo">
            <LogoFlat size={48} color="#006493" />
          </Sub>
          <Sub title="Custom add-ons">
            <div className="flex flex-wrap items-center gap-16">
              <SearchIcon size={24} />
              <ChevronIcon direction="down" size={24} />
              <ChevronIcon direction="up" size={24} />
              <ChevronIcon direction="left" size={24} />
              <ChevronIcon direction="right" size={24} />
              <CloseIcon variant="outline" size={24} />
              <CloseIcon variant="filled" size={24} />
            </div>
          </Sub>
          <Sub title="Social">
            <div className="flex flex-wrap items-center gap-16">
              <GoogleIcon size={24} />
              <InstagramIcon size={46} />
              <XIcon />
              <ThreadsIcon />
              <TikTokIcon />
              <WhatsAppIcon />
              <TelegramIcon />
            </div>
          </Sub>
          <Sub title="Sports">
            <div className="flex flex-wrap items-center gap-16">
              <FootballIcon size={24} />
              <SportsIcon sportId={1} size={24} />
              <SportsIcon sportId={2} size={24} />
              <SportsIcon sportId={3} size={24} />
              <SportsIcon sportId={4} size={24} />
              <SportsIcon sportId={5} size={24} />
              <SportsIcon sportId={6} size={24} />
              <SportsIcon sportId={7} size={24} />
              <SportsIcon sportId={8} size={24} />
              <SportsIcon sportId={9} size={24} />
              <SportsIcon sportId={10} size={24} />
              <SportsIcon sportId={11} size={24} />
              <SportsIcon sportId={12} size={24} />
              <SportsIcon sportId={13} size={24} />
              <SportsIcon sportId={14} size={24} />
              <SportsIcon sportId={99} size={24} />
            </div>
          </Sub>
        </Section>

        <footer className="flex flex-wrap justify-center gap-12 pb-32">
          <Button
            variant="outline"
            color="primary"
            onClick={() => setShowFieldError((v) => !v)}
          >
            Toggle field errors
          </Button>
        </footer>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
