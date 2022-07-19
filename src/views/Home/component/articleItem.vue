<template>
  <div>
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    />
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>
    <van-cell v-if="articleInfo.cover.type === 3" :title="articleInfo.title">
      <template #label>
        <div>
          <van-image
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'
export default {
  data () {
    return {}
  },
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  mounted () {},
  computed: {
    articleDesc () {
      const res = this.articleInfo
      const time = dayjs(res.pubdate).fromNow()
      return `${res.aut_name} ${res.comm_count}评论 ${time}`
    }
  },
  methods: {}
}
</script>
<style scoped></style>
