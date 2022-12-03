<template>
    <div>
        <DataTable :items="members" :headers="headers" :loading="loading">
            <template v-slot:actions="slotProps">
                <v-icon small @click="showDeleteDialog(slotProps.item)">
                    mdi-account-remove
                </v-icon>
            </template>
        </DataTable>
        <DeleteDialog :showCondition="dialogDelete" @closed="closeDeleteDialog()">
            <template v-slot:title>
                Are you sure you want to remove this member from group?
            </template>
            <template v-slot:actions>
                <v-btn color="blue darken-1" text @click="closeDeleteDialog()">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
            </template>
        </DeleteDialog>
    </div>
</template>

<script>
import DataTable from './../../../components/DataTable.vue';
import DeleteDialog from './../../../components/FormDialog.vue';

export default {
    components: {
        DataTable,
        DeleteDialog
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
            { text: 'Actions', sortable: false, value: 'actions' },
        ],
        loading: false,
        members: [
            {
                id: 1,
                name: "member 1",
            },
            {
                id: 2,
                name: "member 2",
            },
            {
                id: 3,
                name: "member 3",
            },
        ],
        editedIndex:'',
        editedItem:{}, 
    }),
    methods: {
        showDeleteDialog(item) {
            this.editedIndex = this.members.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true;
        },
        closeDeleteDialog() {
            this.dialogDelete = false;
            this.editedIndex= -1
            this.editedItem= {}
        },
        //TODO send delete request (when it's a success remove it from list)
        deleteItemConfirm() {
        //send request

        //close dialog
        this.closeDeleteDialog();
        },
    }

}
</script>