export interface OrderStatusInfo {
  id: number;
  label: string;
  type: string;
}


export const OrderStatusKeyArr = ["unverified", "verified", "processing", "completed"] as const

export type OrderStatusKey = typeof OrderStatusKeyArr[number]

export type AllOrderStatusKey = OrderStatusKey | "trash"

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
