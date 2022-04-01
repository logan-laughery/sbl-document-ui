<template>
  <div id="document-list">
    <div class="page-title">
      Documents
    </div>
    <div class="filter-bar">
      <v-text-field
        class="search"
        color="black"
        label="Search document text"
        prepend-icon="mdi-magnify"
        v-model="search"
      />
      <div class="filters">
        <SbrButton
          color="#ffffff"
        >
          Add Filter    
        </SbrButton>
      </div>
    </div>
    <div v-if="$apollo.loading">Loading...</div>
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
          <button v-if="skip > 0" @click="skip = skip - 10" class="page-link">Prev</button>
          <div class="page-link">Page {{(skip / 10) + 1}} / {{Math.ceil(searchDocumentsCount.count / 10)}}</div>
          <button v-if="(skip / 10) + 1 < Math.ceil(searchDocumentsCount.count / 10)" @click="skip = skip + 10" class="page-link">Next</button>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import Table from '@/components/DocumentList/Table';
import SbrButton from '@/components/Shared/SbrButton';
import gql from 'graphql-tag';
import moment from 'moment';

// https://arctype.com/blog/postgres-full-text-search/
export default {
  name: 'DocumentList',
  apollo: {
    searchDocuments: {
      query: gql`query Documents($orderBy: [DocumentOrderByWithRelationInput!], $take: Int!, $skip: Int!, $search: String!) {
        searchDocuments(orderBy: $orderBy, take: $take, skip: $skip, search: $search) {
          fileName
          id
          sbrId
          orRequestDate
          orRequestor,
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
          search: this.search.length > 1 ? this.search : ''
        }
      }
    },
    searchDocumentsCount: {
      query: gql`query DocumentSearchCount($search: String!) {
        searchDocumentsCount(search: $search) {
          count
        }
      }`,
      variables() {
        return {
          search: this.search.length > 1 ? this.search : ''
        }
      }
    }
  },
  data: () => ({
    search: '',
    skip: 0,
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
        name: 'Request Date',
        accessor: 'orRequestDate',
        modifier: (value) => moment(value).format('MM/DD/YYYY')
      },
      {
        name: 'Requestor',
        accessor: 'orRequestor'
      }
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
    SbrButton,
  },
};
</script>

<style>
.search {
  max-width: 500px;
}

.filter-bar {
  display: flex;
  flex-direction: row;
}

.filters {
  margin-top: 11px;
  margin-left: 35px;
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
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
