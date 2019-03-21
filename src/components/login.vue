<template>
  <div>
    <b-form class="form">
      <legend>LOGIN</legend>
      <b-alert :show="isError" variant="danger"
        >No result or invalid exam code.</b-alert
      >
      <b-form-group label="Login as:" size="sm" horizontal>
        <b-select
          v-model="selected"
          @change="changeLoginAs"
          size="sm"
          horizontal
          :options="loginAs"
        >
        </b-select>
      </b-form-group>

      <template v-if="!isExamineer">
        <b-form-group label="Exam Code:" size="sm" horizontal>
          <b-input
            v-model="code"
            size="sm"
            horizontal
            :state="!$v.code.$invalid"
            placeholder="Enter exam code..."
          ></b-input>
        </b-form-group>
        <hr />
        <b-button
          size="sm"
          variant="success"
          @click="submitCode"
          :disabled="$v.code.$invalid"
          >Submit</b-button
        >
      </template>

      <template v-if="isExamineer">
        <b-form-group label="Username:" size="sm" horizontal>
          <b-input
            v-model="admin.username"
            size="sm"
            horizontal
            :state="!$v.admin.username.$invalid"
          ></b-input>
        </b-form-group>
        <b-form-group label="Password:" size="sm" horizontal>
          <b-input
            v-model="admin.password"
            type="password"
            size="sm"
            horizontal
            :state="!$v.admin.password.$invalid"
          ></b-input>
        </b-form-group>
        <b-button
          @click="login"
          size="sm"
          variant="success"
          :disabled="$v.admin.$invalid"
          >Login</b-button
        >
      </template>
    </b-form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      loginAs: [
        { text: "examinee", value: "examinee" },
        { text: "examineer", value: "examineer" }
      ],
      selected: "examinee",
      isExamineer: false,
      isError: false,
      code: null,
      admin: [{ username: null }, { password: null }]
    };
  },
  methods: {
    changeLoginAs() {
      this.$nextTick(() => {
        if (this.selected === "examineer") {
          this.isExamineer = true;
        } else {
          this.isExamineer = false;
        }
      });
    },
    submitCode() {
      this.$store.dispatch("auth/getExaminee", this.code).then(res => {
        if (!res.exists) {
          this.isError = true;
        }
        res.forEach(val => {
          if (val.data()) {
            localStorage.setItem("user", this.isExamineer);
            this.$router.push("/exam");
          }
        });
      });
    },
    login() {
      this.$store.dispatch("auth/getAdmin", this.admin).then(result => {
        if (result.exists) console.log(result);
        result.forEach(val => {
          if (val.data()) {
            localStorage.setItem("user", this.isExamineer);
            this.$router.push("/home");
          }
        });
      });
    }
  },
  validations: {
    code: {
      required
    },
    admin: {
      username: {
        required
      },
      password: {
        required
      }
    }
  }
};
</script>

<style scoped>
.form {
  margin: 20%;
  padding: 5%;
  border-radius: 15px;
  border: 2px solid rgb(65, 184, 131);
}
legend {
  text-align: center;
  border-bottom: 2px dotted lightgray;
}
</style>
