import type { Meta, StoryObj } from "@storybook/react";
import { Modal, type ModalProps } from ".";
import { Button, InfoBox } from "@/components/atoms";
import { useState } from "react";

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
      options: ["small", "medium", "large"],
      description: "The size variant of the modal",
      defaultValue: "medium",
    },
    title: {
      control: "text",
      description: "The title displayed at the top of the modal",
      defaultValue: "Basic Modal",
    },
    className: {
      required: false,
      description: "Additional tailwind class names for custom styling",
    },
    contentClassName: {
      required: false,
      description: "Additional tailwind class names for custom styling",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<ModalStoryProps>;

// Wrapper component to handle modal state
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
        <div className="space-y-4">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium text-neutral-90">Section 1</h3>
                <p className="text-neutral-70">
                  Large modals are perfect for complex content that requires
                  more space. You can use grid layouts to organize information
                  effectively.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-neutral-90">Section 2</h3>
                <p className="text-neutral-70">
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
    size: "large",
    title: "Basic Modal",
    isOpen: false,
  },
};
