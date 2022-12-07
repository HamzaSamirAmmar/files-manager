<template>
    <div>
        <DataTable :items="ownedGroups" :headers="headers" :loading="ownedGroupsLoading">
            <template v-slot:actions="slotProps">
                <v-icon small class="mr-2" @click="showItem(slotProps.item)">
                    mdi-eye
                </v-icon>
                <v-icon small @click="showDeleteDialog(slotProps.item)">
                    mdi-delete
                </v-icon>
            </template>
        </DataTable>
        <DeleteDialog :showCondition="dialogDelete" @closed="closeDeleteDialog()">
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
import { useGroupStore } from '@/store/GroupsStore';
import { mapActions, mapState } from 'pinia';

export default {
    components: {
        DataTable,
        DeleteDialog
    },
    computed:{
        ...mapState(useGroupStore, ['ownedGroups','ownedGroupsLoading','ownedGroupsHasError','ownedGroupsError'])
    },
    mounted(){
        this.fetchOwnedGroups();
    },
    watch: {
        ownedGroupsHasError: {
            immediate: true,
            deep: true,
            handler(newValue) {
                this.$nextTick(() => {
                    if(newValue){
                        this.$root.VToast.showErrorMessage({message:this.ownedGroupsError});         
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
        selectedItem:{},       
    }),
    methods: {
        ...mapActions(useGroupStore,['fetchOwnedGroups']),
        ...mapActions(useGroupStore,['deleteOwnedGroup']),
        showItem(item) {
            this.$router.push({ name: 'group-details', params: { id: item.id } })
        },
        showDeleteDialog(item) {
            this.selectedItem = Object.assign({}, item)
            this.dialogDelete = true;
        },
        closeDeleteDialog() {
            this.dialogDelete = false;
            this.selectedItem= {}
    },
        deleteItemConfirm() {
        this.deleteOwnedGroup(this.selectedItem.id);
        //call this.closeDeleteDialog
        this.closeDeleteDialog();
        },
    }

}
</script>