<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <template #default>
          <div v-if="!isFinished" @click="isFinished = !isFinished">
            <van-icon name="delete-o" />
          </div>
          <div class="finished" v-else>
            <span @click="CloseAllFn">全部删除</span>
            <span @click="isFinished = !isFinished">完成</span>
          </div>
        </template>
      </van-cell>
      <van-cell
        v-for="item in historyArray"
        :key="item"
        :title="item"
        @click="SearchFn(item)"
      >
        <template #default>
          <div v-if="isFinished" @click="CloseFn(item)">
            <van-icon name="close" />
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import {
  getHistoryBylocal,
  setHistoryTolocal,
  removeHistoryTolocal
} from '@/api'
export default {
  data () {
    return {
      isFinished: false,
      historyArray: []
    }
  },
  mounted () {},
  computed: {},
  methods: {
    async getHistoryBylocal () {
      const res = await getHistoryBylocal()
      this.historyArray = res
      // console.log(res)
    },
    async CloseFn (item) {
      const arr = (await getHistoryBylocal()) || []
      const arr1 = arr.filter((ele) => ele !== item)
      await setHistoryTolocal(arr1)
      this.getHistoryBylocal()
    },
    async CloseAllFn () {
      await removeHistoryTolocal()
    },
    SearchFn (item) {
      this.$emit('OnSearchItem', item)
    }
  },
  created () {
    this.getHistoryBylocal()
  }
}
</script>
<style scoped lang="less">
.van-icon {
  line-height: 25px;
}
.finished {
  span {
    display: inline-block;
    margin-left: 8px;
  }
}
</style>
