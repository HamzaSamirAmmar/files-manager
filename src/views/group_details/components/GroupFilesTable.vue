<template>
    <div>
        <FilesTable ref="filesTable" class="ml-5 pb-2" :files="files"  :loading="loading">
            <template v-slot:actions="slotProps">
                <v-icon small @click="showDeleteDialog(slotProps.item)">
                    mdi-note-remove
                </v-icon>
            </template>
        </FilesTable>
        <DeleteDialog :showCondition="dialogDelete" @closed="closeDeleteDialog()">
            <template v-slot:title>
                Are you sure you want to remove this file from group?
            </template>
            <template v-slot:actions>
                <v-btn color="blue darken-1" text @click="closeDeleteDialog()">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
            </template>
        </DeleteDialog>
    </div>
</template>

<script>
import FilesTable from './../../../components/FilesTable.vue';
import DeleteDialog from './../../../components/FormDialog.vue';

export default {
    components: {
        FilesTable,
        DeleteDialog,
    },
    data() {
        return {
            //TODO change it when data is fetched
            loading: true,
            //TODO fetch files depanding on props
            files: [
                {
                    id: 1,
                    name: "file 1",
                    status: 'free',
                    reserver: null,

                },
                {
                    id: 2,
                    name: "file 2",
                    status: 'reserved',
                    reserver: {
                        id: 1,
                        name: 'reserver1'
                    }
                },
                {
                    id: 3,
                    name: "file 3",
                    status: 'reserved',
                    reserver: {
                        id: 1,
                        name: 'reserver2'
                    }
                },
            ],
            dialogDelete: false,
            editedIndex: -1,
            editedItem: {},
        }
    },
    methods: {
        showDeleteDialog(item) {
            this.editedIndex = item.order;
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true;
        },
        closeDeleteDialog() {
            this.dialogDelete = false;
            this.editedIndex = -1
            this.editedItem = {}
        },
        //TODO send delete request (when it's a success remove it from list)
        deleteItemConfirm() {
            //send request
            //call this.closeDeleteDialog
            this.closeDeleteDialog();
            //
            this.$refs.filesTable.removeFileOfIndex(this.editedIndex);
        }
    },
}
</script>