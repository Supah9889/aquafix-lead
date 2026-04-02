import React from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

export default function StepNotes({ value, onChange }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
    >
      <h2 className="text-[22px] font-bold text-accent text-center leading-snug">
        Anything else we should know?
      </h2>
      <p className="text-muted-foreground text-sm mt-2 mb-7 text-center">
        Optional — share any details that may help us prepare
      </p>
      <div className="w-full">
        <Textarea
          placeholder="e.g. The leak is in the basement near the water heater..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[150px] text-base rounded-md border border-border bg-white focus:border-primary resize-none"
        />
        <p className="text-xs text-muted-foreground mt-2 text-right">
          {value.length > 0 ? `${value.length} characters` : "Optional"}
        </p>
      </div>
    </motion.div>
  );
}