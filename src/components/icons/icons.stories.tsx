import type { Meta, StoryObj } from "@storybook/react";
import {
  ChevronIcon,
  CloseIcon,
  SearchIcon,
  SOCIAL_ICONS,
  type SocialIconName,
} from "./custom";
import { LogoFlat } from "./logo-flat";
import {
  BadmintonIcon,
  BaseballIcon,
  BasketballIcon,
  FootballIcon,
  FutsalIcon,
  MiniSoccerIcon,
  OthersIcon,
  PadelIcon,
  SquashIcon,
  TableTennisIcon,
  TennisIcon,
  VolleyballIcon,
} from "./sports";

const meta = {
  title: "Icons",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Custom: Story = {
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
            <span className="text-caption-1 text-grey-700 capitalize">
              {name}
            </span>
          </div>
        );
      })}
    </div>
  ),
};

const SPORTS_ICONS = [
  { name: "Football", Icon: FootballIcon },
  { name: "Badminton", Icon: BadmintonIcon },
  { name: "Baseball", Icon: BaseballIcon },
  { name: "Basketball", Icon: BasketballIcon },
  { name: "Futsal", Icon: FutsalIcon },
  { name: "Mini soccer", Icon: MiniSoccerIcon },
  { name: "Padel", Icon: PadelIcon },
  { name: "Squash", Icon: SquashIcon },
  { name: "Tennis", Icon: TennisIcon },
  { name: "Table tennis", Icon: TableTennisIcon },
  { name: "Volleyball", Icon: VolleyballIcon },
  { name: "Others", Icon: OthersIcon },
] as const;

export const Sports: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-24">
      {SPORTS_ICONS.map(({ name, Icon }) => (
        <div key={name} className="flex flex-col items-center gap-8">
          <Icon size={24} />
          <span className="text-caption-1 text-grey-700">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Logo: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <LogoFlat size={48} color="#006493" />
      <span className="text-caption-1 text-grey-700">LogoFlat</span>
    </div>
  ),
};
