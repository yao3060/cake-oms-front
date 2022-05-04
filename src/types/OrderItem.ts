import OrderItemImage from "@/types/OrderItemImage";
interface OrderItem {
  id: number;
  order_id: number;
  media_id: number | string;
  media_url: string;
  product_name: string;
  images: OrderItemImage[];
  quantity: number | string;
  price: string;
  total: string;
  note: string;
}

export default OrderItem
