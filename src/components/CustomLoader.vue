<template>
  <div>
    <!--If current state is !loading show the passed component-->
    <slot v-if="!loading"></slot>
    <!--Else hide the passed component and show the loader-->
    <v-progress-circular
      v-else
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
  },
};
</script>
