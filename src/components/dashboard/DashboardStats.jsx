import React from "react";
import { Users, CheckCircle2, Clock, Zap } from "lucide-react";

export default function DashboardStats({ leads }) {
  const total = leads.length;
  const complete = leads.filter((l) => l.status === "complete").length;
  const partial = leads.filter((l) => l.status === "partial").length;
  const emergencies = leads.filter((l) => l.urgency === "Emergency (today)").length;

  const stats = [
    { label: "Total Leads", value: total, icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Complete", value: complete, icon: CheckCircle2, color: "bg-accent/10 text-accent" },
    { label: "Partial", value: partial, icon: Clock, color: "bg-chart-5/10 text-chart-5" },
    { label: "Emergencies", value: emergencies, icon: Zap, color: "bg-destructive/10 text-destructive" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4"
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}