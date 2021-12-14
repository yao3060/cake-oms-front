interface Order {
  orderNo: string | number,
  shopName: string,
  orderStateDesc: string,
  mealTm: string,
  payTypeDesc: string,
  orderDetailInfos: Array<any>
}

export default Order
