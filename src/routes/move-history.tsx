import { createFileRoute } from "@tanstack/react-router";
import { OperationPage } from "@/components/operation-page";
import { operationData } from "@/data/mock-data";
export const Route = createFileRoute("/move-history")({ head: () => ({ meta: [{ title: "Audit inventory movement history across locations. — StockSense" }, { name: "description", content: "" }, { property: "og:title", content: "Audit inventory movement history across locations. — StockSense" }, { property: "og:description", content: "" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: () => <OperationPage config={operationData.moves} /> });
