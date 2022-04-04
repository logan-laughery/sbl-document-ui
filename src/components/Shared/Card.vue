<template>
  <div class="card">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Card'
};
</script>

<style>
.card {
    background-color: #ffffff;
    border-radius: 14px;
    border-width: 1px;
    border-style: solid;
    border-color: #d8d8d8;
    padding: 18px;
}
</style>
