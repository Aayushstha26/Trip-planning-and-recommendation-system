import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Check, Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  preferenceSchema,
  AVAILABLE_INTERESTS,
  TRAVEL_MONTHS,
} from "@/schemas/preference.schema";
import { useSavePreference, useDeletePreference } from "@/hooks/usePreference";

const DIFFICULTY_OPTIONS = [
  { value: "EASY", label: "Easy", color: "#10b981" },
  { value: "MODERATE", label: "Moderate", color: "#f59e0b" },
  { value: "HARD", label: "Hard", color: "#ef4444" },
];

export const InlinePreferenceForm = ({ groupId, initialPreference = null }) => {
  const isEditing = Boolean(initialPreference);
  const [selectedInterests, setSelectedInterests] = useState([
    "Trekking & Hiking",
  ]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      budget: 25000,
      difficulty: "MODERATE",
      maxDurationDays: 7,
      interests: ["Trekking & Hiking"],
      preferredSeason: "OCTOBER",
    },
  });

  const currentBudget = watch("budget");
  const currentDuration = watch("maxDurationDays");

  useEffect(() => {
    if (initialPreference) {
      const interests =
        Array.isArray(initialPreference.interests) &&
        initialPreference.interests.length > 0
          ? initialPreference.interests
          : ["Trekking & Hiking"];
      setSelectedInterests(interests);
      reset({
        budget: initialPreference.budget ?? 25000,
        difficulty: initialPreference.difficulty ?? "MODERATE",
        maxDurationDays: initialPreference.maxDurationDays ?? 7,
        interests,
        preferredSeason: initialPreference.preferredSeason ?? "OCTOBER",
      });
    }
  }, [initialPreference, reset]);

  const toggleInterest = (interest) => {
    let next;
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length === 1) {
        toast.error("Keep at least one interest");
        return;
      }
      next = selectedInterests.filter((i) => i !== interest);
    } else {
      if (selectedInterests.length >= 6) {
        toast.error("Pick up to 6 interests");
        return;
      }
      next = [...selectedInterests, interest];
    }
    setSelectedInterests(next);
    setValue("interests", next, { shouldValidate: true });
  };

  const { mutate: savePreference, isPending: isSaving } = useSavePreference({
    onSuccess: () =>
      toast.success(isEditing ? "Preferences updated!" : "Preferences saved!"),
    onError: (err) => toast.error(err?.message || "Failed to save preferences"),
  });

  const { mutate: deletePreference, isPending: isDeleting } =
    useDeletePreference({
      onSuccess: () => {
        toast.success("Preferences cleared");
        const defaultInterests = ["Trekking & Hiking"];
        setSelectedInterests(defaultInterests);
        reset({
          budget: 25000,
          difficulty: "MODERATE",
          maxDurationDays: 7,
          interests: defaultInterests,
          preferredSeason: "OCTOBER",
        });
      },
      onError: (err) =>
        toast.error(err?.message || "Failed to clear preferences"),
    });

  const onSubmit = (data) => {
    const payload = {
      budget: Number(data.budget),
      difficulty: data.difficulty,
      maxDurationDays: Number(data.maxDurationDays),
      interests: selectedInterests,
    };
    if (data.preferredSeason) payload.preferredSeason = data.preferredSeason;
    savePreference({ groupId, data: payload });
  };

  return (
    <div
      className="rounded-3xl border shadow-sm overflow-hidden"
      style={{
        backgroundColor: "var(--theme-surface-solid)",
        borderColor: "var(--theme-border)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 border-b flex items-center justify-between"
        style={{ borderColor: "var(--theme-border-subtle)" }}
      >
        <div>
          <div className="flex items-center gap-2">
            <h3
              className="text-base font-black"
              style={{ color: "var(--theme-text-main)" }}
            >
              Your Travel Preferences
            </h3>
            {isEditing && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <CheckCircle2 className="h-2.5 w-2.5" /> Saved
              </span>
            )}
          </div>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Quick inputs — group AI matches destinations to everyone&apos;s
            answers.
          </p>
        </div>
        {isEditing && (
          <button
            type="button"
            disabled={isDeleting || isSaving}
            onClick={() => deletePreference(groupId)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors cursor-pointer"
          >
            {isDeleting ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Trash2 className="h-3 w-3" />
            )}
            Clear
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* ── Row 1: Budget + Duration side by side ── */}
        <div className="grid grid-cols-2 gap-4">
          {/* Budget */}
          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wider mb-1.5"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Max Budget / Person
            </label>
            <div className="flex items-center gap-1.5">
              <span
                className="text-xs font-semibold shrink-0"
                style={{ color: "var(--theme-text-muted)" }}
              >
                NPR
              </span>
              <input
                type="number"
                step="500"
                className="w-full border rounded-xl px-3 py-2 text-sm font-bold focus:outline-none"
                style={{
                  backgroundColor: "var(--theme-elevated)",
                  borderColor: errors.budget
                    ? "rgb(239 68 68)"
                    : "var(--theme-border-subtle)",
                  color: "var(--theme-text-main)",
                }}
                {...register("budget")}
              />
            </div>
            {/* Quick Pills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[15, 25, 50, 100].map((k) => {
                const val = k * 1000;
                const selected = Number(currentBudget) === val;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() =>
                      setValue("budget", val, { shouldValidate: true })
                    }
                    className="px-2 py-0.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer"
                    style={{
                      backgroundColor: selected
                        ? "var(--theme-elevated)"
                        : "transparent",
                      borderColor: "var(--theme-border-subtle)",
                      color: selected
                        ? "var(--theme-text-main)"
                        : "var(--theme-text-muted)",
                    }}
                  >
                    {k}k
                  </button>
                );
              })}
            </div>
            {errors.budget && (
              <p className="mt-1 text-xs text-red-500">
                {errors.budget.message}
              </p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wider mb-1.5"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Max Days
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setValue(
                    "maxDurationDays",
                    Math.max(1, (Number(currentDuration) || 7) - 1),
                    { shouldValidate: true },
                  )
                }
                className="h-9 w-9 rounded-xl border font-bold text-base cursor-pointer flex items-center justify-center transition hover:bg-slate-100 dark:hover:bg-slate-800"
                style={{
                  borderColor: "var(--theme-border-subtle)",
                  color: "var(--theme-text-main)",
                }}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max="60"
                className="flex-1 border rounded-xl px-2 py-2 text-sm font-black text-center focus:outline-none"
                style={{
                  backgroundColor: "var(--theme-elevated)",
                  borderColor: errors.maxDurationDays
                    ? "rgb(239 68 68)"
                    : "var(--theme-border-subtle)",
                  color: "var(--theme-text-main)",
                }}
                {...register("maxDurationDays")}
              />
              <button
                type="button"
                onClick={() =>
                  setValue(
                    "maxDurationDays",
                    Math.min(60, (Number(currentDuration) || 7) + 1),
                    { shouldValidate: true },
                  )
                }
                className="h-9 w-9 rounded-xl border font-bold text-base cursor-pointer flex items-center justify-center transition hover:bg-slate-100 dark:hover:bg-slate-800"
                style={{
                  borderColor: "var(--theme-border-subtle)",
                  color: "var(--theme-text-main)",
                }}
              >
                +
              </button>
            </div>
            <p
              className="mt-1.5 text-[11px] text-center"
              style={{ color: "var(--theme-text-muted)" }}
            >
              {Number(currentDuration) === 1
                ? "1 day"
                : `up to ${currentDuration || 7} days`}
            </p>
            {errors.maxDurationDays && (
              <p className="mt-0.5 text-xs text-red-500">
                {errors.maxDurationDays.message}
              </p>
            )}
          </div>
        </div>

        {/* ── Difficulty ── */}
        <div>
          <label
            className="block text-xs font-bold uppercase tracking-wider mb-2"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Trekking Difficulty
          </label>
          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-3 gap-2">
                {DIFFICULTY_OPTIONS.map((opt) => {
                  const sel = field.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => field.onChange(opt.value)}
                      className="py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      style={{
                        backgroundColor: sel
                          ? "var(--theme-elevated)"
                          : "transparent",
                        borderColor: "var(--theme-border-subtle)",
                        color: sel
                          ? "var(--theme-text-main)"
                          : "var(--theme-text-muted)",
                      }}
                    >
                      {sel && (
                        <Check
                          className="h-3 w-3"
                          style={{ color: "var(--theme-text-main)" }}
                        />
                      )}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.difficulty && (
            <p className="mt-1 text-xs text-red-500">
              {errors.difficulty.message}
            </p>
          )}
        </div>

        {/* ── Interests ── */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Interests
            </label>
            <span
              className="text-[11px]"
              style={{ color: "var(--theme-text-muted)" }}
            >
              {selectedInterests.length} / 6 selected
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {AVAILABLE_INTERESTS.map((interest) => {
              const sel = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer"
                  style={{
                    backgroundColor: sel
                      ? "var(--theme-elevated)"
                      : "transparent",
                    borderColor: "var(--theme-border-subtle)",
                    color: sel
                      ? "var(--theme-text-main)"
                      : "var(--theme-text-muted)",
                  }}
                >
                  {sel && (
                    <Check
                      className="h-3 w-3"
                      style={{ color: "var(--theme-text-main)" }}
                    />
                  )}
                  {interest}
                </button>
              );
            })}
          </div>
          {errors.interests && (
            <p className="mt-1 text-xs text-red-500">
              {errors.interests.message}
            </p>
          )}
        </div>

        {/* ── Preferred Month ── */}
        <div>
          <label
            className="block text-xs font-bold uppercase tracking-wider mb-2"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Preferred Month{" "}
            <span className="normal-case font-normal">(optional)</span>
          </label>
          <Controller
            name="preferredSeason"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-1.5">
                {TRAVEL_MONTHS.map((m) => {
                  const sel = field.value === m.value;
                  return (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => field.onChange(sel ? null : m.value)}
                      className="px-3 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer"
                      style={{
                        backgroundColor: sel
                          ? "var(--theme-elevated)"
                          : "transparent",
                        borderColor: "var(--theme-border-subtle)",
                        color: sel
                          ? "var(--theme-text-main)"
                          : "var(--theme-text-muted)",
                      }}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>

        {/* ── Submit ── */}
        <div className="pt-1">
          <Button
            type="submit"
            disabled={isSaving || isDeleting}
            className="w-full rounded-xl font-bold text-sm py-3 cursor-pointer transition-all hover:brightness-95 active:scale-[0.98]"
            style={{
              backgroundColor: "var(--theme-btn-bg, #c8ff00)",
              color: "var(--theme-btn-text, #06110d)",
            }}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : isEditing ? (
              "Update Preferences"
            ) : (
              "Save Preferences"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InlinePreferenceForm;