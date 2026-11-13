import { useState } from "react";
import { Plus, AlertTriangle, Mountain, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
  useDestinations,
  useCreateDestination,
  useUpdateDestination,
  useDeleteDestination,
} from "@/hooks/useDestinations";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  DestinationFormModal,
  DestinationFilters,
  DestinationTableRow,
} from "./components";

const LIMIT = 10;
const TABLE_HEADS = ["Destination", "Region", "Difficulty", "Budget", "Duration", "Actions"];

export default function AdminDestinations() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [destinationToDelete, setDestinationToDelete] = useState(null);

  const handleSearch = (val) => {
    setSearch(val);
    clearTimeout(window._adminDestSearchTimer);
    window._adminDestSearchTimer = setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1);
    }, 400);
  };

  const handleDifficultyChange = (val) => {
    setDifficultyFilter(val);
    setPage(1);
  };

  const queryParams = {
    page,
    limit: LIMIT,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(difficultyFilter ? { difficulty: difficultyFilter } : {}),
  };

  const { data, isLoading, isError } = useDestinations(queryParams);
  const destinations = data?.data ?? [];
  const pagination = data?.pagination ?? {};
  const totalPages = pagination.totalPages ?? 1;

  const { mutate: createDestination, isPending: isCreating } = useCreateDestination({
    onSuccess: () => { toast.success("Destination created!"); setFormOpen(false); },
    onError: (err) => toast.error(err?.message || "Failed to create destination."),
  });

  const { mutate: updateDestination, isPending: isUpdating } = useUpdateDestination({
    onSuccess: () => { toast.success("Destination updated!"); setFormOpen(false); setEditingDestination(null); },
    onError: (err) => toast.error(err?.message || "Failed to update destination."),
  });

  const { mutate: deleteDestination, isPending: isDeleting } = useDeleteDestination({
    onSuccess: () => { toast.success("Destination deleted."); setDestinationToDelete(null); },
    onError: (err) => { toast.error(err?.message || "Failed to delete destination."); setDestinationToDelete(null); },
  });

  const openCreate = () => { setEditingDestination(null); setFormOpen(true); };
  const openEdit = (dest) => { setEditingDestination(dest); setFormOpen(true); };

  const handleFormSubmit = (formData) => {
    if (editingDestination) {
      updateDestination({ id: editingDestination.id, data: formData });
    } else {
      createDestination(formData);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            style={{ color: "var(--theme-text-main)" }}
          >
            Destinations
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--theme-text-muted)" }}>
            Manage trekking destinations available on WanderAI.
          </p>
        </div>
        <Button
          onClick={openCreate}
          size="sm"
          className="rounded-xl font-bold cursor-pointer self-start sm:self-auto gap-1.5"
          style={{ backgroundColor: "var(--theme-primary)", color: "var(--theme-primary-text)" }}
        >
          <Plus className="w-4 h-4" />
          Add Destination
        </Button>
      </div>

      {/* Filters */}
      <DestinationFilters
        search={search}
        onSearchChange={handleSearch}
        difficulty={difficultyFilter}
        onDifficultyChange={handleDifficultyChange}
      />

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow
              className="border-b hover:bg-transparent"
              style={{ backgroundColor: "var(--theme-elevated)", borderColor: "var(--theme-border)" }}
            >
              {TABLE_HEADS.map((h, i) => (
                <TableHead
                  key={h}
                  className={`px-4 text-xs font-bold uppercase tracking-wider${i === TABLE_HEADS.length - 1 ? " text-right" : ""}`}
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Loading skeletons */}
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                      <Skeleton className="h-4 w-32 rounded" />
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3"><Skeleton className="h-4 w-24 rounded" /></TableCell>
                  <TableCell className="px-4 py-3"><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                  <TableCell className="px-4 py-3"><Skeleton className="h-4 w-20 rounded" /></TableCell>
                  <TableCell className="px-4 py-3"><Skeleton className="h-4 w-12 rounded" /></TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Skeleton className="w-7 h-7 rounded-lg" />
                      <Skeleton className="w-7 h-7 rounded-lg" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}

            {/* Error */}
            {isError && !isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2" style={{ color: "var(--theme-text-muted)" }}>
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                    <p className="text-sm">Failed to load destinations. Please try again.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!isLoading && !isError && destinations.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2" style={{ color: "var(--theme-text-muted)" }}>
                    <Mountain className="w-8 h-8 opacity-40" />
                    <p className="text-sm">No destinations found.</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={openCreate}
                      className="mt-1 rounded-xl cursor-pointer text-xs"
                    >
                      Add your first destination
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Rows */}
            {!isLoading && !isError && destinations.map((dest) => (
              <DestinationTableRow
                key={dest.id}
                destination={dest}
                onEdit={openEdit}
                onDelete={setDestinationToDelete}
              />
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
            Page {page} of {totalPages}
            {pagination.total != null && ` · ${pagination.total} destinations`}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-xl cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      <DestinationFormModal
        isOpen={formOpen}
        onClose={() => { if (!isCreating && !isUpdating) { setFormOpen(false); setEditingDestination(null); } }}
        editingDestination={editingDestination}
        onSubmit={handleFormSubmit}
        isSubmitting={isCreating || isUpdating}
      />

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(destinationToDelete)}
        onClose={() => setDestinationToDelete(null)}
        onConfirm={() => deleteDestination(destinationToDelete?.id)}
        title="Delete Destination?"
        description="Permanently remove this destination from WanderAI. This action cannot be undone."
        itemName={destinationToDelete?.name}
        isLoading={isDeleting}
      />
    </div>
  );
}

