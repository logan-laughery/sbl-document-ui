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
      <div class="table-header-column action-column"/>
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
              {{column.modifier ? column.modifier(row[column.accessor]) : row[column.accessor]}}
            </div>
            <div class="table-row-column action-column">
              <router-link :to="{path: `/document/${row.id}`}">
                <SbrButton color="#EEF5FF">
                  View
                </SbrButton>
              </router-link>
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
import SbrButton from '@/components/Shared/SbrButton';

export default {
  name: 'Table',
  components: {
    Card,
    SbrButton,
  },
  props: ['columns', 'rows'],
};
</script>

<style>
.table-row {
  display: flex;
  flex-direction: row;
  align-items: center;
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
  flex-basis: 0
}

.table-header-column.action-column {
  flex-grow: 0;
  min-width: 80px;
}

.table-row-column.action-column a {
  text-decoration: none !important;
}

.table-row-column {
  font-size: 22px;
  color: #000000;
  flex-grow: 1;
  flex-basis: 0;
}

.table-row-column.action-column {
  flex-grow: 0;
  min-width: 80px;
}

.table-row-divider {
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
