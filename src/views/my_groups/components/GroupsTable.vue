<template>
    <div>
        <DataTable :items="groups" :headers="headers" :loading="loading">
            <template v-slot:actions="slotProps">
                <v-icon small class="mr-2" @click="showItem(slotProps.item)">
                    mdi-eye
                </v-icon>
                <v-icon small @click="showDeleteDialog()">
                    mdi-delete
                </v-icon>
            </template>
        </DataTable>
        <DeleteDialog :showCondition="dialogDelete">
            <template v-slot:title>
                Are you sure you want to delete this item?
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
        //TODO changed it when data is fetched
        loading: true,
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
        // TODO fecth groups from repo(  put in created() )
        groups: [
            {
                id: 1,
                name: "group 1",
            },
            {
                id: 2,
                name: "group 2",
            },
            {
                id: 3,
                name: "group 3",
            },
            {
                id: 4,
                name: "group 4",
            },
            {
                id: 5,
                name: "group 5",
            },
            {
                id: 6,
                name: "group 6",
            },
        ],
    }),
    methods: {
        showItem(item) {
            this.$router.push({ name: 'group-details', params: { id: item.id } })
        },
        showDeleteDialog() {
            this.dialogDelete = true;
        },
        closeDeleteDialog() {
            this.dialogDelete = false;
        },
        //TODO send delete request (when it's a success remove it from list)
        deleteItemConfirm() {

        },
    }

}
</script>