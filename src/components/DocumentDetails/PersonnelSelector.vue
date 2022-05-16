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
              :key="chip.text"
              v-on="on"
            >
              {{chip.text}}
            </SbrChip>
            <SbrButton
              @click="id = null; email = null; firstName = null; lastName = null; dialog = true"
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
        <v-combobox
          v-model="email"
          :items="options"
          :search-input.sync="emailSearch"
          @change="(value) => changePersonnel(value, 'email')"
          item-value="email"
          item-text="email"
          hide-selected
          label="Email"
          color="black"
          autocomplete="none"
        >
          <template v-slot:item="{ item }">
            <div class="personnel-item">
              <div class="email">
                {{item.email}}
              </div>
              <div class="name">
                {{item.firstName}} {{item.lastName}}  
              </div>
            </div>
          </template>
        </v-combobox>
        <v-combobox
          v-model="firstName"
          :items="options"
          :search-input.sync="firstNameSearch"
          @change="(value) => changePersonnel(value, 'firstName')"
          item-value="firstName"
          item-text="firstName"
          hide-selected
          label="First Name"
          color="black"
          autocomplete="none"
        >
          <template v-slot:item="{ item }">
            <div class="personnel-item">
              <div class="email">
                {{item.email}}
              </div>
              <div class="name">
                {{item.firstName}} {{item.lastName}}  
              </div>
            </div>
          </template>
        </v-combobox>
        <v-combobox
          v-model="lastName"
          :items="options"
          :search-input.sync="lastNameSearch"
          @change="(value) => changePersonnel(value, 'lastName')"
          item-value="lastName"
          item-text="lastName"
          hide-selected
          label="Last Name"
          color="black"
          autocomplete="none"
        >
          <template v-slot:item="{ item }">
            <div class="personnel-item">
              <div class="email">
                {{item.email}}
              </div>
              <div class="name">
                {{item.firstName}} {{item.lastName}}  
              </div>
            </div>
          </template>
        </v-combobox>

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
        const personnel = {
          id: this.id,
          email: this.email || this.emailSearch,
          firstName: this.firstName || this.firstNameSearch,
          lastName: this.lastName || this.lastNameSearch,
        };

        this.$emit('add', personnel);
      });
    },
    changePersonnel(value, name) {
      if (value?.id) {
        this.id = value.id;
        this.email = value.email;
        this.firstName = value.firstName;
        this.lastName = value.lastName;
      } else {
        this.id = null;
        this[name] = value;
      }
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

.email {
  font-weight: 600;
}

.name {
  margin-top: -4px;
}

</style>
