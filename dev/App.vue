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
          { content: '50 Rows', id: 50, fn: () => 'test' },
          { content: 'Custom', slot: 'custom' },
          { content: '100 Rows', id: 100 },
          { content: 'False', id: false },
          { content: 'True', id: true },
          { content: 'Item 1', id: 'item-1' },
          { content: 'Item 2', id: 'item-2' },
          { content: 'Item 3', id: 'item-3' },
          { content: 'Item 4', id: 'item-4' },
          { content: 'Item 5', id: 'item-5' },
          { content: 'Item 6', id: 'item-6' },
          { content: 'Item 7', id: 'item-7' },
          { content: 'Item 8', id: 'item-8' },
          { content: 'Item 9', id: 'item-9' },
          { content: 'Item 10', id: 'item-10' },
          { content: 'Item 11', id: 'item-11' },
          { content: 'Item 12', id: 'item-12' },
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