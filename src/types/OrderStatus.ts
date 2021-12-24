export interface OrderStatusInfo {
  id: number;
  label: string;
  type: string;
}

export type OrderStatusKey = "pending" | "processing" | "completed";

export const OrderStatus: Record<OrderStatusKey, OrderStatusInfo> = {
  pending: {
    id: 1,
    label: "准备中",
    type: "info",
  },
  processing: {
    id: 2,
    label: "制作中",
    type: "primary"
  },
  completed: {
    id: 3,
    label: "已完成",
    type: "success"
  }
}