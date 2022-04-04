<template>
    <v-btn
      class="sbr-btn"
      elevation="0"
      rounded
      :color="color || '#ffffff'"
    >
      <slot/>
    </v-btn>
</template>

<script>
export default {
  name: 'SbrButton',
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
</style>
