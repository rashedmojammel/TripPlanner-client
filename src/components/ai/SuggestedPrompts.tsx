const SUGGESTIONS = [
  "Beach trips under ৳30,000",
  "Best 2-3 day trips from Dhaka",
  "Top-rated adventure trips",
  "International city breaks",
];

export function SuggestedPrompts({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          onClick={() => onPick(s)}
          className="cursor-pointer rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors duration-200 hover:bg-primary/10"
        >
          {s}
        </button>
      ))}
    </div>
  );
}