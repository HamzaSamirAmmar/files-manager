<template>
  <AuthForm :title="title">
    <!--From action-->
    <template v-slot:action="slotProps">
      <div class="text-center my-10">
        <CustomLoader :loading="loading">
          <template v-slot:default>
            <v-btn
              @click="login(slotProps.email, slotProps.password)"
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

export default {
  components: { AuthForm, CustomLoader },
  data: () => ({
    title: "Login to your account",
    loading: false,
  }),
  methods: {
    login: function (email, password) {
      // TODO: post login using auth repository
      this.$root.VToast.showErrorMessage("Network error");
      this.loading = true;
      console.log(email);
      console.log(password);
    },
    redirect: function () {
      this.$router.push("/register");
    },
  },
};
</script>
