<template>
  <div class="home-page-icons">
    <Loading message="加载中" :loading="loading" />
    <div v-if="showStats" class="statistics">
      <Statistics title="新订单" color="#40c9c6" icon="order" :start="0" :end="2000" />
      <Statistics title="新订单" color="#36a3f7" icon="order" :start="0" :end="1998" />
      <Statistics title="新订单" color="#f4516c" icon="order" :start="0" :end="8333" />
    </div>
    <div class="statistics">
      <BarChart v-bind="barChartProps" />
      <!-- Admin can see this -->
      <h1 v-permission="['administer']">administer</h1>
    </div>
  </div>
</template>

<script lang="ts">
import colorLib from '@kurkle/color';
import { getCurrentInstance, ref, defineComponent, onMounted, computed } from "vue";
import Statistics from "@/components/Statistics.vue";
import { useRoute } from "vue-router";
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);


const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

export default defineComponent({
  name: "Home",
  components: {
    Statistics,
    BarChart
  },
  setup() {
    const loading = ref(false);
    const app = getCurrentInstance();
    const route = useRoute();
    const showStats = ref(false);

    console.log("homepage route.path: ", route.path);

    const transparentize = (value: string, opacity: number) => {
      var alpha = opacity === undefined ? 0.5 : 1 - opacity;
      return colorLib(value).alpha(alpha).rgbString();
    }


    onMounted(() => {
      console.log("ComponentCustomProperties ", app);
      app?.appContext.config.globalProperties.$toast.success("成功提示");
      showStats.value = true;
    });

    const chartData = computed(() => ({
      labels: ['一', '二', '三', '四', '五', '六', '日'],
      datasets: [
        {
          label: '订单',
          data: [30, 40, 60, 70, 5, 55, 90],
          borderColor: CHART_COLORS.red,
          backgroundColor: transparentize(CHART_COLORS.red, 0.5),
        },
      ],
    }));
    const { barChartProps, barChartRef } = useBarChart({
      chartData,
      options: {
        responsive: true,
      },
    });

    return { loading, showStats, barChartProps, barChartRef };
  },
});
</script>

<style lang="scss">
.home-page-icons {
  .icon-name {
    padding-top: 10px;
  }
}

.statistics {
  padding: 10px;
}

.hero {
  text-align: center;
}
</style>
