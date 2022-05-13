# cake-oms-front

## ISSUES
---
- [x] 所有`未审核`订单隐藏手机号码中4位
- [x] 客服可以查看所有`未审核`订单
- [x] 门店员工只能查看本门店订单
- [x] 裱花不能看到`未审核`订单
- [x] 谁修改订单便是 `下单人`
- [x] 修改`下单人` 为 本部门的其他人
- [x] 修改取货方式（配送，自提）
- [x] 编辑 取货时间
- [x] 编辑 单品备注
- [x] 产品图片 上传 和 删除
- [x] 所有人都可以修改 `订单备注`
- [x] 只有裱花间可以 打印
- [x] 裱花间隐藏号码中间4位
- [x] 裱花间不可以 `作废订单`
- [x] 裱画师只可以看到自己的单据
- [x] 裱花师可以转单给其他裱花师
  
## Project setup
---
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Roles
---

管理员 (administrator)

门店
 - 店长 (store-manager)
 - 门店员工 (employee)

客服 (customer-service) 
  - 客服店长
  - 客服员工

裱画间  
 - 裱花管理员 (framer-manager)
 - 裱画师 (framer)



组合角色
 - 下单人包括： `['employee', 'customer-service', 'store-manager', 'administrator']`

## 订单状态
---

