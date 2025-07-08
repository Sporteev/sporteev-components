import "./styles.css";
import "./dev.css";

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Button, InfoBox } from "@/components/atoms";
import { Modal } from "@/components/molecules";
import { Snackbar, useSnackbar } from "@/components/atoms/snackbar";
import { LabelChip } from "@/components/atoms/label-chip";
import { X, Check, Trash2, Save } from "lucide-react";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      {/* LabelChip Demo Row */}
      <div className="mb-4 flex flex-wrap gap-2">
        <LabelChip
          size="small"
          text="Primary"
          color="primary"
          icon={<Check />}
        />
        <LabelChip
          size="medium"
          text="Success"
          color="success"
          icon={<Check />}
        />
        <LabelChip
          size="large"
          text="Warning"
          color="warning"
          icon={<Check />}
        />
        <LabelChip text="Danger" color="danger" icon={<Check />} />
        <LabelChip text="Gray" color="gray" icon={<Check />} />
        <LabelChip text="Dark" color="dark" />
        <LabelChip text="Large" color="primary" size="large" />
        <LabelChip text="Small" color="primary" size="small" />
      </div>
      {/* Snackbar Demo Button */}
      <Button
        onClick={() =>
          showSnackbar({
            title: "Hello from Snackbar!",
            body: "This is a demo notification.",
            variant: "primary",
            duration: 3000,
          })
        }
      >
        Show Snackbar
      </Button>
      {/* Render Snackbar if present */}
      {snackbar && <Snackbar {...snackbar} onClose={hideSnackbar} />}
      <div className="space-y-8">
        {/* Primary Buttons */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-neutral-80">
            Primary Buttons
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="small" danger>
              Small Primary
            </Button>
            <Button variant="primary" size="medium" danger>
              Medium Primary
            </Button>
            <Button variant="primary" size="large" danger>
              Large Primary
            </Button>
            <Button variant="primary" disabled>
              Disabled Primary
            </Button>
            <Button variant="primary" danger>
              Danger Primary
            </Button>
          </div>
        </div>

        {/* Secondary Buttons */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-neutral-80">
            Secondary Buttons
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" size="small">
              Small Secondary
            </Button>
            <Button variant="secondary" size="medium">
              Medium Secondary
            </Button>
            <Button variant="secondary" size="large">
              Large Secondary
            </Button>
            <Button variant="secondary" disabled>
              Disabled Secondary
            </Button>
            <Button variant="secondary" danger>
              Danger Secondary
            </Button>
          </div>
        </div>

        {/* Outline Buttons */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-neutral-80">
            Outline Buttons
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" size="small">
              Small Outline
            </Button>
            <Button variant="outline" size="medium">
              Medium Outline
            </Button>
            <Button variant="outline" size="large">
              Large Outline
            </Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
            <Button variant="outline" danger>
              Danger Outline
            </Button>
          </div>
        </div>

        {/* Ghost Buttons */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-neutral-80">Ghost Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="ghost" size="small">
              Small Ghost
            </Button>
            <Button variant="ghost" size="medium">
              Medium Ghost
            </Button>
            <Button variant="ghost" size="large">
              Large Ghost
            </Button>
            <Button variant="ghost" disabled>
              Disabled Ghost
            </Button>
            <Button variant="ghost" danger>
              Danger Ghost
            </Button>
          </div>
        </div>
      </div>
      {/* Simple Modal */}
      <Button onClick={() => setIsModalOpen(true)}>Show Simple Modal</Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Simple Modal"
        actions={[
          {
            children: "Close",
            onClick: () => setIsModalOpen(false),
            variant: "ghost",
          },
        ]}
      >
        <div className="space-y-4">
          <p className="text-neutral-70">
            This is a simple modal with a single action button. The content is
            centered and uses the full width of the modal.
          </p>
          <div className="rounded-lg bg-neutral-10">
            <p className="text-sm text-neutral-60">
              You can add any content here, including:
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-neutral-60">
              <li>Text and paragraphs</li>
              <li>Lists and bullet points</li>
              <li>Cards and containers</li>
              <li>Forms and inputs</li>
              <li>Images and media</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Small Modal with Icon */}
      <Button onClick={() => setIsSmallModalOpen(true)}>
        Show Small Modal
      </Button>
      <Modal
        isOpen={isSmallModalOpen}
        onClose={() => setIsSmallModalOpen(false)}
        size="small"
        title="Small Modal"
        actions={[
          {
            children: (
              <>
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </>
            ),
            onClick: () => setIsSmallModalOpen(false),
            variant: "ghost",
          },
          {
            children: (
              <>
                <Check className="h-4 w-4" />
                <span>Confirm</span>
              </>
            ),
            onClick: () => setIsSmallModalOpen(false),
            variant: "primary",
          },
        ]}
      >
        <div className="space-y-4">
          <InfoBox variant="info" title="Information">
            This is a small modal that demonstrates how to use icons in both the
            content and buttons. The content is structured with proper spacing
            and includes an info box.
          </InfoBox>
          <p className="text-neutral-70">
            Small modals are great for quick confirmations or simple information
            displays. They maintain a focused view while still providing enough
            space for essential content.
          </p>
        </div>
      </Modal>

      {/* Large Modal with Multiple Actions */}
      <Button onClick={() => setIsLargeModalOpen(true)}>
        Show Large Modal
      </Button>
      <Modal
        isOpen={isLargeModalOpen}
        onClose={() => setIsLargeModalOpen(false)}
        size="large"
        title="Large Modal"
        actions={[
          {
            children: (
              <>
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </>
            ),
            onClick: () => setIsLargeModalOpen(false),
            variant: "ghost",
          },
          {
            children: (
              <>
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
              </>
            ),
            onClick: () => setIsLargeModalOpen(false),
            variant: "secondary",
          },
          {
            children: (
              <>
                <Check className="h-4 w-4" />
                <span>Confirm</span>
              </>
            ),
            onClick: () => setIsLargeModalOpen(false),
            variant: "primary",
          },
        ]}
      >
        <div className="space-y-6">
          <div className="rounded-lg bg-neutral-10">
            <h3 className="font-medium text-neutral-90">
              Additional Information
            </h3>
            <p className="text-neutral-70">
              You can include various types of content in a large modal:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-neutral-70">
              <li>Multiple sections with different layouts</li>
              <li>Forms with multiple input fields</li>
              <li>Data tables or lists</li>
              <li>Images or media content</li>
              <li>Interactive elements</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Danger Modal */}
      <Button onClick={() => setIsDangerModalOpen(true)}>
        Show Danger Modal
      </Button>
      <Modal
        isOpen={isDangerModalOpen}
        onClose={() => setIsDangerModalOpen(false)}
        title="Delete Confirmation"
        actions={[
          {
            children: (
              <>
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </>
            ),
            onClick: () => setIsDangerModalOpen(false),
            variant: "ghost",
          },
          {
            children: (
              <>
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </>
            ),
            onClick: () => setIsDangerModalOpen(false),
            variant: "primary",
            danger: true,
          },
        ]}
      >
        <div className="space-y-4">
          <InfoBox variant="danger" title="Warning">
            This action cannot be undone. This will permanently delete the item
            and remove it from our servers.
          </InfoBox>

          <div className="space-y-2">
            <h3 className="font-medium text-neutral-90">
              What will be deleted:
            </h3>
            <ul className="list-inside list-disc space-y-1 text-neutral-70">
              <li>All associated data and files</li>
              <li>User preferences and settings</li>
              <li>Activity history and logs</li>
              <li>Related content and references</li>
            </ul>
          </div>

          <p className="text-sm text-neutral-60">
            If you're not sure, you can cancel this action and review the item
            first. You can always delete it later if needed.
          </p>
        </div>
      </Modal>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
