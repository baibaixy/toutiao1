<template>
  <div class="detail_all">
    <div class="detail_content">
      <h1>{{ this.countList.title }}</h1>
      <div class="detail_content_user">
        <van-image round :src="this.countList.aut_photo" />
        <div class="content_user_title">
          <h4>{{ this.countList.aut_name }}</h4>
          <span>{{ pubdateTime }}</span>
        </div>
        <div @click="isFollow">
          <van-button
            round
            type="info"
            size="small"
            icon="plus"
            :loading="loading"
            v-if="!following"
            >关注</van-button
          >
          <van-button
            round
            plain
            hairline
            type="info"
            size="small"
            :loading="loading"
            v-else
            >已关注</van-button
          >
        </div>
      </div>
      <div class="detail_contenter">
        <!-- <div>{{ this.countList.content }}</div> -->
        <article
          v-html="this.countList.content"
          class="markdown-body"
        ></article>
      </div>
    </div>

    <div class="contenterEnding">
      <div class="DividingLine"></div>
      <span>正文结束</span>
      <div class="DividingLine"></div>
    </div>
  </div>
</template>
<script>
import '../../../../node_modules/github-markdown-css/github-markdown.css'
import dayjs from '@/utils/dayjs'
import { setUserFollow, delUserFollow } from '@/api'
export default {
  name: 'detailContent',
  data () {
    return {
      loading: false,
      comOrrep: '',
      following: this.isfollowed
    }
  },
  mounted () {},
  computed: {
    pubdateTime () {
      const res = this.countList
      const time = dayjs(res.pubdate).fromNow()
      return time
    }
  },
  methods: {
    async isFollow () {
      this.loading = true
      try {
        if (this.following) {
          await delUserFollow(this.countList.aut_id)
        } else {
          const res = await setUserFollow(this.countList.aut_id)
          this.$toast.success(res.data.data.message)
        }
        this.following = !this.following
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('关注用户未成功')
          // console.log(error.response.status)
        } else if (error.response.status === 401) {
          this.$toast.fail('用户未认证')
        } else {
          this.$toast.fail('网络卡顿,请刷新重登')
        }
      } finally {
        this.loading = false
      }
    }
    // transCom (val) {
    //   this.$refs.child.setArtComment(val)
    // }
  },
  props: {
    countList: {
      type: Object,
      required: true
    },
    isfollowed: {
      type: Boolean,
      required: true
    }
    // countResults: {
    //   type: Object,
    //   required: true
    // },
    // id: {
    //   type: String,
    //   required: true
    // }
    // sonomment: {
    //   type: Array,
    //   required: true
    // }
  }
  // components: {
  //   countAll
  // }
}
</script>
<style scoped lang="less">
.detail_all {
  margin: 45px 0;
  .detail_content {
    padding: 0 16px;
    h1 {
      font-size: 0.53333rem;
      padding: 0.66667rem 0;
      margin: 0;
      color: #3a3a3a;
    }
    .detail_content_user {
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      :deep(.van-image__img) {
        width: 35px;
        height: 35px;
      }
      .content_user_title {
        width: 210px;
        h4 {
          font-size: 12px;
          color: #3a3a3a;
          margin: 0;
          font-weight: 400;
        }
        span {
          margin: 0;
          font-size: 12px;
          color: #b7b7b7;
        }
      }
      .van-button {
        width: 85px;
        height: 29px;
        .van-icon {
          font-size: 14px;
        }
      }
    }
    .detail_contenter {
      width: 320px;
      margin: 27.5px auto;
      .markdown-body {
        font-size: 12px;
        line-height: 1;
        word-wrap: break-word;
        :deep(p) {
          text-align: justify;
        }
      }
    }
  }
  .contenterEnding {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .DividingLine {
      margin: 0.42667rem 0;
      background-color: #969799;
      width: 140px;
      height: 0.3px;
    }
    span {
      display: inline-block;
      font-size: 14px;
      color: #969799;
    }
  }
}
</style>
