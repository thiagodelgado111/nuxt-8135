<template>
  <v-app :style="{ backgroundColor: themeBackgroundColor }">
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapState(['user', 'theme']),
    themeBackgroundColor () {
      return this.theme?.backgroundColor || 'black';
    }
  },
  async created () {
    await this.restoreSession();
    const user = this.user;
    if (!user) {
      return this.$nuxt.$router.push('/login');
    }

    await this.setTheme({
      backgroundColor: 'whitesmoke'
    });
  },
  methods: {
    ...mapActions(['restoreSession', 'setTheme'])
  }
});
</script>
