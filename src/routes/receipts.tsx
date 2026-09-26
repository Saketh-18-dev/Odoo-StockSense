import { createFileRoute } from "@tanstack/react-router";
import { OperationPage } from "@/components/operation-page";
import { operationData } from "@/data/mock-data";
export const Route = createFileRoute("/receipts")({ head: () => ({ meta: [{ title: "Receipts — StockSense" }, { name: "description", content: "Track incoming stock receipts from suppliers." }, { property: "og:title", content: "Receipts — StockSense" }, { property: "og:description", content: "Track incoming stock receipts from suppliers." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: () => <OperationPage config={operationData.receipts} /> });
