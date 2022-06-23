<template>
  <div class="container">
    <h1>
      <span>MOVIE REVIEW</span><br />
      THE OPEN <br />
      MOVIE DATABASE
    </h1>

    <p>
      안녕하세요! 영화리뷰 웹페이지 입니다. 우리의 사이트는 vue3 버전으로
      제작되었습니다. <br />
      해당 사이트의 디자인과 구조는 HEROPY님의 강의를 보고 제작되었고, 구현된
      서버는 Github LEEWONHOI의 movie-review-website-backend에서 확인할 수
      있습니다.
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main";
.container {
  padding-top: 40px;
}

h1 {
  line-height: 1;
  font-family: "Oswald", sans-serif;
  font-size: 80px;
  span {
    color: $primary;
  }
}
p {
  margin: 30px 0;
  color: $gray-600;
}
</style>
