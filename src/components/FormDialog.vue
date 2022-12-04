<template>
  <v-dialog v-model="show" max-width="500px" @click:outside="close()"	>
    <v-card elevation="2" class="pa-5" >
      <v-card-title>
        <v-spacer></v-spacer>
        <slot name="title"></slot>
        <v-spacer></v-spacer>
      </v-card-title>
      <slot name="body"></slot>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="actions"></slot>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    showCondition: Boolean
  },
  data() {
    return {
      show: this.showCondition,
    }
  },
  watch: {
    showCondition: {
      immediate: true,
      handler() {
        this.show = this.showCondition
      }
    }
  },
  methods:{
    close(){
      this.$emit('closed');
    }
  }
};
</script>

<style scoped>

</style>
