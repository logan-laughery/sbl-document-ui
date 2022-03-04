<template>
  <div>
    <dynamic-container
      v-for="(childContainer, i) in container.containers"
      :key="i"
      :container="childContainer"
      :model="model"
    />
  </div>
</template>

<script>
export default {
  name: 'GridLayoutContainer',
  props: ['container', 'datasource', 'model', 'params'],
  methods: {
  },
  data() {
    return {
    };
  },
};
</script>

<style>
</style>
