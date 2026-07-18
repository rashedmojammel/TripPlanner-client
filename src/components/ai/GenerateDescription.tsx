"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useGenerateContent, GeneratedContent } from "@/hooks/useGenerateContent";
import { Magnifier as Sparkle, ArrowsRotateRight } from "@gravity-ui/icons";

const selectClass =
  "cursor-pointer rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium outline-none focus:border-primary";

export function GenerateDescription({
  destination,
  durationDays,
  category,
  onGenerated,
}: {
  destination: string;
  durationDays: number;
  category: string;
  onGenerated: (content: GeneratedContent) => void;
}) {
  const [tone, setTone] = useState("exciting");
  const [length, setLength] = useState("medium");
  const { mutate, isPending, isSuccess } = useGenerateContent();

  const ready = destination.trim().length >= 2 && durationDays >= 1 && !!category;

  function generate() {
    if (!ready)
      return toast.error("Fill in destination, duration, and category first");
    mutate(
      { destination, durationDays, category, tone, length },
      {
        onSuccess: (content) => {
          onGenerated(content);
          toast.success("Descriptions generated — edit them freely!");
        },
        onError: () => toast.error("AI generation failed, please try again"),
      }
    );
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <p className="flex items-center gap-1.5 text-sm font-bold text-primary">
          <Sparkle className="h-4 w-4" /> AI Description Writer
        </p>

        <select value={tone} onChange={(e) => setTone(e.target.value)} className={selectClass} aria-label="Tone">
          <option value="exciting">Exciting</option>
          <option value="relaxing">Relaxing</option>
          <option value="luxurious">Luxurious</option>
          <option value="budget-friendly">Budget-friendly</option>
        </select>

        <select value={length} onChange={(e) => setLength(e.target.value)} className={selectClass} aria-label="Length">
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>

        <button
          type="button"
          onClick={generate}
          disabled={isPending}
          className="ml-auto flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white transition-colors duration-200 hover:bg-primary-dark disabled:opacity-60"
        >
          {isPending ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Writing...
            </>
          ) : isSuccess ? (
            <>
              <ArrowsRotateRight className="h-3.5 w-3.5" /> Regenerate
            </>
          ) : (
            "✨ Generate with AI"
          )}
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Fills both description fields from your destination, duration &amp; category — every result is editable.
      </p>
    </div>
  );
}