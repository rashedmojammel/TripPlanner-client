"use client";

import { useState, useCallback } from "react";
import type { ChatMessage } from "@/types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm your TripPlanner concierge 👋 Tell me your budget, dates, or dream destination and I'll find the perfect trip from our catalog.",
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [isTyping, setIsTyping] = useState(false);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || isTyping) return;

      const userMsg: ChatMessage = { role: "user", content };
      const history = [...messages.filter((m) => m !== WELCOME), userMsg];

      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      try {
        const res = await fetch(`${API}/ai/chat`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history.slice(-10) }),
        });
        if (!res.ok || !res.body) throw new Error("Chat failed");

        // add an empty assistant message, then grow it token by token
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
        setIsTyping(false);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const token = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            next[next.length - 1] = { ...last, content: last.content + token };
            return next;
          });
        }
      } catch {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I hit a snag answering that. Please try again in a moment.",
          },
        ]);
      }
    },
    [messages, isTyping]
  );

  return { messages, isTyping, send };
}