<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click='$router.push("/search")'>
          <van-icon name="search"
          />搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList
      ></van-tab>
      <span class="toutiao toutiao-gengduo" @click="PopupFn"></span>
    </van-tabs>
    <EditChannelPopup
      ref="popup"
      :myChannels="myChannels"
      @del-mychannel="delMyChannel"
      @change-active="changeActive"
      @add-mychannel="addMyChannel"
    ></EditChannelPopup>
  </div>
</template>

<script>
import {
  getMyChannels,
  getMyChannelsBylocal,
  setMyChannelsTolocal,
  delMyChannel,
  addMyChannel
} from '@/api'
import ArticleList from './component/ArticleList.vue'
import EditChannelPopup from './component/EditChannelPopup.vue'
export default {
  methods: {
    async getMyChannels () {
      try {
        if (!this.isLogin) {
          // console.log(111)
          const myChannel = getMyChannelsBylocal()
          if (myChannel) {
            this.myChannels = myChannel
          } else {
            // console.log(1111111111)

            const { data } = await getMyChannels()
            this.myChannels = data.data.channels

            // arguments
          }
        } else {
          const { data } = await getMyChannels()
          this.myChannels = data.data.channels
        }
      } catch (error) {
        this.$toast.fail('获取频道失败')
      }
    },
    PopupFn () {
      this.$refs.popup.isShow = true
    },
    async delMyChannel (id) {
      this.myChannels = this.myChannels.filter((item) => item.id !== id)
      if (!this.isLogin) {
        setMyChannelsTolocal(this.myChannels)
      } else {
        try {
          await delMyChannel(id)
        } catch {
          return this.$toast.fail('删除数据失败')
        }
      }
      this.$toast.success('删除数据成功')
    },
    changeActive (active) {
      this.active = active
    },
    async addMyChannel (channel) {
      this.myChannels.push(channel)
      if (!this.isLogin) {
        setMyChannelsTolocal(this.myChannels)
      } else {
        try {
          await addMyChannel(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加用户频道失败')
        }
      }
      this.$toast.success('添加用户频道成功')
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      myChannels: [],
      active: 0
    }
  },
  components: {
    ArticleList,
    EditChannelPopup
  }
}
</script>

<style scoped lang="less">
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 227.5px;
    height: 32px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
  //tabs选项卡
  :deep(.van-tabs__wrap) {
    position: sticky;
    top: 92px;
    left: 0;
    z-index: 99;
    padding-right: 66px;

    .van-tabs__nav {
      padding-left: 0;
      padding-right: 0;

      /* tab标签 */
      .van-tab {
        border: 1px solid #eee;
        width: 200px;
        height: 82px;
      }

      /* tab标签下划线 */
      .van-tabs__line {
        width: 31px;
        height: 6px;
        background-color: #3296fa;
        bottom: 40px;
      }
    }
  }
}
.my_channels {
  position: fixed;
}

//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 33px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 100px;
      height: 41px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 15.5px;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  z-index: 99;
  position: absolute;
  top: 0;
  right: 0;
  width: 33px;
  height: 41px;
  font-size: 20px;
  line-height: 41px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 46px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 46px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 46px - 41px - 50px);
  overflow: auto;
}
</style>
