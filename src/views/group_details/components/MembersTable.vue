<template>
    <div>
        <DataTable :items="groupMembers.data" :headers="headers" :loading="groupMembers.loading">
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
import { useMemberStore } from '@/store/MembersStore';
import { mapActions, mapState } from 'pinia';

export default {
    components: {
        DataTable,
        DeleteDialog
    },
    mounted() {
        this.fetchGroupMembers(this.groupId);
    },
    computed: {
        ...mapState(useMemberStore, ['groupMembers']),
        groupId() {
            return this.$route.params.id
        },
    },
    watch: {
        groupMembers: {
            immediate: true,
            deep: true,
            handler(newValue) {
                this.$nextTick(() => {
                    if (newValue.message != '') {
                        this.$root.VToast.showMessage(newValue);
                    }
                })
            }
        }
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
        editedItem: {},
    }),
    methods: {
        ...mapActions(useMemberStore, ['fetchGroupMembers', 'removeMemberFromGroup']),
        showDeleteDialog(item) {
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true;
        },
        closeDeleteDialog() {
            this.dialogDelete = false;
            this.editedItem = {}
        },
        //TODO send delete request (when it's a success remove it from list)
        deleteItemConfirm() {
            //send request
            this.removeMemberFromGroup(this.groupId, this.editedItem.id)
            //close dialog
            this.closeDeleteDialog();
        },
    }

}
</script>