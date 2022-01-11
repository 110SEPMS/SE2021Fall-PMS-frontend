<template>
    <v-card min-width="300" elevation="8" :color = "'#cce0ff'">
        <v-card-title>{{cardName}}</v-card-title>
    </v-card>

</template>


<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse } from "axios"

export default Vue.extend({
    props: {
        listID: { type: String },
        cardName: { type: String },
        cardID: { type: String },
    },
    data() {
        return {
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