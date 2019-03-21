import { db } from "../../firebaseConfig";

export default {
  namespaced: true,
  state: {
    examinee: [],
    admin: []
  },
  getters: {
    getExaminee(state) {
      return state.examinee;
    },
    getAdmin(state) {
      return state.admin;
    }
  },
  mutations: {
    examinee(state, payload) {
      state.examinee = [];
      state.examinee = payload;
    },
    getAdmin(state, payload) {
      state.admin = [];
      state.admin = payload;
    }
  },
  actions: {
    getExaminee({ commit }, payload) {
      let temp = [];
      let xhr = db
        .collection("examinees")
        .where("code", "==", payload)
        .get();

      xhr
        .then(res => {
          res.forEach(val => {
            temp.push({
              id: val.id,
              code: val.data().code,
              name: val.data().name
            });
          });
          commit("examinee", temp);
        })
        .catch(e => {
          console.log(e);
        });
      return xhr;
    },
    getAdmin({ commit }, payload) {
      let temp = [];
      let xhr = db
        .collection("admin")
        .where("username", "==", payload.username)
        .where("password", "==", payload.password)
        .get();
      xhr
        .then(res => {
          res.forEach(val => {
            temp = {
              id: val.id,
              username: val.data().username
            };
          });
          commit("getAdmin", temp);
        })
        .catch(e => {
          console.log(e);
        });
      return xhr;
    },
    logout({ commit }, payload) {
      commit("getAdmin", payload);
    }
  }
};
