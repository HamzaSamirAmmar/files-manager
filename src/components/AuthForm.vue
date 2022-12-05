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
                    v-model="email"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    :rules="passwordRules"
                    v-model="password"
                    type="password"
                    color="primary"
                  />
                  <slot name="extra-fields"></slot>
                </v-form>
              </v-card-text>
              <!-- Form action button -->
              <slot name="action" :email="email" :password="password"></slot>
            </v-col>
            <!-- Right side -->
            <v-col cols="12" md="4" class="primary">
              <!-- Text -->
              <v-card-text class="text-center mt-12 secondary--text">
                <slot name="right-side-text"></slot>
              </v-card-text>
              <!-- Action -->
              <div class="text-center">
                <slot name="right-side-action"></slot>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  /// TODO ass the validation bool value to the parent
  data: () => ({
    email: "",
    password: "",
    emailRules: [
      (v) =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
      (v) => !!v || "Email is required",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
    ],
  }),
  props: {
    title: String,
  },
  computed: {},
};
</script>

<style scoped>
#authForm {
  background-image: url("../assets/auth-background.png");
  background-size: cover;
}
</style>
