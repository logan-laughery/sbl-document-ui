<template>
  <div>
    No Records
    {{templateArgs.requestingData}}
  </div>
</template>

<script>
export default {
  name: 'NoRecordTemplate',
  methods: {
  },
  data() {
    return {
      templateArgs: {},
    };
  },
};
</script>

<style>
.k-popup-edit-form .k-edit-form-container > .k-edit-buttons {
    display: none;
  }
</style>
