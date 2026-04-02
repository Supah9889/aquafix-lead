import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteConfirmModal({ open, onClose, onConfirm, count = 1, isDeleting }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <DialogTitle className="text-foreground">
            {count === 1 ? "Delete this lead?" : `Delete ${count} leads?`}
          </DialogTitle>
          <DialogDescription>
            {count === 1
              ? "Are you sure you want to permanently delete this lead? This action cannot be undone."
              : `Are you sure you want to permanently delete ${count} selected leads? This action cannot be undone.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="gap-2"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {count === 1 ? "Delete Lead" : `Delete ${count} Leads`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}