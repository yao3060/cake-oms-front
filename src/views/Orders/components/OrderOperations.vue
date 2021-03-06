<template>
  <nut-cell class="small-cell" title="裱花师" :desc="framerName" />
  <div class="order-operations">
    <!-- 废弃订单:最高管理员，下单人，下单人所属部门的管理员，客服、客服管理员 -->
    <nut-button
      v-show="showTrashIt"
      v-permission="['employee', 'customer-service', 'store-manager', 'administrator']"
      shape="square"
      type="primary"
      @click="trashIt"
    >
      作废
    </nut-button>
    <!-- 只有裱花可以打印 -->
    <nut-button
      v-permission="['administrator', 'framer-manager', 'framer']"
      shape="square"
      type="primary"
      @click="printIt"
    >
      打印
    </nut-button>
    <!-- 管理员和裱花管理员可以指派订单-->
    <nut-button
      v-show="showAssignIt"
      v-permission="['administrator', 'framer-manager', 'framer']"
      shape="square"
      type="primary"
      @click="assignIt"
    >
      派单
    </nut-button>

    <nut-actionsheet
      v-model:visible="isVisible"
      :menu-items="framers"
      description="指派裱花师"
      cancel-txt="取消"
      @choose="chooseItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, PropType, reactive, toRefs } from "vue"
import { printSingleOrder, updateSingleOrder } from "@/api/orders"
import { getFramers } from "@/api/users"
import { OrderStatusKey } from "@/types/OrderStatus"
import { useRouter } from "vue-router"

interface Framer {
  id: number;
  name: string;
}

interface Framer2 {
  id: number;
  username: string;
  display_name: string;
}

export default defineComponent({
  name: "OrderOperations",
  props: {
    orderId: {
      type: Number,
      required: true
    },
    orderStatus: {
      type: String as PropType<OrderStatusKey>,
      required: true
    },
    framer: {
      type: Object as PropType<Framer2>,
      required: true
    }
  },
  setup(props) {

    const app = getCurrentInstance()
    const router = useRouter()

    const state = reactive({
      loading: false,
      isVisible: false,
      framers: [] as Framer[],
      framerName: '',
      showTrashIt: false,
      showAssignIt: false,
    })

    onMounted(() => {
      state.framerName = props.framer.display_name ? props.framer.display_name : '未指派'
      if(props.orderStatus !== "completed") {
        state.showAssignIt = true
        state.showTrashIt = true
      }
    })

    const trashIt = () => {
      console.log('trashIt', props.orderId)

      app?.appContext.config.globalProperties.$dialog({
        title: '温馨提示',
        content: '“作废”为不可逆操作，“确认”后您将再也不能看到该订单！',
        onOk: async () => {
          const toast = app?.appContext.config.globalProperties.$toast.loading('处理中');
          const response = await updateSingleOrder(props.orderId, {status: 'trash'})
          console.log('trash it', response)
          toast.hide();
          router.go(-1)
        },
      })
    }

    const assignFramer = async (orderId: number, framer: Framer) => {
      const response = await updateSingleOrder(orderId, { framer: framer.id })
      console.log('assignFramer', response)
      state.framerName = framer.name
      app?.appContext.config.globalProperties.$toast.success('裱花师更新成功。');
    }

    const printIt = async () => {
      console.log('printIt', props.orderId)
      const toast = app?.appContext.config.globalProperties.$toast.loading('处理中');
      const response = await printSingleOrder(props.orderId)
      console.log('PrintIt', response.msg)
      toast.hide();
      app?.appContext.config.globalProperties.$toast.success(response.msg);
    }

    const assignIt = async () => {
      const toast = app?.appContext.config.globalProperties.$toast.loading('加载中');
      const response = await getFramers()
      console.log('getFramers', response)
      // toast.hide();
      Object.assign(state.framers, response)
      state.isVisible = !state.isVisible
    }

    const chooseItem = (itemParams: Framer) => {
      console.log('framer', itemParams)
      const toast = app?.appContext.config.globalProperties.$toast.loading('处理中');
      assignFramer(props.orderId, itemParams)
      toast.hide();
    };

    return {
      ...toRefs(state),
      trashIt, printIt, assignIt, chooseItem
    }
  }
})
</script>

<style lang="scss" scoped>
.order-operations {
  text-align: right;
  padding-right: 16px;

  .nut-button {
    margin-left: 10px;
  }
}
</style>
