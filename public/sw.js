// 处理静态缓存
// 首先定义需要缓存的路径, 以及需要缓存的静态文件的列表, 这个列表也可以通过 Webpack 插件生成。
// var cacheStorageKey = 'cakeoms-pwa'

// var cacheList = [
//   '/',
//   "favicon.png"
// ]

// 借助 Service Worker, 可以在注册完成安装 Service Worker 时, 抓取资源写入缓存:
// 调用 self.skipWaiting() 方法是为了在页面更新的过程当中, 新的 Service Worker 脚本能立即激活和生效。
// self.addEventListener('install', e => {
//   e.waitUntil(
//     caches.open(cacheStorageKey)
//       .then(cache => cache.addAll(cacheList))
//       .then(() => self.skipWaiting())
//   )
// })

// 处理动态缓存
// 网页抓取资源的过程中, 在 Service Worker 可以捕获到 fetch 事件, 可以编写代码决定如何响应资源的请求:
// 真实的项目当中, 可以根据资源的类型, 站点的特点, 可以专门设计复杂的策略。fetch 事件当中甚至可以手动生成 Response 返回给页面。
// self.addEventListener('fetch', function (e) {
//   e.respondWith(
//     caches.match(e.request).then(function (response) {
//       if (response != null) {
//         return response
//       }
//       return fetch(e.request.url)
//     })
//   )
// })


// 更新静态资源
// 缓存的资源随着版本的更新会过期, 所以会根据缓存的字符串名称(这里变量为 cacheStorageKey, 值用了 "minimal-pwa-1")清除旧缓存, 可以遍历所有的缓存名称逐一判断决决定是否清除(备注: 简化的写法, Promise.all 中 return undefined 可能出错, 见评论):
// 在新安装的 Service Worker 中通过调用 self.clients.claim() 取得页面的控制权, 这样之后打开页面都会使用版本更新的缓存。旧的 Service Worker 脚本不再控制着页面之后会被停止。
// self.addEventListener('activate', function (e) {
//   e.waitUntil(
//     Promise.all(
//       caches.keys().then(cacheNames => {
//         return cacheNames.map(name => {
//           if (name !== cacheStorageKey) {
//             return caches.delete(name)
//           }
//         })
//       })
//     ).then(() => {
//       return self.clients.claim()
//     })
//   )
// })

