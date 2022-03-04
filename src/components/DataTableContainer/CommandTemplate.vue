<template>
  <div>
    <v-btn @click="saveClick" icon x-small class="mr-2">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn @click="deleteClick" icon x-small>
      <v-icon>delete</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'CommandTemplate',
  methods: {
    saveClick(e) {
      // eslint-disable-next-line
      console.log('Command Template Edit Button Click:', e);
      this.templateArgs.edit();
    },
    deleteClick(e) {
      // eslint-disable-next-line
      console.log('Command Template Delete Button Click:', e);
      this.templateArgs.delete();
    },
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
.v-btn.v-size--x-small {
  padding: 2px;
}
</style>
