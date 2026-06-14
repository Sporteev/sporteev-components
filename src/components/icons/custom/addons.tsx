import { cn } from "@/lib/utils";
import { iconDefaults, type IconProps } from "./types";

export function SearchIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg {...iconDefaults({ size, className: cn("text-grey-900", className), ...props })}>
      <path
        d="M10.6393 17.8538C14.6232 17.8538 17.8528 14.6242 17.8528 10.6403C17.8528 6.65638 14.6232 3.42676 10.6393 3.42676C6.6554 3.42676 3.42578 6.65638 3.42578 10.6403C3.42578 14.6242 6.6554 17.8538 10.6393 17.8538Z"
        stroke="currentColor"
        strokeWidth="1.6973"
        strokeLinejoin="round"
      />
      <path
        d="M15.8262 15.8262L19.4267 19.4267"
        stroke="currentColor"
        strokeWidth="1.6973"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type ChevronDirection = "up" | "down" | "left" | "right";

const CHEVRON_PATHS: Record<ChevronDirection, string> = {
  down: "M16 10L12 14L8 10",
  up: "M16 14L12 10L8 14",
  left: "M14 8L10 12L14 16",
  right: "M10 8L14 12L10 16",
};

export interface ChevronIconProps extends IconProps {
  direction?: ChevronDirection;
}

export function ChevronIcon({
  size = 24,
  direction = "down",
  className,
  ...props
}: ChevronIconProps) {
  return (
    <svg
      {...iconDefaults({
        size,
        className: cn("text-grey-900", className),
        ...props,
      })}
    >
      <path
        d={CHEVRON_PATHS[direction]}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type CloseVariant = "outline" | "filled";

export interface CloseIconProps extends IconProps {
  variant?: CloseVariant;
}

export function CloseIcon({
  size = 24,
  variant = "outline",
  className,
  ...props
}: CloseIconProps) {
  if (variant === "filled") {
    return (
      <svg
        {...iconDefaults({
          size,
          className: cn("text-grey-800", className),
          ...props,
        })}
      >
        <path
          d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM14.5723 9.42871C14.2883 9.14524 13.8278 9.14501 13.5439 9.42871L12.001 10.9707L10.458 9.42871C10.174 9.145 9.7136 9.1448 9.42969 9.42871C9.14612 9.71265 9.14609 10.1731 9.42969 10.457L10.9727 12L9.42969 13.543C9.14602 13.827 9.14586 14.2883 9.42969 14.5723C9.71349 14.8558 10.174 14.8555 10.458 14.5723L12.001 13.0283L13.5439 14.5713C13.8279 14.855 14.2893 14.855 14.5732 14.5713C14.8568 14.2874 14.8567 13.8269 14.5732 13.543L13.0293 11.999L14.5723 10.457C14.8561 10.173 14.8561 9.71269 14.5723 9.42871Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      {...iconDefaults({
        size,
        className: cn("text-grey-800", className),
        ...props,
      })}
    >
      <path
        d="M17.6721 5.22781C17.9759 4.92406 18.469 4.92406 18.7727 5.22781C19.0765 5.53155 19.0765 6.02465 18.7727 6.32839L13.1009 12.0003L18.7727 17.6721C19.0765 17.9759 19.0765 18.469 18.7727 18.7727C18.469 19.0765 17.9759 19.0765 17.6721 18.7727L12.0003 13.1009L6.32839 18.7727C6.02465 19.0765 5.53155 19.0765 5.22781 18.7727C4.92406 18.469 4.92406 17.9759 5.22781 17.6721L10.8997 12.0003L5.22781 6.32839C4.92406 6.02465 4.92406 5.53155 5.22781 5.22781C5.53155 4.92406 6.02465 4.92406 6.32839 5.22781L12.0003 10.8997L17.6721 5.22781Z"
        fill="currentColor"
      />
    </svg>
  );
}
