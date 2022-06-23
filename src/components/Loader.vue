<template>
  <div
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
      'z-index': zIndex
    }"
    :class="{ absolute: absolute, fixed: fixed }"
    class="spinner-border text-primary"
  ></div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 2
    },
    absolute: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    // 우선순위? 맨 앞으로 보이게 할려고 만든 속성
    zIndex: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
.spinner-border {
  // 가운데 정렬을 위한 css
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // 다만 아래 클래스 속성이 있을 때 가운데 정렬
  &.absolute {
    position: absolute;
  }
  &.fixed {
    position: fixed;
  }
}
</style>
