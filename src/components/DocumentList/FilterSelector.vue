<template>
  <div class="filters">
    <v-menu
      rounded="lg"
      offset-y
      left
      nudge-bottom="6"
      min-width="fit-content"
      attach=".filters"
      :close-on-content-click="true"
      :value="menuIsOpen"
    >
      <template v-slot:activator="{ attrs, on }">
        <SbrButton
          v-bind="attrs"
          v-on="on"
          color="#ffffff"
          id="filterButton"
        >
          Add Filter    
        </SbrButton>
      </template>
      <v-list rounded dense>
        <v-list-item
          v-for="(filter, index) in ['Begin Date', 'End Date']"
          :key="index"
          @click="openDialog(filter)"
        >
          <v-list-item-title>{{ filter }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog
      class="chip-dialog"
      v-model="dialog"
      max-width="300px"
    >
      <v-card class="chip-dialog">
        <div class="form-title">
          Add Filter
        </div>

        <FilterInputs
          :type="filterType"
          v-model="filterConfig"
        />

        <v-card-actions>
          <v-spacer></v-spacer>
          <SbrButton
            @click="dialog = false"
          >
            Cancel
          </SbrButton>
          <SbrButton
            color="#CBFFBE"
            @click="addFilter"
          >
            Add
          </SbrButton>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SbrButton from '@/components/Shared/SbrButton';
import FilterInputs from '@/components/DocumentList/FilterInputs';
import Vue from 'vue';

export default {
  name: 'FilterSelector',
  components: {
    SbrButton,
    FilterInputs
  },
  props: [],
  methods: {
    addFilter() {
      this.dialog = false;

      this.$nextTick(() => {
        this.$emit('add', {type: this.filterType, config: this.filterConfig});
      });
    },
    openDialog(filter) {
      const filterOptions = {
        'Date Requested': {
          comparison: null,
          date: null
        },
        'Begin Date': {
          comparison: null,
          date: null
        },
        'End Date': {
          comparison: null,
          date: null
        },
        'Requestor': {
          comparison: 'Equals',
          requestor: null
        }
      };

      this.menuIsOpen = false;
      this.dialog = true;
      this.filterType = filter;

      this.filterConfig = Vue.observable(filterOptions[filter]);
    }
  },
  data: () => ({
    menuIsOpen: false,
    model: null,
    search: null,
    dialog: false,
    filterType: null,
    filterConfig: {}
  })
};
</script>

<style>
.v-dialog {
  border-radius: 14px;
}

.chip-dialog {
  padding: 20px;
}

.chip-dialog .v-card__actions {
  padding: 0px !important;
}

.chip-selector .sbr-btn {
  margin-bottom: 5px;
}

.filters {
  margin-top: 18px;
  margin-left: 35px;
  display: block;
  position: relative;
}
</style>
