<template>
  <div class="login-page">
    <div class="background">
      <div class="shape" />
      <div class="shape" />
    </div>
    <div class="login-form">
      <h1 class="title">订单管理系统 v2.0</h1>
      <h3 class="title">{{ store.state.test }}</h3>
      <nut-form ref="ruleForm" :model-value="formData">
        <nut-form-item
          label="用户名"
          prop="username"
          required
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
          <input v-model="formData.username" class="nut-input-text" placeholder="Enter You U" type="text" />
        </nut-form-item>
        <nut-form-item
          label="密码"
          prop="password"
          required
          :rules="[{ required: true, message: '请填写密码' }]"
        >
          <input
            v-model="formData.password"
            class="nut-input-text"
            placeholder="Enter You Password"
            type="password"
          />
        </nut-form-item>
        <nut-cell>
          <nut-button
            :loading="loading"
            type="primary"
            size="normal"
            style="margin:0 10px 0 90px"
            @keyup.enter="submit"
            @click="submit"
          >{{ labels.submit }}</nut-button>
          <nut-button size="normal" @click="reset">{{ labels.reset }}</nut-button>
        </nut-cell>
      </nut-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useStore } from '@/store'

export default defineComponent({
  name: 'Login',
  setup() {
    const loading = ref(false)
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const labels = {
      submit: '提交',
      reset: '重置'
    }

    const formData = reactive({
      username: '',
      password: '',
      remember: true
    })
    // eslint-disable-next-line
    const validate = (item: any) => {
      console.log("validate", item);
    }
    // eslint-disable-next-line
    const ruleForm = ref<any>(null)

    const submit = () => {
      // eslint-disable-next-line
      ruleForm.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
          loading.value = true
          store.dispatch('userModule/login2', formData)
            .then((res: any) => {
              router.push({
                name: 'Home',
                query: {
                  ...route.query,
                },
              })
              loading.value = false
            }).catch((err: any) => {
              loading.value = false
            })

        } else {
          console.log('error', errors)
        }
      })
    }

    const reset = () => {
      store.dispatch('testModule/increment')
      ruleForm.value.reset();
    }
    return {
      loading,
      labels,
      submit, reset, formData, ruleForm,
      validate, store
    }
  }
});
</script>
<style lang="scss" scoped>
.login-page {
  background-color: #080710;
  height: 100vh;
}
.background {
  width: 320px;
  height: 500px;
  max-width: 430px;
  max-height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.background .shape {
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}
.shape:first-child {
  background: linear-gradient(#1845ad, #23a2f6);
  left: -80px;
  top: -80px;
}
.shape:last-child {
  background: linear-gradient(to right, #ff512f, #f09819);
  right: -30px;
  bottom: -80px;
}

.title {
  text-align: center;
  color: #fff;
}
h1.title {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
}
.login-form {
  width: 320px;
  height: 500px;
  max-width: 430px;
  max-height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  padding: 0px;
}
</style>
