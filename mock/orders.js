import Mock from "mockjs"

Mock.mock("/api/v1/orders/104130123", 'get', {
  "accountMemo": "",
  "address": "",
  "appOpenId": "",
  "appPhone": "",
  "cashierId": "ST106046",
  "certNo": "",
  "channelType": "01",
  "contactMobile": "",
  "contactName": "",
  "contactPhone": "",
  "couponAmt": 0,
  "couponId": 0,
  "couponName": "",
  "crtTm": 1638352455000,
  "disCouponAmt": 0,
  "discountType": "00",
  "freeConsumeAmt": 0,
  "fullMinusAmt": 0,
  "goodsDisAmt": 0,
  "integral": 0,
  "integralDeductionAmt": 0,
  "mchntCd": "0002270F8017406",
  "mealCode": "",
  "mealTm": "2021-12-01 17:54:15",
  "memberDayDisAmt": 0,
  "memberLevelDisAmt": 0,
  "memberPhone": "",
  "memberPriceDisAmt": 0,
  "orderComment": "",
  "orderDetailInfos": [
    {
      "cashierDisPrice": 3200,
      "detailNo": 111030391,
      "dishCashierId": "ST106046",
      "dishState": "1",
      "goodsBarCode": "1630286236346",
      "goodsId": 1715468874,
      "goodsName": "测试套餐一起来",
      "goodsNumber": 1.0,
      "goodsPayAmt": 3200,
      "goodsPrice": 3200,
      "goodsUnit": "copy",
      "isPackageGoods": "1",
      "orderGoodsSpecs": []
    }
  ],
  "orderDisAmt": 1401,
  "orderNo": 104130123,
  "orderState": "05",
  "orderStateDesc": "已收货待评价",
  "orderType": "03",
  "orderTypeDesc": "收银机",
  "payAmt": 3200,
  "payAmtExtra": 0,
  "paySsn": "SAAS71313131202112020950038651",
  "payTm": 1638409804000,
  "payType": "CASH",
  "payTypeDesc": "现金",
  "payTypeExtra": "",
  "payTypeExtraMore": "现金",
  "refundAmt": 0,
  "refundTm": 1638352455000,
  "remark": "",
  "shopId": 212628,
  "shopName": "lanln小店",
  "tableTermName": "就是A1",
  "thirdDisAmt": 0,
  "thirdOrderNo": "600075841638352299",
  "userId": 0
})

Mock.mock("/api/v1/orders", 'get', {
  "data": [
    {
      "accountMemo": "",
      "address": "",
      "appOpenId": "",
      "appPhone": "",
      "cashierId": "ST106046",
      "certNo": "",
      "channelType": "01",
      "contactMobile": "",
      "contactName": "",
      "contactPhone": "",
      "couponAmt": 0,
      "couponId": 0,
      "couponName": "",
      "crtTm": 1638352455000,
      "disCouponAmt": 0,
      "discountType": "00",
      "freeConsumeAmt": 0,
      "fullMinusAmt": 0,
      "goodsDisAmt": 0,
      "integral": 0,
      "integralDeductionAmt": 0,
      "mchntCd": "0002270F8017406",
      "mealCode": "",
      "mealTm": "2021-12-01 17:54:15",
      "memberDayDisAmt": 0,
      "memberLevelDisAmt": 0,
      "memberPhone": "",
      "memberPriceDisAmt": 0,
      "orderComment": "",
      "orderDetailInfos": [
        {
          "cashierDisPrice": 3200,
          "detailNo": 111030391,
          "dishCashierId": "ST106046",
          "dishState": "1",
          "goodsBarCode": "1630286236346",
          "goodsId": 1715468874,
          "goodsName": "测试套餐一起来",
          "goodsNumber": 1.0,
          "goodsPayAmt": 3200,
          "goodsPrice": 3200,
          "goodsUnit": "copy",
          "isPackageGoods": "1",
          "orderGoodsSpecs": []
        }
      ],
      "orderDisAmt": 1401,
      "orderNo": 104130123,
      "orderState": "05",
      "orderStateDesc": "已收货待评价",
      "orderType": "03",
      "orderTypeDesc": "收银机",
      "payAmt": 3200,
      "payAmtExtra": 0,
      "paySsn": "SAAS71313131202112020950038651",
      "payTm": 1638409804000,
      "payType": "CASH",
      "payTypeDesc": "现金",
      "payTypeExtra": "",
      "payTypeExtraMore": "现金",
      "refundAmt": 0,
      "refundTm": 1638352455000,
      "remark": "",
      "shopId": 212628,
      "shopName": "lanln小店",
      "tableTermName": "就是A1",
      "thirdDisAmt": 0,
      "thirdOrderNo": "600075841638352299",
      "userId": 0
    },
    {
      "accountMemo": "",
      "address": "",
      "appOpenId": "",
      "appPhone": "",
      "cashierId": "ST106046",
      "certNo": "",
      "channelType": "01",
      "contactMobile": "",
      "contactName": "",
      "contactPhone": "",
      "couponAmt": 0,
      "couponId": 0,
      "couponName": "",
      "crtTm": 1638352113000,
      "disCouponAmt": 0,
      "discountType": "00",
      "freeConsumeAmt": 0,
      "fullMinusAmt": 0,
      "goodsDisAmt": 0,
      "integral": 0,
      "integralDeductionAmt": 0,
      "mchntCd": "0002270F8017406",
      "mealCode": "",
      "mealTm": "2021-12-01 17:48:33",
      "memberDayDisAmt": 0,
      "memberLevelDisAmt": 0,
      "memberPhone": "",
      "memberPriceDisAmt": 0,
      "orderComment": "",
      "orderDetailInfos": [
        {
          "cashierDisPrice": 2000,
          "detailNo": 111030390,
          "dishCashierId": "ST106046",
          "dishState": "1",
          "goodsBarCode": "",
          "goodsId": 1717060313,
          "goodsName": "一杯好喝的茶",
          "goodsNumber": 1.0,
          "goodsPayAmt": 2000,
          "goodsPrice": 2000,
          "goodsUnit": "cup",
          "isPackageGoods": "0",
          "orderGoodsSpecs": []
        }
      ],
      "orderDisAmt": 2000,
      "orderNo": 104130122,
      "orderState": "05",
      "orderStateDesc": "已收货待评价",
      "orderType": "03",
      "orderTypeDesc": "收银机",
      "payAmt": 2000,
      "payAmtExtra": 0,
      "paySsn": "SAAS71313131202112011748408731",
      "payTm": 1638352121000,
      "payType": "CASH",
      "payTypeDesc": "现金",
      "payTypeExtra": "",
      "payTypeExtraMore": "现金",
      "refundAmt": 0,
      "refundTm": 1638352112000,
      "remark": "",
      "shopId": 212628,
      "shopName": "lanln小店",
      "tableTermName": "就是A1",
      "thirdDisAmt": 0,
      "thirdOrderNo": "600075841638352103",
      "userId": 0
    },
    {
      "accountMemo": "",
      "address": "",
      "appOpenId": "wx123123456789",
      "appPhone": "",
      "cashierId": "ST106046",
      "certNo": "",
      "channelType": "01",
      "contactMobile": "",
      "contactName": "",
      "contactPhone": "",
      "couponAmt": 0,
      "couponId": 0,
      "couponName": "",
      "crtTm": 1638351904000,
      "disCouponAmt": 0,
      "discountType": "00",
      "freeConsumeAmt": 1734,
      "fullMinusAmt": 0,
      "goodsDisAmt": 0,
      "integral": 0,
      "integralDeductionAmt": 0,
      "mchntCd": "0002270F8017406",
      "mealCode": "",
      "mealTm": "2021-12-01 17:45:04",
      "memberDayDisAmt": 0,
      "memberLevelDisAmt": 0,
      "memberPhone": "",
      "memberPriceDisAmt": 0,
      "orderComment": "",
      "orderDetailInfos": [
        {
          "cashierDisPrice": 2000,
          "detailNo": 111030387,
          "dishCashierId": "ST106046",
          "dishState": "1",
          "goodsBarCode": "",
          "goodsId": 1717832723,
          "goodsName": "测试成本商品E",
          "goodsNumber": 1.0,
          "goodsPayAmt": 2000,
          "goodsPrice": 2000,
          "goodsUnit": "kg",
          "isPackageGoods": "0",
          "orderGoodsSpecs": []
        },
        {
          "cashierDisPrice": 2000,
          "detailNo": 111030388,
          "dishCashierId": "ST106046",
          "dishState": "1",
          "goodsBarCode": "",
          "goodsId": 1717812691,
          "goodsName": "测试成本商品C",
          "goodsNumber": 1.0,
          "goodsPayAmt": 2000,
          "goodsPrice": 2000,
          "goodsUnit": "kg",
          "isPackageGoods": "0",
          "orderGoodsSpecs": []
        },
        {
          "cashierDisPrice": 1200,
          "detailNo": 111030389,
          "dishCashierId": "ST106046",
          "dishState": "1",
          "goodsBarCode": "1625644262363",
          "goodsId": 1714370051,
          "goodsName": "测试商品 A",
          "goodsNumber": 1.0,
          "goodsPayAmt": 1200,
          "goodsPrice": 1200,
          "goodsUnit": "copy",
          "isPackageGoods": "0",
          "orderGoodsSpecs": []
        }
      ],
      "orderDisAmt": 5200,
      "orderNo": 104130121,
      "orderState": "05",
      "orderStateDesc": "已收货待评价",
      "orderType": "03",
      "orderTypeDesc": "收银机",
      "payAmt": 5200,
      "payAmtExtra": 0,
      "paySsn": "SAAS71313131202112011746048041",
      "payTm": 1638351965000,
      "payType": "YFK",
      "payTypeDesc": "余额支付",
      "payTypeExtra": "",
      "payTypeExtraMore": "余额支付",
      "refundAmt": 0,
      "refundTm": 1638351904000,
      "remark": "",
      "shopId": 212628,
      "shopName": "lanln小店",
      "tableTermName": "就是A1",
      "thirdDisAmt": 0,
      "thirdOrderNo": "600075841638351824",
      "userId": 0
    }
  ],
  "code": "get_orders",
  "message": "Get Orders",
  "pageNum": 1,
  "pageSize": 10000,
  "respCode": "000000",
  "respDesc": "成功",
  "totalCount": 5,
  "totalPages": 1
})