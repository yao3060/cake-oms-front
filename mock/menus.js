import Mock from "mockjs"

Mock.mock("/api/v1/menus", 'get', {
  'code': 'get_menus',
  'message': 'get menus',
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'data': [
    {
      "icon": 'JD',
      "name": 'Orders',
      "to": "/orders"
    },
    {
      "icon": 'JD',
      "name": 'About',
      "to": "/about"
    },
    {
      "icon": 'JD',
      "name": 'About',
      "to": "/about"
    },
    {
      "icon": 'JD',
      "name": 'Products',
      "to": "/products"
    }
  ]
})
