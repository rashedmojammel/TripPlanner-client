"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { ChatMessageBubble } from "./ChatMessage";
// import { TypingIndicator } from "./TypingIndicator";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { Comment, Xmark, PaperPlane } from "@gravity-ui/icons";
import { TypingIndicator } from "./TypingIndicator";
 import { useChatContext } from "@/context/ChatContext";

export function ChatWidget() {

// replace: const [open, setOpen] = useState(false);
const { open, setOpen, pendingPrompt, consumePrompt } = useChatContext();
  const [input, setInput] = useState("");
  const { messages, isTyping, send } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // auto-scroll to newest message
  useEffect(() => {
  if (open && pendingPrompt) {
    const p = consumePrompt();
    if (p) send(p);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [open, pendingPrompt]);


  function handleSend() {
    if (!input.trim()) return;
    send(input);
    setInput("");
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close travel concierge" : "Open travel concierge"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-110"
      >
        {open ? <Xmark className="h-6 w-6" /> : <Comment className="h-6 w-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[min(560px,calc(100vh-8rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
            <p className="font-bold">Travel Concierge</p>
            <p className="text-xs text-white/80">
              AI assistant · knows every trip in our catalog
            </p>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <ChatMessageBubble key={i} message={m} onNavigate={() => setOpen(false)} />
            ))}
            {isTyping && <TypingIndicator />}

            {messages.length === 1 && (
              <div className="pt-2">
                <p className="mb-2 text-xs font-medium text-slate-400">Try asking:</p>
                <SuggestedPrompts onPick={send} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask about trips, budgets, dates..."
                className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="cursor-pointer text-primary transition-colors hover:text-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                <PaperPlane className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}