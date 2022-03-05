<template>
  <div class="table">
    <div
      v-for="(column, i) in columns"
      :key="i"
    >
      {column.name}
    </div>
    <div class="body">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: ['columns'],
};
</script>

<style>
</style>
