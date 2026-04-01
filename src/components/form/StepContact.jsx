import React from "react";
import { motion } from "framer-motion";
import { User, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function StepContact({ firstName, phone, onChange, errors }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-foreground text-center leading-tight">
        How can we reach you?
      </h2>
      <p className="text-muted-foreground text-sm mt-2 mb-8 text-center">
        We'll call or text to schedule your assessment
      </p>
      <div className="w-full space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">First name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
            <Input
              placeholder="Your first name"
              value={firstName}
              onChange={(e) => onChange("first_name", e.target.value)}
              className={`pl-11 h-13 text-base rounded-xl border-2 ${errors.first_name ? "border-destructive" : "border-border focus:border-primary"}`}
            />
          </div>
          {errors.first_name && (
            <p className="text-destructive text-xs mt-1.5">{errors.first_name}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Phone number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
            <Input
              placeholder="(555) 123-4567"
              type="tel"
              value={phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className={`pl-11 h-13 text-base rounded-xl border-2 ${errors.phone ? "border-destructive" : "border-border focus:border-primary"}`}
            />
          </div>
          {errors.phone && (
            <p className="text-destructive text-xs mt-1.5">{errors.phone}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}