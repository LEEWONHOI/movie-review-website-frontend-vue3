<template>
  <div class="about">
    <div class="photo">
      <Loader v-if="imageLoading" absolute />
      <img :src="image" :alt="infoData.name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
  </div>

  <!-- 내가 리뷰한 영화 목록보기 -->
  <div class="container">
    <div class="inner">
      <Loader v-if="imageLoading" />
      {{ message }}
    </div>
    <div class="movies">
      <MovieItem
        v-for="findMovie in movies"
        :key="findMovie.Title"
        :movie="findMovie"
      />
    </div>
  </div>
</template>

<script>
import Loader from "~/components/Loader";
import VueCookies from "vue-cookies";
import MovieItem from "~/components/MovieItem.vue";
import axios from "axios";

export default {
  components: {
    Loader,
    MovieItem
  },
  data() {
    return {
      imageLoading: true,
      session: VueCookies.get("mySession")
    };
  },
  computed: {
    name() {
      return this.$store.state.about.name;
    },
    email() {
      return this.$store.state.about.email;
    },
    infoData() {
      return this.$store.state.about.infoData;
    },
    image() {
      return this.$store.state.about.image;
    },
    movies() {
      return this.$store.state.about.movies;
    },
    message() {
      return this.$store.state.about.message;
    },
    loading() {
      return this.$store.state.about.loading;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.$loadImage(this.image);
      this.$store.dispatch("about/findMemberInfo", {
        session: this.session
      });
      this.imageLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/scss/main";
.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
    }
  }
  .name {
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
}
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
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
