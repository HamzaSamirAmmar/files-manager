<template>
  <AuthForm ref="authForm" :title="title">
    <!--From action-->
    <template v-slot:action="slotProps">
      <div class="text-center my-10">
        <CustomLoader :loading="loading">
          <template v-slot:default>
            <v-btn
              @click="postLogin(slotProps.email, slotProps.password)"
              rounded
              color="primary"
              dark
              >Login</v-btn
            >
          </template>
        </CustomLoader>
      </div>
    </template>
    <!--Right side text -->
    <template v-slot:right-side-text>
      <h2 class="text-center display-1">Don't have an account?</h2>
      <h4 class="text-center mt-10">
        Enter your personal details and start your journey with the best files
        manager ever!
      </h4>
    </template>
    <!--Right side action -->
    <template v-slot:right-side-action>
      <v-btn rounded outlined dark @click="redirect">Register</v-btn>
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
    title: "Login to your account",
  }),
  computed: {
    ...mapState(useUserStore, ["loading"]),
  },
  methods: {
    ...mapActions(useUserStore, ["login"]),
    postLogin: function (email, password) {
      // this.$root.VToast.showErrorMessage("Network error");
      if (this.$refs.authForm.valid()) {
        console.log(email);
        console.log(password);
        this.login(email, password);
      }
    },
    redirect: function () {
      this.$router.push("/register");
    },
  },
};
</script>
