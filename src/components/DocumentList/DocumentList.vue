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
        <v-btn
          elevation="2"
          rounded
          color="white"
        >
          Add Filter    
        </v-btn>
      </div>
    </div>
    <Table
      :columns="tableColumns"
      :rows="rows"
    />
  </div>
</template>

<script>
import Table from '@/components/DocumentList/Table';

export default {
  name: 'DocumentList',
  data: () => ({
    tableColumns: [
      {
        name: 'Name',
        accessor: 'name'
      },
      {
        name: 'Content',
        accessor: 'content'
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
