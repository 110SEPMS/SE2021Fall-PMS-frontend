<template>
  <v-app-bar dense dark>
    <v-toolbar-title>
      <router-link to="/project" class="routercolor">PMS-Home</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <Notification v-if="isAuth"/>
    <TrelloSetting v-if="isAuth"/>
    <v-btn @click="logout" v-if="isAuth">
      <v-icon>mdi-logout</v-icon>
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import store from "@/store";
import Vue from "vue";
import Notification from "@/components/Notification.vue"
import TrelloSetting from "@/components/TrelloSetting.vue"

export default Vue.extend({
  data: () => {
    return {
    };
  },
  components: {
    Notification,
    TrelloSetting,
  },
  computed:{
      isAuth(){
        return store.auth.isAuthenticated
      }
  },
  methods: {
    logout: () => {
      store.auth.logout();
    },
    
  },
});
</script>