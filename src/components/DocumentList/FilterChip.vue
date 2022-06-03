<template>
  <span>
    <SbrChip
      color="#fffff"
      @close="$emit('deleteFilter')"
      @click="openEdit"
    >
      {{filterFormatters[filterType](filterConfig)}}
    </SbrChip>
    <v-dialog
      class="chip-dialog"
      v-model="dialog"
      max-width="300px"
    >
      <v-card class="chip-dialog">
        <div class="form-title">
          Edit Filter
        </div>

        <FilterInputs
          :type="filterType"
          v-model="editFilterConfig"
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
            @click="editFilter"
          >
            Edit
          </SbrButton>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import SbrChip from '@/components/Shared/SbrChip';
import SbrButton from '@/components/Shared/SbrButton';
import FilterInputs from '@/components/DocumentList/FilterInputs';
import Vue from 'vue';

export default {
  name: 'FilterChip',
  components: {
    SbrChip,
    SbrButton,
    FilterInputs
  },
  props: ['filterType', 'filterConfig'],
  methods: {
    openEdit() {
      this.editFilterConfig = Vue.observable({...this.filterConfig});
      this.dialog = true;
    },
    editFilter() {
      this.dialog = false;
      this.$emit('updateFilter', {type: this.filterType, config: this.editFilterConfig});
    }
  },
  data() {
    return {
      editFilterConfig: {},
      dialog: false,
      filterFormatters: {
        'Begin Date': (value) => `Begin Date ${value.comparison} - ${value.search}`,
        'End Date': (value) => `End Date ${value.comparison} - ${value.search}`,
        'Date Requested': (value) => `Date Requested ${value.comparison} - ${value.search}`,
        'Requestor': (value) => `Requestor Equals - ${value.search}`
      },
    };
  }
};
</script>

<style>
.sbr-select-inputs {
  padding-top: 0px;
  margin-top: 0px;
}

.sbr-text-field {
  padding-top: 0px;
  margin-top: 0px;
}
</style>
