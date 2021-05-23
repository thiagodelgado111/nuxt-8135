<template>
  <v-row justify="center" align="center">
    <v-col cols="6" sm="8" md="6">
      <v-card>
        <v-card-title>
          Sign in
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="onClick">
            Click here to sign in
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  layout: 'unprotected',
  methods: {
    ...mapActions(['setUser']),
    async onClick () {
      await this.setUser({ name: 'Test' });
      this.$nuxt.$options.router?.push('/');
    }
  }
});
</script>
