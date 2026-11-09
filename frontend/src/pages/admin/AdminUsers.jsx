import React, { useState } from "react";
import { Search, Trash2, Users, AlertTriangle, ShieldCheck, User, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import { useAdminUsers, useDeleteAdminUser } from "@/hooks/useAdminUsers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

const LIMIT = 10;

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [userToDelete, setUserToDelete] = useState(null);

  const currentAdmin = useAppSelector((s) => s.auth.user);

  // Debounced search
  const handleSearch = (val) => {
    setSearch(val);
    clearTimeout(window._adminSearchTimer);
    window._adminSearchTimer = setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1);
    }, 400);
  };

  const queryParams = {
    page,
    limit: LIMIT,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(roleFilter ? { role: roleFilter } : {}),
  };

  const { data, isLoading, isError } = useAdminUsers(queryParams);
  const users = data?.users ?? [];
  const pagination = data?.pagination ?? {};
  const totalPages = pagination.totalPages ?? 1;

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteAdminUser({
    onSuccess: () => {
      toast.success("User deleted successfully");
      setUserToDelete(null);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete user");
      setUserToDelete(null);
    },
  });

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--theme-text-main)" }}>
          User Accounts
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--theme-text-muted)" }}>
          View and manage registered accounts across WanderAI.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--theme-text-muted)" }} />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl text-sm"
            style={{
              backgroundColor: "var(--theme-elevated)",
              borderColor: "var(--theme-border)",
              color: "var(--theme-text-main)",
            }}
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 h-10 rounded-xl border text-sm outline-none cursor-pointer"
          style={{
            backgroundColor: "var(--theme-elevated)",
            borderColor: "var(--theme-border)",
            color: "var(--theme-text-main)",
          }}
        >
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow
              className="border-b hover:bg-transparent"
              style={{ backgroundColor: "var(--theme-elevated)", borderColor: "var(--theme-border)" }}
            >
              <TableHead className="px-4 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--theme-text-muted)" }}>
                User
              </TableHead>
              <TableHead className="px-4 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--theme-text-muted)" }}>
                Email
              </TableHead>
              <TableHead className="px-4 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--theme-text-muted)" }}>
                Role
              </TableHead>
              <TableHead className="px-4 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--theme-text-muted)" }}>
                Joined
              </TableHead>
              <TableHead className="px-4 text-right text-xs font-bold uppercase tracking-wider" style={{ color: "var(--theme-text-muted)" }}>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Loading Skeleton */}
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
                      <Skeleton className="h-4 w-28 rounded" />
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3"><Skeleton className="h-4 w-36 rounded" /></TableCell>
                  <TableCell className="px-4 py-3"><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                  <TableCell className="px-4 py-3"><Skeleton className="h-4 w-20 rounded" /></TableCell>
                  <TableCell className="px-4 py-3 text-right"><Skeleton className="w-7 h-7 rounded-lg inline-block" /></TableCell>
                </TableRow>
              ))}

            {/* Error State */}
            {isError && !isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2" style={{ color: "var(--theme-text-muted)" }}>
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                    <p className="text-sm">Failed to load users. Please try again.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Empty State */}
            {!isLoading && !isError && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2" style={{ color: "var(--theme-text-muted)" }}>
                    <Users className="w-8 h-8 opacity-40" />
                    <p className="text-sm">No users found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Rows */}
            {!isLoading &&
              !isError &&
              users.map((user) => {
                const isCurrentAdmin = user.id === currentAdmin?.id;
                return (
                  <TableRow key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden"
                          style={{ backgroundColor: "var(--theme-primary)", color: "var(--theme-primary-text)" }}
                        >
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            getInitials(user.name)
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: "var(--theme-text-main)" }}>
                            {user.name || "—"}
                            {isCurrentAdmin && (
                              <span
                                className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                                style={{ backgroundColor: "rgba(200,255,0,0.15)", color: "var(--theme-primary)" }}
                              >
                                You
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-sm truncate max-w-[200px]" style={{ color: "var(--theme-text-muted)" }}>
                      {user.email}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <Badge
                        className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5"
                        style={
                          user.role === "ADMIN"
                            ? { backgroundColor: "rgba(200,255,0,0.12)", color: "var(--theme-primary)", border: "1px solid rgba(200,255,0,0.25)" }
                            : { backgroundColor: "var(--theme-elevated)", color: "var(--theme-text-muted)", border: "1px solid var(--theme-border)" }
                        }
                      >
                        {user.role === "ADMIN" ? <ShieldCheck className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {user.role}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-xs" style={{ color: "var(--theme-text-muted)" }}>
                      {formatDate(user.createdAt)}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setUserToDelete(user)}
                        disabled={isCurrentAdmin}
                        title={isCurrentAdmin ? "Cannot delete yourself" : "Delete user"}
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10 disabled:opacity-25 cursor-pointer rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
            Page {page} of {totalPages}
            {pagination.total != null && ` · ${pagination.total} users`}
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

      {/* Global Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => deleteUser(userToDelete?.id)}
        title="Delete User Account?"
        description="Permanently delete this user account. This action cannot be undone."
        itemName={userToDelete?.name || userToDelete?.email}
        isLoading={isDeleting}
      />
    </div>
  );
}
