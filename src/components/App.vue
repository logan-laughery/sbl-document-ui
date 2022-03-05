<template>
  <div id="app">
    <v-app> 
      <v-content>
        <Menu/>
        <div id="view">
          <router-view/>
        </div>
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

$body-font-family: 'Karla';
$title-font: 'Karla';

html {
  overflow-y: hidden !important;
}

#app .v-application {
  font-family: $body-font-family, sans-serif !important;
}

#app .v-application {
  background-color: #F6F6F6;
}

#app .v-application .title {
  font-weight: 600;
  font-family: $title-font, sans-serif !important;
}

#app .v-application .header {
  font-weight: 600;
  font-size: 26px;
  font-family: $title-font, sans-serif !important;
}

#app .v-application .subheader {
  font-weight: 500;
  font-size: 16px;
  color: #747474;
  line-height: initial;
  font-family: $title-font, sans-serif !important;
}

#view {
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 30px;
  max-height: calc(100% - 70px);
}

.page-title {
  font-size: 36px;
  font-weight: 600;
}
</style>
