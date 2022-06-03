<template>
  <div>
    <div v-if="type === 'Date Requested' || type === 'Begin Date' || type === 'End Date'">
      <div class="field-container">
        Comparison
        <div class="field-value">
          <v-select
            class="sbr-select-inputs"
            color="black"
            :items="dateComparisonOptions"
            v-model="value.comparison"
            @change="(event) => onChange(event, 'comparison')"
            placeholder="Comparison"
          />
        </div>
      </div>
      <div class="field-container">
        Date
        <div class="field-value">
          <v-menu
            ref="dateMenu"
            v-model="dateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            bottom
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="sbr-text-field"
                v-model="value.dateFormatted"
                placeholder="MM/DD/YYYY"
                persistent-hint
                v-bind="attrs"
                @blur="value.search = parseDate(value.dateFormatted)"
                v-on="on"
                color="black"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="value.search"
              no-title
              @change="(event) => onChangeDate(event, 'search')"
              @input="dateMenu = false"
            ></v-date-picker>
          </v-menu>
        </div>
      </div>
    </div>
    <div v-if="type === 'Requestor'">
      <div class="field-container">
        Equals
        <div class="field-value">
          <v-text-field
            class="sbr-text-field"
            v-model="value.search"
            placeholder="Equals"
            @change="(event) => onChange(event, 'search')"
            color="black"
          ></v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterInputs',
  components: {
  },
  props: ['type', 'value'],
  methods: {
    onChangeDate(date, name) {
      this.value.dateFormatted = this.formatDate(date)

      this.onChange(date, name);
    },
    onChange(event, name) {
      this.value[name] = event;

      this.$emit('input', this.value);
    },
    formatDate (date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');

      return `${month}/${day}/${year}`;
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}` 
    },
  },
  data() {
    return {
      dateMenu: false,
      dateComparisonOptions: [
        {
          text: 'After',
          value: 'After'
        },
        {
          text: 'Before',
          value: 'Before'
        }
      ]
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
