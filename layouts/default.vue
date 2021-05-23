<template>
  <v-app :style="{ backgroundColor: themeBackgroundColor }">
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapState(['theme']),
    themeBackgroundColor () {
      return this.theme?.backgroundColor || 'black';
    }
  }
});
</script>
