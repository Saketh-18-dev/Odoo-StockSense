import { createFileRoute } from "@tanstack/react-router";
import { OperationPage } from "@/components/operation-page";
import { operationData } from "@/data/mock-data";
export const Route = createFileRoute("/move-history")({ head: () => ({ meta: [{ title: "Move History — StockSense" }, { name: "description", content: "Audit inventory movement history across locations." }, { property: "og:title", content: "Move History — StockSense" }, { property: "og:description", content: "Audit inventory movement history across locations." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: () => <OperationPage config={operationData.moves} /> });
