import type { Meta } from "@storybook/react";
import { Snackbar } from ".";
import { useSnackbar } from "./useSnackbar";
import { Button } from "../button";

const meta: Meta<typeof Snackbar> = {
  title: "Atoms/Snackbar",
  component: Snackbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 200,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "2rem",
          position: "relative",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "relative",
            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "tertiary",
        "success",
        "warning",
        "danger",
        "gray",
        "dark",
        "light",
      ],
      description: "The visual style of the snackbar",
    },
    title: {
      control: "text",
      description: "The main message of the snackbar. Bold text.",
      defaultValue: "Snackbar Title",
    },
    body: {
      control: "text",
      description: "Additional details or description",
      defaultValue: "This is the body of the snackbar",
    },
    duration: {
      control: "number",
      description: "Duration in milliseconds before auto-closing",
    },
    action: {
      control: false,
      description:
        "The action button to display. Can be a button or a link. Or anything as long it's ReactNode.",
    },
    onClose: {
      control: false,
      description:
        "The function to close the snackbar. You must pass hideSnackbar as the onClose function. If you provide a custom onClose, make sure to call hideSnackbar within it.",
      required: true,
    },
  },
};

export default meta;

const WithHookDemoComponent = ({ variant, title, body, action }) => {
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();
  return (
    <div>
      <Button
        onClick={() =>
          showSnackbar({ variant, title, body, action, duration: 3000 })
        }
      >
        Show Snackbar
      </Button>
      {snackbar && (
        <Snackbar {...snackbar} action={action} onClose={hideSnackbar} />
      )}
    </div>
  );
};

export const WithHookDemo = {
  render: (args) => <WithHookDemoComponent {...args} />,
  args: {
    variant: "primary",
    title: "Hook-based Snackbar",
    body: "This snackbar is triggered using the useSnackbar hook.",
    action: (
      <Button
        variant="primary"
        size="small"
        className="!h-6 !text-[10px]"
        onClick={() => alert("Action clicked!")}
      >
        Action
      </Button>
    ),
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "tertiary",
        "success",
        "warning",
        "danger",
        "gray",
        "dark",
        "light",
      ],
    },
    title: { control: "text" },
    body: { control: "text" },
    action: { control: false },
  },
  parameters: {
    docs: {
      source: {
        code: `
import { useSnackbar } from "./useSnackbar";
import { Snackbar } from ".";
import { Button } from "../button";

const { snackbar, show, hideSnackbar } = useSnackbar();

const actionButton = <Button onClick={() => alert('Action clicked!')}>Action</Button>;

return (
  <div>
    <Button
      onClick={() =>
        show(
          variant,
          title,
          body,
          actionButton,
          3000
        )
      }
    >
      Show Snackbar
    </Button>
    {snackbar && (
      <Snackbar
        {...snackbar}
        action={actionButton}
        onClose={hideSnackbar}
      />
    )}
  </div>
);
        `,
      },
    },
  },
  name: "Snackbar",
};
