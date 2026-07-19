"use client";

import { motion, AnimatePresence } from "framer-motion";
import { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, Props>(
  ({ label, error, icon, rightSlot, ...props }, ref) => (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-white px-3 transition-all duration-200 focus-within:ring-2 ${
          error
            ? "border-red-400 focus-within:border-red-400 focus-within:ring-red-100"
            : "border-slate-300 focus-within:border-primary focus-within:ring-primary/20"
        }`}
      >
        {icon && <span className="shrink-0 text-slate-400">{icon}</span>}
        <input
          ref={ref}
          {...props}
          className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400"
        />
        {rightSlot}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 4 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="text-xs font-medium text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
);
FormField.displayName = "FormField";