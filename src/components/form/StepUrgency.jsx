import React from "react";
import { motion } from "framer-motion";
import { Zap, Clock, CalendarDays, Eye } from "lucide-react";

const OPTIONS = [
  { label: "Emergency (today)", icon: Zap, accent: true },
  { label: "Within a few days", icon: Clock },
  { label: "Within a week", icon: CalendarDays },
  { label: "Just looking", icon: Eye },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

export default function StepUrgency({ value, onSelect }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-[22px] font-bold text-accent text-center leading-snug">
        How urgent is this?
      </h2>
      <p className="text-muted-foreground text-sm mt-2 mb-7 text-center">
        This helps us prioritize your request
      </p>
      <motion.div
        className="w-full flex flex-col gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {OPTIONS.map(({ label, icon: Icon, accent }) => {
          const selected = value === label;
          return (
            <motion.button
              key={label}
              variants={item}
              onClick={() => onSelect(label)}
              className={`
                w-full flex items-center gap-4 px-5 py-4 rounded-lg border text-left transition-all duration-200
                ${selected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-white hover:border-primary/50 hover:shadow-sm"
                }
                ${accent && !selected ? "border-red-200" : ""}
              `}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`
                w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0
                ${selected ? "bg-primary text-white" : accent ? "bg-red-50 text-red-500" : "bg-[#e8f4fc] text-primary"}
              `}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[15px] font-medium ${selected ? "text-accent" : "text-foreground/80"}`}>
                {label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}