import { useState, useCallback } from "react";
import type { SnackbarProps } from "./index";

interface UseSnackbarOptions extends Omit<SnackbarProps, "onClose"> {
  duration?: number;
  icon?: React.ReactNode;
}

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<UseSnackbarOptions | null>(null);

  const showSnackbar = useCallback((options: UseSnackbarOptions) => {
    setSnackbar(options);
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar(null);
  }, []);

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
  };
};
