import { db } from "../../firebaseConfig.js";

export default {
  namespaced: true,
  state: {
    testKey: [],
    keyId: null
  },
  getters: {
    getTestKey(state) {
      return state.testKey;
    }
  },
  mutations: {
    getExamKey(state, payload) {
      state.testKey = [];
      state.testKey = payload;
    },
    addPart(state, payload) {
      state.testKey.push(payload);
    },
    removePart(state, payload) {
      state.testKey.splice(payload, 1);
    },
    addItem(state, payload) {
      let num;
      if (state.testKey[payload].items) {
        num = state.testKey[payload].items.length + 1;
      } else {
        num = 1;
      }
      state.testKey[payload].items.push({
        itemNumber: num,
        numberOfChoices: [
          { text: "3", value: 3 },
          { text: "4", value: 4 },
          { text: "5", value: 5 }
        ],
        choices: null,
        ch: [],
        answer: null,
        examineeAnswer: null
      });
    },
    removeItem(state, payload) {
      state.testKey[payload.index].items.splice(payload.i, 1);
    }
  },
  actions: {
    getExamKey({ commit }) {
      db.collection("exam-key")
        .doc("key")
        .get()
        .then(res => {
          commit("getExamKey", res.data().payload);
        })
        .catch(e => {
          console.log(e);
        });
    },
    addPart({ commit }, payload) {
      commit("addPart", payload);
    },
    removePart({ commit }, payload) {
      commit("removePart", payload);
    },
    addItem({ commit }, payload) {
      commit("addItem", payload);
    },
    removeItem({ commit }, payload) {
      commit("removeItem", payload);
    },
    saveTestKey({ dispatch }, payload) {
      let xhr = db
        .collection("exam-key")
        .doc("key")
        .set({
          payload
        })
        .then(res => {})
        .catch(e => {});
      return xhr;
    }
  }
};
