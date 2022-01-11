<template>
 
    <v-container  fluid class="container-background-color ">
        <v-row class="d-flex justify-start align-center">
            <v-col lg="4" v-for="(name, i) in lists.names" :key="i">
                <TrelloList :listName=name :listID="lists.ids[i]" :boardID=id />
            </v-col>
        </v-row>
    </v-container>

</template>


<script lang="ts">
import Vue from "vue";
import TrelloList from "@/components/TrelloList.vue";
import axios, { AxiosResponse } from "axios"
import store  from "@/store";

export default Vue.extend({
    components: {TrelloList},
    props: {
        boardID : { type: String },
        boardName : { type: String },
    },
    data() {
        return {
            lists : {type: Object, ids: [] as Array<string>, names: [] as Array<string>},
            id : this.boardID
        };
    },
    async created() {
        this.getLists();
    },
    methods: {
        getLists(){
            const key = store.auth.getTrelloKey
            const token = store.auth.getTrelloToken
            axios.get(`https://api.trello.com/1/board/${this.boardID}/lists?key=${key}&token=${token}`)
            .then((response) => {
                const lists = response.data;
                lists.forEach((list : any) => {
                    this.lists.ids.push(list.id)
                    this.lists.names.push(list.name)
                })
            })
        }
    },
    watch: {
    }
});
</script>