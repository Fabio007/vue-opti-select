<template>
  <div class="container mt-3">
    <vue-opti-select class="col-md-4 offset-md-4"
      uniqueKey="id"
      contentKey="content"
      v-model="selectedRow" 
      :list="rows"
      @click="$_onClick" 
      @hidden:change="$_onChangeHiddenDropdown"
      @change="$_onChange"
      @shown="$_onShown"
      @hidden="$_onHidden"
      search
      :state="null">
      <template slot-scope="props" slot="placeholder">
        <span>{{ props.selectedItem.content }} test</span>
      </template>
      <template slot-scope="slotProps">
        <!-- Define a custom template for todo items, using -->
        <!-- `slotProps` to customize each todo.            -->
       <span v-html="slotProps.item.content"></span>
      </template>
      <template slot="custom">
        <hr class="mb-1 mt-1" />
      </template>
    </vue-opti-select>
    <br/>
    <h4 class="col-md-7 offset-md-3">Selected Item: {{ selectedRow }}</h4>
  </div>
</template>

<script>
  import Vue from 'vue';
  import BootstrapVue from 'bootstrap-vue';
  import { VueOptiSelect } from '../src/index';
  Vue.use(BootstrapVue);
  export default {
    name: 'test',
    components: {
      VueOptiSelect
    },
    data () {
      return {
        rows: [
          { content: '10 Rows', id: {a: 10, c: '3'} },
          { content: '25 Rows', id: 25 },
          { content: '50 Rows', id: 50 },
          { content: 'Custom', slot: 'custom' },
          { content: '100 Rows', id: 100 },
        ],
        selectedRow: null,
      }
    },
    methods: {
      $_onClick(item, index) {
        console.log('--onClick', item, index)
      },
      $_onChangeHiddenDropdown(item, index) {
        console.log('--onChangeHiddenDropdown', item, index)
      },
      $_onChange(item, index) {
        console.log('--onChange', item, index)
      },
      $_onShown() {
        console.log('--onShown')
      },
      $_onHidden() {
        console.log('--onHidden')
      }
    },
  };
</script>

<style lang="css">

</style>