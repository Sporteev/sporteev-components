import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { Toast } from "./toast";
import { useToast } from "./use-toast";
import {
  TOAST_ACTION_BUTTON_COLOR,
  TOAST_VARIANTS,
  type ToastVariant,
} from "./types";

const meta = {
  title: "Atoms/Toast",
  component: Toast,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 200,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-screen p-16">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: TOAST_VARIANTS,
    },
    title: { control: "text" },
    body: { control: "text" },
    duration: { control: "number" },
    showIcon: { control: "boolean" },
    showClose: { control: "boolean" },
    onClose: { control: false },
    action: { control: false },
    icon: { control: false },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function noop() {}

function toastAction(variant: ToastVariant) {
  const color = TOAST_ACTION_BUTTON_COLOR[variant];

  if (variant === "promises") {
    return (
      <Button
        variant="primary"
        size="m"
        className="bg-grey-900 hover:bg-grey-800 active:bg-grey-700 w-full md:w-auto"
        onClick={() => alert("Action clicked!")}
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
      onClick={() => alert("Action clicked!")}
    >
      Lihat Detail
    </Button>
  );
}

export const Success: Story = {
  args: {
    variant: "success",
    title: "Open Play Berhasil Dibuat!",
    body: "Lihat detail open play sekarang.",
    onClose: noop,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "Open Play Gagal Dibuat!",
    body: "Silakan coba ulang dalam beberapa saat.",
    onClose: noop,
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Metode Pembayaran Belum Dipilih.",
    body: "Silakan pilih metode pembayaran.",
    onClose: noop,
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Open Play Hanya untuk Wanita.",
    body: "Silakan pilih open play lainnya.",
    onClose: noop,
  },
};

export const Promises: Story = {
  args: {
    variant: "promises",
    title: "Mohon Tunggu Sebentar",
    body: "Kamu akan diarahkan ke open play.",
    onClose: noop,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      {TOAST_VARIANTS.map((variant) => (
        <div key={variant} className="relative h-120">
          <Toast
            variant={variant}
            title={`${variant} toast`}
            body="Supporting message text."
            onClose={noop}
            duration={0}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

export const WithAction: Story = {
  render: (args) => (
    <Toast
      {...args}
      action={toastAction(args.variant ?? "info")}
      duration={0}
    />
  ),
  args: {
    variant: "success",
    title: "Open Play Berhasil Dibuat!",
    body: "Lihat detail open play sekarang.",
    onClose: noop,
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: "info",
    title: "No icon toast",
    body: "Icon hidden via showIcon={false}.",
    showIcon: false,
    onClose: noop,
    duration: 0,
  },
};

export const WithoutClose: Story = {
  args: {
    variant: "warning",
    title: "No close button",
    body: "Close hidden via showClose={false}.",
    showClose: false,
    onClose: noop,
    duration: 0,
  },
};

export const MobileLayout: Story = {
  render: () => (
    <div className="mx-auto w-[343px]">
      <Toast
        variant="success"
        title="Open Play Berhasil Dibuat!"
        body="Lihat detail open play sekarang."
        action={toastAction("success")}
        onClose={noop}
        duration={0}
      />
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    layout: "padded",
  },
};

const WithHookDemoComponent = ({
  variant,
  title,
  body,
}: {
  variant: ToastVariant;
  title: string;
  body: string;
}) => {
  const { toast, showToast, hideToast } = useToast();

  return (
    <div>
      <Button
        onClick={() =>
          showToast({
            variant,
            title,
            body,
            duration: 3000,
          })
        }
      >
        Show Toast
      </Button>
      {toast ? <Toast {...toast} onClose={hideToast} /> : null}
    </div>
  );
};

export const HookDemo: Story = {
  render: () => (
    <WithHookDemoComponent
      variant="success"
      title="Hook-based Toast"
      body="Triggered via useToast."
    />
  ),
};
