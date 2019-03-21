<template>
  <div>
    <kendo-dialog
      :visible="isVisible"
      title="Confirm Delete"
      content="Are you want to delete"
    >
      <kendo-dialog-action
        text="OK"
        :primary="true"
        :action="deletePost"
      ></kendo-dialog-action>
      <kendo-dialog-action :action="cancel" text="Cancel"></kendo-dialog-action>
    </kendo-dialog>

    <kendo-notification ref="notif" :position-top="30"></kendo-notification>

    <b-table
      v-if="posts.length"
      small
      bordered
      hovered
      responsive
      :items="posts"
      :fields="tFields"
    >
      <template slot="title" slot-scope="data">
        {{ data.item.title }}
      </template>
      <template slot="body" slot-scope="data">
        {{ data.item.body }}
      </template>
      <template slot="action" slot-scope="row">
        <b-button @click="update(row.item);" size="sm" variant="primary"
          >edit</b-button
        >
        <b-button @click="remove(row.item);" size="sm" variant="danger"
          >delete</b-button
        >
      </template>
    </b-table>
    <b-alert :show="!posts.length" variant="warning">No Records!</b-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { eventBus } from "../../eventBus";
import { mixin } from "../../mixins/mixin";

export default {
  mixins: [mixin],
  data() {
    return {
      tFields: [
        { key: "title", label: "Title" },
        { key: "body", label: "Body" },
        { key: "action", label: "Action" }
      ],
      isVisible: false,
      id: null
    };
  },
  computed: {
    ...mapGetters("posts", {
      posts: "getPosts"
    })
  },
  methods: {
    update(row) {
      eventBus.$emit("UPDATE_POST", {
        id: row.id,
        title: row.title,
        body: row.body
      });
    },
    remove(row) {
      this.id = row.id;
      this.isVisible = true;
    },
    deletePost() {
      this.$store.dispatch("posts/deletePost", this.id);
      this.isVisible = false;
      this.showNotification("Successfully Deleted!!!", "success");
    },
    cancel() {
      this.id = null;
      this.isVisible = false;
    }
  },
  created() {
    this.$store.dispatch("posts/getPosts");
  },
  filters: {
    replaceWith(val) {
      return val.toString().slice(0, 20);
    }
  }
};
</script>
