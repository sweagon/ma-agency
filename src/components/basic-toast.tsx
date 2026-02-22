"use client";

import { Toast, Toaster, createToaster } from "@ark-ui/react/toast";
import { Portal } from "@ark-ui/react/portal";
import { X, CheckCircle, AlertCircle } from "lucide-react";

// Create a single toaster instance
export const toaster = createToaster({
  placement: "bottom-end",
  gap: 16,
  overlap: true,
});

// Toast component with success/error styling
export function BasicToast() {
  return (
    <Portal>
      <Toaster toaster={toaster}>
        {(toast) => {
          // Determine styles based on toast type
          const isSuccess = toast.type === "success";
          const isError = toast.type === "error";

          const bgColor = isSuccess
            ? "bg-green-50 border-green-500"
            : isError
              ? "bg-red-50 border-red-500"
              : "bg-white border-gray-100";

          const titleColor = isSuccess
            ? "text-green-800"
            : isError
              ? "text-red-800"
              : "text-gray-900";

          const descColor = isSuccess
            ? "text-green-600"
            : isError
              ? "text-red-600"
              : "text-gray-600";

          const Icon = isSuccess
            ? CheckCircle
            : isError
              ? AlertCircle
              : null;

          return (
            <Toast.Root
              className={`${bgColor} rounded-lg shadow-lg border-l-4 min-w-80 p-4 relative overflow-anywhere transition-all duration-300 ease-default will-change-transform h-(--height) opacity-(--opacity) translate-x-(--x) translate-y-(--y) scale-(--scale) z-(--z-index)`}
            >
              <div className="flex items-start gap-3">
                {Icon && (
                  <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${isSuccess ? "text-green-500" : "text-red-500"
                    }`} />
                )}
                <div className="flex-1">
                  <Toast.Title className={`${titleColor} font-semibold text-sm`}>
                    {toast.title}
                  </Toast.Title>
                  <Toast.Description className={`${descColor} text-sm mt-1`}>
                    {toast.description}
                  </Toast.Description>
                </div>
              </div>
              <Toast.CloseTrigger className="absolute top-3 right-3 p-1 hover:bg-black/10 rounded transition-colors">
                <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
              </Toast.CloseTrigger>
            </Toast.Root>
          );
        }}
      </Toaster>
    </Portal>
  );
}

// Helper functions to show toasts
export const showSuccessToast = (title: string, description: string) => {
  toaster.create({
    title,
    description,
    type: "success",
  });
};

export const showErrorToast = (title: string, description: string) => {
  toaster.create({
    title,
    description,
    type: "error",
  });
};