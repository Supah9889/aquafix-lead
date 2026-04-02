import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Trash2 } from "lucide-react";

export default function DashboardToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  selectedCount,
  onBulkDelete,
  onExport,
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or issue..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-11 rounded-xl border-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-40 h-11 rounded-xl border-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={onExport}
          variant="outline"
          className="h-11 rounded-xl border-2 gap-2 font-medium text-primary border-primary/40 hover:bg-primary/5"
        >
          <Download className="w-4 h-4" />
          Export Excel
        </Button>
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center justify-between bg-destructive/5 border border-destructive/20 rounded-xl px-4 py-2.5">
          <span className="text-sm font-medium text-destructive">
            {selectedCount} lead{selectedCount !== 1 ? "s" : ""} selected
          </span>
          <Button
            variant="destructive"
            size="sm"
            onClick={onBulkDelete}
            className="gap-2 h-8"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Selected
          </Button>
        </div>
      )}
    </div>
  );
}