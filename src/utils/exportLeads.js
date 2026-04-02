import * as XLSX from "xlsx";
import { format } from "date-fns";

export function exportLeadsToExcel(leads) {
  const rows = leads.map((lead) => ({
    "First Name": lead.first_name || "",
    "Phone": lead.phone || "",
    "Issue": lead.issue || "",
    "Urgency": lead.urgency || "",
    "Notes": lead.notes || "",
    "Status": lead.status || "",
    "Source": lead.source || "",
    "Last Step Completed": lead.last_step_completed ?? "",
    "Created Date": lead.created_date
      ? format(new Date(lead.created_date), "MMM d, yyyy h:mm a")
      : "",
    "Last Updated": lead.updated_date
      ? format(new Date(lead.updated_date), "MMM d, yyyy h:mm a")
      : "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Auto-size columns
  const colWidths = Object.keys(rows[0] || {}).map((key) => ({
    wch: Math.max(
      key.length,
      ...rows.map((r) => String(r[key] || "").length)
    ) + 2,
  }));
  worksheet["!cols"] = colWidths;

  // Bold header row
  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (worksheet[cellAddress]) {
      worksheet[cellAddress].s = { font: { bold: true } };
    }
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

  const fileName = `destination-home-leads-${format(new Date(), "yyyy-MM-dd")}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}