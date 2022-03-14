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
      />
      <div class="filters">
        <SbrButton
          color="#ffffff"
        >
          Add Filter    
        </SbrButton>
      </div>
    </div>
    <Table
      :columns="tableColumns"
      :rows="documents"
    />
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
    documents: gql`query Documents {
      documents {
        fileName
        id
        sbrId
        orRequestDate
        orRequestor
      }
    }`,
  },
  data: () => ({
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
        modifier: (value) => moment(value).format('DD/MM/YYYY')
      },
      {
        name: 'Requestor',
        accessor: 'orRequestor'
      }
    ],
    rows: [
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
        },
        {
            name: 'test',
            content: 'asdf'
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
</style>
