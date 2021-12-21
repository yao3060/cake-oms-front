<template>
  <div class="products-list">
    <h1>Products</h1>
    <ProductItem
      v-for="(item, index) in products"
      :key="index"
      :product="item"
    />
  </div>
</template>

<script lang="ts">
import Product from '@/types/Product'
import { defineComponent, ref, onMounted } from 'vue'
import ProductItem from './components/Product.vue'
import { getProducts } from '@/api/products'

export default defineComponent({
  name: 'ProductList',
  components: {ProductItem},
  setup () {
    const loading =ref(false)
    const currentPage = ref(1)
    const perPage = ref(10)
    const products = ref<Product[]>([])

    onMounted(async () => {
      loading.value = true
      const response =  await getProducts()
      products.value = response.data
      loading.value = false
    })


    return {products, loading, currentPage, perPage}
  }
})
</script>

<style lang="scss" scoped>
.nut-card {
  padding-bottom: 10px;
}
</style>
