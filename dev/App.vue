<template>
  <div class="container mt-3">
    <vue-opti-select class="col-md-4 offset-md-4" v-model="selectedRow" :list="rows"></vue-opti-select>
    <br/>
    <h4 class="col-md-7 offset-md-3">Selected Item: {{ selectedRow }}</h4>
  </div>
</template>

<script>
  import Vue from 'vue';
  import BootstrapVue from 'bootstrap-vue';
  import VueOptiSelect from '../src/index';
  Vue.use(BootstrapVue);
  Vue.use(VueOptiSelect);
  export default {
    name: 'test',
    data () {
      return {
        rows: [
          { content: '10 Rows', value: 10 },
          { content: '25 Rows', value: 25 },
          { content: '50 Rows', value: 50 },
          { content: '100 Rows', value: 100 },
        ],
        selectedRow: 10,
      }
    }
  };
</script>

<style lang="css">

</style>