<template>
  <div>
    <div class="art_counts">
      <div class="have_count">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <van-row v-for="(item, index) in countListCom" :key="index">
            <van-col class="count_img">
              <van-image round :src="item.aut_photo" />
            </van-col>
            <van-col class="count_center">
              <div class="content_user_title">
                <h4>{{ item.aut_name }}</h4>
                <span>{{ item.content }}</span>
              </div>
              <div class="content_time">
                <span>
                  {{ pubdateTime(item.pubdate) }}
                </span>
                <van-button
                  plain
                  hairline
                  type="info"
                  round
                  @click="replyFn(item)"
                  >回复{{ item.reply_count }}</van-button
                >
              </div>
            </van-col>
            <van-col class="count_zan" :class="item.is_liking ? 'hot' : ''">
              <van-icon name="good-job-o" @click="isLike(item)" />赞
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div>
        <van-nav-bar
          :title="comOne.reply_count + '条回复'"
          v-if="comOne.reply_count !== 0"
        />
        <van-nav-bar title="暂无回复" v-else />
      </div>
      <van-row>
        <van-col class="count_img">
          <van-image round :src="comOne.aut_photo" />
        </van-col>
        <van-col class="count_center">
          <div class="content_user_title">
            <h4>{{ comOne.aut_name }}</h4>
            <span>{{ comOne.content }}</span>
          </div>
          <div class="content_time">
            <span>
              {{ pubdateTime(comOne.pubdate) }}
            </span>
            <van-button plain hairline type="info" round
              >回复{{ comOne.reply_count }}</van-button
            >
          </div>
        </van-col>
        <van-col class="count_zan" :class="comOne.is_liking ? 'hot' : ''">
          <van-icon name="good-job-o" @click="isLike(comOne)" />赞
        </van-col>
      </van-row>
      <van-cell title="全部回复" />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoadReply(comOne.com_id)"
      >
        <van-row v-for="(item, index) in replyList" :key="index">
          <van-col class="count_img">
            <van-image round :src="item.aut_photo" />
          </van-col>
          <van-col class="count_center">
            <div class="content_user_title">
              <h4>{{ item.aut_name }}</h4>
              <span>{{ item.content }}</span>
            </div>
            <div class="content_time">
              <span>
                {{ pubdateTime(item.pubdate) }}
              </span>
              <van-button plain hairline type="info" round
                >回复{{ item.reply_count }}</van-button
              >
            </div>
          </van-col>
          <van-col class="count_zan" :class="item.is_liking ? 'hot' : ''">
            <van-icon name="good-job-o" @click="isLike(item)" />赞
          </van-col>
        </van-row>
      </van-list>
      <div class="replyReply">
        <van-button plain hairline type="info" round @click="PushCommentFn"
          >写评论</van-button
        >
      </div>
    </van-popup>
    <van-popup
      v-model="showCom"
      position="bottom"
      :style="{ height: '18%' }"
      get-container="PushCommentFn"
      class="van-popupReply"
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
import dayjs from '@/utils/dayjs'
import { getArtComment, setArtComment, setArtLiking, delArtLiking } from '@/api'

export default {
  name: 'countAll',
  data () {
    return {
      countResults: {},
      countList: [],
      loading: false,
      finished: false,
      error: false,
      show: false,
      replyList: [],
      replyResults: {},
      comOne: [],
      showCom: false,
      message: ''
    }
  },
  mounted () {},
  computed: {
    pubdateTime () {
      return (id) => dayjs(id).fromNow()
    },
    countListCom () {
      return this.countList
    }
  },
  methods: {
    async onLoad () {
      try {
        if (this.countList.end_id === this.countResults.last_id) {
          this.finished = true
        }
        if (this.countList.length === 0) {
          // console.log(this.id)
          const {
            data: { data }
          } = await getArtComment('a', this.id)
          console.log(data)
          this.countResults = data
          this.countList = data.results
        } else {
          const {
            data: { data }
          } = await getArtComment('a', this.id, this.countResults.last_id)
          this.countList.push(...data.results)
          this.countResults = data
        }
      } catch (error) {
        this.error = true
        if (error.status === 400) {
          this.$toast.fail('获取失败')
        }
        this.$toast.fail('请刷新重试')
      } finally {
        this.loading = false
      }
    },
    async replyFn (item) {
      this.show = true
      this.comOne = item
      const {
        data: { data }
      } = await getArtComment('c', this.comOne.com_id)
      // console.log(data)
      this.replyResults = data
      this.replyList = data.results
    },
    async onLoadReply (id) {
      try {
        if (this.replyList.length === 0) {
          //   console.log(this.id)
          const {
            data: { data }
          } = await getArtComment('c', id)
          this.replyResults = data
          console.log(data)
          this.replyList = data.results
        } else {
          const {
            data: { data }
          } = await getArtComment('c', id, this.replyResults.last_id)
          this.replyList.push(...data.results)
          this.replyResults = data
        }
        if (this.replyList.end_id === this.replayResults.last_id) {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        if (error.status === 400) {
          this.$toast.fail('获取失败')
        }
        this.$toast.fail('请刷新重试')
      } finally {
        this.loading = false
      }
    },
    onClickLeft () {
      this.$router.back()
    },
    async setArtComment (val) {
      try {
        await setArtComment(this.id, val)
        // console.log(res)
        const {
          data: { data }
        } = await getArtComment('a', this.id)
        // console.log(data)
        this.countList = data.results
      } catch (error) {
        this.$toast.fail('发送失败')
      }
    },
    PushCommentFn () {
      this.showCom = true
    },
    async publish () {
      // console.log(this.comOne)
      const val = this.message
      try {
        await setArtComment(this.comOne.com_id, val, this.id)
        // console.log(res)
        // console.log(this.replyList)
        // console.log()
        // this.replyList.unshift(res.data.data.new_obj)
        const {
          data: { data }
        } = await getArtComment('c', this.comOne.com_id)
        // console.log(res1)
        this.replyResults = data
        this.replyList = data.results
      } catch (error) {
        this.$toast.fail('发送失败')
      }
      this.message = ''
      this.showCom = false
    },
    async isLike (item) {
      try {
        if (item.is_liking) {
          delArtLiking(item.com_id)
        } else {
          await setArtLiking(item.com_id)
        }
        item.is_liking = !item.is_liking
      } catch (error) {
        this.$toast.fail('点赞失败')
      }
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
    // sonomment: {
    //   type: Array,
    //   required: true
    // }
  }
}
</script>
<style scoped lang="less">
.art_counts {
  .no_count {
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 14px;
    color: #969799;
    line-height: 50px;
  }
  .have_count {
    .van-row {
      display: flex;
      align-items: top;
      justify-content: space-around;
      min-height: 118px;
      width: 350px;
      padding-left: 15px;
      margin: 10px 0;
      border-bottom: 1px solid #f7f8f8;
      .van-image {
        width: 36px;
        height: 36px;
      }
      .count_center {
        width: 230px;
        .content_user_title {
          h4 {
            color: #406599;
            font-size: 13px;
            margin-top: 5px;
          }
          span {
            font-size: 16px;
          }
        }
        .content_time {
          width: 150px;
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            font-size: 12px;
            display: block;
            height: 24px;
            line-height: 24px;
          }
          .van-button {
            text-align: center;
            width: 70px;
            height: 24px;
            border: #969799;
            color: #969799;
          }
        }
      }
      .count_zan {
        color: #323233;
        font-size: 13px;
        .van-icon {
          color: #323233;
        }
      }
      .hot {
        color: red;
        .van-icon {
          color: red;
        }
      }
    }
  }
}
.van-popup {
  :deep(.van-icon) {
    color: #323233;
  }
  :deep(.van-nav-bar__title) {
    color: #323233;
  }
  .van-row {
    display: flex;
    align-items: top;
    justify-content: space-around;
    min-height: 118px;
    width: 350px;
    padding-left: 15px;
    margin: 10px 0;
    border-bottom: 1px solid #f7f8f8;
    .van-image {
      width: 36px;
      height: 36px;
    }
    .count_center {
      width: 230px;
      .content_user_title {
        h4 {
          color: #406599;
          font-size: 13px;
          margin-top: 5px;
        }
        span {
          font-size: 16px;
        }
      }
      .content_time {
        width: 150px;
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          font-size: 12px;
          display: block;
          height: 24px;
          line-height: 24px;
        }
        .van-button {
          text-align: center;
          width: 70px;
          height: 24px;
          border: #969799;
          color: #969799;
        }
      }
    }
    .count_zan {
      color: #323233;
      font-size: 13px;
      .van-icon {
        color: #323233;
      }
    }
    .hot {
      color: red;
      .van-icon {
        color: red;
      }
    }
  }
  .replyReply {
    background-color: #ff69b4;
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    .van-button {
      margin: 5px 26px;
      width: 8.53333rem;
      height: 1.06667rem;
    }
  }
}
.van-popupReply {
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
