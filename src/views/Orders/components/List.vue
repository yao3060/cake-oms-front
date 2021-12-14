<template>
  <div class="orders-list">
    <nut-card
      v-for="(state, index) in products"
      :key="index"
      :img-url="state.imgUrl"
      :title="state.title"
      :price="state.price"
      :vip-price="state.vipPrice"
      :shop-desc="state.shopDesc"
      :delivery="state.delivery"
      :shop-name="state.shopName"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Product from '@/types/Product'

export default defineComponent({
  name: 'ProductList',
  setup() {
    const product = ref<Product>({
      imgUrl: "//img11.360buyimg.com/jdphoto/s58x28_jfs/t9451/359/415622649/15318/b0943e5d/59a78495N3bd2a9f8.png",
      title: "Order title",
      price: "9.99",
      vipPrice: "6.99",
      shopDesc: "shop description",
      delivery: 'online',
      shopName: "shop name"
    })

    const products = ref<Product[]>([product.value])

    return { products }
  },
})
</script>
