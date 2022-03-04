<template>
  <v-list-item link :to="container.route" class="pl-6">
    <v-list-item-content>
      <v-list-item-title v-text="container.label"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'MenuLinkContainer',
  props: ['container'],
};
</script>

<style>
</style>
