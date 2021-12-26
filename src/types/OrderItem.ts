interface OrderItem {
  id: number;
  order_id: number;
  product_name: string;
  media_id?: number;
  media_url?: string;
  price?: string;
  quantity?: number;
  total?: string;
  note?: null | string;
  gallery?: Array<any>;
}

export default OrderItem
