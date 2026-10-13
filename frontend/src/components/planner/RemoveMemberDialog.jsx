import { UserX, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * RemoveMemberDialog Component
 * Confirmation dialog for an owner removing a member from the trip group.
 */
export const RemoveMemberDialog = ({ isOpen, onClose, onConfirm, isRemoving, member }) => {
  if (!isOpen || !member) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm rounded-3xl border p-6 shadow-2xl"
        style={{
          backgroundColor: 'var(--theme-surface-solid)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <h3 className="text-lg font-bold" style={{ color: 'var(--theme-text-main)' }}>
          Remove Traveler?
        </h3>
        <p className="text-xs mt-2" style={{ color: 'var(--theme-text-muted)' }}>
          Remove <strong>{member.user?.name || member.user?.email}</strong> from this trip group?
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
            disabled={isRemoving}
            onClick={onConfirm}
            className="rounded-xl font-bold cursor-pointer"
          >
            {isRemoving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
            ) : (
              <UserX className="h-3.5 w-3.5 mr-1" />
            )}
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RemoveMemberDialog
