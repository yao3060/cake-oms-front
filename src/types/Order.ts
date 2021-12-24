import { OrderStatusKey } from '@/types/OrderStatus'

interface Order {
  id: number;
  order_number: string | number;
  store_name: string;
  order_status: OrderStatusKey;
  created_at: string;
  payment_method: string;
  items: Array<any>;
  total: string;
}

export default Order
