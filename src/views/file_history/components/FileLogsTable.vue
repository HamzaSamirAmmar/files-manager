<template>
    <div>
        <DataTable :items="logs" :headers="headers" :loading="loading" ref="myTable">
        </DataTable>
        <v-btn small color="secondary" class="mt-3" @click="exportTablePDF()">
            export to pdf
            <v-icon class="ml-3">mdi-content-save</v-icon>
        </v-btn>

    </div>
</template>

<script>
import DataTable from './../../../components/DataTable.vue';
const { jsPDF } = window.jspdf;

export default {
    components: {
        DataTable,
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
        //TODO change it when data is fetched
        loading: true,
        // TODO fecth from repo(  put in created() )
        logs: [
            {
                id: 1,
                action: "created",
                created_at: '10/10/2010',
                actor: {
                    id: 1,
                    name: 'actor name',
                }
            },
            {
                id: 2,
                action: "checked-in",
                created_at: '11/10/2010',
                actor: {
                    id: 2,
                    name: 'actor name',
                }
            },
            {
                id: 3,
                action: "updated",
                created_at: '12/10/2010',
                actor: {
                    id: 2,
                    name: 'actor name',
                }
            },
            {
                id: 4,
                action: "checked-out",
                created_at: '13/10/2010',
                actor: {
                    id: 2,
                    name: 'actor name',
                }
            },
            {
                id: 5,
                action: "checked-in",
                created_at: '15/10/2010',
                actor: {
                    id: 1,
                    name: 'actor name',
                }
            },

        ],
    }),
    methods: {
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