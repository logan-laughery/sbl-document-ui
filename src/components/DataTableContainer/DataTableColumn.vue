<template>
  <kendo-grid-column
    :field="column.fieldName"
    :width="180"
    :filterable-cell-show-operators="false"
  />
</template>

<script>
export default {
  name: 'DataTableColumn',
  props: ['column'],
};
</script>

<style>
</style>
