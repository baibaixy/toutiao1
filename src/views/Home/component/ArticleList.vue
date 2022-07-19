<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadNextPage"
      finished-text="刷新成功~"
    >
      <van-list
        @load="loadNextPage"
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="出错了，请重新加载！"
        finished-text="没有更多了"
        :immediate-check="false"
      >
        <articleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></articleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticleList } from '@/api'
import articleItem from './articleItem.vue'
export default {
  data () {
    return {
      articles: [],
      pretimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  components: {
    articleItem
  },
  mounted () {},
  computed: {},
  methods: {
    async getArticleList () {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        this.articles = data.data.results
        this.pretimestamp = data.data.pre_timestamp
        // console.log(data)
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败')
        }
      }
    },
    async loadNextPage () {
      try {
        // if (Math.random() < 0.7) {
        //   throw new Error('错误了')
        // }
        const { data } = await getArticleList(this.id, this.pretimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        this.pretimestamp = data.data.pre_timestamp
      } catch (error) {
        console.log(error)
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  },
  created () {
    this.getArticleList()
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
<style scoped></style>
