import React from "react";
import { motion } from "framer-motion";

const TOTAL_STEPS = 4;

export default function ProgressBar({ currentStep }) {
  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
          Step {currentStep} of {TOTAL_STEPS}
        </span>
        <span className="text-xs font-semibold text-primary">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}