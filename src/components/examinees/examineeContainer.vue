<template>
  <b-card class="container-fluid">
    <template slot="header">
      <b-row>
        <b-col>
          <b-form-input
            v-model="search"
            size="sm"
            @input="searchExaminee"
            @change="searchExaminee"
            placeholder="Search name here..."
          ></b-form-input>
        </b-col>
        <b-col>
          <b-button
            @click="openWindow"
            class="float-right"
            size="sm"
            variant="primary"
            >Add</b-button
          >
        </b-col>
      </b-row>
    </template>

    <b-table
      v-if="getExaminees.length"
      :items="getExaminees"
      :fields="fields"
      small
      striped
      bordered
    >
      <template slot="action" slot-scope="row">
        <b-button @click="edit(row);" size="sm" variant="primary"
          >Edit</b-button
        >
        <b-button @click="remove(row);" size="sm" variant="danger">X</b-button>
      </template>
    </b-table>

    <b-alert variant="warning" :show="!getExaminees.length"
      >No records!!!</b-alert
    >

    <kendo-window
      ref="addExaminee"
      :title="title"
      :visible="false"
      width="400px"
    >
      <b-form-group label="Exam Code:" size="sm" horizontal>
        <b-input
          v-model="examinee.code"
          :value="examinee.code"
          size="sm"
          horizontal
          disabled
        ></b-input>
      </b-form-group>
      <b-form-group label="Examinee Name:" size="sm" horizontal>
        <b-input
          v-model="examinee.name"
          size="sm"
          horizontal
          :state="!$v.examinee.$invalid"
        ></b-input>
      </b-form-group>
      <b-button
        @click="saveExaminee"
        size="sm"
        variant="success"
        v-if="!isUpdate"
        :disabled="$v.examinee.$invalid"
        >Add</b-button
      >
      <b-button
        size="sm"
        variant="success"
        v-if="isUpdate"
        :disabled="$v.examinee.$invalid"
        >Update</b-button
      >
      <b-button @click="cancel" class="float-right" size="sm" variant="danger"
        >Cancel</b-button
      >
    </kendo-window>

    <kendo-notification ref="notif" :position-top="30"></kendo-notification>
  </b-card>
</template>

<script>
import Hashids from "hashids";
import { mapGetters } from "vuex";
import { isMatch, debounce } from "lodash";
import { required } from "vuelidate/lib/validators";
import { mixin } from "../../mixins/mixin";

export default {
  mixins: [mixin],
  data() {
    return {
      title: "Add Examinee",
      search: null,
      examinee: {
        code: null,
        name: null
      },
      fields: [
        { key: "code", label: "Code" },
        { key: "name", label: "Name" },
        { key: "action", label: "Action" }
      ],
      isUpdate: false
    };
  },
  computed: {
    ...mapGetters("examinee", {
      getExaminees: "getExaminees",
      codes: "getExamCode"
    })
  },
  methods: {
    openWindow() {
      this.examinee = [];
      this.isUpdate = false;
      this.title = "Add Examinee";
      this.$nextTick(() => {
        this.$refs.addExaminee
          .kendoWidget()
          .center()
          .open();
      });
      this.genRandomCode();
    },
    genRandomCode() {
      let hash = new Hashids("exam");
      let temp = "";
      let code = hash.encode(1, 2, 3);
      for (let i = 0; i < code.length; i++)
        temp += code.charAt(Math.floor(Math.random() * code.length));
      this.examinee.code = temp;
      if (isMatch(this.codes, this.examinee.code)) {
        this.genRandomCode();
      }
    },
    clear() {
      this.examinee = [];
      this.$refs.addExaminee
        .kendoWidget()
        .center()
        .close();
    },
    cancel() {
      this.clear();
    },
    saveExaminee() {
      this.$store.dispatch("examinee/addExaminees", this.examinee).then(res => {
        if (res.id) {
          this.clear();
          this.showNotification("Successfully added!!!", "success");
        }
      });
    },
    searchExaminee: debounce(function() {
      this.$store.dispatch("examinee/getExaminees", this.search);
    }, 1000),
    remove(row) {
      this.$store.dispatch("examinee/remove", row.item.id);
      this.showNotification("Successfully Deleted!!!", "success");
    },
    edit(row) {
      this.examinee = row.item;
      this.isUpdate = true;
      this.title = "Update Examinee";
      this.$nextTick(() => {
        this.$refs.addExaminee
          .kendoWidget()
          .center()
          .open();
      });
    }
  },
  created() {
    this.$store.dispatch("examinee/getExaminees");
  },
  watch: {
    code(nv) {
      this.code = this.code;
    },
    search(nv) {
      if (!this.search) {
        this.$store.dispatch("examinee/getExaminees");
      }
    }
  },
  validations: {
    examinee: {
      name: {
        required
      }
    }
  }
};
</script>
