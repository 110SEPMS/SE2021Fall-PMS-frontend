<template>
  <v-dialog v-model="dialog" persistent max-width="60%">
    <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            <v-icon>mdi-information</v-icon>
          </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">{{cardName}}</span>
        <v-spacer></v-spacer>
        <v-btn color="#FFB84B"  @click="openInNew()">
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
                  
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row><v-col lg="12">
                <v-card >
                    <v-card-title>Description</v-card-title>
                    <v-card-text class="text--primary"><div style="white-space:pre-wrap;"> {{desc}} </div></v-card-text>
                </v-card></v-col>
            </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Close</v-btn>
        </v-card-actions>

    </v-card>

    </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import store  from "@/store";
import axios, { AxiosResponse } from "axios"


export default Vue.extend({
  props: {
      cardName: {type: String},
      cardID: {type: String},
  },
  data() {
    return {
        desc: "",
        name: this.cardName,
        id: this.cardID,
        dialog: false,
    };
  },
  async created() {
      this.getDesc()
  },
  methods: {
      openInNew(){
          const key = store.auth.getTrelloKey
          const token = store.auth.getTrelloToken
            axios.get(`https://api.trello.com/1/cards/${this.cardID}/url?key=${key}&token=${token}`)
            .then((response) => {
                window.open(response.data._value);
            })
      },
      async getDesc(){
          const key = store.auth.getTrelloKey
          const token = store.auth.getTrelloToken
            axios.get(`https://api.trello.com/1/cards/${this.cardID}/desc?key=${key}&token=${token}`)
            .then((response) => {
                this.desc = response.data._value
            })
      },
  },
});
</script>