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
  font-size: 21px;
  line-height: 25px;
  font-family: $title-font, sans-serif !important;
}

#app .v-application .subheader {
  font-weight: 500;
  font-size: 14px;
  color: #747474;
  line-height: initial;
  font-family: $title-font, sans-serif !important;
}

#view {
  margin-top: 56px;
  padding-top: 26px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 26px;
  height: calc(100vh - 56px);
  overflow-y: auto;
}

.page-title {
  font-size: 30px;
  font-weight: 600;
}
</style>
