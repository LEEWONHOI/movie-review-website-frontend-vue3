import { createStore } from "vuex";
import movie from "./movie.js";
import about from "./about.js";

export default createStore({
  modules: {
    // 이름 : 실제연결될 js (movie : movie)
    movie,
    about
  }
});
