import Vue from 'vue';

import App from '@/components/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/plugins/router';
import apolloProvider from '@/plugins/apollo';
import VueApollo from 'vue-apollo'
import "pdfjs-dist/web/pdf_viewer.css";
import GAuth from 'vue-google-oauth2'
import Vuex from 'vuex'

Vue.config.productionTip = false;

const gauthOption = {
  clientId: '479366963206-r2oukcjsb93f0cd3318kohjms8ars04c.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
};

Vue.use(GAuth, gauthOption);
Vue.use(VueApollo);
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    session: undefined
  },
  mutations: {
    setSession(state, session) {
      state.session = session;
    }
  }
});

new Vue({
  vuetify,
  router,
  apolloProvider,
  render: (h) => h(App),
  store
}).$mount('#app');
