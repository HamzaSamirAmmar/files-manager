<template>
    <div>
        <DataTable :items="files" :headers="headers" :loading="loading" 
           :selectable="selectable" >
            <template v-slot:actions="slotProps">
                <slot name="actions" :item="
                    (slotProps)"></slot>
            </template>
        </DataTable>
    </div>
</template>

<script>
import DataTable from './DataTable.vue';

export default {
    components: {
        DataTable,
    },
    props: {
        fetchFiles: String,
        groupId: Number,
        selectable:Boolean
    },
    data: () => ({
        dialogDelete: false,
        headers: [
            {
                text: 'ID',
                align: 'start',
                value: 'id',
            },
            { text: 'Name', value: 'name' },
            { text: 'status', value: 'status' },
            //TODO depends on data fetch (reserver_name)
            { text: 'reserver', value: 'reserver.name' },
            { text: 'Actions', sortable: false, value: 'actions' },
        ],
        //TODO change it when data is fetched
        loading: true,
        //TODO fetch files depanding on props
        files: [
            {
                id: 1,
                name: "file 1",
                status:'free',
                reserver:null, 
                
            },
            {
                id: 2,
                name: "file 2",
                status:'reserved',
                reserver:{
                    id:1,
                    name:'reserver1'
                }
            },
            {
                id: 3,
                name: "file 3",
                status:'reserved',
                reserver:{
                    id:1,
                    name:'reserver2'
                }
            },
        ],
    }),
    methods: {
        fetchFilesFromRepo() {
            if (this.fetchFiles == 'groupFiles') {
                //call api 1 with this.groupId param
            }
            else if (this.fetchFiles == 'reservedFiles') {
                //call api 2 with 
            }
            else if (this.fetchFiles == 'ownedFiles') {
                //call api 2 with 
            }
        },
        itemWithOrder(slotProps){
            var item= slotProps.item;
            item.order=this.files.indexOf(item);
            return item;
        },
        removeFileOfIndex(index){
            this.files.splice(index, 1)
        }
    }
}
</script>