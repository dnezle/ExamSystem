<template>
  <div id="app">
    <b-nav>
      <b-nav-item to="/home" exact>Home</b-nav-item>
      <b-nav-item to="/examinees">Examinees</b-nav-item>
      <b-nav-item to="/exam-key">Exam Key</b-nav-item>
      <b-nav-item to="/about">About</b-nav-item>
      <b-nav-item class="float-right">
        <b-dropdown
          size="sm"
          :text="admin ? admin.username : ''"
          variant="link"
        >
          <b-dropdown-item-button @click.prevent="logout"
            >Logout</b-dropdown-item-button
          >
        </b-dropdown>
      </b-nav-item>
    </b-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      admin: "auth/getAdmin"
    })
  },
  methods: {
    logout() {
      localStorage.setItem("user", false);
      this.$store.dispatch("auth/logout", []);
      this.$router.push("/");
    }
  },
  created() {
    console.log(this.isLoginPage);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>

<style scoped>
a.nav-link.active {
  color: white;
  background-color: blue !important;
}
</style>
