import axios from "axios";
import VueCookies from "vue-cookies";
import _uniqBy from "lodash/uniqBy";

export default {
  namespaced: true,
  state: () => {
    return {
      movies: [],
      message: "코멘트한 영화 목록",
      loading: false,
      name: "",
      email: "",
      infoData: {},
      image:
        "https://user-images.githubusercontent.com/78194843/177528218-8e981268-46a6-485f-9320-2e80ff1d6d97.PNG"
    };
  },

  getters: {},

  mutations: {
    updateInfoState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      // state.movies = [];
    }
  },
  actions: {
    async findMemberInfo({ state, commit }, payload) {
      if (state.loading) return;

      commit("updateInfoState", {
        infoData: {},
        loading: true
      });
      try {
        const res = await _findMember(payload);

        const { Search, name, email } = res.data;

        console.log("Search");
        console.log(Search);

        commit("updateInfoState", {
          movies: Search,
          name: name,
          email: email
        });
        console.log(res.data);
        console.log("test start5");
      } catch (error) {
        // commit("updateInfoState", {});
      } finally {
        commit("updateInfoState", {
          loading: false
        });
      }
    }
  }
};

function _findMember(payload) {
  const url = `http://localhost:9090/about`; // 디테일

  const session = VueCookies.get("mySession");
  return new Promise(function (resolve, reject) {
    axios
      .post(url, session)
      .then((res) => {
        if (res.data.Error) {
          reject(res.data.Error);
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
