<template>
  <component
    :is="component"
    :container="container"
    :datasource="datasource"
    :model="model"
  />
</template>

<script>
import logger from '../utils/logger';
import modelHelpers from '../utils/modelHelpers';
import ButtonContainer from './ButtonContainer.vue';
import CardLayoutContainer from './CardLayoutContainer.vue';
import CreateContainer from './CreateContainer.vue';
import EditContainer from './EditContainer.vue';
import ReadContainer from './ReadContainer.vue';
import DataTableContainer from './DataTableContainer/DataTableContainer.vue';
import InputFieldContainer from './InputFieldContainer.vue';
import GridLayoutContainer from './GridLayoutContainer.vue';
import KendoTemplateContainer from './KendoTemplateContainer.vue';
import ListContainer from './ListContainer.vue';
import TabContainer from './TabContainer.vue';
import MenuContainer from './MenuContainer.vue';
import MenuLinkContainer from './MenuLinkContainer.vue';

const components = {
  ButtonContainer,
  CardLayoutContainer,
  CreateContainer,
  EditContainer,
  ReadContainer,
  DataTableContainer,
  InputFieldContainer,
  GridLayoutContainer,
  KendoTemplateContainer,
  ListContainer,
  TabContainer,
  MenuContainer,
  MenuLinkContainer,
};

export default {
  name: 'dynamic-container',
  props: ['container', 'datasource', 'model'],
  components,
  computed: {
    component() {
      const { type } = this.container;

      const componentOverride = modelHelpers.getContainerOverride(type);

      if (componentOverride) {
        return componentOverride;
      }

      const matchingComponent = components[type];

      if (!matchingComponent) {
        logger.error(`Container Type ${type} not found`);
      }

      return matchingComponent;
    },
  },
};
</script>

<style>
</style>
