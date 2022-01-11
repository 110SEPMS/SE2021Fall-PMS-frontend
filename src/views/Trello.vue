<template>
    <v-container fluid fill-height class="container-background-color">
    <v-row>
    <v-col>
    <v-card>

        <v-toolbar color="secondary" dark flat>

            <v-toolbar-title>Your Boards</v-toolbar-title>

            <template v-slot:extension>
                <v-tabs v-model="tab" align-with-title >
                    <v-tabs-slider color="yellow"></v-tabs-slider>

                    <v-tab v-for="name in boards.names" :key="name" >
                        {{ name }}
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>

        <v-tabs-items v-model="tab">

            <v-tab-item v-for="(ID, i) in boards.ids" :key="i" >
                <TrelloBoard :boardID=ID :boardName="boards.names[i]" />
            </v-tab-item>

        </v-tabs-items>

    </v-card>
    </v-col>
    </v-row>
    </v-container>
    
</template>

<script lang="ts">
import Vue from "vue";
import TrelloBoard from "@/components/TrelloBoard.vue"
import axios, { AxiosResponse } from "axios"
import store  from "@/store";

export default Vue.extend({
    components: {TrelloBoard},
    props: {
    },
    data() {
        return {
            tab: null,
            boards : {type: Object, ids: [] as Array<string>, names: [] as Array<string>},
        };
    },
    async created() {
        this.getBoards();
    },
    methods: {
        async getBoards(){
            const key = store.auth.getTrelloKey
            const token = store.auth.getTrelloToken
            axios.get(`https://api.trello.com/1/members/me/?key=${key}&token=${token}`)
            .then((response) => {
                const idBoards = response.data.idBoards;
                idBoards.forEach((id : string) => {
                    axios.get(`https://api.trello.com/1/board/${id}/?key=${key}&token=${token}`)
                    .then((response) => {
                        this.boards.ids.push(id)
                        this.boards.names.push(response.data.name)
                    })
                    
                })
            })  
        },
    },
    watch: {
    }
});
</script>

<style lang="scss">

.container-background-color {
  background-color: rgb(247, 247, 247) !important;
}
</style>