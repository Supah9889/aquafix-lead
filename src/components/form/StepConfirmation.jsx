import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Phone } from "lucide-react";

export default function StepConfirmation({ firstName }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center py-8"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
      >
        <CheckCircle2 className="w-10 h-10 text-primary" />
      </motion.div>

      <h2 className="text-2xl font-bold text-accent leading-tight">
        Thanks{firstName ? `, ${firstName}` : ""}!
      </h2>
      <p className="text-muted-foreground text-[15px] mt-3 max-w-xs leading-relaxed">
        We've received your request and will reach out shortly to schedule your free assessment.
      </p>

      <motion.div
        className="mt-8 w-full max-w-xs p-4 rounded-lg bg-white border border-border shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#e8f4fc] flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">Expect a call soon</p>
            <p className="text-xs text-muted-foreground">
              Usually within 1–2 hours during business hours
            </p>
          </div>
        </div>
      </motion.div>

      <p className="mt-6 text-xs text-muted-foreground">
        Questions? Call us at{" "}
        <a href="tel:8433159572" className="text-primary font-medium">(843) 315-9572</a>
      </p>
    </motion.div>
  );
}