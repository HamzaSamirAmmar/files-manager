<template>
  <!-- A container with full height and width -->
  <v-container id="authForm" class="fill-height" fluid>
    <!-- Justify and align center all contents -->
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-row>
            <!-- Left side -->
            <v-col cols="12" md="8">
              <v-card-text class="my-12">
                <h1
                  class="text-center display-2 text-h5"
                  style="color: #424242"
                >
                  {{ title }}
                </h1>
                <v-form class="mx-12 mt-4">
                  <v-text-field
                    label="Email"
                    name="Email"
                    prepend-icon="mdi-email"
                    type="text"
                    color="primary"
                    :rules="emailRules"
                    v-model="emailValue"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    :rules="passwordRules"
                    v-model="localPasswordValue"
                    type="password"
                    color="primary"
                  />
                  <slot name="extra-fields"></slot>
                </v-form>
              </v-card-text>
              <!-- action button -->
              <slot name="action" :email="emailValue"></slot>
              <!-- <div class="text-center my-10">
                <v-btn rounded color="primary" dark>Login</v-btn>
              </div> -->
            </v-col>
            <!-- Right side -->
            <v-col cols="12" md="4" class="primary">
              <slot name="right-side"></slot>
              <!-- <v-card-text class="text-center mt-12 secondary--text">
                <h2 class="text-center display-1">Don't have an account?</h2>
                <h4 class="text-center mt-10">
                  Enter your personal details and start your journey with the
                  best files manager ever!
                </h4>
              </v-card-text>
              <div class="text-center">
                <v-btn rounded outlined dark @click="step++">Register</v-btn>
              </div> -->
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    emailRules: [
      (v) =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
    emailValue: "",
    passwordRules: [],
  }),
  props: {
    title: String,
    password: String,
    email: String,
  },
  computed: {
    localEmailValue: {
      get() {
        return this.email;
      },
      set(newValue) {
        this.$emit("update:email", newValue);
      },
    },
    localPasswordValue: {
      get() {
        return this.password;
      },
      set(newValue) {
        this.$emit("update:password", newValue);
      },
    },
  },
};
</script>

<style scoped>
#authForm {
  background-image: url("../assets/auth-background.png");
  background-size: cover;
}
</style>
