import Vue from 'vue';

import App from '@/components/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/plugins/router';
import apolloProvider from '@/plugins/apollo';
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'http://localhost',
});

Vue.config.productionTip = false;

Vue.use(VueApollo);

new Vue({
  vuetify,
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
