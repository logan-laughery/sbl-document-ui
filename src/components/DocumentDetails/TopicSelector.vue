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
          {{title}}
        </div>

        <v-combobox
          v-model="model"
          :items="options"
          :search-input.sync="search"
          hide-selected
          :label="inputTitle"
          color="black"
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
  name: 'ChipSelector',
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
    }
  },
  data: () => ({
    model: null,
    search: null,
    dialog: false
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
</style>
