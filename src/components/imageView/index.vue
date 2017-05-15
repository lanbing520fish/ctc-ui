<template>
  <div>
    <transition name="slide-fade" class="fadeView">
      <div v-if="show">
        <image-view :imgArr="imgArr" :showImageView="true" :imageIndex="imageIndex" v-on:hideImage="hideImageView"></image-view>
      </div>
    </transition>
    <img v-for="(item, index) in imgArr" :src="item" @click="selectImg(index)">
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
      type: Array,
      default: [],
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
    selectImg(index) {
      this.show = true
      this.imageIndex = index
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
