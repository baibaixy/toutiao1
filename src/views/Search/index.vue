<template>
  <div>
    <form action="/">
      <van-search
        background="#3397f9"
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPrePage"
        @focus="visibleSearchSuggestion"
      />
    </form>
    <!-- <SearchHistory></SearchHistory>
    <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult> -->
    <component
      :is="componentName"
      :keywords="keywords"
      @OnSearchItem="SearchFn"
    ></component>
  </div>
</template>
<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  data () {
    return {
      keywords: '',
      isShowSearchResults: false
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  mounted () {},
  computed: {
    componentName () {
      if (this.keywords.trim() === '') {
        return SearchHistory
      }
      if (this.isShowSearchResults) {
        return SearchResult
      }
      return SearchSuggestion
    }
  },
  methods: {
    onSearch () {
      this.isShowSearchResults = true
    },
    backToPrePage () {
      this.$router.go(-1)
    },
    visibleSearchSuggestion () {
      this.isShowSearchResults = false
    },
    SearchFn (item) {
      // console.log(111)
      this.keywords = item
      this.isShowSearchResults = true
    }
  }
}
</script>
<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
