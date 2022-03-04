<template>
  <div>
    <div class="title">
      {{$route.meta.title}}
    </div>
    <dynamic-container
      :container="containerModel"
      :model="model"
    />
  </div>
</template>

<script>
import logger from '../utils/logger';
import modelHelpers from '../utils/modelHelpers';

export default {
  name: 'DynamicPageContainer',
  props: ['container'],
  created() {
    document.addEventListener('keyup', this.logContainer);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.logContainer);
  },
  methods: {
    logContainer(event) {
      const ESC_KEY_CODE = 27;

      if (event.keyCode === ESC_KEY_CODE) {
        const containerModel = JSON.stringify(this.containerModel);
        const model = JSON.stringify(this.model);

        logger.info('Logging container', JSON.parse(containerModel));
        logger.info('Logging model', JSON.parse(model));
      }
    },
  },
  computed: {
    model() {
      return {
        ...this.$route.params
      };
    },
    containerModel() {
      return modelHelpers.getContainer(this.container);
    }
  },
};
</script>

<style>
</style>
