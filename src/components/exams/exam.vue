<template>
  <b-card no-body>
    <kendo-notification ref="notif" :position-top="30"></kendo-notification>
    <template slot="header"
      >Examinee Name: {{ examinee[0].name }}</template
    >
    <b-tabs small card v-model="tabIndex">
      <b-tab v-for="(part, index) in exam" :key="index" :title="part.partName">
        <b-row v-for="(items, i) in part.items" :key="i">
          <b-col>{{ items.itemNumber }}.</b-col>
          <b-col>
            <b-radio-group
              v-model="items.examineeAnswer"
              :options="items.ch"
            ></b-radio-group>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
    <template slot="footer">
      <b-button @click="submit" variant="success" size="sm">Submit</b-button>
      <b-button-group class="float-right" size="sm">
        <b-btn @click="tabIndex--;">Prev</b-btn>
        <b-btn @click="tabIndex++;">Next</b-btn>
      </b-button-group>
    </template>
  </b-card></template
>

<script>
import { mapGetters } from "vuex";
import { each } from "lodash";
import { mixin } from "../../mixins/mixin";

export default {
  mixins: [mixin],
  data() {
    return {
      tabIndex: 0
    };
  },
  computed: {
    ...mapGetters({
      exam: "exam/getTestKey",
      examinee: "auth/getExaminee"
    })
  },
  methods: {
    submit() {
      let score = 0;
      let total = 0;
      let examineeAnswers = [];
      each(this.exam, part => {
        total = part.items.length;
        for (let i = 0; i < part.items.length; i++) {
          examineeAnswers.push(part.items[i].examineeAnswer);
          if (part.items[i].answer === part.items[i].examineeAnswer) {
            score += 1;
          }
        }
      });
      console.log("score:" + score + "/" + total);
      console.log(examineeAnswers);
      this.showNotification("Successfully Submitted!!!", "success");
    }
  },
  created() {
    this.$store.dispatch("exam/getExamKey");
    let user = localStorage.getItem("user");
    if (user == true) {
      this.$router.push("/");
    }
  }
};
</script>
