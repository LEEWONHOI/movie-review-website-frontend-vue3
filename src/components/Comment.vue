<template>
  <div class="info">
    <div class="name">
      {{ review.memberName }}
    </div>
    <div class="contents">
      {{ review.contents }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: {
      type: Object,
      default: () => {
        return {};
        console.log("com test");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.name {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  margin-top: 15px;
}
.contents {
  font-size: 25px;
  margin-bottom: 10px;
}
</style>
