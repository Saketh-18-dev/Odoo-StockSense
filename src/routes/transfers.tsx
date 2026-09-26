import { createFileRoute } from "@tanstack/react-router";
import { OperationPage } from "@/components/operation-page";
import { operationData } from "@/data/mock-data";
export const Route = createFileRoute("/transfers")({ head: () => ({ meta: [{ title: "Internal Transfers — StockSense" }, { name: "description", content: "Coordinate internal stock transfers between warehouses." }, { property: "og:title", content: "Internal Transfers — StockSense" }, { property: "og:description", content: "Coordinate internal stock transfers between warehouses." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: () => <OperationPage config={operationData.transfers} /> });
