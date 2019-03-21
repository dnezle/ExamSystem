<template>
  <b-card class="container-fluid">
    <kendo-notification ref="notif" :position-top="30"></kendo-notification>

    <template slot="header"
      >Test Key</template
    >
    <b-alert :show="!testKey.length" variant="warning">No Records!</b-alert>

    <div v-for="(parts, index) in testKey" :key="index">
      <b-card>
        <template slot="header">
          <b-form-group size="sm" label="Part Name:" label-size="sm" horizontal>
            <b-input
              v-model="parts.partName"
              size="sm"
              horizontal
              :state="!$v.testKey.$each[index].$invalid"
            ></b-input>
          </b-form-group>
        </template>
        <b-row v-for="(items, i) in parts.items" :key="i">
          <b-col cols="1">{{ items.itemNumber }}</b-col>
          <b-col cols="5">
            <b-select
              :options="items.numberOfChoices"
              size="sm"
              v-model="items.choices"
              @change="changeChoice(index, i);"
              horizontal
              :state="!$v.testKey.$each[index].items.$each[i].$invalid"
            >
              <template slot="first"
                ><option :value="null"
                  >Please select number of choices</option
                ></template
              >
            </b-select>
          </b-col>
          <b-col cols="5">
            <b-select
              v-model="items.answer"
              :options="items.ch"
              size="sm"
              horizontal
              :state="!$v.testKey.$each[index].items.$each[i].$invalid"
            >
              <template slot="first">
                <option :value="null">Please select answer</option>
              </template>
            </b-select>
          </b-col>
          <b-col cols="1"
            ><b-button
              @click="removeItem(index, i);"
              variant="danger"
              size="sm"
              class="close"
              aria-label="Close"
              ><span aria-hidden="true">&times;</span></b-button
            ></b-col
          >
        </b-row>
        <hr />
        <b-button
          class="float-right"
          @click="addItem(index);"
          variant="primary"
          size="sm"
          >Add Item</b-button
        >
        <template slot="footer">
          <b-button @click="removePart(index);" variant="danger" size="sm"
            >Remove Part</b-button
          >
        </template>
      </b-card>
      <br />
    </div>
    <template slot="footer">
      <b-button
        @click="save"
        variant="success"
        size="sm"
        :disabled="$v.testKey.$invalid"
        >Save</b-button
      >
      <b-button @click="addPart" class="float-right" variant="primary" size="sm"
        >Add Part</b-button
      >
    </template>
  </b-card>
</template>

<script>
import { mixin } from "../../mixins/mixin";
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [mixin],
  data() {
    return {
      choices: []
    };
  },
  computed: {
    ...mapGetters("exam", {
      testKey: "getTestKey"
    })
  },
  methods: {
    addPart() {
      let part = { partName: "Part", items: [] };
      this.$store.dispatch("exam/addPart", part);
    },
    removePart(index) {
      this.$store.dispatch("exam/removePart", index);
    },
    addItem(index) {
      this.$store.dispatch("exam/addItem", index);
    },
    removeItem(index, i) {
      let param = {
        index,
        i
      };
      this.$store.dispatch("exam/removeItem", param);
    },
    changeChoice(index, i) {
      this.$nextTick(() => {
        let ch = this.testKey[index].items[i].choices;
        if (ch === 3) {
          this.testKey[index].items[i].ch = [
            { text: "a", value: "a" },
            { text: "b", value: "b" },
            { text: "c", value: "c" }
          ];
        } else if (ch === 4) {
          this.testKey[index].items[i].ch = [
            { text: "a", value: "a" },
            { text: "b", value: "b" },
            { text: "c", value: "c" },
            { text: "d", value: "d" }
          ];
        } else {
          this.testKey[index].items[i].ch = [
            { text: "a", value: "a" },
            { text: "b", value: "b" },
            { text: "c", value: "c" },
            { text: "d", value: "d" },
            { text: "e", value: "e" }
          ];
        }
      });
    },
    save() {
      this.$store.dispatch("exam/saveTestKey", this.testKey);
      this.showNotification("Successfully Updated!!!", "success");
    }
  },
  created() {
    this.$store.dispatch("exam/getExamKey");
  },
  validations: {
    testKey: {
      required,
      $each: {
        partName: {
          required
        },
        items: {
          required,
          $each: {
            ch: {
              required
            },
            answer: {
              required
            }
          }
        }
      }
    }
  }
};
</script>
