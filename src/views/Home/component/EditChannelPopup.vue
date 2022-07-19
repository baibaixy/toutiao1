<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '100%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '推荐' }}</van-button
          >
        </van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            @click="onClickMyChannel(item, index)"
            v-for="(item, index) in myChannels"
            :key="item.id"
            :text="item.name"
            :class="{ 'active-channel': item.name === '推荐' }"
          >
            <template #icon>
              <van-icon
                name="cross"
                v-show="isEdit && item.name !== '推荐'"
              ></van-icon
            ></template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="recommend-channel">
        <van-cell title="推荐频道"></van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            icon="plus"
            v-for="item in recommendChannels"
            :key="item.id"
            :text="item.name"
            @click="addMyChannel(item)"
          ></van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllMyChannels } from '@/api'
export default {
  data () {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getAllMyChannels()
  },
  methods: {
    async getAllMyChannels () {
      const { data } = await getAllMyChannels()
      this.allChannels = data.data.channels
      console.log(this.allChannels)
    },
    onClickMyChannel (channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        return this.$emit('del-mychannel', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    addMyChannel (mychannel) {
      this.$emit('add-mychannel', { ...mychannel })
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((i) => i.id === item.id)
      })
    }
  }
}
</script>
<style scoped lang="less">
.active-channel {
  :deep(.van-grid-item__text) {
    color: red;
  }
}

.popupMain {
  padding-top: 50px;
  .edit-btn {
    color: red;
    padding: 0 15px;
    height: 24px;
    border: 0.01334rem solid red;
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          // line-height: 0.32rem;
          z-index: 100;
        }
        .van-icon {
          font-size: 12px;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
