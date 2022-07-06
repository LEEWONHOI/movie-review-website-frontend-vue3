import axios from "axios";
import _uniqBy from "lodash/uniqBy";

export default {
  // module 로 사용한다는 조건
  namespaced: true,
  // 취업해야하는 data
  state: () => {
    return {
      movies: [],
      message: "Search for the movie title",
      loading: false,
      theMovie: {}
      // TODO 사용여부 체크
      // comments: []
    };
  },
  // computed
  getters: {},
  // methods
  // Store 는 자바 싱글턴이고 그만큼 static 변수 사용에 대해 주의를 기울여야 한다.
  // 그러므로 이곳에서만 데이터를 변경할 수 있음
  mutations: {
    updateState(state, payload) {
      // key 를 배열로 바꿔줌 ['movies', 'message', 'loading']
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      state.movies = [];
    }
  },
  // methods
  // 비동기 방식으로 작동함
  actions: {
    async searchMovies({ state, commit }, payload) {
      // 로딩중일땐 메서드 작동하지 않도록 막아둠
      if (state.loading) {
        return;
      }

      commit("updateState", {
        // 검색 시작하면 message 부분은 빈 문자로 변경 && loading 을 true 로 변경
        message: "",
        loading: true
      });
      try {
        // await 에러 처리
        const res = await _fetchMovie({
          ...payload,
          page: 1 // 처음 요청은 1페이지
        });
        const { Search, totalResults } = res.data;
        commit("updateState", {
          // TODO 중복값을 imdbID 를 통해서 필터링. 추후 movie_id 로 변경
          movies: _uniqBy(Search, "movieId")
        });

        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10);

        // 1페이지 외에 추가 페이지가 있으니 데이터 추가 요청을 전송
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            // number 값만큼만 데이터를 불러옴
            if (page > payload.number / 10) break;

            // page 숫자도 전달
            const res = await _fetchMovie({
              ...payload,
              page: page // 추가 페이지 값은 파라미터 전달
            });
            const { Search } = res.data;
            commit("updateState", {
              movies: [...state.movies, ..._uniqBy(Search, "movieId")]
            });
          }
        }
      } catch (message) {
        commit("updateState", {
          // 검색된 내용이 있었으면 지워줘야하니깐 초기화 작업
          movies: [],
          // store 니깐.. 전체 컴포넌트에서 state쪽 접근해서 에러 message 를 쓸 수 있음
          message: message
        });
      } finally {
        commit("updateState", {
          loading: false
        });
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return;

      commit("updateState", {
        // movie 클릭 시 movie 페이지로 가는데, 기존데이터가 잠깐동안 보일 수 있기떄문에
        // 아예 메시더 시작 시 theMovie 객체를 초기화 시켜준다.
        theMovie: {},
        loading: true
        // TODO 사용여부 체크
        // comments: []
      });

      const { id } = payload;
      try {
        const res = await _fetchMovie({ id: id });
        commit("updateState", {
          theMovie: res.data
        });
      } catch (error) {
        commit("updateState", {
          theMovie: {} // 실패 시 배열 초기화
        });
      } finally {
        commit("updateState", {
          loading: false
        });
      }
    }
  }
};

function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload;
  const OMDB_API_KEY = "69704f41";
  // TODO 요청 Url 변경
  const url = id
    ? `http://localhost:9090/movie/${id}` // 디테일
    : `http://localhost:9090/search/?title=${title}&type=${type}&year=${year}&needPage=${payload.number}&page=${page}`; // 검색

  return new Promise(function (resolve, reject) {
    axios
      .get(url)
      .then((res) => {
        // 서버에서 보내주는 에러를 따로 처리하기
        // TODO 우리(서버)가 Exception 을 만들어서 Error 정보를 Front 로 넘겨주면
        // 그 정보를 프론트에서 맵핑이나 핸들링하면 될듯
        if (res.data.Error) {
          reject(res.data.Error); // Error 에 담긴 에러 메시지를 호출
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
