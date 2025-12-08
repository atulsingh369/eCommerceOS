"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  subscribeToUserOrders,
  Order,
  OrderStatus,
} from "@/lib/firebase/orders";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Loader2, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { Timestamp } from "firebase/firestore";

export default function OrdersPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    // Subscribe to real-time orders updates
    const unsubscribe = subscribeToUserOrders(user.uid, (ordersData) => {
      setOrders(ordersData);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Filter orders by status
  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  const statusTabs: { value: OrderStatus | "all"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "booked", label: "Booked" },
    { value: "packed", label: "Packed" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        {orders.length > 0 && (
          <p className="text-muted-foreground">
            {orders.length} order{orders.length !== 1 ? "s" : ""} in total
          </p>
        )}
      </div>

      {/* Status Filter Tabs */}
      {orders.length > 0 && (
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {statusTabs.map((tab) => (
            <Button
              key={tab.value}
              variant={statusFilter === tab.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(tab.value)}
              className="whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>
      )}

      {/* Orders Grid */}
      {orders.length < 1 ? (
        <div className="text-center py-20">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {statusFilter === "all"
              ? "No orders yet"
              : `No ${statusFilter} orders`}
          </h2>
          <p className="text-muted-foreground mb-6">
            {statusFilter === "all"
              ? "Start shopping to see your orders here"
              : `You don't have any ${statusFilter} orders`}
          </p>
          {statusFilter === "all" ? (
            <Link href="/products">
              <Button size="lg">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          ) : (
            <Button variant="outline" onClick={() => setStatusFilter("all")}>
              View All Orders
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order, index) => {
            // Safety checks
            if (
              !order ||
              !order.orderId ||
              !order.items ||
              order.items.length === 0
            ) {
              return null;
            }

            const orderDate =
              order.createdAt instanceof Timestamp
                ? order.createdAt.toDate()
                : new Date();
            const firstItem = order.items[0];

            return (
              <Link key={order.orderId} href={`/orders/${order.orderId}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="relative aspect-square bg-muted">
                    {firstItem?.image ? (
                      <Image
                        src={firstItem.image}
                        alt={firstItem.name || "Product"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Package className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                    {order.items.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        +{order.items.length - 1} more
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs text-muted-foreground mb-1">
                          {order.orderId}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {orderDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      {order.status && (
                        <OrderStatusBadge
                          status={order.status}
                          className="text-xs"
                        />
                      )}
                    </div>

                    <h3 className="font-semibold line-clamp-1 mb-1">
                      {firstItem?.name || "Product"}
                      {order.items.length > 1 &&
                        ` & ${order.items.length - 1} more`}
                    </h3>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold">
                        {formatPrice(order.priceBreakdown?.total || 0)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary"
                      >
                        View Details →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
