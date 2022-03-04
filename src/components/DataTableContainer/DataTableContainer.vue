<template>
  <v-skeleton-loader
    :loading="loading"
    type="list-item-three-line"
  >
    <div
      ref="datatable-container"
      class="rely-data-table locked"
    >
      <kendo-datasource
        ref="datatable-datasource"
        :page-size='10'
        :transport-read="readRequest"
        :transport-update="updateRequest"
        :transport-create="createRequest"
        :transport-destroy="deleteRequest"
        :server-paging="true"
        :server-filtering="true"
        :server-sorting="true"
        schema-total="Total"
        schema-data="Data"
        :schema-model-fields="schemaFields"
        :schema-model-id="container.idField"
        @requeststart="handleRequestStart"
        @requestend="handleRequestEnd"
        @save="save"
      />

      <div class="loader-container">
        <v-progress-linear
          :active="requestingData"
          :indeterminate="true"
        />
      </div>

      <kendo-grid
        :data-source-ref="'datatable-datasource'"
        :ref="'datatable'"
        :pageable="true"
        :filterable-mode="'row'"
        :column-menu="true"
        :sortable="true"
        :selectable="false"
        :editable="false"
        :save="save"
        :beforeEdit="blank"
        :cancel="blank"
        :change="change"
        :data-bound="bounddata"
        :no-records="false"
        :resizable="true"
      >
        <kendo-grid-column
          v-for="(column, i) in container.columns"
          :hidden="!column.visible"
          :title="column.label"
          :key="i"
          :field="column.fieldName"
          :lockable="false"
          :width="'auto'"
          :min-resizable-width="120"
          :filterable-cell-show-operators="false"
          :filterable-cell-operator="'contains'"
          :filterable-cell-delay="999999999"
        />
        <kendo-grid-column
          :field="container.idField"
          :template="commandTemplate"
          :header-template="commandHeaderTemplate"
          :filterable="false"
          :sortable="false"
          :locked="true"
          :menu="false"
          :width="80"
        />
      </kendo-grid>

      <v-overlay :value="editing" :dark="false"/>
      <v-slide-x-reverse-transition>
        <edit-dialog
          v-if="editing"
          :container="container.editContainer"
          :model="editItem"
          :save="editorSave"
          :cancel="editorCancel"
          :saving="editorIsSaving"
        />
      </v-slide-x-reverse-transition>
    </div>
  </v-skeleton-loader>
</template>

<script>
import qs from 'qs';
import logger from '../../utils/logger';
import dataSourceHelper from '../../utils/dataSources/dataSourceHelper';
// import DataTableColumn from '@/components/DataTableContainer/DataTableColumn.vue';
import CommandTemplate from './CommandTemplate.vue';
import CommandHeaderTemplate from './CommandHeaderTemplate.vue';
import EditDialog from './EditDialog.vue';

export default {
  name: 'DataTableContainer',
  props: ['container', 'datasource', 'model', 'params'],
  components: {
    // DataTableColumn,
    // CommandTemplate,
    EditDialog,
  },
  data() {
    return {
      editItem: {},
      editing: false,
      gridData: [],
      loading: true,
      columnsHaveBeenResized: false,
      requestingData: false,
      dataTableWidth: 0,
      editorIsSaving: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  computed: {
    schemaFields() {
      const fields = this.container.columns.reduce((acc, cur) => {
        const newField = {
          [cur.fieldName]: {
            editable: true,
            nullable: true,
          },
        };

        return { ...acc, ...newField };
      }, {});

      return fields;
    },
  },
  // This block allows for the gird to updated every time
  // the current row being edited is changed.  Comes at a
  // performance cost and isn't all the necessary
  // watch: {
  //   editItem: {
  //     handler(val){
  //       // Send changes made the vue observable object
  //       // off to the kendo observable object bound to the
  //       // grid / datasource
  //       const observable = this.$options.editItem;

  //       Object.keys(val).forEach((key) => {
  //         const newVal = val[key];
  //         const oldVal = observable.get(key);

  //         if (newVal !== oldVal) {
  //           observable.set(key, newVal);
  //         }
  //       });
  //     },
  //     deep: true
  //   }
  // },
  kendoEditItem: undefined,
  methods: {
    change(e) {
      const selectedRow = e.sender.select();
      const item = e.sender.dataItem(selectedRow);
      console.log('Change hit', item);
      // Store the kendo observable object without
      // converting into a vue observable object
      this.$options.kendoEditItem = item;

      // Create a vue observable object for editing.
      // This will get merged back into the vue obserable
      // when changed.
      this.editItem = item.toJSON();
      this.editing = true;
    },
    handleRequestStart() {
      if (!this.columnsHaveBeenResized) {
        // Trigger a resize on all columns to force them to be a minimum width
        // Only do this on the initial load
        const grid = this.$refs.datatable.kendoWidget();

        grid.columns
          .filter((column) => !column.locked)
          .forEach((column) => {
            grid.resizeColumn(column, 120);
          });

        this.columnsHaveBeenResized = false;
      }
      this.requestingData = true;
    },
    handleRequestEnd() {
      this.requestingData = false;
    },
    convertDatasourceFilter(filter) {
      if (!filter) {
        return '';
      }

      if (filter.filters) {
        return filter.filters.map((subFilter) => (
          `(${this.convertDatasourceFilter(subFilter)})`
        )).join(`~${filter.operator}~`);
      }

      return `${filter.field}~${filter.operator}~'${filter.value}'`;
    },
    convertDatasourceSort(sorts) {
      if (!sorts) {
        return '';
      }

      const sortString = sorts.map((sort) => `${sort.field}-${sort.dir}`).join('~');

      return sortString;
    },
    convertDatasourceRequestToQueryString(request) {
      const sortString = this.convertDatasourceSort(request.sort);
      const filterString = request.filter
        ? request.filter.filters.map((subFilter) => (
          `${this.convertDatasourceFilter(subFilter)}`
        )).join(`~${request.filter.operator}~`)
        : '';

      return {
        sort: sortString,
        filter: filterString,
        page: request.page || 0,
        pageSize: request.pageSize || 10,
      };
    },
    async readRequest(options) {
      const requestOptions = {
        ...options.data,
      };

      const requestString = this.convertDatasourceRequestToQueryString(
        options.data,
      );

      const result = await dataSourceHelper.invokeDatasource(
        this.container.readOperation,
        qs.stringify(requestString),
      );

      this.loading = false;
      options.success(result.data);
      logger.info('read request options', requestOptions);
      // Don't love this but is needed to get the locked column aligned
      // window.dispatchEvent(new Event('resize'));
    },
    updateRequest(options) {
      logger.info('update requested', options);
      options.success({ data: { ...options.data, name: 'hahaha' } });
      this.editorIsSaving = false;
      this.$options.kendoEditItem = undefined;
      this.editing = false;
      this.editItem = {};
    },
    createRequest(options) {
      // Do this on an error
      options.error('ahhhhhh');
      console.log('an error was encountered');
      this.editorIsSaving = false;

      // Do this on success
      // logger.info('create requested', options);
      // options.success({data:{ ...options.data, personID: 123 }});
      // this.$options.kendoEditItem = undefined;
      // this.editing = false;
      // this.editItem = {};
    },
    deleteRequest(options) {
      logger.info('delete requested');
      options.success();
    },
    getTableRow(uid) {
      const selector = `[data-uid='${uid}']`;

      return kendo.jQuery(selector);
    },
    bounddata(e) {
      // Reselect the row on data changes
      if (this.$options.kendoEditItem) {
        const row = this.getTableRow(this.$options.kendoEditItem.uid);

        e.sender.select(row);
      }
    },
    handleCommandCreate() {
      const newItem = this.$refs['datatable-datasource'].kendoWidget().insert(0, {});

      this.$refs.datatable.kendoWidget().refresh();

      const row = this.getTableRow(newItem.uid);

      this.$refs.datatable.kendoWidget().select(row);
    },
    editorSave() {
      // Send changes made to the vue observable object
      // off to the kendo observable object bound to the
      // grid / datasource
      const val = this.editItem;
      const observable = this.$options.kendoEditItem;

      Object.keys(val).forEach((key) => {
        const newVal = val[key];
        const oldVal = observable.get(key);

        if (newVal !== oldVal) {
          observable.set(key, newVal);
        }
      });

      if (!this.$refs['datatable-datasource'].kendoWidget().hasChanges()) {
        this.$options.kendoEditItem = undefined;
        this.editing = false;
        this.editItem = {};

        return;
      }

      this.editorIsSaving = true;
      this.$refs.datatable.kendoWidget().saveChanges();
    },
    editorCancel() {
      this.$options.kendoEditItem = undefined;
      this.editing = false;
      this.editItem = {};

      this.$refs.datatable.kendoWidget().cancelChanges();
    },
    handleCommandEdit(uid) {
      const row = this.getTableRow(uid);

      this.$refs.datatable.kendoWidget().select(row);
    },
    handleCommandDelete(uid) {
      const dataSource = this.$refs['datatable-datasource'].kendoWidget();
      const row = this.getTableRow(uid);

      const dataItem = this.$refs.datatable.kendoWidget().dataItem(row);

      dataSource.remove(dataItem);

      this.$refs.datatable.kendoWidget().saveChanges();
    },
    commandTemplate(e) {
      return {
        template: CommandTemplate,
        templateArgs: {
          edit: this.handleCommandEdit.bind(this, e.uid),
          delete: this.handleCommandDelete.bind(this, e.uid),
        },
      };
    },
    commandHeaderTemplate(e) {
      return {
        template: CommandHeaderTemplate,
        templateArgs: {
          create: this.handleCommandCreate.bind(this),
          vuetify: this.$vuetify
        },
      };
    },
    blank(e) {
      logger.info('Do nothing', e);
    },
    save() {
      logger.info('Save called');
    },
  },
};
</script>

<style>
.v-skeleton-loader__list-item-three-line {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* Hide ugly kendo loaders */
.rely-data-table .k-filtercell .k-icon.k-i-loading {
  display: none !important;
}
.rely-data-table .k-grid-content .k-loading-image {
  display: none !important;
}

.rely-data-table .k-grid table thead tr:hover {
  background-color: initial;
}

.rely-data-table .k-grid-header
{
  padding: 0 !important;
}

.rely-data-table .k-grid-content
{
  overflow-y: visible;
}

/* Style overrides to move locked action column to the right */
.rely-data-table.locked .k-grid-header-locked {
  position: absolute;
  right: 0;
  width: 80px !important;
}
.rely-data-table.locked .k-grid-header-locked > table {
  width: 80px !important;
  /* background-color: #f8f8f8; */
}
.rely-data-table.locked .k-grid-content-locked {
  position: absolute;
  right: 0;
  width: 80px !important;
  border-width: 0px;
}
.rely-data-table.locked .k-grid-content-locked > table {
  width: 80px !important;
  /* background-color: #f8f8f8; */
}
.rely-data-table.locked .k-grid-header-wrap {
  width: calc(100% - 80px) !important;
  margin-right: 80px !important;
  overflow: hidden;
  border-right: none;
}
.rely-data-table.locked .k-grid-lockedcolumns .k-grid-content,
.k-grid-lockedcolumns .k-grid-header-wrap {
  -webkit-box-shadow: inset -18px 0 4px -16px rgba(0, 0, 0, 0.14);
  box-shadow: inset -18px 0 4px -16px rgba(0, 0, 0, 0.14);
  max-width: calc(100% - 80px);
  min-width: calc(100% - 80px);
}

/* Prevent filters from overlaying locked column box shadow */
.rely-data-table.locked .k-filter-row .k-filtercell {
  background-color: transparent;
}
.rely-data-table.locked .k-filter-row .k-filtercell .k-widget.k-autocomplete {
  background-color: transparent;
}

/* Hide locked table loader */
.rely-data-table.locked .k-loading-image {
  display: none !important;
}

/* Dont show resize handler on locked column */
.rely-data-table.locked .k-grid-header-locked .k-resize-handle {
  display: none !important;
}

/* Make row size smaller */
.rely-data-table .k-grid tbody tr {
    height: 40px;
}
.rely-data-table .k-grid tbody td {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 20px;
}

/* Prevent blank space to right of columns when resizing */
.rely-data-table .k-grid-header-wrap > table {
  min-width: 100%;
}
.rely-data-table .k-grid-content table {
  min-width: 100%;
}

.rely-data-table .v-overlay {
  z-index: 3 !important;
}

.rely-data-table .k-grid-header .k-header > .k-link > .k-icon.k-i-sort-desc-sm,
.rely-data-table .k-grid-header .k-header > .k-link > .k-icon.k-i-sort-asc-sm {
  display: flex;
  height: 100%;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
}

.rely-data-table.locked .k-grid-header .k-header-column-menu {
  width: 24px;
  height: 24px;
  right: 8px;
  bottom: unset;
}

.rely-data-table.locked .k-grid-header .k-header {
  padding-right: 34px;
}

.rely-data-table .k-autocomplete:hover .k-clear-value {
  display: none;
}

.rely-data-table.locked th span.k-widget.k-autocomplete.k-autocomplete-clearable.k-state-default {
  padding-right: 0;
}

.rely-data-table .k-grid-header .k-header > .k-link {
  padding-left: 10px;
}

.rely-data-table .k-grid-header th.k-sorted.k-header > a.k-link {
  padding-left: 20px;
}

.rely-data-table .k-filter-row th {
  padding-left: 10px;
  padding-right: 3px;
}

.rely-data-table .k-filter-row th .k-operator-hidden {
  padding-right: 10px;
}

.rely-data-table .k-grid-header .k-filter-row .k-button.k-button-icon {
  margin-right: -10px;
}

.loader-container {
  min-height: 4px;
}

.rely-data-table.locked .k-grid-header-locked .k-header {
  width: 100%;
  padding: 0px;
  position: relative;
  display: flex;
  height: 200%;
}

.rely-data-table.locked .k-grid-header-locked tr {
  position: relative;
  display: flex;
  z-index: 2;
}

.rely-data-table.locked .k-grid-header-locked .k-header-column-menu {
  display: none;
}

.rely-data-table.locked .k-grid-header-locked tr.k-filter-row {
  z-index: 1;
}
</style>
