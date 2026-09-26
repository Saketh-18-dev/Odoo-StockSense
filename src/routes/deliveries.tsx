import { createFileRoute } from "@tanstack/react-router";
import { OperationPage } from "@/components/operation-page";
import { operationData } from "@/data/mock-data";
export const Route = createFileRoute("/deliveries")({ head: () => ({ meta: [{ title: "Delivery Orders — StockSense" }, { name: "description", content: "Manage customer delivery orders and fulfillment." }, { property: "og:title", content: "Delivery Orders — StockSense" }, { property: "og:description", content: "Manage customer delivery orders and fulfillment." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: () => <OperationPage config={operationData.deliveries} /> });
