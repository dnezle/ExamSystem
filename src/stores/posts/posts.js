import { db } from "../../firebaseConfig";

export default {
  namespaced: true,
  state: {
    posts: []
  },
  getters: {
    getPosts(state) {
      return state.posts;
    }
  },
  mutations: {
    posts(state, payload) {
      state.posts = [];
      state.posts = payload;
    }
  },
  actions: {
    getPosts({ commit }, payload) {
      let temp = [];
      db.collection("posts")
        .get()
        .then(re => {
          re.forEach(val => {
            temp.push({
              id: val.id,
              title: val.data().title,
              body: val.data().body
            });
          });
          commit("posts", temp);
        })
        .catch(e => {
          console.log(e);
        });
    },
    createPost({ dispatch }, payload) {
      let xhr = db.collection("posts").add({
        title: payload.title,
        body: payload.body
      });
      xhr
        .then(res => {
          dispatch("getPosts");
        })
        .catch(e => {});

      return xhr;
    },
    updatePost({ dispatch }, payload) {
      let xhr = db.collection("posts").doc(payload.id);
      xhr
        .set({
          title: payload.title,
          body: payload.body
        })
        .then(res => {
          dispatch("getPosts");
        })
        .catch(e => {});

      return xhr;
    },
    deletePost({ dispatch }, payload) {
      let xhr = db
        .collection("posts")
        .doc(payload)
        .delete();
      xhr
        .then(() => {
          dispatch("getPosts");
        })
        .catch(e => {
          console.log(e);
        });

      return xhr;
    }
  }
};
