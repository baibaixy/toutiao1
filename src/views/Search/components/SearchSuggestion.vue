<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightData"
      :key="index"
      icon="search"
      center
      @click="Onsearch(index)"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestions } from '@/api'
export default {
  data () {
    return {
      suggestions: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  mounted () {},
  computed: {
    highlightData () {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style='color:red'>${match}</span>`)
      )
    }
  },
  methods: {
    async getSearchSuggestions () {
      try {
        const res = await getSearchSuggestions(this.keywords)
        // console.log(res)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
        this.suggestions = res.data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    },
    Onsearch (index) {
      // console.log(111)
      // console.log(this.suggestions[index])
      const search = this.suggestions[index]
      this.$emit('OnSearchItem', search)
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSuggestions()
      }
    }
  }
}
</script>
<style scoped></style>
