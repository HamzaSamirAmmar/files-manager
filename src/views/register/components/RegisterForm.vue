<template>
  <AuthForm :title="title">
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
    <!--From action-->
    <template v-slot:action="slotProps">
      <div class="text-center my-10">
        <CustomLoader :loading="loading">
          <template v-slot:default>
            <v-btn
              @click="postRegister(slotProps.email, slotProps.password)"
              rounded
              color="primary"
              dark
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
import { useUserStore } from "@/store/UserStore";
import { mapActions, mapState } from "pinia";

export default {
  components: { AuthForm, CustomLoader },
  data: () => ({
    title: "Create your account",
    username: "",
    usernameRules: [
      (v) => !!v || "Username is required",
      (v) => (v && v.length >= 4) || "Username must be at least 4 characters",
    ],
  }),
  computed: {
    ...mapState(useUserStore, ["loading"]),
  },
  methods: {
    ...mapActions(useUserStore, ["register"]),
    postRegister: function (email, password) {
      // TODO: checkValidation
      this.register(email,password,this.username);
    },
    redirect: function () {
      this.$router.push("/login");
    },
  },
};
</script>
