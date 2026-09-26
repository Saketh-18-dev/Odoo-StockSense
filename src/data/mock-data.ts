export type Status = "In Stock" | "Low Stock" | "Out of Stock" | "Pending" | "Ready" | "Completed" | "Scheduled" | "Draft" | "Active";

export const products = [
  { name: "Ergonomic Office Chair", sku: "FUR-CHA-001", category: "Furniture", unit: "Unit", stock: 184, reorder: 40, status: "In Stock" as Status, warehouse: "North Hub", location: "A-12-04" },
  { name: "Wireless Keyboard", sku: "ELE-KEY-024", category: "Electronics", unit: "Unit", stock: 28, reorder: 35, status: "Low Stock" as Status, warehouse: "Central Depot", location: "C-03-12" },
  { name: "A4 Copy Paper", sku: "OFF-PAP-101", category: "Office Supplies", unit: "Box", stock: 520, reorder: 100, status: "In Stock" as Status, warehouse: "North Hub", location: "B-08-02" },
  { name: "27-inch Monitor", sku: "ELE-MON-027", category: "Electronics", unit: "Unit", stock: 0, reorder: 15, status: "Out of Stock" as Status, warehouse: "East Point", location: "D-02-06" },
  { name: "Standing Desk", sku: "FUR-DSK-018", category: "Furniture", unit: "Unit", stock: 62, reorder: 20, status: "In Stock" as Status, warehouse: "Central Depot", location: "A-01-08" },
  { name: "Packing Tape", sku: "PAC-TAP-044", category: "Packaging", unit: "Roll", stock: 92, reorder: 120, status: "Low Stock" as Status, warehouse: "West Annex", location: "P-04-01" },
];

export const warehouses = [
  { name: "North Hub", code: "WH-N01", location: "Brooklyn, NY", products: 824, stock: "14,280", low: 18, utilization: 78 },
  { name: "Central Depot", code: "WH-C02", location: "Columbus, OH", products: 612, stock: "9,840", low: 11, utilization: 64 },
  { name: "East Point", code: "WH-E03", location: "Newark, NJ", products: 438, stock: "7,215", low: 8, utilization: 51 },
  { name: "West Annex", code: "WH-W04", location: "Reno, NV", products: 291, stock: "4,692", low: 5, utilization: 42 },
];

export const operationData = {
  receipts: {
    title: "Receipts", description: "Track incoming stock from suppliers.", action: "New receipt",
    columns: ["Receipt Number", "Supplier", "Warehouse", "Items", "Date", "Status"],
    rows: [["REC-2026-1048", "Apex Office Co.", "North Hub", "12 items", "Sep 26, 2026", "Pending"], ["REC-2026-1047", "Nova Electronics", "Central Depot", "8 items", "Sep 25, 2026", "Ready"], ["REC-2026-1046", "PackRight Supply", "West Annex", "24 items", "Sep 24, 2026", "Completed"], ["REC-2026-1045", "Metro Furnishings", "East Point", "6 items", "Sep 23, 2026", "Completed"]],
  },
  deliveries: {
    title: "Delivery Orders", description: "Manage customer shipments and fulfillment.", action: "New delivery",
    columns: ["Delivery Number", "Customer", "Warehouse", "Items", "Date", "Status"],
    rows: [["DEL-2026-0832", "Riverside Studio", "North Hub", "5 items", "Sep 26, 2026", "Ready"], ["DEL-2026-0831", "Brightline Media", "Central Depot", "14 items", "Sep 26, 2026", "Pending"], ["DEL-2026-0830", "Juniper Health", "East Point", "3 items", "Sep 25, 2026", "Completed"], ["DEL-2026-0829", "Cobalt Works", "West Annex", "9 items", "Sep 24, 2026", "Completed"]],
  },
  transfers: {
    title: "Internal Transfers", description: "Coordinate stock movement between warehouses.", action: "New transfer",
    columns: ["Transfer Number", "From", "To", "Product", "Quantity", "Date", "Status"],
    rows: [["TRF-2026-0314", "North Hub", "East Point", "Wireless Keyboard", "40", "Sep 28, 2026", "Scheduled"], ["TRF-2026-0313", "Central Depot", "West Annex", "A4 Copy Paper", "80", "Sep 27, 2026", "Ready"], ["TRF-2026-0312", "West Annex", "North Hub", "Packing Tape", "120", "Sep 25, 2026", "Completed"]],
  },
  adjustments: {
    title: "Inventory Adjustments", description: "Review and reconcile physical stock counts.", action: "New adjustment",
    columns: ["Adjustment ID", "Warehouse", "Location", "Product", "Recorded Qty", "Physical Qty", "Difference", "Reason", "Status"],
    rows: [["ADJ-0194", "North Hub", "A-12-04", "Office Chair", "186", "184", "-2", "Damaged", "Pending"], ["ADJ-0193", "Central Depot", "C-03-12", "Wireless Keyboard", "25", "28", "+3", "Cycle count", "Completed"], ["ADJ-0192", "West Annex", "P-04-01", "Packing Tape", "96", "92", "-4", "Shrinkage", "Completed"]],
  },
  moves: {
    title: "Move History", description: "Audit every inventory movement across locations.", action: "Export history",
    columns: ["Date", "Product", "SKU", "Operation", "Warehouse", "Location", "Quantity Change", "Reference", "User", "Status"],
    rows: [["Sep 26, 10:42", "Ergonomic Office Chair", "FUR-CHA-001", "Receipt", "North Hub", "A-12-04", "+24", "REC-1048", "Maya Chen", "Completed"], ["Sep 26, 09:15", "Wireless Keyboard", "ELE-KEY-024", "Delivery", "Central Depot", "C-03-12", "-6", "DEL-0831", "Alex Morgan", "Completed"], ["Sep 25, 16:20", "A4 Copy Paper", "OFF-PAP-101", "Transfer", "West Annex", "P-02-04", "+80", "TRF-0313", "Sam Rivera", "Completed"]],
  },
};
