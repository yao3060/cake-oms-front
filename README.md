# cake-oms-front

## ISSUES
---
- [x] 所有`未审核`订单隐藏手机号码中4位
- [x] 客服可以查看所有`未审核`订单
- [x] 门店员工只能查看本门店订单
- [x] 裱花不能看到`未审核`订单
- [x] 谁修改订单便是 `下单人`
- [ ] `下单人` 和 `本部门管理员` 可以编辑订单
  - [ ] 修改`下单人`, 本部门的其他人
  - [x] 修改取货方式（配送，自提）
  - [x] 编辑 取货时间
  - [x] 编辑单品备注
  
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

