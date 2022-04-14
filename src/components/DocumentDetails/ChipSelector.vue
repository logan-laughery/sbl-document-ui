<template>
  <div>
    <v-dialog
      class="chip-dialog"
      v-model="dialog"
      max-width="300px"
    >
      <template v-slot:activator="{ on }">
        <div class="field-container">
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
            @click="addChip(model)"
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
    addChip(chip) {
      this.$nextTick(() => {
        this.$emit('add', chip);
        this.dialog = false;
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
</style>
