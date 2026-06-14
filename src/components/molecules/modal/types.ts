import type { ReactNode, CSSProperties } from "react";
import type { ButtonProps } from "@/components/atoms";

export type ModalSize = "s" | "m" | "l";

export const MODAL_SIZES: ModalSize[] = ["s", "m", "l"];

export type ModalActionLayout = "row" | "col";

export type ModalAction = Pick<
  ButtonProps,
  "children" | "onClick" | "variant" | "color" | "disabled" | "className"
>;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: ModalSize;
  actionLayout?: ModalActionLayout;
  className?: string;
  title?: string;
  actions?: ModalAction[];
  contentClassName?: string;
  contentStyle?: CSSProperties;
}
