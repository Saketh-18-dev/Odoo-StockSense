import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Boxes, ChevronDown, ClipboardList, LayoutDashboard, LogOut, Menu, Package, PanelLeftClose, Settings, SlidersHorizontal, Truck, UserRound, Warehouse, X, ArrowRightLeft, History } from "lucide-react";
import { Button } from "./ui-kit";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Products", to: "/products", icon: Package },
];
const operations = [
  { label: "Receipts", to: "/receipts", icon: ClipboardList },
  { label: "Delivery Orders", to: "/deliveries", icon: Truck },
  { label: "Internal Transfers", to: "/transfers", icon: ArrowRightLeft },
  { label: "Inventory Adjustments", to: "/adjustments", icon: SlidersHorizontal },
  { label: "Move History", to: "/move-history", icon: History },
] as const;

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const itemClass = (active: boolean) => cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors", active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground");
  return <aside className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar p-3"><div className="flex h-14 items-center gap-3 px-2"><div className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground"><Boxes size={21} /></div><div><p className="font-display text-lg font-bold text-sidebar-foreground">StockSense</p><p className="text-[11px] text-muted-foreground">Inventory workspace</p></div></div><nav className="mt-4 flex-1 space-y-1"><p className="mb-2 px-3 text-[11px] font-semibold uppercase text-muted-foreground">Workspace</p>{nav.map((item) => <Link key={item.to} to={item.to} onClick={onNavigate} className={itemClass(pathname === item.to)}><item.icon size={18} />{item.label}</Link>)}<p className="mb-2 mt-6 px-3 text-[11px] font-semibold uppercase text-muted-foreground">Operations</p>{operations.map((item) => <Link key={item.to} to={item.to} onClick={onNavigate} className={itemClass(pathname === item.to)}><item.icon size={18} />{item.label}</Link>)}<p className="mb-2 mt-6 px-3 text-[11px] font-semibold uppercase text-muted-foreground">Settings</p><Link to="/warehouses" onClick={onNavigate} className={itemClass(pathname === "/warehouses")}><Warehouse size={18} />Warehouses</Link></nav><div className="border-t border-sidebar-border pt-3"><Link to="/profile" onClick={onNavigate} className={itemClass(pathname === "/profile")}><UserRound size={18} />Profile</Link><button className={itemClass(false) + " w-full"}><LogOut size={18} />Logout</button></div></aside>;
}

export function AppShell({ children }: { children: ReactNode }) { const [mobileOpen, setMobileOpen] = useState(false); return <div className="min-h-screen bg-background"><div className="fixed inset-y-0 left-0 z-40 hidden lg:block"><Sidebar /></div>{mobileOpen && <div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Close navigation" className="absolute inset-0 bg-overlay/40" onClick={() => setMobileOpen(false)} /><div className="relative h-full w-64 shadow-modal"><Sidebar onNavigate={() => setMobileOpen(false)} /><Button variant="ghost" className="absolute right-2 top-3 size-9 px-0" onClick={() => setMobileOpen(false)} aria-label="Close"><X size={18} /></Button></div></div>}<div className="lg:pl-64"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/95 px-4 backdrop-blur sm:px-6"><div className="flex items-center gap-3"><Button variant="ghost" className="size-9 px-0 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20} /></Button><div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex"><PanelLeftClose size={16} /><span>Inventory overview</span></div></div><div className="flex items-center gap-2"><button aria-label="Notifications" className="relative grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-muted"><Bell size={19} /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" /></button><div className="mx-1 h-6 w-px bg-border" /><button className="flex items-center gap-2 rounded-md p-1.5 hover:bg-muted"><span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">AM</span><span className="hidden text-left sm:block"><span className="block text-sm font-semibold text-foreground">Alex Morgan</span><span className="block text-[11px] text-muted-foreground">Inventory Manager</span></span><ChevronDown size={14} className="text-muted-foreground" /></button></div></header><main className="p-4 sm:p-6 lg:p-8">{children}</main></div></div>; }
