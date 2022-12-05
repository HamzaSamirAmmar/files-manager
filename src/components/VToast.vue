<template>
  <v-snackbar
    :color="color"
    :timeout="timer"
    v-model="showSnackbar"
    bottom
    right
  >
    <v-icon left>{{ icon }}</v-icon
    >{{ message }}
  </v-snackbar>
</template>

<script>
export default {
  name: "VToast",
  data() {
    return {
      showSnackbar: false,
      message: "",
      color: "success",
      icon: "mdi-check",
      timer: 3000,
    };
  },
  methods: {
    showSuccessMessage(message) {
      this.message = message || 'missing "message".';
      this.color = "success";
      this.timer = 2500;
      this.icon = "mdi-check";
      this.showSnackbar = true;
    },
    showErrorMessage(message) {
      this.message = message || 'missing "message".';
      this.color = "error";
      this.timer = 2500;
      this.icon = "alert-circle-outline";
      this.showSnackbar = true;
    },
  },
};
</script>
