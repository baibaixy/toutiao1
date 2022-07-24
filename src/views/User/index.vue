<template>
  <div>
    <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" fixed />
    <div class="edit_user">
      <van-cell title="头像" is-link @click="photoFn">
        <template #default>
          <van-image round :src="userlist.photo" />
        </template>
        <van-uploader :after-read="afterRead" />
      </van-cell>
      <van-cell title="昵称" is-link :value="userlist.name"> </van-cell>
      <van-cell
        title="性别"
        is-link
        :value="userlist.gender ? '女' : '男'"
      ></van-cell>
      <van-cell title="生日" is-link :value="userlist.birthday"></van-cell>
    </div>
  </div>
</template>
<script>
import { getUser } from '@/api'
export default {
  data () {
    return {
      userlist: {}
    }
  },
  mounted () {},
  computed: {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async getUser () {
      const {
        data: { data }
      } = await getUser()
      this.userlist = data
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    photoFn () {
      console.log(111)
    }
  },
  created () {
    this.getUser()
  }
}
</script>
<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;
}
:deep(.van-icon) {
  color: #fff;
}
:deep(.van-nav-bar__title) {
  color: #fff;
}
.edit_user {
  margin-top: 46px;
  .van-icon {
    margin-left: 0.10667rem;
    color: #969799;
  }
  .van-cell {
    height: 44px;
  }
  .van-cell:first-child {
    height: 57px;
    .van-image {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>
