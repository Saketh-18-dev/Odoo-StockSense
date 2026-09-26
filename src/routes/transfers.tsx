import { createFileRoute } from "@tanstack/react-router";
import { OperationPage } from "@/components/operation-page";
import { operationData } from "@/data/mock-data";
export const Route = createFileRoute("/transfers")({ head: () => ({ meta: [{ title: "Coordinate internal stock transfers between warehouses. — StockSense" }, { name: "description", content: "" }, { property: "og:title", content: "Coordinate internal stock transfers between warehouses. — StockSense" }, { property: "og:description", content: "" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: () => <OperationPage config={operationData.transfers} /> });
