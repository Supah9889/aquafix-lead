import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Phone, User, MessageSquare, AlertTriangle, Clock, Tag } from "lucide-react";

const urgencyColors = {
  "Emergency (today)": "bg-destructive/10 text-destructive border-destructive/20",
  "Within a few days": "bg-chart-5/10 text-chart-5 border-chart-5/20",
  "Within a week": "bg-primary/10 text-primary border-primary/20",
  "Just looking": "bg-muted text-muted-foreground border-border",
};

export default function LeadTable({ leads, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40" />
        <p className="font-medium">No leads yet</p>
        <p className="text-sm mt-1">Submissions will appear here</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Phone</TableHead>
              <TableHead className="font-semibold">Issue</TableHead>
              <TableHead className="font-semibold">Urgency</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Source</TableHead>
              <TableHead className="font-semibold">Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{lead.first_name || "—"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm">{lead.phone || "—"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{lead.issue || "—"}</span>
                </TableCell>
                <TableCell>
                  {lead.urgency ? (
                    <Badge variant="outline" className={`text-xs ${urgencyColors[lead.urgency] || ""}`}>
                      {lead.urgency}
                    </Badge>
                  ) : "—"}
                </TableCell>
                <TableCell>
                  <Badge className={`text-xs ${
                    lead.status === "complete"
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-chart-5/10 text-chart-5 border border-chart-5/20"
                  }`}>
                    {lead.status || "partial"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {lead.source ? (
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground capitalize">{lead.source}</span>
                    </div>
                  ) : "—"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {lead.updated_date
                      ? format(new Date(lead.updated_date), "MMM d, h:mm a")
                      : format(new Date(lead.created_date), "MMM d, h:mm a")}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}