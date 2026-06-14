import type { Meta, StoryObj } from "@storybook/react";
import { Modal, type ModalProps } from ".";
import { Button, InfoBox } from "@/components/atoms";
import { useState } from "react";
import { MODAL_SIZES } from "./types";

type ModalStoryProps = Omit<ModalProps, "onClose">;

const meta = {
  title: "Molecules/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      required: true,
      defaultValue: false,
      control: "boolean",
      description: "Controls the visibility of the modal",
    },
    onClose: {
      required: true,
      description: "Function to close the modal",
    },
    children: {
      required: false,
      control: "text",
      description: "Content to be displayed inside the modal",
    },
    size: {
      required: false,
      control: "select",
      options: MODAL_SIZES,
      description: "The size variant of the modal",
      defaultValue: "m",
    },
    actionLayout: {
      required: false,
      control: "select",
      options: ["row", "col"],
      description: "Layout direction for footer action buttons",
      defaultValue: "row",
    },
    title: {
      control: "text",
      description: "The title displayed at the top of the modal",
      defaultValue: "Basic Modal",
    },
    className: {
      required: false,
      description: "Additional tailwind class names for the overlay",
    },
    contentClassName: {
      required: false,
      description: "Additional tailwind class names for the body",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<ModalStoryProps>;

const ModalWrapper = (props: ModalStoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        {...props}
        isOpen={isOpen || props.isOpen}
        onClose={() => setIsOpen(false)}
        actions={[
          {
            children: "Close",
            onClick: () => {
              setIsOpen(false);
              setIsConfirmed(false);
            },
            variant: "secondary",
          },
          {
            children: "Confirm",
            onClick: () => {
              setIsConfirmed(true);
            },
            variant: "primary",
          },
        ]}
      >
        <div className="space-y-16">
          <div className="space-y-24">
            <div className="grid gap-16 md:grid-cols-2">
              <div className="space-y-8">
                <h3 className="text-grey-900 font-medium">Section 1</h3>
                <p className="text-grey-700">
                  Large modals are perfect for complex content that requires
                  more space. You can use grid layouts to organize information
                  effectively.
                </p>
              </div>
              <div className="space-y-8">
                <h3 className="text-grey-900 font-medium">Section 2</h3>
                <p className="text-grey-700">
                  The content can be split into multiple columns or sections,
                  making it easier to scan and understand.
                </p>
              </div>
            </div>

            <InfoBox variant="warning" title="Note">
              Large modals should be used when you need to display complex
              information or when the content requires more space to be properly
              understood.
            </InfoBox>
          </div>
          {isConfirmed && <InfoBox title="Confirm button is clicked" />}
        </div>
      </Modal>
    </div>
  );
};

export const ModalDemo: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    size: "l",
    title: "Basic Modal",
    isOpen: false,
    actionLayout: "row",
  },
};

const ActionLayoutWrapper = ({
  actionLayout,
  size = "m",
}: {
  actionLayout: ModalProps["actionLayout"];
  size?: ModalProps["size"];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open ({actionLayout} / {size})
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={size}
        actionLayout={actionLayout}
        title={`Actions: ${actionLayout}`}
        actions={[
          {
            children: "Cancel",
            variant: "ghost",
            onClick: () => setIsOpen(false),
          },
          {
            children: "Save draft",
            variant: "secondary",
            onClick: () => setIsOpen(false),
          },
          {
            children: "Confirm",
            variant: "primary",
            onClick: () => setIsOpen(false),
          },
        ]}
      >
        <p className="text-grey-700">
          Footer buttons use flex with <code>actionLayout="{actionLayout}"</code>
          .
        </p>
      </Modal>
    </div>
  );
};

export const ActionLayoutRow: Story = {
  render: () => <ActionLayoutWrapper actionLayout="row" />,
};

export const ActionLayoutCol: Story = {
  render: () => <ActionLayoutWrapper actionLayout="col" />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-16">
      {MODAL_SIZES.map((size) => (
        <ActionLayoutWrapper key={size} actionLayout="row" size={size} />
      ))}
    </div>
  ),
};
