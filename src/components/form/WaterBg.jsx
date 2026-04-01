import React from "react";

export default function WaterBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Top gradient */}
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      {/* Bottom wave shapes */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-48 rounded-full bg-primary/3 blur-3xl" />
    </div>
  );
}