import { useState, useCallback } from "react";
import type { SnackbarProps } from "./index";

type SnackbarVariant = NonNullable<SnackbarProps["variant"]>;

interface UseSnackbarOptions extends Omit<SnackbarProps, "onClose"> {
  duration?: number;
}

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<UseSnackbarOptions | null>(null);

  const showSnackbar = useCallback((options: UseSnackbarOptions) => {
    setSnackbar(options);
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar(null);
  }, []);

  const show = useCallback(
    (
      variant: SnackbarVariant,
      title: string,
      body?: string,
      action?: SnackbarProps["action"],
      duration?: number
    ) => {
      showSnackbar({
        title,
        body,
        action,
        variant,
        duration,
      });
    },
    [showSnackbar]
  );

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
    show,
  };
};
