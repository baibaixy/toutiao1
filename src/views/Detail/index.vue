<template>
  <div>
    <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" fixed />
    <detailContent
      :countList="countList"
      :isfollowed="isfollowed"
      @changeIsfollowed="changeIsfollowed"
    ></detailContent>
    <countAll :id="id" ref="sonomment"></countAll>
    <div class="detail_bottom">
      <van-button plain hairline type="info" round @click="PushCommentFn"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="commentNum" />
      <div @click="setCollect">
        <van-icon name="star-o" v-if="!isCollect" />
        <van-icon name="star" v-else class="red" />
      </div>
      <div @click="setLike">
        <van-icon name="good-job-o" v-if="isLike === 1" />
        <van-icon name="good-job" v-else class="red" />
      </div>
      <van-icon name="share" />
    </div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '18%' }"
      get-container="PushCommentFn"
    >
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      >
      </van-field>
      <span @click="publish">发布</span>
    </van-popup>
  </div>
</template>
<script>
import {
  getArticleDetail,
  setCollect,
  delCollect,
  delLike,
  setLike
} from '@/api'
import detailContent from './component/detailContent.vue'
import countAll from './component/countAll.vue'
export default {
  name: 'datail',
  data () {
    return {
      commentNum: 0,
      show: false,
      message: '',
      id: '',
      isCollect: false,
      isLike: 0,
      countList: {},
      isfollowed: false,
      countResults: {},
      sonCom: this.message
    }
  },
  mounted () {},
  computed: {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    PushCommentFn () {
      this.show = true
    },
    async setCollect () {
      if (this.isCollect) {
        await delCollect(this.id)
      } else {
        await setCollect(this.id)
      }
      this.isCollect = !this.isCollect
    },
    async setLike () {
      if (this.isLike) {
        await delLike(this.id)
        this.likeCount--
        this.isLike = 0
      } else {
        await setLike(this.id)
        this.likeCount++
        this.isLike = 1
      }
    },
    async getArticleDetail () {
      this.id = this.$route.params.id
      // this.id = this.$route.query.id
      const {
        data: { data }
      } = await getArticleDetail(this.id)
      // console.log(data)
      this.countList = data
      this.commentNum = data.comm_count
      this.isCollect = data.is_collected
      this.isfollowed = data.is_followed
      this.isLike = this.commentNum.attitude
    },
    // async getArtComment () {
    //   const id = this.$route.params.id
    //   const {
    //     data: { data }
    //   } = await getArtComment('a', id)
    //   this.countResults = data
    //   // console.log(data)
    // }
    publish () {
      this.$refs.sonomment.setArtComment(this.message)
      this.show = false
      this.message = ''
      // return this.message
    },
    changeIsfollowed () {
      this.isfollowed = !this.isfollowed
    }
  },
  components: {
    detailContent,
    countAll
  },
  created () {
    this.getArticleDetail()
    // this.getArtComment()
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
.detail_bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .van-button {
    font-size: 0.4rem;
    width: 141px;
    height: 23px;
    color: rgb(119, 119, 119);
    border: #eee;
  }
  .van-icon {
    color: rgb(119, 119, 119);
    font-size: 0.53333rem;
  }
  .van-info {
    font-size: 11px;
  }
  .red {
    color: red;
  }
}
.van-popup {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .van-cell {
    background-color: #eee;
    width: 298px;
    height: 88px;
    :deep(.van-field__control) {
      width: 270px;
    }
  }
  span {
    display: inline-block;
    font-size: 15px;
    text-align: center;
    color: #6ba3d8;
  }
}
</style>
