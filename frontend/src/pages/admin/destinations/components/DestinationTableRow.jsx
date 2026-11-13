import { Pencil, Trash2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";

const DIFFICULTY_STYLES = {
  EASY:     { bg: "rgba(34,197,94,0.12)",  color: "#22c55e", border: "rgba(34,197,94,0.3)"  },
  MODERATE: { bg: "rgba(234,179,8,0.12)", color: "#eab308", border: "rgba(234,179,8,0.3)"  },
  HARD:     { bg: "rgba(239,68,68,0.12)", color: "#ef4444", border: "rgba(239,68,68,0.3)"  },
};

const formatBudget = (val) =>
  val != null && val !== "" ? `NPR ${Number(val).toLocaleString()}` : "—";

export function DestinationTableRow({ destination, onEdit, onDelete }) {
  const diff = DIFFICULTY_STYLES[destination.difficulty] ?? DIFFICULTY_STYLES.EASY;

  return (
    <TableRow className="hover:bg-white/[0.02] transition-colors">
      {/* Name + thumbnail */}
      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-10 h-10 rounded-xl shrink-0 overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: "var(--theme-elevated)" }}
          >
            {destination.imageUrl ? (
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <MapPin className="w-4 h-4" style={{ color: "var(--theme-text-muted)" }} />
            )}
          </div>
          <p
            className="text-sm font-semibold truncate max-w-[180px]"
            style={{ color: "var(--theme-text-main)" }}
          >
            {destination.name}
          </p>
        </div>
      </TableCell>

      {/* Region */}
      <TableCell
        className="px-4 py-3 text-sm truncate max-w-[140px]"
        style={{ color: "var(--theme-text-muted)" }}
      >
        {destination.region || "—"}
      </TableCell>

      {/* Difficulty */}
      <TableCell className="px-4 py-3">
        <Badge
          className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5"
          style={{
            backgroundColor: diff.bg,
            color: diff.color,
            border: `1px solid ${diff.border}`,
          }}
        >
          {destination.difficulty}
        </Badge>
      </TableCell>

      {/* Budget */}
      <TableCell className="px-4 py-3 text-sm" style={{ color: "var(--theme-text-muted)" }}>
        {formatBudget(destination.estimatedBudget)}
      </TableCell>

      {/* Duration */}
      <TableCell className="px-4 py-3 text-sm" style={{ color: "var(--theme-text-muted)" }}>
        {destination.durationDays != null ? `${destination.durationDays}d` : "—"}
      </TableCell>

      {/* Actions */}
      <TableCell className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onEdit(destination)}
            title="Edit destination"
            className="rounded-lg cursor-pointer hover:bg-white/10"
            style={{ color: "var(--theme-text-muted)" }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(destination)}
            title="Delete destination"
            className="text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

