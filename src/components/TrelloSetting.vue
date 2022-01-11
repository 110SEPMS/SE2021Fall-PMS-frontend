<template>
  <v-dialog v-model="dialog" persistent max-width="60%">
    <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            <v-icon>mdi-trello</v-icon> Trello
          </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">Trello Settings</span>
        <v-spacer></v-spacer>
        <v-btn color="#FFB84B"  @click="authTrello">
          <v-icon>mdi-account-key</v-icon> Allow Trello Integration
        </v-btn>
                  
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <!-- App-key -->  
              <v-col cols="8">
                <v-text-field v-model="key" :value="key" label="Your Trello APP-Key" required ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-btn color="primary" @click="saveKey">Save Key</v-btn>
                </v-col>

                <!-- token -->
                <v-col cols="8">
                  <v-text-field label="Token" type="password" required v-model="token" :value="token" ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-btn color="primary" @click="saveToken">Save Token</v-btn>
                </v-col>

              </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Close</v-btn>
          <v-btn color="success" @click="goToTrello()">Trello</v-btn>
        </v-card-actions>

    </v-card>

    </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import store  from "@/store";

export default Vue.extend({
  props: {
  },
  data() {
    return {
        key: store.auth.getTrelloKey,
        token: store.auth.getTrelloToken,
        dialog: false,
    };
  },
  watch: {
  },
  methods: {
    authTrello : () => {
      window.open(
        'https://trello.com/1/authorize?expiration=never&name=Project%20Management%20System&scope=read&response_type=token&key=86643e91263348c08ae0c6c980c1d39e',
        '_blank');
    },
    goToTrello() {
      window.open('http://localhost:8080/trello');
    },
    saveToken() {
      store.auth.updateTrelloToken(this.token)
    },
    saveKey() {
      store.auth.updateTrelloKey(this.key)
    },
  },
});
</script>