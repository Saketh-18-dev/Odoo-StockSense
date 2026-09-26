import { createFileRoute } from "@tanstack/react-router";
import { OperationPage } from "@/components/operation-page";
import { operationData } from "@/data/mock-data";
export const Route = createFileRoute("/deliveries")({ head: () => ({ meta: [{ title: "Manage customer delivery orders and fulfillment. — StockSense" }, { name: "description", content: "" }, { property: "og:title", content: "Manage customer delivery orders and fulfillment. — StockSense" }, { property: "og:description", content: "" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: () => <OperationPage config={operationData.deliveries} /> });
