<template>
  <!-- TODO Poster, Year, Title 라는 이름으로 가지고 옴  && imdbID need Check-->
  <!--  -->
  <RouterLink
    :to="`/movie/${movie.movieId}`"
    :style="{ backgroundImage: `url(${movie.Poster})` }"
    class="movie"
  >
    <Loader v-if="imageLoading" :size="1.5" absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
import Loader from "~/components/Loader.vue";
export default {
  components: {
    Loader
  },
  props: {
    movie: {
      type: Object,
      // Object 형태의 디폴트 값은 함수형태로 선언해야한다.
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      imageLoading: true
    };
  },
  mounted() {
    // create 는 html 요소가 연결되지 않음.
    // init 은 html 요소를 다루기 떄문에 mounted를 사용한다.
    this.init();
  },
  methods: {
    async init() {
      const poster = this.movie.Poster;
      if (!poster || poster === "N/A") {
        this.imageLoading = false;
      } else {
        // plugin 으로 로직 옮겨둠. (store 같은 기능)
        await this.$loadImage(poster);
        this.imageLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.movie {
  $width: 200px;
  width: $width;
  height: $width * 3 / 2;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  // 배경이미지를 감싸기
  background-size: cover;
  // 넘치는부분은 안보이도록 설정
  overflow: hidden;
  position: relative;
  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 6px solid $primary;
  }
  .info {
    background-color: rgba($black, 0.3);
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    .year {
      color: $primary;
    }
    .title {
      color: $white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
