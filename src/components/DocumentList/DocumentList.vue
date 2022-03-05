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
    <Table/>
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
      },
      {
        name: 'Content',
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
