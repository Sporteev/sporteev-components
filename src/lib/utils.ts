import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Must stay in sync with `fontSize` keys in `src/theme/tokens.cjs`. */
const TYPOGRAPHY_TEXT_SIZES = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "body-1",
  "body-2",
  "body-3",
  "caption-1",
  "caption-2",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...TYPOGRAPHY_TEXT_SIZES] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
