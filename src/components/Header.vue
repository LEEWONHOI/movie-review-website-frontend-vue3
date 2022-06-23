<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div v-for="nav in navigations" :key="nav.name" class="nav-item">
        <RouterLink
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link"
        >
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "~/components/Logo";

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: "Search",
          href: "/"
        },
        {
          name: "Movie",
          href: "/movie",
          path: /^\/movie/ // '/movie' 로 시작하는 주소
        },
        {
          name: "About",
          href: "/about"
        }
      ]
    };
  },
  methods: {
    isMatch(path) {
      if (!path) return false;
      // console.log(this.$route)
      // 31번 강의 끝부분
      // /movie 로 시작하는 주소면 active 속성을 class 에 추가해준다. (그럼 부트스트랩에 적용된대로 스타일 적용)
      // 왜 이렇게 하나면 id 값 떄문에  주소값이 다 다르니깐 movie 로 시작하면 네비게이션 이동시키는것
      return path.test(this.$route.fullPath);
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  .logo {
    margin-right: 40px;
  }
}
</style>
