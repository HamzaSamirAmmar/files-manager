<template>
  <v-btn color="primary">
    create new {{ entityName }}
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    entityName: String
  }
};
</script>

<style scoped>

</style>
