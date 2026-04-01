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
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function StepUrgency({ value, onSelect }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-foreground text-center leading-tight">
        How urgent is this?
      </h2>
      <p className="text-muted-foreground text-sm mt-2 mb-8 text-center">
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
                w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all duration-200
                ${selected
                  ? "border-primary bg-primary/8 shadow-md shadow-primary/10"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                }
                ${accent && !selected ? "border-destructive/30" : ""}
              `}
              whileTap={{ scale: 0.97 }}
            >
              <div className={`
                w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                ${selected ? "bg-primary text-primary-foreground" : accent ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}
              `}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-base font-medium ${selected ? "text-foreground" : "text-foreground/80"}`}>
                {label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}