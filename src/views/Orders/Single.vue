<template>
  <Loading
    message="加载中"
    :loading="loading"
  />
  <div class="order-container">
    <div
      v-if="order"
      class="actions"
    >
      <nut-button
        size="small"
        type="primary"
      >
        编辑
      </nut-button>
      <nut-button
        size="small"
        type="success"
      >
        打印
      </nut-button>
    </div>
    <nut-cell-group v-if="order">
      <nut-cell
        class="store-name"
        :title="order.shopName"
      >
        <template #link>
          <nut-button
            size="mini"
            type="primary"
          >
            {{ order.orderStateDesc }}
          </nut-button>
        </template>
      </nut-cell>
      <nut-cell
        title="Time"
        :desc="order.mealTm"
      />
      <nut-cell
        title="OrderNo"
        :desc="`${order.orderNo}`"
      />
      <nut-cell
        title="付款方式"
        :desc="order.payTypeDesc"
      />
      <nut-cell
        title="Order Items"
      >
        <div
          v-for="(item, index) in order.orderDetailInfos"
          :key="index"
        >
          <nut-icon
            name="plus"
            style="height:12px; line-height:16px;"
          />
          <span>{{ item.goodsName }}</span> -
          <small>{{ item.goodsNumber }}</small> -
          <nut-price
            :price="item.cashierDisPrice"
            size="small"
            :need-symbol="true"
            :thousands="false"
          />
        </div>
      </nut-cell>
    </nut-cell-group>
  </div>
</template>

<script lang="ts">
import Order from '@/types/Order'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getSingleOrder } from '@/api/orders'
import Loading from '@/components/Loading.vue'

export default defineComponent({
  name: 'SingleOrder',
  components: {
   Loading
  },
  setup () {
    const route = useRoute()
    const orderNo = route.params.orderNo
    const order = ref<Order>()
    const loading = ref(false)

    onMounted(async ()=> {
      loading.value = true
      const response = await getSingleOrder(orderNo)
      order.value = response
      loading.value = false
    })

    return { order, loading }
  }
})
</script>

<style scoped lang="scss">
.actions {
  text-align: right;
  .nut-button {
    margin-left: 10px;
  }
}
.store-name {
  font-weight: bold;
}

</style>
