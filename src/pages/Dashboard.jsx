import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

import DashboardStats from "../components/dashboard/DashboardStats";
import LeadTable from "../components/dashboard/LeadTable";
import DashboardToolbar from "../components/dashboard/DashboardToolbar";
import DeleteConfirmModal from "../components/dashboard/DeleteConfirmModal";
import { exportLeadsToExcel } from "../utils/exportLeads";

export default function Dashboard() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [deleteTarget, setDeleteTarget] = useState(null); // single lead or "bulk"
  const [isDeleting, setIsDeleting] = useState(false);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: () => base44.entities.Lead.list("-created_date", 200),
  });

  const filtered = leads.filter((lead) => {
    const statusMatch = statusFilter === "all" || lead.status === statusFilter;
    const searchMatch =
      !search ||
      (lead.first_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (lead.phone || "").includes(search) ||
      (lead.issue || "").toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  // Selection helpers
  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = (checked) => {
    setSelectedIds(checked ? new Set(filtered.map((l) => l.id)) : new Set());
  };

  // Deletion
  const handleDeleteSingle = (lead) => setDeleteTarget({ type: "single", lead });
  const handleDeleteBulk = () => setDeleteTarget({ type: "bulk" });

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      if (deleteTarget.type === "single") {
        await base44.entities.Lead.delete(deleteTarget.lead.id);
        setSelectedIds((prev) => { const n = new Set(prev); n.delete(deleteTarget.lead.id); return n; });
        toast({ title: "Lead deleted", description: "The lead has been permanently removed." });
      } else {
        await Promise.all([...selectedIds].map((id) => base44.entities.Lead.delete(id)));
        const count = selectedIds.size;
        setSelectedIds(new Set());
        toast({ title: `${count} lead${count !== 1 ? "s" : ""} deleted`, description: "Selected leads have been permanently removed." });
      }
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      setDeleteTarget(null);
    } catch {
      toast({ title: "Deletion failed", description: "Something went wrong. Please try again.", variant: "destructive" });
    }
    setIsDeleting(false);
  };

  // Export
  const handleExport = () => {
    if (filtered.length === 0) {
      toast({ title: "Nothing to export", description: "No leads match the current filters." });
      return;
    }
    exportLeadsToExcel(filtered);
    toast({ title: "Export started", description: `Exporting ${filtered.length} leads to Excel.` });
  };

  const deleteCount = deleteTarget?.type === "bulk" ? selectedIds.size : 1;

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <img
            src="https://media.base44.com/images/public/69cd76565105bbe715f914f5/d1df888c8_image.png"
            alt="Destination Home"
            className="h-10 w-auto object-contain"
          />
          <h1 className="text-lg font-bold text-foreground">Lead Dashboard</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <DashboardStats leads={leads} />

        <DashboardToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          selectedCount={selectedIds.size}
          onBulkDelete={handleDeleteBulk}
          onExport={handleExport}
        />

        <LeadTable
          leads={filtered}
          isLoading={isLoading}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onToggleAll={toggleAll}
          onDelete={handleDeleteSingle}
        />
      </main>

      <DeleteConfirmModal
        open={!!deleteTarget}
        onClose={() => !isDeleting && setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        count={deleteCount}
        isDeleting={isDeleting}
      />
    </div>
  );
}