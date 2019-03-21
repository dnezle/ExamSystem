<template>
  <div class="container-fluid">
    <br /><br />
    <b-card>
      <template slot="header">
        <b-button
          @click="addForm"
          variant="primary"
          size="sm"
          :disabled="btnState"
          >Add</b-button
        >
      </template>

      <component
        :is="ccomponent"
        :selected="selected"
        :isUpdate="isUpdate"
      ></component>
    </b-card>
  </div>
</template>

<script>
import PostsList from "./PostsList";
import AddPost from "./AddPost";
import { eventBus } from "../../eventBus";

export default {
  components: {
    PostsList,
    AddPost
  },
  data() {
    return {
      ccomponent: PostsList,
      selected: null,
      isUpdate: false
    };
  },
  computed: {
    btnState() {
      return this.ccomponent === AddPost ? true : false;
    }
  },
  methods: {
    addForm() {
      this.ccomponent = AddPost;
      this.isUpdate = false;
      this.selected = null;
    }
  },
  created() {
    eventBus.$on("CANCEL", () => {
      this.ccomponent = PostsList;
    });
    eventBus.$on("UPDATE_POST", params => {
      this.ccomponent = AddPost;
      this.selected = params;
      this.isUpdate = true;
    });
    eventBus.$on("RETURN_TO_LIST_PAGE", () => {
      this.ccomponent = PostsList;
    });
  },
  destroyed() {
    eventBus.$off("CANCEL");
    eventBus.$off("UPDATE_POST");
    eventBus.$off("RETURN_TO_LIST_PAGE");
  }
};
</script>
