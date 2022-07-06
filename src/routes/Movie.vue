<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader :size="3" :z-index="9" fixed />
    </template>

    <div v-else class="movie-details">
      <div
        :style="{
          backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})`
        }"
        class="poster"
      >
        <Loader v-if="imageLoading" absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <div
              v-for="{ site: name, value: score } in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating"
            >
              <img
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
                alt="name"
              />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
    <!-- 여기에 댓글 입력 칸 만들기 -->
    <div class="comment-form">
      <h3>Comments</h3>
      <form v-on:submit="submitForm">
        <div class="comment-input">
          <input
            v-model="comment"
            class="form-control"
            id="comment"
            type="text"
            placeholder="댓글을 입력해주세요"
            @keyup.enter="apply"
          />
          <button type="submit" class="btn btn-primary" @click="apply">
            Apply
          </button>
        </div>
      </form>
    </div>
    <div class="comment-list">
      <Comment
        v-for="findReview in theMovie.reviews"
        :key="findReview.id"
        :review="findReview"
      />
    </div>
  </div>
</template>

<script>
import Loader from "~/components/Loader.vue";
import Comment from "~/components/Comment.vue";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  components: {
    Loader,
    Comment
  },
  data() {
    return {
      imageLoading: true,
      comment: "",
      session: VueCookies.get("mySession")
    };
  },
  computed: {
    theMovie() {
      return this.$store.state.movie.theMovie;
    },
    theMovie() {
      return this.$store.state.movie.theMovie;
    },
    loading() {
      return this.$store.state.movie.loading;
    }
  },
  created() {
    console.log(this.$router);
    this.$store.dispatch("movie/searchMovieWithId", {
      id: this.$route.params.id
    });
  },
  methods: {
    requestDiffSizeImage(url, size = 700) {
      if (!url || url === "N/A") {
        this.imageLoading = false;
        return "";
      }

      const src = url.replace("SX300", `SX${size}`);
      // await 를 걸면 src 주소를 return 하는것도 기달려야하기 때문에 then 을 사용해서
      // 비동기 로직을 따로 처리한다.
      this.$loadImage(src).then(() => {
        this.imageLoading = false;
      });
      return src;
    },

    submitForm: function () {
      var data = {
        id: this.$route.params.id,
        comment: this.comment,
        session: this.session
      };
      axios
        .post("http://localhost:9090/movie/addcomment", data)
        .then(() => {
          console.log("Hello, Javascript");
          this.$router.go();
        })
        .catch(() => {
          console.log("error");
        })
        .finally(() => {
          // TODO 입력한 데이터 초기화
        });
    }
  },

  async apply() {
    var data = {
      id: this.$route.params.id
    };

    // Mutation 을 실행할떈 .commit() / Actions 을 실행할떈 .dispatch()
    this.$store.dispatch("movie/searchMovieWithId", {
      id: this.$route.params.id
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
.container {
  padding-top: 40px;
}
.comment-form {
  margin-top: 100px;
  .comment-input {
    display: flex;
    > * {
      margin-right: 10px;
      font-size: 15px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
  h3 {
    margin: 24px 0 6px;
    color: $black;
    font-family: "Oswald", sans-serif;
    font-size: 20px;
  }
}

.comment-list {
  margin-top: 70px;

  h3 {
    margin: 24px 0 6px;
    color: $black;
    font-family: "Oswald", sans-serif;
    font-size: 20px;
  }
}

.skeletons {
  display: flex;
  .poster {
    // 화면이 작아져도 감소하지 않겠다는 옵션
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3 / 2;
    margin-right: 70px;
  }
  .specs {
    flex-grow: 1;
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
.movie-details {
  display: flex;
  color: $gray-600;
  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3 / 2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .specs {
    flex-grow: 1;
    .title {
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &::after {
          content: "\00b7";
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 20px;
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }
}
</style>
