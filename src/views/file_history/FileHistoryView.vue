<template>
  <div>
    <v-container>
      <v-col>
        <CustomLoader :loading="file.loading">
          <v-breadcrumbs :items="links">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <v-row no-gutters class="pb-5">
          <div class="text-h3 text-left" style="color: #424242;">
            Log history of {{file.data.name}}
          </div>
        </v-row>
        <FileLogsTable class="pt-5"></FileLogsTable>
        </CustomLoader>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useFileStore } from '@/store/FilesStore';
import CustomLoader from '@/components/CustomLoader.vue';
import FileLogsTable from './components/FileLogsTable.vue';

export default {
  components: {
    FileLogsTable,
    CustomLoader
  },
  mounted(){
    this.fetchFile(this.$route.params.id);
  },
  data: () => ({
    showDialog: false, 
  }),
  computed:{
    ...mapState(useFileStore,['file']),
    links(){ return [
      {
        text: 'Home',
        disabled: false,
        href: '/',
      },
      {
        text: 'Files',
        disabled: false,
        href: '/my-files',
      },
      {
        text: `${this.file.data.name} log`,
        disabled: true,
        href: '#',
      },
    ]},
  },
  methods:{
    ...mapActions(useFileStore,['fetchFile'])
  }
}
</script>

<style scoped>

</style>
