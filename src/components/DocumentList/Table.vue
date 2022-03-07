<template>
  <div class="table">
    <div class="table-header">
      <div
        class="table-header-column"
        v-for="(column, i) in columns"
        :key="i"
      >
        {{column.name}}
      </div>
    </div>
    <div class="body">
      <Card>
        <div
          v-for="(row, i) in rows"
          :key="i"
        >
          <div class="table-row">
            <div
              class="table-row-column"
              v-for="(column, i) in columns"
              :key="i"
            >
              {{row[column.accessor]}}
            </div>
          </div>
          <div
            v-if="i !== (rows.length - 1)" 
            class="table-row-divider"
          />
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Shared/Card';

export default {
  name: 'Table',
  components: {
    Card,
  },
  props: ['columns', 'rows'],
};
</script>

<style>
.table-row {
  display: flex;
  flex-direction: row;
}

.table-header {
  display: flex;
  flex-direction: row;
  padding-left: 21px;
  padding-right: 20px;
  padding-bottom: 10px;
}

.table-header-column {
  flex-grow: 1;
}

.table-row-column {
  font-size: 24px;
  color: #000000;
  flex-grow: 1;
}

.table-row-divider {
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
