<template>
  <div
    v-if="!loading"
  >
    <dynamic-container
      v-for="(childContainer, i) in container.containers"
      :key="i"
      :container="childContainer"
      :model="currentModel"
    />
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'ReadContainer',
  props: ['container', 'model'],
  methods: {
    async updateModel(model, container) {
      this.loading = false;
      this.currentModel = {
        parent: model,
      };

      const params = {};

      this.container.readOperation.params.forEach(key => {
        params[key] = model[key];
      });

      const readResults = await Vue.relyUi.invokeDatasource(this.container.readOperation, params);

      this.currentModel = {...this.currentModel, ...readResults};
      this.loading = false;
    },
  },
  data() {
    return {
      loading: false,
      currentModel: {
        parent: this.model,
      },
    };
  },
  watch: {
    async model(newModel, oldModel) {
      this.updateModel(newModel, this.container);
    },
  },
  async mounted() {
    this.updateModel(this.model, this.container);
  },
};
</script>

<style>
</style>
