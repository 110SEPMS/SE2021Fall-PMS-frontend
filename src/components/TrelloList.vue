<template>
    <v-card min-width="374" height="600" elevation="8" :color = "'#ccd9ff'">
        <v-card-title>
            <h3 class="font-weight-bold">{{ name }}</h3>
        </v-card-title> 
        <v-row class="px-1" >
            <v-col>
                <v-list height="500"
                class="overflow-y-auto">
                    <v-list v-for="(name, i) in cards.names" :key="i">
                        <TrelloCard :cardName=name />
                    </v-list>
                </v-list>
            </v-col>
        </v-row>
        
        
    </v-card>

</template>


<script lang="ts">
import Vue from "vue";
import TrelloCard from "@/components/TrelloCard.vue";
import axios, { AxiosResponse } from "axios"
import store  from "@/store";

export default Vue.extend({
    components: {TrelloCard},
    props: {
        boardID : {type: String},
        listID : { type: String },
        listName : { type: String },
        
    },
    async created() {
        this.getCards()
    },
    data() {
        return {
            boardid: this.boardID,
            id : this.listID,
            name: this.listName,
            cards : {type: Object, ids: [] as Array<string>, names: [] as Array<string>}

        };
    },
    methods: {
        getCards() {
            const key = store.auth.getTrelloKey
            const token = store.auth.getTrelloToken
            axios.get(`https://api.trello.com/1/lists/${this.listID}/cards?key=${key}&token=${token}`)
            .then((response) => {
                const cards = response.data;
                cards.forEach((card : any) => {
                    this.cards.ids.push(card.id)
                    this.cards.names.push(card.name)
                })
            })
        }
    },
    watch: {
    }
});
</script>