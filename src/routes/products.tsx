import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MoreHorizontal, Plus, SlidersHorizontal } from "lucide-react";

import {
  Button,
  DataTable,
  EmptyState,
  Input,
  Modal,
  PageHeader,
  SearchBar,
  Select,
  StatusBadge,
} from "@/components/ui-kit";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — StockSense" },
      {
        name: "description",
        content: "Browse, search, filter, and create inventory products.",
      },
    ],
  }),
  component: ProductsPage,
});

const API_URL = "http://localhost:5000";

type Product = {
  id: string;
  name: string;
  sku: string;
  category_id: string | null;
  unit_of_measure: string;
  reorder_level: number | null;
};

type Inventory = {
  id: string;
  product_id: string;
  warehouse_id: string;
  quantity: number;
};

type Warehouse = {
  id: string;
  name: string;
  location: string | null;
};

type Category = {
  id: string;
  name: string;
};

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [
          productsResponse,
          inventoryResponse,
          warehousesResponse,
          categoriesResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/api/products`),
          fetch(`${API_URL}/api/inventory`),
          fetch(`${API_URL}/api/warehouses`),
          fetch(`${API_URL}/api/categories`),
        ]);

        const productsData = await productsResponse.json();
        const inventoryData = await inventoryResponse.json();
        const warehousesData = await warehousesResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProducts(productsData);
        setInventory(inventoryData);
        setWarehouses(warehousesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const rows = useMemo(() => {
    return products
      .map((product) => {
        const productInventory = inventory.filter(
          (item) => item.product_id === product.id
        );

        const stock = productInventory.reduce(
          (total, item) => total + (item.quantity || 0),
          0
        );

        const warehouseIds = [
          ...new Set(productInventory.map((item) => item.warehouse_id)),
        ];

        const productWarehouses = warehouses.filter((warehouse) =>
          warehouseIds.includes(warehouse.id)
        );

        const categoryName =
          categories.find((c) => c.id === product.category_id)?.name ||
          "Uncategorized";

        const warehouseName =
          productWarehouses.map((w) => w.name).join(", ") || "—";

        const location =
          productWarehouses.map((w) => w.location).filter(Boolean).join(", ") ||
          "—";

        const reorder = product.reorder_level ?? 0;

        let status = "In Stock";

        if (stock === 0) {
          status = "Out of Stock";
        } else if (stock <= reorder) {
          status = "Low Stock";
        }

        return {
          ...product,
          categoryName,
          stock,
          reorder,
          warehouseName,
          location,
          status,
        };
      })
      .filter(
        (product) =>
          (!search ||
            `${product.name} ${product.sku}`
              .toLowerCase()
              .includes(search.toLowerCase())) &&
          (!category || product.categoryName === category)
      );
  }, [products, inventory, warehouses, categories, search, category]);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Products"
          description="Manage product details, stock levels, and storage locations."
        />

        <div className="rounded-lg border border-border bg-card p-8 text-center">
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage product details, stock levels, and storage locations."
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus size={17} />
            Create product
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search products or SKU..."
        />

        <Select
          value={category}
          onChange={setCategory}
          label="All categories"
          options={categories.map((c) => c.name)}
        />

        <Button variant="secondary">
          <SlidersHorizontal size={16} />
          Filters
        </Button>
      </div>

      <DataTable
        columns={[
          "Product",
          "SKU",
          "Category",
          "Unit",
          "Current Stock",
          "Reorder Level",
          "Status",
          "Warehouse",
          "Location",
          "Actions",
        ]}
      >
        {rows.map((product) => (
          <tr
            key={product.id}
            className="hover:bg-muted/35"
          >
            <td className="px-4 py-3.5">
              <div className="font-semibold text-foreground">
                {product.name}
              </div>
            </td>

            <td className="px-4 py-3.5 text-sm text-muted-foreground">
              {product.sku}
            </td>

            <td className="px-4 py-3.5 text-sm">
              {product.categoryName}
            </td>

            <td className="px-4 py-3.5 text-sm">
              {product.unit_of_measure}
            </td>

            <td className="px-4 py-3.5 text-sm font-semibold">
              {product.stock}
            </td>

            <td className="px-4 py-3.5 text-sm">
              {product.reorder}
            </td>

            <td className="px-4 py-3.5">
              <StatusBadge status={product.status} />
            </td>

            <td className="px-4 py-3.5 text-sm">
              {product.warehouseName}
            </td>

            <td className="px-4 py-3.5 text-sm">
              {product.location}
            </td>

            <td className="px-4 py-3.5">
              <Button
                variant="ghost"
                className="size-8 px-0"
                aria-label="Product actions"
              >
                <MoreHorizontal size={17} />
              </Button>
            </td>
          </tr>
        ))}
      </DataTable>

      {rows.length === 0 && (
        <div className="rounded-lg border border-border bg-card">
          <EmptyState />
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create product"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button onClick={() => setOpen(false)}>
              Create product
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Name",
            "SKU",
            "Category",
            "Unit",
            "Initial Stock",
            "Reorder Level",
            "Warehouse",
            "Location",
          ].map((label) => (
            <label
              key={label}
              className="grid gap-1.5 text-sm font-semibold text-foreground"
            >
              {label}
              <Input
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </label>
          ))}
        </div>
      </Modal>
    </div>
  );
}