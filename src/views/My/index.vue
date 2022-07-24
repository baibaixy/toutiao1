<template>
  <div>
    <!-- 头部 -->

    <header class="banner">
      <!-- 登录状态 -->

      <div v-if="isLogin" class="user-info">
        <van-row></van-row>
        <van-row class="row-2">
          <van-col span="12">
            <van-row class="left-col">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>

          <van-col span="12">
            <van-row class="code-row">
              <van-button class="code-btn" @click="editFn">
                编辑资料
              </van-button>
            </van-row>
          </van-col>
        </van-row>

        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon> {{ userInfo.art_count }} </template>
            </van-grid-item>

            <van-grid-item text="粉丝">
              <template #icon> {{ userInfo.fans_count }} </template>
            </van-grid-item>

            <van-grid-item text="关注">
              <template #icon> {{ userInfo.follow_count }} </template>
            </van-grid-item>

            <van-grid-item text="获赞">
              <template #icon> {{ userInfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>

      <!-- 未登录状态 -->

      <div v-else class="login-register banner">
        <div class="wrap" @click="gologin">
          <img src="../../assets/images/mobile.png" alt="" />
          <span>登录/注册</span>
        </div>
      </div>
    </header>

    <!-- 主体 -->

    <main>
      <div>
        <van-grid column-num="2" class="grid" clickable>
          <van-grid-item text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span
            ></template>
          </van-grid-item>
          <van-grid-item text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"></span
            ></template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <!-- 退出按钮 -->
    <van-button v-if="isLogin" block class="login-btn" @click="logout"
      >退出登录</van-button
    >
  </div>
</template>
<script>
import { getUserInfo } from '@/api'
export default {
  name: '',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  mounted () {},
  computed: {
    // 标识是否登录
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    logout () {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号'
        })
        .then(() => {
          this.$store.commit('SetUser', {})
        })
        .catch(() => {})
    },
    gologin () {
      this.$router.push('/login')
    },
    async getUserInfo () {
      try {
        if (this.isLogin) {
          const {
            data: { data }
          } = await getUserInfo()
          this.userInfo = data
          console.log(data)
        }
      } catch (error) {
        this.$toast.fail('请重新登录')
      }
    },
    editFn () {
      this.$router.push('/user')
    }
  }
}
</script>
<style scoped lang="less">
.banner {
  width: 100%;
  height: 200px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.user-info {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
    .left-col {
      padding-left: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .mobile {
        padding-left: 10px;
        font-size: 0.4rem;
        color: #efecfc;
      }
    }
  }
  .code-row {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .code-btn {
      margin-left: 110px;
      width: 1.53333rem;
      height: 0.42667rem;
      background: #fff;
      border-radius: 0.21333rem;
      font-size: 0.26667rem;
      color: #666;
      padding: 0;
    }
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    font-size: 16px;
    :deep(.van-grid-item__text) {
      margin-top: 5px;
      color: #fff;
      font-size: 12px;
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 14px;
    img {
      height: 66px;

      margin-bottom: 10px;
    }
  }
}
</style>
