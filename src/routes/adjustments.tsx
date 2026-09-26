import { createFileRoute } from "@tanstack/react-router";
import { OperationPage } from "@/components/operation-page";
import { operationData } from "@/data/mock-data";
export const Route = createFileRoute("/adjustments")({ head: () => ({ meta: [{ title: "Inventory Adjustments — StockSense" }, { name: "description", content: "Review and reconcile inventory adjustments." }, { property: "og:title", content: "Inventory Adjustments — StockSense" }, { property: "og:description", content: "Review and reconcile inventory adjustments." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: () => <OperationPage config={operationData.adjustments} /> });
