import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const useAutoSave = (data, saveFunction, delay = 2000) => {
  const timeoutRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip auto-save on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(async () => {
      try {
        await saveFunction(data);
        toast.success("Changes saved automatically", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true
        });
      } catch (error) {
        toast.error("Failed to auto-save changes", {
          position: "bottom-right",
          autoClose: 3000
        });
      }
    }, delay);

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, saveFunction, delay]);

  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
};