import { useCallback, useState } from "react";
import type { ToastProps } from "./types";

export type UseToastOptions = Omit<ToastProps, "onClose">;

export function useToast() {
  const [toast, setToast] = useState<UseToastOptions | null>(null);

  const showToast = useCallback((options: UseToastOptions) => {
    setToast(options);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
}
