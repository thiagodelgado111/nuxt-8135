<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          User logged in? {{ user ? 'yes' : 'no' }}
        </v-card-title>
        <v-card-text>
          {{ user }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="logout">
            Log out
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card>
        <v-card-title>
          Theme
        </v-card-title>
        <v-card-text>
          {{ theme || 'Not loaded' }}
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title>
          # Announcements
        </v-card-title>
        <v-card-text>
          {{ (announcements && announcements.length) || 0 }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapState(['user', 'announcements', 'theme'])
  },
  methods: {
    ...mapActions(['logout'])
  }
});
</script>
