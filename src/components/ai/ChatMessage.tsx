import Link from "next/link";
import type { ChatMessage as Msg } from "@/types";

/** Renders assistant markdown links [Title](/trips/id) as Next.js Links */
function renderContent(content: string, onNavigate?: () => void) {
  const parts = content.split(/(\[[^\]]+\]\(\/trips\/[a-f0-9]{24}\))/g);

  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\((\/trips\/[a-f0-9]{24})\)$/);
    if (match) {
      return (
        <Link
          key={i}
          href={match[2]}
          onClick={onNavigate}
          className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dark"
        >
          {match[1]}
        </Link>
      );
    }
    // strip any other markdown bold markers for clean display
    return <span key={i}>{part.replace(/\*\*/g, "")}</span>;
  });
}

export function ChatMessageBubble({
  message,
  onNavigate,
}: {
  message: Msg;
  onNavigate?: () => void;
}) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-primary text-white"
            : "rounded-bl-sm bg-slate-100 text-slate-800"
        }`}
      >
        {isUser ? message.content : renderContent(message.content, onNavigate)}
      </div>
    </div>
  );
}