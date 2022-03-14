import Vue from 'vue';
import VueRouter from 'vue-router';
import DocumentList from '@/components/DocumentList/DocumentList.vue';
import DocumentDetails from '@/components/DocumentDetails/DocumentDetails.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: DocumentList },
  { path: '/documents', component: DocumentList },
  { path: '/document/:id', component: DocumentDetails },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
