import React, { useEffect } from "react";
import { AlertTriangle, Trash2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  description = "This action cannot be undone.",
  itemName,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
}) {
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
        onClick={() => {
          if (!isLoading) onClose();
        }}
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-sm rounded-2xl border p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        style={{
          backgroundColor: "var(--theme-surface, #161b22)",
          borderColor: "var(--theme-border, #30363d)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-1 rounded-lg hover:opacity-75 cursor-pointer disabled:opacity-40 transition-opacity"
          style={{ color: "var(--theme-text-muted, #8b949e)" }}
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon */}
        <div className="w-11 h-11 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
          <AlertTriangle className="w-5 h-5" />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-red-500 mb-1.5">
          {title}
        </h3>

        {/* Description & Item Name */}
        <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--theme-text-muted, #8b949e)" }}>
          {description}{" "}
          {itemName && (
            <span className="font-semibold block mt-1" style={{ color: "var(--theme-text-main, #ffffff)" }}>
              "{itemName}"
            </span>
          )}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded-xl font-semibold cursor-pointer"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-xl font-bold cursor-pointer bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                {confirmText}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

