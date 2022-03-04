<template>
  <v-list-group
    class="px-0 mb-1"
    no-action
    color="blue-grey lighten-3"
    link
  >
    <template v-slot:activator>
      <v-list-item-avatar class="mr-2 ml-n2 my-0">
        <v-avatar color="white" size="26">
          <span class="blue-grey--text title">{{container.label[0]}}</span>
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="container.label"></v-list-item-title>
      </v-list-item-content>
    </template>

    <template v-for="menuContainer in container.links">
      <menu-link-container
        v-if="!menuContainer.links"
        :container="menuContainer"
        :key="menuContainer.label"
      />
      <menu-container
        v-else
        :container="menuContainer"
        :key="menuContainer.label"
      />
    </template>
  </v-list-group>
</template>

<script>
import MenuLinkContainer from './MenuLinkContainer.vue';

export default {
  name: 'MenuContainer',
  components: {
    MenuLinkContainer,
  },
  props: ['container'],
};
</script>

<style>
.nav-drawer .v-list-item__icon.v-list-group__header__append-icon {
  margin-left: 0px !important;
}
</style>
