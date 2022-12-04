<template>
  <!-- we cas pass the password as a sync v-model -->
  <!-- or we can get the email by getting the slotProps -->
  <!-- remember that we can use $refs -->
  <AuthForm :title="title" :password.sync="password">
    <!--From extra fields-->
    <template v-slot:extra-fields>
      <v-text-field
        id="username"
        label="Username"
        name="Username"
        prepend-icon="mdi-account"
        :rules="usernameRules"
        v-model="username"
        type="text"
        color="primary"
    /></template>
    <!-- Form Action -->
    <!--From action-->
    <template v-slot:action="slotProps">
      <div class="text-center my-10">
        <CustomLoader :loading="loading">
          <template v-slot:default>
            <v-btn @click="register(slotProps.email)" rounded color="primary" dark
              >Register</v-btn
            >
          </template>
        </CustomLoader>
      </div>
    </template>
    <!--Right side text -->
    <template v-slot:right-side-text>
      <h2 class="text-center display-1">Have an account?</h2>
      <h4 class="text-center mt-10">
        Enter your email and password to continue your journey with the best
        files manager ever!
      </h4>
    </template>
    <!--Right side action -->
    <template v-slot:right-side-action>
      <v-btn rounded outlined dark @click="redirect">Login</v-btn>
    </template>
  </AuthForm>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue";
import CustomLoader from "../../../components/CustomLoader.vue";

export default {
  components: { AuthForm,CustomLoader },
  data: () => ({
    loading: false,
    title: "Create your account",
    username: "",
    password: "",
    usernameRules: [
      (v) => !!v || "Username is required",
      (v) => (v && v.length >= 4) || "Username must be at least 4 characters",
    ],
  }),
  methods: {
    register: function (email) {
      // TODO: post register the using auth repository
      this.loading = true;
      console.log(this.username);
      console.log(email);
      console.log(this.password);
    },
    redirect: function () {
      this.$router.push("/login");
    },
  },
};
</script>
