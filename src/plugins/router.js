import Vue from 'vue';
import VueRouter from 'vue-router';
import DocumentList from '@/components/DocumentList/DocumentList.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: DocumentList },
  { path: '/list', component: DocumentList },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
