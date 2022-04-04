<template>
  <div class="field-container">
    {{field}}
    <div class="field-value">
      {{value}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReadOnlyField',
  props: ['field', 'value']
};
</script>

<style>
.field-container {
  font-size: 13px;
  color: #8A8A8E;
  margin-top: 14px;
  margin-bottom: 14px;
}

.field-value {
  font-size: 16px;
  color: #000000;
  line-height: initial;
}
</style>
