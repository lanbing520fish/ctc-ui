<template>
  <div>
    <transition name="slide-fade" class="fadeView">
      <div v-if="show">
        <image-view :imgArr="imgArr.split(' ', 1)" :showImageView="true" :imageIndex="imageIndex" v-on:hideImage="hideImageView"></image-view>
      </div>
    </transition>
    <img :src="imgArr" @click="selectImg()">
  </div>
</template>

<script>
import imageView from 'vue-imageview';

export default {
  components: {
    'image-view': imageView
  },
  props: {
    imgArr: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      // 显示组件
      show: false,
      // 从哪一张图片开始
      imageIndex: 0
    }
  },
  methods: {
    showImgView() {
      this.show = true
    },
    hideImageView() {
      this.show = false
    },
    selectImg() {
      this.show = true
    }
  }
}
</script>
<style scoped>
.slide-fade-enter-active {
  /*transition: opacity .2s ease;*/
}

.slide-fade-leave-active {
  transition: opacity .2s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}

img {
  display: block;
  width: 282px;
  height: 211px;
  cursor: pointer;
}
</style>
