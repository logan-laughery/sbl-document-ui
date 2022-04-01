<template>
  <div id="menu">
    <div class="title">
      <div class="header">
        Save Bloody Run
      </div>
      <div class="subheader">
        Open Records Database
      </div>
    </div>
    <div class="account">
      <!-- <v-list-item-avatar class="mr-2 ml-n2 my-0">
        <v-avatar color="white" size="26">
          <span class="blue-grey--text title">A</span>
        </v-avatar>
      </v-list-item-avatar> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'Menu',
};
</script>

<style scoped>
#menu {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
  padding-left: 30px;
  padding-right: 30px;
  position: fixed;
  width: 100%;
  box-shadow: 0 1px 11px rgb(0 0 0 / 12%);
  z-index: 2;
}

.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
