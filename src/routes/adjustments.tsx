import { createFileRoute } from "@tanstack/react-router";
import { OperationPage } from "@/components/operation-page";
import { operationData } from "@/data/mock-data";
export const Route = createFileRoute("/adjustments")({ head: () => ({ meta: [{ title: "Review and reconcile inventory adjustments. — StockSense" }, { name: "description", content: "" }, { property: "og:title", content: "Review and reconcile inventory adjustments. — StockSense" }, { property: "og:description", content: "" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: () => <OperationPage config={operationData.adjustments} /> });
