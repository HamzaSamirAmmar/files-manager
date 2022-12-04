<template>
  <div class="grey lighten-5">
    <v-container>
      <v-col>
        <v-breadcrumbs :items="links">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <v-row no-gutters class="pb-5">
          <div class="text-h3" style="color: #424242;">
            Log history of {{file.name}}
          </div>
        </v-row>
        <FileLogsTable></FileLogsTable>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import FileLogsTable from './components/FileLogsTable.vue';

export default {
  components: {
    FileLogsTable
  },
  data: () => ({
    showDialog: false,
    //TODO fetch 
    file:{
      id:'',
      name:'fileName',
      logs:[]
    },
  }),
  computed:{
    links(){ return [
      {
        text: 'Home',
        disabled: false,
        href: '/',
      },
      {
        text: 'My files',
        disabled: false,
        href: '/my-files',
      },
      {
        text: `${this.file.name} log`,
        disabled: true,
        href: '#',
      },
    ]},
  },
}
</script>

<style scoped>

</style>
