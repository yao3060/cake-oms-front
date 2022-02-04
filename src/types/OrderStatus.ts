export interface OrderStatusInfo {
  id: number;
  label: string;
  type: string;
}

export type OrderStatusKey = "unverified" | "verified" | "processing" | "completed";

export const OrderStatus: Record<OrderStatusKey, OrderStatusInfo> = {
  unverified: {
    id: 1,
    label: "未审核",
    type: "default",
  },
  verified: {
    id: 2,
    label: "已审核",
    type: "info",
  },
  processing: {
    id: 3,
    label: "制作中",
    type: "info"
  },
  completed: {
    id: 4,
    label: "已完成",
    type: "success"
  }
}
