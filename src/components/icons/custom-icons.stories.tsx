import type { Meta, StoryObj } from "@storybook/react";
import {
  ChevronIcon,
  CloseIcon,
  GoogleIcon,
  InstagramIcon,
  SearchIcon,
  SOCIAL_ICONS,
  TelegramIcon,
  ThreadsIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
  type SocialIconName,
} from "./custom";

const meta = {
  title: "Icons/Custom",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddOns: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <div className="flex items-center gap-16">
        <SearchIcon size={24} />
        <span className="text-body-3 text-grey-700">Search</span>
      </div>
      <div className="flex items-center gap-16">
        {(["up", "down", "left", "right"] as const).map((direction) => (
          <ChevronIcon key={direction} direction={direction} size={24} />
        ))}
      </div>
      <div className="flex items-center gap-16">
        <CloseIcon variant="outline" size={24} />
        <CloseIcon variant="filled" size={24} />
      </div>
    </div>
  ),
};

const SOCIAL_ICON_NAMES: SocialIconName[] = [
  "google",
  "instagram",
  "x",
  "threads",
  "tiktok",
  "whatsapp",
  "telegram",
];

export const Social: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-24">
      {SOCIAL_ICON_NAMES.map((name) => {
        const Icon = SOCIAL_ICONS[name];
        return (
          <div key={name} className="flex flex-col items-center gap-8">
            <Icon size={24} />
            <span className="text-caption-1 text-grey-700 capitalize">{name}</span>
          </div>
        );
      })}
    </div>
  ),
};

export const SocialIndividual: Story = {
  render: () => (
    <div className="flex flex-wrap gap-16">
      <GoogleIcon size={24} />
      <InstagramIcon size={24} />
      <XIcon size={24} />
      <ThreadsIcon size={24} />
      <TikTokIcon size={24} />
      <WhatsAppIcon size={24} />
      <TelegramIcon size={24} />
    </div>
  ),
};
