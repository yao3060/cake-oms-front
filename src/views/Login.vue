<template>
  <div class="login-page">
    <div class="background">
      <div class="shape" />
      <div class="shape" />
    </div>
    <div class="login-form">
      <h1 class="title">
        Login Page
      </h1>
      <nut-form
        ref="ruleForm"
        :model-value="formData"
      >
        <nut-form-item
          label="用户名"
          prop="username"
          required
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
          <input
            v-model="formData.username"
            class="nut-input-text"
            placeholder="admin"
            type="text"
          >
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
            placeholder="admin"
            type="text"
          >
        </nut-form-item>
        <nut-cell>
          <nut-button
            type="primary"
            size="normal"
            style="margin:0 10px 0 90px"
            @click="submit"
          >
            提交
          </nut-button>
          <nut-button
            size="normal"
            @click="reset"
          >
            重置
          </nut-button>
        </nut-cell>
      </nut-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { setToken } from '@/utils/auth'

export default defineComponent({
  name: 'Login',
  setup() {

    const router = useRouter()
    const route = useRoute()

    const formData = reactive({
      'username': '',
      'password': '',
      'remember': true
    })

    const validate = (item: any) => {
        console.log("validate", item);
    }

    const ruleForm = ref<any>(null)

    const submit = () => {
      ruleForm.value.validate().then(({valid, errors}: any) => {
        if(valid) {
          console.log('success', formData)
          setToken('mobile_admin_token_' + (+new Date()))
          router.push({
            name: 'Home',
            query: {
              ...route.query,
            },
          })
        } else {
          console.log('error', errors)
        }
      })
    }

    const reset = () => {
      ruleForm.value.reset();
    }
    return {submit, reset, formData, ruleForm, validate}
  }
});
</script>
<style scoped>
.login-page {
  background-color: #080710;
  height: 100vh;
}
.background{
  width: 320px;
  height: 500px;
  max-width: 430px;
  max-height: 520px;
  position: absolute;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 50%;
}
.background .shape{
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
}
.shape:first-child{
    background: linear-gradient(
        #1845ad,
        #23a2f6
    );
    left: -80px;
    top: -80px;
}
.shape:last-child{
    background: linear-gradient(
        to right,
        #ff512f,
        #f09819
    );
    right: -30px;
    bottom: -80px;
}

h1.title{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
    color: #fff;
}
.login-form {
  width: 320px;
  height: 500px;
  max-width: 430px;
  max-height: 520px;
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    padding: 0px;
}
</style>
