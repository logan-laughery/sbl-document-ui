<template>
  <div>
    <v-text-field
      v-model="model[container.fieldName]"
      :label="container.label"
      required
    />
  </div>
</template>

<script>
export default {
  name: 'InputFieldContainer',
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
