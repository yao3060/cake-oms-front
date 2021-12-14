<template>
  <div v-if="loading">
    <view
      class="nut-toast nut-toast-center nut-toast-has-icon nut-toast-loading nut-toast-base"
      style="bottom: auto; background-color: rgba(0, 0, 0, 0);"
    >
      <view
        class="nut-toast-inner"
        style="text-align: center; background-color: rgba(0, 0, 0, 0.8);"
      >
        <view class="nut-toast-icon-wrapper">
          <i
            class="nutui-iconfont nut-icon nut-icon-loading"
            src=""
            style="color: rgb(255, 255, 255); font-size: 20px; width: 20px; height: 20px;"
          />
        </view><!---->
        <view class="nut-toast-text">
          {{ message }}
        </view>
      </view>
    </view>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Loading',
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
      message: {
        type: String,
        default: 'Loading'
      }
    }
  }
</script>
