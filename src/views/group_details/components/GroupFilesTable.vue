<template>
    <div>
        <FilesTable ref="filesTable" class="ml-5 pb-2" :files="group.data.files" :loading="group.loading">
            <template v-slot:actions="slotProps">
                <v-icon class="ml-2" small @click="showDeleteDialog(slotProps.item)">
                    mdi-note-remove
                </v-icon>
                <v-icon class="ml-2" small @click="showFileHistory(slotProps.item)">
                    mdi-history
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
import { useGroupStore } from '@/store/GroupsStore';
import { mapActions, mapState } from 'pinia';

export default {
    components: {
        FilesTable,
        DeleteDialog,
    },
    computed: {
        ...mapState(useGroupStore, ['group'])
    },
    data() {
        return {
            dialogDelete: false,
            editedItem: {},
        }
    },
    methods: {
        ...mapActions(useGroupStore, ['removeFileFromGroup']),
        showDeleteDialog(item) {
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true;
        },
        closeDeleteDialog() {
            this.dialogDelete = false;
            this.editedItem = {}
        },
        deleteItemConfirm() {
            var groupId = this.$route.params.id;
            this.removeFileFromGroup(groupId, this.editedItem.id);
            this.closeDeleteDialog();
        },
        showFileHistory(item){
            this.$router.push({ name: 'file-history', params: { id: item.id } })
        }
    },
}
</script>