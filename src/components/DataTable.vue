<template>
  <v-data-table
   :headers="headers"
   :items="items"
   :items-per-page="5"
   class="elevation-1"
   :loading="loading"
   loading-text="Loading... Please wait"
   :show-select="selectable"
   v-model="selected"
   >
    <template v-slot:[`item.actions`]="{ item }">
      <slot name="actions" :item="item"></slot>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    headers: Array,
    items: Array,
    loading: Boolean,
    selectable: Boolean
  },
  data(){
    return{
      selected:[]
    }
  }
}
</script>

<style scoped>

</style>
