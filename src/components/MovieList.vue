<template>
  <div class="container">
    <!-- 영화 목록이 없으면 해당 클래스 추가 -->
    <div :class="{ 'no-result': !movies.length }" class="inner">
      <Loader v-if="loading" />
      <!-- 메시지가 있으면 출력 (배열값있음 truthy, 배열값없음 falsy ) -->
      <div v-if="message" class="message">
        {{ message }}
      </div>
      <!-- TODO key 이름인 imdbID 변경 -->
      <div v-else class="movies">
        <MovieItem
          v-for="findMovie in movies"
          :key="findMovie.movieId"
          :movie="findMovie"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from "~/components/MovieItem.vue";
import Loader from "~/components/Loader.vue";

export default {
  components: {
    MovieItem,
    Loader
  },
  computed: {
    // store 에서 계산(연결)된 값을 가지고 오기
    movies() {
      return this.$store.state.movie.movies;
    },
    message() {
      return this.$store.state.movie.message;
    },
    loading() {
      return this.$store.state.movie.loading;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/scss/main";
.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size: 20px;
  }
  .movies {
    display: flex;
    // movie list 를 두 줄 이상으로 만들 수 있게 감싼다.
    flex-wrap: wrap;
    // 수평 가운데 정렬
    justify-content: center;
  }
}
</style>
