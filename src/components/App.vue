<template>
  <div id="app">
    <v-app> 
      <v-content>
        <Menu/>
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Menu from '@/components/Shared/Menu/Menu';

export default {
  name: 'App',
  components: {
    Menu,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Karla:300,400,700&display=swap');
// @import url('https://fonts.googleapis.com/css?family=Comfortaa&display=swap');

$body-font-family: 'Karla';
$title-font: 'Karla';

.v-application {
  font-family: $body-font-family, sans-serif !important;
}

#app .v-application {
  background-color: #F6F6F6;
}

.v-application .title {
    font-family: $title-font, sans-serif !important;
}
</style>
