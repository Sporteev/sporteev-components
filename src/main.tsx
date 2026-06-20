import "./index.css";
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
  CHIP_COLORS,
  LABEL_CHIP_SIZES,
} from "@/components/atoms/label-chip/types";
import { INFO_BOX_VARIANTS } from "@/components/atoms/info-box/types";
import { TEXT_VARIANTS, type TextColor } from "@/components/atoms/text/types";
import { RADIO_GROUP_VARIANTS } from "@/components/molecules/radio-group/types";
import { SCORE_INCREASE_DECREASE_SIZES } from "@/components/molecules/score-increase-decrease/types";
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
import {
  Letter,
  QuestionCircle,
  Settings,
} from "@solar-icons/react-perf/Linear";
import { PlusIcon } from "@/components/icons/custom";

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

const selectOptionsWithMeta = [
  { label: "Alice", value: "alice", chip: "Captain" },
  {
    label: "Bob",
    value: "bob",
    chip: "Player",
    photoUrl: "https://i.pravatar.cc/64?u=bob",
  },
  { label: "Charlie", value: "charlie", chip: "Guest", disabled: true },
  {
    label: "Diana",
    value: "diana",
    chip: "Coach",
    photoUrl: "https://i.pravatar.cc/64?u=diana",
  },
];

const TEXT_COLORS: TextColor[] = [
  "primary",
  "secondary",
  "tertiary",
  "neutral",
  "destructive",
  "success",
  "warning",
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
  const [searchSelectValue, setSearchSelectValue] = useState("");
  const [metaSelectValue, setMetaSelectValue] = useState("alice");
  const [radioValue, setRadioValue] = useState("a");
  const [blockRadioValue, setBlockRadioValue] = useState("x");
  const [rowRadioValue, setRowRadioValue] = useState("1");
  const [rowBlockRadioValue, setRowBlockRadioValue] = useState("a");
  const [score, setScore] = useState(2);
  const [editableScore, setEditableScore] = useState(4);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFieldError, setShowFieldError] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  return (
    <div className="bg-grey-100 md:bg-warning-200 min-h-screen border p-16 md:p-24">
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
          <Sub title="Typography variants">
            <div className="space-y-8">
              {TEXT_VARIANTS.map((variant) => (
                <Text key={variant} variant={variant}>
                  {variant} — The quick brown fox jumps over the lazy dog
                </Text>
              ))}
            </div>
          </Sub>
          <Sub title="Semantic colors">
            <div className="flex flex-wrap gap-16">
              {TEXT_COLORS.map((color) => (
                <Text key={color} variant="body-2" color={color}>
                  {color}
                </Text>
              ))}
            </div>
          </Sub>
          <Sub title="Weight & alignment">
            <div className="space-y-8">
              <Text variant="body-1" weight="regular">
                Regular weight
              </Text>
              <Text variant="body-1" weight="semibold">
                Semibold weight
              </Text>
              <Text variant="body-1" weight="bold">
                Bold weight
              </Text>
              <Text
                variant="body-2"
                textAlign="center"
                className="block w-full"
              >
                Center aligned
              </Text>
              <Text variant="body-2" textAlign="right" className="block w-full">
                Right aligned
              </Text>
            </div>
          </Sub>
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
                icon={<PlusIcon className="size-full" />}
                aria-label="Add"
                variant="outline"
                color="secondary"
                size="m"
              />
            </div>
          </Sub>
        </Section>

        <Section id="chips" title="LabelChip">
          <Sub title="Colors (m)">
            <div className="flex flex-wrap gap-8">
              {CHIP_COLORS.map((color) => (
                <LabelChip key={color} text={color} color={color} size="m" />
              ))}
            </div>
          </Sub>
          <Sub title="Sizes (primary)">
            <div className="flex flex-wrap items-center gap-8">
              {LABEL_CHIP_SIZES.map((size) => (
                <LabelChip key={size} text={size} color="primary" size={size} />
              ))}
            </div>
          </Sub>
          <Sub title="With icon">
            <div className="flex flex-wrap gap-8">
              <LabelChip
                text="Verified"
                color="success"
                size="m"
                icon={<QuestionCircle className="size-16" />}
              />
              <LabelChip
                text="vs"
                color="primary"
                size="s"
                icon={<FootballIcon size={16} />}
              />
            </div>
          </Sub>
        </Section>

        <Section id="info-box" title="InfoBox">
          <Sub title="Variants">
            <div className="space-y-12">
              {INFO_BOX_VARIANTS.map((variant) => (
                <InfoBox
                  key={variant}
                  variant={variant}
                  title={variant.charAt(0).toUpperCase() + variant.slice(1)}
                >
                  {variant === "info" && "Informational message for the user."}
                  {variant === "warning" && "Something needs attention."}
                  {variant === "destructive" && "Something went wrong."}
                </InfoBox>
              ))}
            </div>
          </Sub>
          <Sub title="Without title">
            <InfoBox variant="info">
              Info box with body only — no title prop.
            </InfoBox>
          </Sub>
          <Sub title="Custom icon">
            <InfoBox
              variant="warning"
              title="Custom icon"
              icon={<Settings className="text-warning-main size-24 shrink-0" />}
            >
              Override the default Solar icon with a custom node.
            </InfoBox>
          </Sub>
        </Section>

        <Section id="radio" title="RadioButton & RadioGroup">
          <Sub title="RadioButton states">
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
          {RADIO_GROUP_VARIANTS.map((groupVariant) => (
            <Sub
              key={`col-${groupVariant}`}
              title={`RadioGroup — ${groupVariant}, column`}
            >
              <RadioGroup
                label={`${groupVariant} / column`}
                variant={groupVariant}
                layout="column"
                value={groupVariant === "simple" ? radioValue : blockRadioValue}
                onChange={
                  groupVariant === "simple" ? setRadioValue : setBlockRadioValue
                }
                options={[
                  {
                    label: "Option A",
                    value: groupVariant === "simple" ? "a" : "x",
                    helperText: "First option",
                  },
                  {
                    label: "Option B",
                    value: groupVariant === "simple" ? "b" : "y",
                    helperText: "Second option",
                  },
                  {
                    label: "Option C (disabled)",
                    value: groupVariant === "simple" ? "c" : "z",
                    disabled: true,
                  },
                ]}
              />
            </Sub>
          ))}
          {RADIO_GROUP_VARIANTS.map((groupVariant) => (
            <Sub
              key={`row-${groupVariant}`}
              title={`RadioGroup — ${groupVariant}, row`}
            >
              <RadioGroup
                label={`${groupVariant} / row`}
                variant={groupVariant}
                layout="row"
                value={
                  groupVariant === "simple" ? rowRadioValue : rowBlockRadioValue
                }
                onChange={
                  groupVariant === "simple"
                    ? setRowRadioValue
                    : setRowBlockRadioValue
                }
                options={[
                  {
                    label: "One",
                    value: groupVariant === "simple" ? "1" : "a",
                  },
                  {
                    label: "Two",
                    value: groupVariant === "simple" ? "2" : "b",
                  },
                  {
                    label: "Three",
                    value: groupVariant === "simple" ? "3" : "c",
                  },
                ]}
              />
            </Sub>
          ))}
          <Sub title="RadioGroup — required & error">
            <RadioGroup
              label="Required group"
              required
              errorMessage="Please select an option"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Sub>
          <Sub title="RadioGroup — disabled">
            <RadioGroup
              label="Disabled group"
              disabled
              value="locked"
              options={[
                { label: "Locked A", value: "locked" },
                { label: "Locked B", value: "other" },
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
                startAdornment={<Letter className="size-16" />}
                endAdornment={<QuestionCircle className="size-16" />}
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
          <Sub title="Basic states">
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
              <Select
                label="Empty options"
                options={[]}
                emptyLabel="No items available"
                placeholder="Nothing to select"
              />
              <Select
                label="Disabled option"
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive", disabled: true },
                  { label: "Pending", value: "pending" },
                ]}
                placeholder="One option disabled"
              />
            </div>
          </Sub>
          <Sub title="Searchable">
            <Select
              label="Searchable select"
              options={[
                { label: "Apple", value: "apple" },
                { label: "Banana", value: "banana" },
                { label: "Cherry", value: "cherry" },
                { label: "Durian", value: "durian" },
                { label: "Elderberry", value: "elderberry" },
              ]}
              value={searchSelectValue}
              onChange={setSearchSelectValue}
              searchable
              searchPlaceholder="Filter fruits…"
              placeholder="Pick a fruit"
            />
          </Sub>
          <Sub title="With photo & chip">
            <Select
              label="Player roster"
              options={selectOptionsWithMeta}
              value={metaSelectValue}
              onChange={setMetaSelectValue}
              searchable
              placeholder="Select player"
            />
          </Sub>
        </Section>

        <Section id="score" title="ScoreIncreaseDecrease">
          <Sub title="Sizes">
            <div className="flex flex-col gap-24">
              {SCORE_INCREASE_DECREASE_SIZES.map((size) => (
                <div key={size} className="flex flex-col items-center gap-8">
                  <Text variant="caption-1" className="text-grey-700">
                    {size}
                  </Text>
                  <ScoreIncreaseDecrease
                    size={size}
                    score={score}
                    onIncrease={() => setScore((s) => s + 1)}
                    onDecrease={() => setScore((s) => Math.max(0, s - 1))}
                  />
                </div>
              ))}
            </div>
          </Sub>
          <Sub title="States">
            <div className="grid gap-24 md:grid-cols-2">
              <div className="flex flex-col items-center gap-8">
                <Text variant="caption-1" className="text-grey-700">
                  destructive
                </Text>
                <ScoreIncreaseDecrease
                  size="m"
                  score={score}
                  destructive
                  onIncrease={() => setScore((s) => s + 1)}
                  onDecrease={() => setScore((s) => s - 1)}
                />
              </div>
              <div className="flex flex-col items-center gap-8">
                <Text variant="caption-1" className="text-grey-700">
                  inFocus
                </Text>
                <ScoreIncreaseDecrease
                  size="m"
                  score={score}
                  inFocus
                  onIncrease={() => setScore((s) => s + 1)}
                  onDecrease={() => setScore((s) => s - 1)}
                />
              </div>
              <div className="flex flex-col items-center gap-8">
                <Text variant="caption-1" className="text-grey-700">
                  disabled
                </Text>
                <ScoreIncreaseDecrease
                  size="m"
                  score={score}
                  disabled
                  onIncrease={() => setScore((s) => s + 1)}
                  onDecrease={() => setScore((s) => s - 1)}
                />
              </div>
              <div className="flex flex-col items-center gap-8">
                <Text variant="caption-1" className="text-grey-700">
                  min / max (0–5)
                </Text>
                <ScoreIncreaseDecrease
                  size="m"
                  score={score}
                  min={0}
                  max={5}
                  onIncrease={() => setScore((s) => Math.min(5, s + 1))}
                  onDecrease={() => setScore((s) => Math.max(0, s - 1))}
                />
              </div>
              <div className="flex flex-col items-center gap-8">
                <Text variant="caption-1" className="text-grey-700">
                  read-only score (editable=false)
                </Text>
                <ScoreIncreaseDecrease
                  size="m"
                  score={score}
                  editable={false}
                  onIncrease={() => setScore((s) => s + 1)}
                  onDecrease={() => setScore((s) => s - 1)}
                />
              </div>
              <div className="flex flex-col items-center gap-8">
                <Text variant="caption-1" className="text-grey-700">
                  editable input
                </Text>
                <ScoreIncreaseDecrease
                  size="m"
                  score={editableScore}
                  scoreInputEditable
                  editable={false}
                  onIncrease={() => setScore((s) => s + 1)}
                  onDecrease={() => setScore((s) => s - 1)}
                  onScoreChange={setEditableScore}
                />
              </div>
            </div>
          </Sub>
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
                    duration: 999999999,
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
