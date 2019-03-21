<template>
  <div class="container">
    <kendo-notification ref="notif" :position-top="30"></kendo-notification>
    <b-form-group horizontal label="Title:">
      <b-form-input
        horizontal
        v-model="formData.title"
        :state="!$v.formData.title.$invalid"
      ></b-form-input>
    </b-form-group>

    <b-form-group horizontal label="Body:">
      <b-form-textarea
        placeholder="Body..."
        v-model="formData.body"
        :state="!$v.formData.body.$invalid"
        horizontal
        rows="3"
      ></b-form-textarea>
    </b-form-group>
    <b-button
      @click="save"
      v-if="!isUpdate"
      variant="primary"
      size="sm"
      :disabled="$v.formData.$invalid"
      >Save</b-button
    >
    <b-button
      @click="update"
      v-if="isUpdate"
      variant="primary"
      size="sm"
      :disabled="$v.formData.$invalid"
      >Update</b-button
    >
    <b-button @click="cancel" variant="danger" size="sm">Cancel</b-button>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { eventBus } from "../../eventBus";
import { KendoNotification } from "@progress/kendo-popups-vue-wrapper";
import { mixin } from "../../mixins/mixin";

export default {
  mixins: [mixin],
  props: {
    selected: Object,
    isUpdate: Boolean
  },
  components: {
    KendoNotification
  },
  data() {
    return {
      formData: [{ id: null }, { title: null }, { body: null }]
    };
  },
  methods: {
    save() {
      this.$store.dispatch("posts/createPost", this.formData).then(res => {
        if (res.id) {
          this.formData = [];
          this.showNotification("Success Created!!!", "success");
          eventBus.$emit("RETURN_TO_LIST_PAGE");
        }
      });
    },
    update() {
      this.$store.dispatch("posts/updatePost", this.formData).then(res => {
        if (res.id) {
          this.formData = [];
          this.showNotification("Success Updated!!!", "success");
          eventBus.$emit("RETURN_TO_LIST_PAGE");
        }
      });
    },
    cancel() {
      eventBus.$emit("CANCEL");
    }
  },
  created() {
    if (this.isUpdate) {
      this.formData = this.selected;
    } else {
      this.formData = [];
    }
  },
  validations: {
    formData: {
      title: {
        required
      },

      body: {
        required
      }
    }
  }
};
</script>
