import React from "react";

export default function WaterBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Soft sky-blue top wash */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#daeeff] to-transparent opacity-60" />
      {/* Subtle orb accents */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#3a9fd4]/8 blur-3xl" />
      <div className="absolute top-40 -left-24 w-56 h-56 rounded-full bg-[#3a9fd4]/6 blur-3xl" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#daeeff]/30 to-transparent" />
    </div>
  );
}