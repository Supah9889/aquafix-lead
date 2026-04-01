import React from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

export default function StepNotes({ value, onChange }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-foreground text-center leading-tight">
        Anything else we should know?
      </h2>
      <p className="text-muted-foreground text-sm mt-2 mb-8 text-center">
        Optional — share any details about your situation
      </p>
      <div className="w-full">
        <Textarea
          placeholder="e.g. The leak is in the basement near the water heater..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[140px] text-base rounded-xl border-2 border-border focus:border-primary resize-none"
        />
        <p className="text-xs text-muted-foreground mt-2 text-right">
          {value.length > 0 ? `${value.length} characters` : "Optional"}
        </p>
      </div>
    </motion.div>
  );
}