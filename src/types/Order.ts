import { OrderStatusKey } from '@/types/OrderStatus'

export type orderType = '预约' | '小程序外卖'

export type Creator = {
  id: number;
  username: string;
  display_name: string;
}

export type FramerUser = {
  id: number;
  username: string;
  display_name: string;
}

type produceTime = {
  d: number;
  days: number;
  f: number;
  first_last_day_of: number;
  h: number;
  have_special_relative: number;
  have_weekday_relative: number;
  i: number;
  invert: number;
  m: number;
  s: number;
  special_amount: number;
  special_type: number;
  weekday: number;
  weekday_behavior: number;
  y: number;
}

interface Order {
  id: number;
  order_number: string | number;
  store_id: string;
  store_name: string;
  order_type: orderType;
  order_status: OrderStatusKey;
  created_at: string;
  updated_at: string;
  payment_method: string;
  items: Array<any>;
  framer: FramerUser;
  total: string;
  pickup_method: string;
  pickup_time: string;
  deadline: string;
  pickup_number: string | number;
  billing_name: string;
  billing_phone: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  note: string;
  creator: Creator;
  produce_time: produceTime;
}


export default Order
