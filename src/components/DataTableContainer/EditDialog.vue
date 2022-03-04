<template>
  <div class="edit-dialog">
    <div class="edit-dialog-form-container pa-4">
      <dynamic-container
        :container="container"
        :model="model"
      />
    </div>
    <v-toolbar elevation="1" color="blue-grey lighten-5">
      <v-toolbar-title>
        Edit
      </v-toolbar-title>
      <v-spacer/>
      <v-btn
        small
        class="mr-4"
        color="primary"
        @click="saveClick"
        :loading="saving"
        :disabled="saving"
      >
        Save
      </v-btn>
      <v-btn
        small
        @click="cancelClick"
        :disabled="saving"
      >
        Cancel
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'EditDialog',
  props: [
    'container',
    'datasource',
    'model',
    'params',
    'saving',
    'save',
    'cancel',
  ],
  methods: {
    saveClick() {
      this.save();
    },
    cancelClick() {
      this.cancel();
    },
  },
};
</script>

<style>
.edit-dialog {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;
  width: 705px;
  height: 100%;
  max-width: calc(100% - 56px);
}

.edit-dialog-form-container {
  overflow-y: auto;
  height: calc(100% - 56px);
}
</style>
