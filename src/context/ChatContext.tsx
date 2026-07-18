"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface ChatContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  pendingPrompt: string | null;
  consumePrompt: () => string | null;
  askAI: (prompt: string) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const askAI = useCallback((prompt: string) => {
    setPendingPrompt(prompt);
    setOpen(true);
  }, []);

  const consumePrompt = useCallback(() => {
    const p = pendingPrompt;
    setPendingPrompt(null);
    return p;
  }, [pendingPrompt]);

  return (
    <ChatContext.Provider value={{ open, setOpen, pendingPrompt, consumePrompt, askAI }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}