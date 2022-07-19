<template>
  <div>
    <van-nav-bar title="登录" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <van-form ref="form" @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="PhoneRule"
        maxlength="11"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="CodeRule"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            v-if="isShowCountDown"
            format="ss s"
            :time="60 * 1000"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            class="code-btn"
            size="mini"
            round
            @click="sendCode"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, SendCode } from '@/api/user'
import { PhoneRule, CodeRule } from './rule'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      PhoneRule,
      CodeRule,
      isShowCountDown: false
    }
  },
  mounted () {},
  computed: {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    // /1.await 1修饰什么？Promise
    // /2,res拿到的是什么？
    // Promise resolve的结果
    // 服务器返回真正的数据在res.data
    // 服务器返回的状态码res.status
    // 3.error,是什么
    // axios封装的Promise里reject的结果
    // error.response.status拿到服务器返回的状态码
    // -error.response.data服务器返回的真正的数据
    async login () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        console.log(res)
        this.$store.commit('SetUser', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
        console.log(error.response)
        const status = error.response.status
        let message = '登录错误,请刷新~'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(error.response.data.message)
        //     break
        //   case 500:
        //     this.$toast.fail('登录错误,请刷新~')
        //     break
        //   default:
        //     this.$toast.fail('登录错误,请刷新~')
        //     break
        // }
      }
    },
    async sendCode () {
      try {
        await this.$refs.form.validate('mobile')
        await SendCode(this.mobile)
        this.isShowCountDown = true
      } catch (error) {
        if (!error.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.van-nav-bar {
  background-color: #3196fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  :deep(.van-field__label) {
    width: 20px;
  }
  .toutiao {
    font-size: 20px;
  }
  .login-btn {
    width: 347px;
    height: 44px;
    background-color: #6db4fb;
    border-radius: 5px;
    font-size: 15px;
  }
  .code-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    border-radius: 12px;
    color: #666666;
  }
}
</style>
