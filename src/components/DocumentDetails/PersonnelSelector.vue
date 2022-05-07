<template>
  <div>
    <v-dialog
      class="chip-dialog"
      v-model="dialog"
      max-width="300px"
    >
      <template v-slot:activator="{ on }">
        <div class="field-container chip-selector">
          {{field}}
          <div class="field-value">
            <SbrChip
              :color="color"
              @close="$emit('remove', chip)"
              v-for="chip in chips"
              :key="chip"
              v-on="on"
            >
              {{chip}}
            </SbrChip>
            <SbrButton
              @click="model = null; dialog = true"
            >
              Add
            </SbrButton>
          </div>
        </div>
      </template>
      <v-card class="chip-dialog">
        <div class="form-title">
          Personnel
        </div>
        {{id}}
        <v-combobox
          v-model="email"
          :items="options"
          :search-input.sync="emailSearch"
          :change="changePersonnel"
          :update:search-input="(value) => this.emailSearch = value.email"
          hide-selected
          label="Email"
          color="black"
        />

        <!-- <v-combobox
          v-model="firstName"
          :items="options"
          :search-input.sync="firstNameSearch"
          hide-selected
          label="First Name"
          color="black"
        />

        <v-combobox
          v-model="lastName"
          :items="options"
          :search-input.sync="lastNameSearch"
          hide-selected
          label="Last Name"
          color="black"
        /> -->

        <v-card-actions>
          <v-spacer></v-spacer>
          <SbrButton
            @click="dialog = false"
          >
            Cancel
          </SbrButton>
          <SbrButton
            color="#CBFFBE"
            @click="addChip"
          >
            {{title}}
          </SbrButton>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SbrButton from '@/components/Shared/SbrButton';
import SbrChip from '@/components/Shared/SbrChip';

export default {
  name: 'PersonnelSelector',
  components: {
    SbrButton,
    SbrChip
  },
  props: ['chips', 'field', 'color', 'title', 'inputTitle', 'options'],
  methods: {
    addChip() {
      this.dialog = false;
      this.$nextTick(() => {
        this.$emit('add', this.model || this.search);
      });
    },
    changePersonnel(values) {
      console.error(values);
    }
  },
  data() {
    return {
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      emailSearch: null,
      firstNameSearch: null,
      lastNameSearch: null,
      dialog: false
    }
  }
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
</style>
