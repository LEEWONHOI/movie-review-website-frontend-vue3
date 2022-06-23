<template>
  <footer>
    <Logo />
    <a href="https://github.com/LEEWONHOI" target="_blank">
      (c) {{ new Date().getFullYear() }} TEST
    </a>
  </footer>
</template>

<script>
import Logo from "~/components/Logo";

export default {
  components: {
    Logo
  }
};
</script>

<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
  opacity: 0.3;
  .logo {
    // a 태그 (RouterLink) 는 인라인요소라서 수평으로 쌓임. 그래서 변경
    display: block;
    margin-bottom: 4px;
  }
}
</style>
