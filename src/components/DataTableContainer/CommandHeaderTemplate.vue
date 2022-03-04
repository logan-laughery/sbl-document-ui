<template>
  <div class="header-template">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
          small
        >
          Options
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title v-text="'Export'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      color="primary"
      small
      @click="createClick"
    >
      Create
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'CommandHeaderTemplate',
  methods: {
    createClick(e) {
      // eslint-disable-next-line
      console.log('Command Header Create Button Click:', e);
      this.templateArgs.create();
    },
  },
  beforeMount() {
    // Kendo Hack: Pass necessary scope to this template
    this.$vuetify = this.templateArgs.vuetify;
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
.header-template {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  flex-direction: column;
  align-items: center;
  padding-top: 0px;
  height: 0px;
}
.header-template .v-btn {
  margin-top: 16px;
  width: calc(100% - 10px);
  box-sizing: border-box;
}
</style>
