import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Loader2,
  Upload,
  AlertCircle,
} from "lucide-react";
import { destinationFormSchema, destinationFormDefaults } from "@/schemas/destination.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MONTHS = [
  "JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE",
  "JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER",
];

const inputSx = {
  backgroundColor: "var(--theme-elevated)",
  borderColor: "var(--theme-border)",
  color: "var(--theme-text-main)",
};

const labelSx = {
  color: "var(--theme-text-muted)",
  fontSize: "0.7rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  display: "block",
  marginBottom: 4,
};

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {message}
    </p>
  );
}

export function DestinationFormModal({
  isOpen,
  onClose,
  editingDestination,
  onSubmit,
  isSubmitting,
}) {
  const [bestSeasons, setBestSeasons] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(destinationFormSchema),
    defaultValues: destinationFormDefaults,
    mode: "onTouched",
  });

  useEffect(() => {
    if (isOpen) {
      if (editingDestination) {
        reset({
          name: editingDestination.name ?? "",
          region: editingDestination.region ?? "",
          description: editingDestination.description ?? "",
          difficulty: editingDestination.difficulty ?? "EASY",
          estimatedBudget: editingDestination.estimatedBudget ?? "",
          durationDays: editingDestination.durationDays ?? "",
          latitude: editingDestination.latitude ?? "",
          longitude: editingDestination.longitude ?? "",
          maxAltitudeM: editingDestination.maxAltitudeM ?? "",
          tags: Array.isArray(editingDestination.tags)
            ? editingDestination.tags.join(", ")
            : (editingDestination.tags ?? ""),
        });
        setBestSeasons(editingDestination.bestSeasons ?? []);
        setImagePreview(editingDestination.imageUrl ?? null);
      } else {
        reset(destinationFormDefaults);
        setBestSeasons([]);
        setImagePreview(null);
      }
      setImageFile(null);
    }
  }, [isOpen, editingDestination, reset]);

  if (!isOpen) return null;

  const handleClose = () => { if (!isSubmitting) onClose(); };

  const toggleSeason = (month) =>
    setBestSeasons((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const processSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name.trim());
    formData.append("region", data.region.trim());
    if (data.description) formData.append("description", data.description.trim());
    formData.append("difficulty", data.difficulty);
    if (data.estimatedBudget !== "" && data.estimatedBudget != null)
      formData.append("estimatedBudget", Number(data.estimatedBudget));
    if (data.durationDays !== "" && data.durationDays != null)
      formData.append("durationDays", Number(data.durationDays));
    if (data.latitude !== "" && data.latitude != null)
      formData.append("latitude", Number(data.latitude));
    if (data.longitude !== "" && data.longitude != null)
      formData.append("longitude", Number(data.longitude));
    if (data.maxAltitudeM !== "" && data.maxAltitudeM != null)
      formData.append("maxAltitudeM", Number(data.maxAltitudeM));
    bestSeasons.forEach((s) => formData.append("bestSeasons[]", s));
    if (data.tags?.trim()) {
      data.tags
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean)
        .forEach((t) => formData.append("tags[]", t));
    }
    if (imageFile) formData.append("image", imageFile);
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div
        className="relative w-full max-w-2xl rounded-2xl border shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col overflow-hidden"
        style={{
          backgroundColor: "var(--theme-surface)",
          borderColor: "var(--theme-border)",
          maxHeight: "90vh",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{ borderColor: "var(--theme-border)" }}
        >
          <h2 className="text-base font-bold" style={{ color: "var(--theme-text-main)" }}>
            {editingDestination ? "Edit Destination" : "Add New Destination"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-1 rounded-lg hover:opacity-75 disabled:opacity-40 cursor-pointer transition-opacity"
            style={{ color: "var(--theme-text-muted)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable form body */}
        <form
          onSubmit={handleSubmit(processSubmit)}
          className="overflow-y-auto flex-1 px-6 py-5 space-y-5"
        >
          {/* Name + Region */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={labelSx}>Destination Name *</label>
              <Input
                {...register("name")}
                placeholder="e.g. Everest Base Camp"
                className="h-9 rounded-xl text-sm"
                style={{ ...inputSx, borderColor: errors.name ? "rgb(239 68 68)" : "var(--theme-border)" }}
                disabled={isSubmitting}
              />
              <FieldError message={errors.name?.message} />
            </div>
            <div>
              <label style={labelSx}>Region *</label>
              <Input
                {...register("region")}
                placeholder="e.g. Khumbu, Solukhumbu"
                className="h-9 rounded-xl text-sm"
                style={{ ...inputSx, borderColor: errors.region ? "rgb(239 68 68)" : "var(--theme-border)" }}
                disabled={isSubmitting}
              />
              <FieldError message={errors.region?.message} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={labelSx}>Description</label>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Brief description of the destination..."
              disabled={isSubmitting}
              className="w-full px-3 py-2 rounded-xl border text-sm resize-none outline-none focus:ring-1 disabled:opacity-60"
              style={{ ...inputSx, borderColor: errors.description ? "rgb(239 68 68)" : "var(--theme-border)", minHeight: 72 }}
            />
            <FieldError message={errors.description?.message} />
          </div>

          {/* Difficulty + Budget + Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label style={labelSx}>Difficulty</label>
              <select
                {...register("difficulty")}
                disabled={isSubmitting}
                className="w-full h-9 px-3 rounded-xl border text-sm outline-none cursor-pointer disabled:opacity-60"
                style={inputSx}
              >
                <option value="EASY">Easy</option>
                <option value="MODERATE">Moderate</option>
                <option value="HARD">Hard</option>
              </select>
              <FieldError message={errors.difficulty?.message} />
            </div>
            <div>
              <label style={labelSx}>Budget (NPR)</label>
              <Input
                {...register("estimatedBudget")}
                type="number"
                min="0"
                placeholder="e.g. 50000"
                className="h-9 rounded-xl text-sm"
                style={{ ...inputSx, borderColor: errors.estimatedBudget ? "rgb(239 68 68)" : "var(--theme-border)" }}
                disabled={isSubmitting}
              />
              <FieldError message={errors.estimatedBudget?.message} />
            </div>
            <div>
              <label style={labelSx}>Duration (days)</label>
              <Input
                {...register("durationDays")}
                type="number"
                min="1"
                placeholder="e.g. 14"
                className="h-9 rounded-xl text-sm"
                style={{ ...inputSx, borderColor: errors.durationDays ? "rgb(239 68 68)" : "var(--theme-border)" }}
                disabled={isSubmitting}
              />
              <FieldError message={errors.durationDays?.message} />
            </div>
          </div>

          {/* Lat + Lon + Altitude */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label style={labelSx}>Latitude</label>
              <Input
                {...register("latitude")}
                type="number"
                step="any"
                placeholder="27.9881"
                className="h-9 rounded-xl text-sm"
                style={{ ...inputSx, borderColor: errors.latitude ? "rgb(239 68 68)" : "var(--theme-border)" }}
                disabled={isSubmitting}
              />
              <FieldError message={errors.latitude?.message} />
            </div>
            <div>
              <label style={labelSx}>Longitude</label>
              <Input
                {...register("longitude")}
                type="number"
                step="any"
                placeholder="86.9250"
                className="h-9 rounded-xl text-sm"
                style={{ ...inputSx, borderColor: errors.longitude ? "rgb(239 68 68)" : "var(--theme-border)" }}
                disabled={isSubmitting}
              />
              <FieldError message={errors.longitude?.message} />
            </div>
            <div>
              <label style={labelSx}>Max Altitude (m)</label>
              <Input
                {...register("maxAltitudeM")}
                type="number"
                min="0"
                placeholder="5364"
                className="h-9 rounded-xl text-sm"
                style={{ ...inputSx, borderColor: errors.maxAltitudeM ? "rgb(239 68 68)" : "var(--theme-border)" }}
                disabled={isSubmitting}
              />
              <FieldError message={errors.maxAltitudeM?.message} />
            </div>
          </div>

          {/* Best Seasons */}
          <div>
            <label style={labelSx}>Best Seasons</label>
            <div className="flex flex-wrap gap-2">
              {MONTHS.map((month) => {
                const selected = bestSeasons.includes(month);
                return (
                  <button
                    key={month}
                    type="button"
                    onClick={() => toggleSeason(month)}
                    disabled={isSubmitting}
                    className="px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer disabled:opacity-50"
                    style={
                      selected
                        ? { backgroundColor: "var(--theme-primary)", color: "var(--theme-primary-text)", borderColor: "var(--theme-primary)" }
                        : { backgroundColor: "transparent", color: "var(--theme-text-muted)", borderColor: "var(--theme-border)" }
                    }
                  >
                    {month.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label style={labelSx}>Tags (comma-separated)</label>
            <Input
              {...register("tags")}
              placeholder="e.g. trekking, himalaya, adventure"
              className="h-9 rounded-xl text-sm"
              style={inputSx}
              disabled={isSubmitting}
            />
            <FieldError message={errors.tags?.message} />
          </div>

          {/* Image Upload */}
          <div>
            <label style={labelSx}>Destination Image</label>
            <div
              className="flex items-center gap-4 p-3 rounded-xl border border-dashed cursor-pointer hover:opacity-80 transition-opacity"
              style={{ borderColor: "var(--theme-border)" }}
              onClick={() => !isSubmitting && fileRef.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-14 h-14 object-cover rounded-lg shrink-0" />
              ) : (
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--theme-elevated)" }}
                >
                  <Upload className="w-5 h-5" style={{ color: "var(--theme-text-muted)" }} />
                </div>
              )}
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--theme-text-main)" }}>
                  {imageFile ? imageFile.name : "Click to upload image"}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--theme-text-muted)" }}>
                  JPG, PNG, WEBP — max 5 MB
                </p>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 pb-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-xl font-semibold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="rounded-xl font-bold cursor-pointer"
              style={{ backgroundColor: "var(--theme-primary)", color: "var(--theme-primary-text)" }}
            >
              {isSubmitting ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />Saving...</>
              ) : editingDestination ? (
                "Save Changes"
              ) : (
                "Add Destination"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

