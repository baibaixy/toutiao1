<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" fixed />
    <div class="edit_user">
      <input type="file" hidden ref="file" accept=".png,.jpg" />
      <van-cell title="头像" is-link @click="$refs.file.click()">
        <van-image round :src="userlist.photo" />
      </van-cell>
      <van-cell title="昵称" is-link v-model="userlist.name" @click="nameFn">
      </van-cell>
      <van-cell
        title="性别"
        is-link
        v-model="gender"
        @click="genderFn"
      ></van-cell>
      <van-cell
        title="生日"
        is-link
        v-model="birthday"
        @click="birthdayFn"
      ></van-cell>
    </div>
    <van-popup
      v-model="showPhoto"
      position="bottom"
      :style="{ height: '100%' }"
      class="user_photo"
    >
      <ClippingPhoto
        v-if="showPhoto"
        :photo="photo"
        @onCancelPhoto="onCancelPhoto"
        @updateImgUrl="updateImgUrlFn"
      ></ClippingPhoto>
    </van-popup>
    <van-popup
      v-model="showName"
      position="bottom"
      :style="{ height: '100%' }"
      class="userName"
    >
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onClickLeftName"
        @click-right="onClickRightName"
      />
      <van-field
        v-model="messageName"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        show-word-limit
      />
    </van-popup>
    <van-popup
      v-model="showGender"
      position="bottom"
      :style="{ height: '40%' }"
      class="userName"
    >
      <van-picker
        title="更新性别"
        show-toolbar
        :columns="columnsGender"
        @confirm="onConfirmGender"
        @cancel="onCancelGenter"
      />
    </van-popup>
    <van-popup
      v-model="showBirthday"
      position="bottom"
      :style="{ height: '40%' }"
      class="userName"
    >
      <van-datetime-picker
        v-model="userlist.birthday"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirmBirthday"
        @cancel="onCancelBirthday"
      />
    </van-popup>
  </div>
</template>
<script>
import { getUser, editUser } from '@/api'
import { Toast } from 'vant'
import dayjs from '@/utils/dayjs'
import ClippingPhoto from './component/ClippingPhoto.vue'
export default {
  data () {
    return {
      userlist: {},
      showName: false,
      messageName: '',
      showGender: false,
      columnsGender: ['男', '女'],
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      showBirthday: false,
      showPhoto: false,
      photo: '',
      birthday: ''
    }
  },
  mounted () {
    this.$refs.file.addEventListener('change', (e) => {
      const file = e.target.files[0]
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.photo = e.target.result
        this.showPhoto = true
        this.$refs.file.value = ''
      }
    })
  },
  computed: {
    gender () {
      return this.userlist.gender ? '女' : '男'
    }
  },
  components: {
    ClippingPhoto
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async getUser () {
      const {
        data: { data }
      } = await getUser()
      this.userlist = data
      this.birthday = data.birthday
    },
    photoFn () {
      console.log(111)
    },
    nameFn () {
      this.showName = true
      this.messageName = this.userlist.name
    },
    onClickLeftName () {
      this.showName = false
    },
    onClickRightName () {
      this.userlist.name = this.messageName
      this.showName = false
    },
    genderFn () {
      this.showGender = true
    },
    onConfirmGender (value) {
      this.userlist.gender = value === '男' ? 0 : 1
      // console.log(this.userlist.gender)
      this.editUser()
      // Toast(`当前值：${value}, 当前索引：${index}`)
      this.showGender = false
    },
    onCancelGenter () {
      this.showGender = false
      Toast('取消')
    },
    birthdayFn () {
      this.showBirthday = true
    },
    onCancelBirthday () {
      this.showBirthday = false
    },
    onConfirmBirthday (value) {
      this.birthday = dayjs(value).format('YYYY-MM-DD')
      console.log(this.userlist.birthday)
      // console.log(dayjs(value).format('YYYY-MM-DD'))
      this.editUser()
      this.showBirthday = false
    },
    onCancelPhoto () {
      this.showPhoto = false
    },
    updateImgUrlFn (imgUrl) {
      this.userlist.photo = imgUrl
      this.showPhoto = false
    },
    async editUser () {
      try {
        await editUser(this.userlist.name, this.userlist.gender, this.birthday)
      } catch {
        this.$toast.fail('更新失败')
      }
    }
  },
  created () {
    this.getUser()
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
.edit_user {
  margin-top: 46px;
  .van-icon {
    margin-left: 0.10667rem;
    color: #969799;
  }
  .van-cell {
    height: 44px;
  }
  .van-cell:first-child {
    height: 57px;
  }
  :deep(.van-cell__value) {
    height: 29px;
  }
  :deep(img) {
    width: 28.5px;
    height: 28.5px;
  }
  // :deep(.van-image__img) {
  //   width: 28.5px;
  //   height: 28.5px;
  // }
  // :deep(.van-image) {
  //   width: 28.5px;
  //   height: 28.5px;
  // }
}
.userName {
  .van-nav-bar {
    background-color: #fff;
    :deep(.van-nav-bar__title) {
      color: #323233;
      font-size: 0.42667rem;
    }
  }
}
.user_photo {
  height: 100%;
  z-index: 2002;
  background-color: #333;
}
</style>
