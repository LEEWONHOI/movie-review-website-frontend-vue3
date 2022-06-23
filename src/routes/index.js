import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home.vue";
import Movie from "./Movie.vue";
import About from "./About.vue";

export default createRouter({
  // hash ( 모든 Url에 #표시가 생긴다. 제거할려면 서버에서 다른 작업이 필요하니 나중에 처리)
  history: createWebHashHistory(),

  routes: [
    {
      path: "/",
      component: Home
    },
    {
      // 동적으로 url 만들어서 get 요청
      path: "/movie/:id",
      component: Movie
    },
    {
      path: "/about",
      component: About
    }
  ]
});
