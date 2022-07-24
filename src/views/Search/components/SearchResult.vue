<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in result"
        :key="item.art_id"
        :value="item.title"
        @click="SearchArt(item.art_id)"
      />
    </van-list>
  </div>
</template>
<script>
import { getSearchResult, setHistoryTolocal, getHistoryBylocal } from '@/api'

export default {
  data () {
    return {
      result: [],
      loading: false,
      finished: false,
      page: 1,
      error: false,
      refreshing: false
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  mounted () {},
  computed: {},
  methods: {
    async getSearchResult () {
      // if (Math.random() < 0.5) {
      //   throw new Error()
      // }
      try {
        const res = await getSearchResult(this.keywords)
        const arr = (await getHistoryBylocal()) || []
        arr.unshift(this.keywords)
        const keywordsArray = Array.from(new Set(arr))
        await setHistoryTolocal(keywordsArray)
        // console.log(res)
        this.result = res.data.data.results
        this.page = res.data.data.page
      } catch (error) {
        if (error.status === 400) {
          this.$toast.fail('请求不到关键字')
        } else {
          this.$toast.fail('请求失败,请刷新重试')
        }
      }
    },
    async onLoad () {
      try {
        const {
          data: { data }
        } = await getSearchResult(this.keywords, this.page + 1)
        if (this.result.length === data.total_count) {
          // 数据全部加载完成
          // this.finished = true
          this.finished = true
        }
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        this.page++

        this.result.push(...data.results)
      } catch (error) {
        this.error = true
        this.$toast.fail('加载失败，请重新加载')
      } finally {
        // 加载状态结束
        this.loading = false
      }
    },
    SearchArt (id) {
      this.$router.push(`/detail/${id}`)
    }
  },
  created () {
    this.getSearchResult()
  }
}
</script>
<style scoped></style>
