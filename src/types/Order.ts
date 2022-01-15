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
  pickup_time: string;
  pickup_number: string | number;
  billing_name: string;
  billing_phone: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
}


export default Order
