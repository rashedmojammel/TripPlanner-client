"use client";

import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { ChatMessage } from "@/types";

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
      // history sent to API excludes the local welcome message
      const history = [...messages.filter((m) => m !== WELCOME), userMsg];

      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      try {
        const res = await api.post<{ data: { reply: string } }>("/ai/chat", {
          messages: history.slice(-10),
        });
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: res.data.data.reply },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I hit a snag answering that. Please try again in a moment.",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, isTyping]
  );

  return { messages, isTyping, send };
}