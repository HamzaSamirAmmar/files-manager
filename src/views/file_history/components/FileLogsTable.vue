<template>
    <div>
        <DataTable :items="fileLogs" :headers="headers" :loading="loading" ref="myTable">
        </DataTable>
        <v-btn small color="primary" class="mt-3" @click="exportTablePDF()">
            export to pdf
            <v-icon class="ml-3">mdi-content-save</v-icon>
        </v-btn>

    </div>
</template>

<script>
import DataTable from './../../../components/DataTable.vue';
import { useFileLogStore } from '@/store/FileLogStore';
import { mapActions, mapState } from 'pinia';
const { jsPDF } = window.jspdf;

export default {
    components: {
        DataTable,
    },
    mounted(){
        this.fetchFileLogs(this.$route.params.id);
    },
    computed:{
       ...mapState(useFileLogStore,['fileLogs','loading','hasError','error']), 
    },
    watch: {
        hasError: {
            immediate: true,
            deep: true,
            handler(newValue) {
                this.$nextTick(() => {
                    if(newValue){
                        this.$root.VToast.show({message:this.error});         
                    }
                })
            }
        }
    },
    data: () => ({
        headers: [
            {
                text: 'ID',
                align: 'start',
                value: 'id',
            },
            { text: 'Action', value: 'action' },
            { text: 'ActorID', value: 'actor.id' },
            { text: 'Actor Name', value: 'actor.name' },
            { text: 'Action time', value: 'created_at' },
        ],
    }),
    methods: {
        ...mapActions(useFileLogStore,['fetchFileLogs']),
        exportTablePDF() {
            var source = this.$refs["myTable"];
            let rows = [];
            let columnHeader = ['ID', 'Action', 'ActorID', 'ActorName', 'ActionTime'];
            let pdfName = 'logs';
            source.items.forEach(element => {
                var temp =
                {
                    ID: element.id.toString(),
                    Action: element.action,
                    ActorID: element.actor.id.toString(),
                    ActorName: element.actor.name,
                    ActionTime: element.created_at,
                };
                rows.push(temp);
            });
            var doc = new jsPDF();
            doc.table(10, 10, rows, columnHeader, { autoSize: true });
            doc.save(pdfName + '.pdf');
        }
    },
}
</script>