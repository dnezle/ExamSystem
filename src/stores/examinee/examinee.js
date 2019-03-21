import { db } from "../../firebaseConfig";

export default {
  namespaced: true,
  state: {
    examinee: [],
    code: []
  },
  getters: {
    getExaminees(state) {
      return state.examinee;
    },
    getExamCode(state) {
      return state.code;
    }
  },
  mutations: {
    getExaminees(state, payload) {
      state.examinee = payload;
    },
    getExamCode(state, payload) {
      state.code = payload;
    }
  },
  actions: {
    getExaminees({ commit }, payload) {
      let temp = [];
      let code = [];
      if (payload) {
        let xhr = db
          .collection("examinees")
          .where("name", "==", payload)
          .get()
          .then(res => {
            res.forEach(val => {
              temp.push({
                id: val.id,
                code: val.data().code,
                name: val.data().name
              });
              code.push(val.data().code);
            });
            commit("getExaminees", temp);
            commit("getExamCode", code);
          })
          .catch(e => {
            console.log(e);
          });

        return xhr;
      } else {
        let xhr = db
          .collection("examinees")
          .orderBy("name")
          .get()
          .then(res => {
            res.forEach(val => {
              temp.push({
                id: val.id,
                code: val.data().code,
                name: val.data().name
              });
              code.push(val.data().code);
            });
            commit("getExaminees", temp);
            commit("getExamCode", code);
          })
          .catch(e => {
            console.log(e);
          });

        return xhr;
      }
    },
    addExaminees({ dispatch }, payload) {
      let xhr = db.collection("examinees").add({
        code: payload.code,
        name: payload.name,
        answer: [],
        score: null
      });
      xhr
        .then(res => {
          dispatch("getExaminees");
        })
        .catch(e => {
          console.log(e);
        });
      return xhr;
    },
    remove({ dispatch }, id) {
      db.collection("examinees")
        .doc(id)
        .delete()
        .then(() => {
          dispatch("getExaminees");
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
