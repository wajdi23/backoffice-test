import { useRef } from "react";
import { Toast } from "primereact/toast";

export const useToast = () => {
  const toast = useRef<Toast>(null);

  const showToast = (severity: "success" | "error", message: string) => {
    toast.current?.show({
      severity,
      summary: severity === "success" ? "Succès" : "Erreur",
      detail: message,
      life: 3000,
    });
  };

  return {
    toast,
    success: (message: string) => showToast("success", message),
    error: (message: string) => showToast("error", message),
  };
};
