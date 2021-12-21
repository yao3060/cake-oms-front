<template>
  <nut-card
    :img-url="product.imgUrl"
    :title="product.title"
    :price="product.price"
    :vip-price="product.vipPrice"
    :shop-desc="product.shopDesc"
    :delivery="product.delivery"
    :shop-name="product.shopName"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Product from '@/types/Product'

export default defineComponent({
  name: 'Product',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  setup () {


    return {}
  }
})
</script>

<style scoped>

</style>
