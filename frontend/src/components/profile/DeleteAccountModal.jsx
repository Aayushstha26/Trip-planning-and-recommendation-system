import React, { useState } from "react";
import { AlertTriangle, Trash2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDeleteAccount } from "@/hooks/useUserProfile";

export const DeleteAccountModal = ({ isOpen, onClose, userId, userEmail }) => {
  const [confirmText, setConfirmText] = useState("");
  const navigate = useNavigate();

  const { mutate: deleteAccount, isPending } = useDeleteAccount({
    onSuccess: () => {
      toast.success("Your account has been deleted. We are sorry to see you go!");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete account");
    },
  });

  if (!isOpen) return null;

  const isConfirmed = confirmText.trim().toUpperCase() === "DELETE";

  const handleDelete = () => {
    if (!isConfirmed || !userId) return;
    deleteAccount(userId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md rounded-3xl border p-6 sm:p-7 shadow-2xl relative"
        style={{
          backgroundColor: "var(--theme-surface-solid)",
          borderColor: "var(--theme-border)",
        }}
      >
        <button
          onClick={onClose}
          disabled={isPending}
          className="absolute top-5 right-5 p-1 rounded-xl text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-600 dark:text-red-400">
              Delete Account Permanently
            </h3>
            <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
              This action cannot be undone.
            </p>
          </div>
        </div>

        <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--theme-text-muted)" }}>
          Deleting your account will permanently remove your profile, memberships in travel groups,
          and trip recommendations associated with <strong>{userEmail}</strong>.
        </p>

        <div
          className="p-3.5 rounded-2xl border mb-5 space-y-2"
          style={{
            backgroundColor: "var(--theme-elevated)",
            borderColor: "var(--theme-border-subtle)",
          }}
        >
          <label
            htmlFor="delete-confirm-input"
            className="block text-xs font-semibold"
            style={{ color: "var(--theme-text-main)" }}
          >
            Type <span className="font-mono text-red-500 font-bold">DELETE</span> to confirm:
          </label>
          <Input
            id="delete-confirm-input"
            type="text"
            placeholder="Type DELETE"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            disabled={isPending}
            className="h-10 rounded-xl font-mono text-sm"
            style={{
              backgroundColor: "var(--theme-surface-solid)",
              borderColor: "var(--theme-border-subtle)",
            }}
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isPending}
            className="rounded-xl font-bold text-xs cursor-pointer transition-all active:scale-95"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={!isConfirmed || isPending}
            className="rounded-xl font-bold text-xs cursor-pointer shadow-sm transition-all active:scale-95 bg-red-600 hover:bg-red-700 text-white disabled:opacity-40"
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Deleting Account...
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Permanently Delete
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
