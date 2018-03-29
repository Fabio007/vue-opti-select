<template>
  <div class="container mt-3">
    <vue-opti-select class="col-md-4 offset-md-4" 
      v-model="selectedRow" 
      :list="rows" 
      @input="$_onInput" 
      @click="$_onClick" 
      @change="$_onChange">
    </vue-opti-select>
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
          { content: '10 Rows', value: {a: 10, c: '3'} },
          { content: '25 Rows', value: 25 },
          { content: '50 Rows', value: 50 },
          { content: '100 Rows', value: 100 },
        ],
        selectedRow: 25,
      }
    },
    methods: {
      $_onInput(value, item, index) {
        console.log('--onInput', value, item, index)
      },
      $_onClick(item, index) {
        console.log('--onClick', item, index)
      },
      $_onChange(item, index) {
        console.log('--onChange', item, index)
      },
    },
  };
</script>

<style lang="css">

</style>