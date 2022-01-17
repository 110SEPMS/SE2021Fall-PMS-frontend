<template>
    <v-card min-width="300" elevation="8" :color = "'#cce0ff'">
        <v-card-title>{{cardName}} <v-spacer></v-spacer>
        <TrelloCardInfo :cardName="this.name" :cardID="this.id" /></v-card-title>
    </v-card>

</template>


<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse } from "axios"
import TrelloCardInfo from "@/components/TrelloCardInfo.vue";

export default Vue.extend({
    components: {TrelloCardInfo},
    props: {
        listID: { type: String },
        cardName: { type: String },
        cardID: { type: String },
    },
    data() {
        return {
            name: this.cardName,
            id: this.cardID,
        };
    },
    methods: {
    },
    watch: {
    }
});
</script>

<style lang="scss">

</style>