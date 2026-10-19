import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LeaveTripDialog({ isOpen, onClose, onConfirm, isLeaving, groupName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm rounded-3xl border p-6 shadow-2xl"
        style={{
          backgroundColor: "var(--theme-surface-solid)",
          borderColor: "var(--theme-border)",
        }}
      >
        <h3
          className="text-lg font-bold"
          style={{ color: "var(--theme-text-main)" }}
        >
          Leave Travel Group?
        </h3>
        <p
          className="text-xs mt-2"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Are you sure you want to leave <strong>{groupName}</strong>? You will
          no longer receive updates or be part of this trip unless re-invited.
        </p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="rounded-xl font-bold cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            disabled={isLeaving}
            onClick={onConfirm}
            className="rounded-xl font-bold cursor-pointer"
          >
            {isLeaving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
            ) : (
              <LogOut className="h-3.5 w-3.5 mr-1" />
            )}
            Leave Trip
          </Button>
        </div>
      </div>
    </div>
  );
}
