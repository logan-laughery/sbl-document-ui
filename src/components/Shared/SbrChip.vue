<template>
    <v-chip
      class="sbr-btn"
      elevation="0"
      rounded
      close
      :color="color || '#ffffff'"
      @click:close="$emit('close')"
      @click="$emit('click')"
    >
      <slot/>
    </v-chip>
</template>

<script>
export default {
  name: 'SbrChip',
  props: ['color']
};
</script>

<style>
.sbr-btn {
  border-width: 1px !important;
  border-style: solid !important;
  border-color: #d1d1d1 !important;
  text-transform: none !important;
  font-size: 13px !important;
  line-height: 13px !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
}

.sbr-btn.v-btn:not(.v-btn--round).v-size--default {
  height: 30px;
  padding: 12px;
  min-width: 56px;
}

.sbr-btn.v-chip {
  padding: 8px;
  height: 30px;
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
