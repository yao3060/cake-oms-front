interface Order {
  order_number: string | number,
  store_name: string,
  order_status: string,
  created_at: string,
  payment_method: string,
  items: Array<any>,
  total: string
}

export default Order
