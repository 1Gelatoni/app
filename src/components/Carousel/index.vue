<template>
    <div class="swiper-container" id="floor1Swiper" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name: 'Carousel',
    props:['list'],
    watch: {
    list: {
      immediate: true, //立即监听 无论数据有无变化 先监听一次 否则监听不到list的变化 因为list由父亲传输 不会发生变化
      handler() {
        // 只能监听到数据已经有了 但v-for动态渲染的情况不能确定
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            // direction: 'vertical', // 垂直切换选项 默认为水平方向
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,//点击小球（分页器）也能切换图片
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          })
        })
      }
    }
  }
}
</script>

<style></style>