<template>
  <div id="document-list">
    <div class="page-title">
      Documents
    </div>
    <div class="filter-bar">
      <v-text-field
        class="search sbr-input"
        color="black"
        label="Search document text"
        prepend-icon="mdi-magnify"
        @input="updateSearch"
        value="search"
        hint="A space between terms searches for documents with at least one matching term.  '&' searches for documents containing both terms.  '+' searches for terms appearing in sequence."
      />
      <FilterSelector
        @add="addFilter"
      />
    </div>
    <div class="filter-chips">
      <FilterChip
        v-for="(filter, i) in filters"
        :key="i"
        :filterConfig="filter.config"
        :filterType="filter.type"
        @updateFilter="(event) => updateFilter(i, event)"
        @deleteFilter="deleteFilter(i)"
      />
    </div>
    <div v-if="$apollo.loading" class="loader">
      <v-progress-circular
        :size="50"
        color="black"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <Table
        :columns="search.length > 1 ? searchColumns : tableColumns"
        :rows="searchDocuments"
      />
      <div class="table-footer">
        <div class="page-count">
          {{searchDocumentsCount.count}} Documents
        </div>
        <div class="page-container" v-if="searchDocumentsCount.count > 0">
          <button v-if="skip > 0" @click="updateSkip(skip - 10)" class="page-link">Prev</button>
          <div class="page-link">Page {{(skip / 10) + 1}} / {{Math.ceil(searchDocumentsCount.count / 10)}}</div>
          <button v-if="(skip / 10) + 1 < Math.ceil(searchDocumentsCount.count / 10)" @click="updateSkip(skip + 10)" class="page-link">Next</button>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import Table from '@/components/DocumentList/Table';
import FilterSelector from '@/components/DocumentList/FilterSelector';
import FilterChip from '@/components/DocumentList/FilterChip';
import gql from 'graphql-tag';
import moment from 'moment';
import Vue from 'vue';
import { mapState } from 'vuex';

// https://arctype.com/blog/postgres-full-text-search/
export default {
  name: 'DocumentList',
  apollo: {
    searchDocuments: {
      query: gql`query Documents($orderBy: [DocumentOrderByWithRelationInput!], $take: Int!, $skip: Int!, $search: String!, $where: DocumentWhereInput) {
        searchDocuments(orderBy: $orderBy, take: $take, skip: $skip, search: $search, where: $where) {
          fileName
          id
          sbrId
          orRequestDate
          orRequestor,
          beginDate,
          endDate,
          match
        }
      }`,
      variables() {
        return {
          orderBy: [
            {
              sbrId: "asc"
            }
          ],
          take: 10,
          skip: this.skip,
          search: this.search?.length > 1 ? this.search : '',
          where: this.whereCondition
        }
      }
    },
    searchDocumentsCount: {
      query: gql`query DocumentSearchCount($search: String!, $where: DocumentWhereInput) {
        searchDocumentsCount(search: $search, where: $where) {
          count
        }
      }`,
      variables() {
        return {
          search: this.search?.length > 1 ? this.search : '',
          where: this.whereCondition
        }
      }
    }
  },
  computed: mapState({
    whereCondition() {
      if (!this.filters.length) {
        return undefined;
      }

      const whereCondition = {};

      this.filters.forEach(filter => {
        const columnNames = {
          'Date Requested': 'orRequestDate',
          'Requestor': 'orRequestor',
          'Begin Date': 'beginDate',
          'End Date': 'endDate'
        };
        const columnName = columnNames[filter.type];

        const comparisons = {
          'Before': 'lt',
          'After': 'gt',
          'Equals': 'equals'
        };
        const comparison = comparisons[filter.config.comparison];

        if (!whereCondition[columnName]) {
          whereCondition[columnName] = {};
        }

        whereCondition[columnName][comparison] = filter.config.search;
      });

      console.error(whereCondition);

      return whereCondition;
    },
    searchSettings: (state) => state.searchSettings,
    filters() { return this.searchSettings?.filters || [] },
    skip() { return this.searchSettings?.skip || 0 },
    search() { return this.searchSettings?.search || '' },
  }),
  data: () => ({
    searchModel: '',
    tableColumns: [
      {
        name: 'Name',
        accessor: 'fileName'
      },
      {
        name: 'ID',
        accessor: 'sbrId'
      },
      {
        name: 'Start Date',
        accessor: 'beginDate',
        modifier: (value) => value && moment(value).format('MM/DD/YYYY')
      },
      {
        name: 'End Date',
        accessor: 'endDate',
        modifier: (value) => value && moment(value).format('MM/DD/YYYY')
      },
    ],
    searchColumns: [
      {
        name: 'Name',
        grow: 2,
        accessor: 'fileName'
      },
      {
        name: 'ID',
        grow: 1,
        accessor: 'sbrId'
      },
      {
        name: 'Results',
        accessor: 'match',
        grow: 4,
        display: 'flex',
        modifier: (value) => {
          const safeString = value.replaceAll('<b>', '_b_').replaceAll('</b>', '_*b_')
            .replaceAll('<', '').replaceAll('>', '')
            .replaceAll('_b_', '<b>').replaceAll('_*b_', '</b>');

          return `<span class='match'>...${ safeString }</span>...`;
        }
      }
    ]
  }),
  components: {
    Table,
    FilterSelector,
    FilterChip
  },
  methods: {
    addFilter(event) {
      this.$store.commit('setSearchSettings', {
        ...this.searchSettings,
        filters: [...this.filters, event]
      });
    },
    updateSearch(search) {
      console.error(search);
      this.$store.commit('setSearchSettings', {
        ...this.searchSettings,
        search
      });
    },
    updateSkip(skip) {
      this.$store.commit('setSearchSettings', {
        ...this.searchSettings,
        skip
      });
    },
    updateFilter(i, event) {
      const updatedFilters = [...this.filters];
      
      Vue.set(updatedFilters, i, event);
      
      this.$store.commit('setSearchSettings', {
        ...this.searchSettings,
        filters: updatedFilters
      });
    },
    deleteFilter(i) {
      const updatedFilters = [...this.filters];

      updatedFilters.splice(i);
      
      this.$store.commit('setSearchSettings', {
        ...this.searchSettings,
        filters: updatedFilters
      });
    }
  }
};
</script>

<style>
.search {
  max-width: 500px !important;
}

.sbr-input .v-label {
  font-size: 13px;
}

.sbr-input.v-input input {
  font-size: 14px;
  padding: 5px 0px;
}

.sbr-input.v-input .v-icon.v-icon {
  font-size: 20px;
}

.filter-bar {
  display: flex;
  flex-direction: row;
}

.page-container {
  display: flex;
  justify-content: flex-end;
}

.page-link {
  margin-left: 20px;
}

.match {
  max-width: 100%;
  overflow: hidden;
  margin-right: 2px;
}

.table-footer {
  font-size: 13px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

#document-list {
  min-height: 100%;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}

.filter-chips:last-child {
  padding-bottom: 20px;
}
</style>
