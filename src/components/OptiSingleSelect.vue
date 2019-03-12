<template>
  <div :class="[{ 'single-select-search': search }, 'single-select-wrapper']">
    <b-dropdown @hidden="$_hidden" @shown="$_shown" :class="[$c_state === true ? 'is-valid' : '', $c_state === false ? 'is-invalid' : '']">
      <div slot="button-content" class="placeholder">
        <slot v-if="$c_selectedItem" name="placeholder" :selectedItem="$c_selectedItem">{{ $c_placeholder }}</slot>
        <div v-else v-html="$c_placeholder"></div>
      </div>
      <div v-if="search" :class="searchClass">
        <b-input v-model="searchModel" :placeholder="searchPlaceholder" autocomplete="off" class="searchInput" />
      </div>
      <template v-for="(item, i) in localList">
        <slot v-if="item.slot" class="custom-item" :name="item.slot" :item="item" v-show="item.show"></slot>
        <b-dropdown-item v-else class="item" v-show="item.show" @mouseover.prevent.stop
          :key="i"
          :class="{ 'active-item': $c_selectedItem ? item[uniqueKey] === $c_selectedItem[uniqueKey] : false}"
          :to="item.to || null"
          @click="$_itemClickAction(item, i)">
          <slot :item="item">
            <span v-html="item[contentKey]"></span>
          </slot>
        </b-dropdown-item>
      </template>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: 'vue-opti-select',
  model: {
    prop: 'value',
    event: 'click',
  },
  props: {
    value: null,
    list: { type: Array, required: true },
    placeholder: { type: String, default: 'Select Option' },
    staticPlaceholder: { type: String, default: '' },
    uniqueKey: { type: String, default: 'value' },
    contentKey: { type: String, default: 'content' },
    state: { default: null },
    search: { type: Boolean, default: false },
    searchField: { type: String, default: 'content' },
    searchPlaceholder: { type: String, default: 'Search...' },
    searchClass: { type: String, default: '' },
  },
  data() {
    return {
      localList: [],
      searchModel: '',
      lastIndex: null,
    };
  },
  created() {
    if (this.search) {
      this.$watch('searchModel', (value) => {
        const formatedValue = value.toLowerCase().trim();
        this.localList.forEach((item) => {
          if (item[this.searchField].toLowerCase().indexOf(formatedValue) === -1) {
            item.show = false;
          } else {
            item.show = true;
          }
        });
      });
    }
  },
  computed: {
    $c_state() {
      if (typeof this.state === 'boolean') return this.state;
      if (this.state === 'valid') return true;
      if (this.state === 'invalid') return false;
      return null;
    },
    $c_selectedIndex() {
      let selectedIndex = null;
      let model = this.value;
      if (typeof model === 'object') model = JSON.stringify(model);
      // Loop through options searching for match value
      for (const index in this.localList) {
        if (Object.prototype.hasOwnProperty.call(this.localList, index)) {
          const option = this.localList[index];
          if (typeof option[this.uniqueKey] === typeof this.value) {
            const value = typeof option[this.uniqueKey] === 'object' ? JSON.stringify(option[this.uniqueKey]) : option[this.uniqueKey];
            if (model === value) {
              selectedIndex = index;
              break;
            }
          }
        }
      }
      return selectedIndex;
    },
    $c_selectedItem() {
      this.$emit('change', this.localList[this.$c_selectedIndex], this.$c_selectedIndex);
      return this.localList[this.$c_selectedIndex];
    },
    $c_placeholder() {
      if (this.staticPlaceholder) return this.staticPlaceholder;
      return (this.$c_selectedItem && this.$c_selectedItem[this.uniqueKey] && this.$c_selectedItem[this.contentKey]) || this.placeholder;
    },
  },
  methods: {
    $_itemClickAction(item, index) {
      this.$emit('click', item[this.uniqueKey], item, index);
    },
    $_shown() {
      this.searchModel = '';
      this.$emit('shown');
      this.lastIndex = this.$c_selectedIndex;
    },
    $_hidden() {
      this.$emit('hidden');
      if (this.lastIndex !== this.$c_selectedIndex) this.$emit('hidden:change', this.$c_selectedItem, this.$c_selectedIndex);
    },
  },
  watch: {
    list: {
      immediate: true,
      handler(list) {
        const cloneList = JSON.parse(JSON.stringify(list));
        this.localList = cloneList.map((item) => {
          item.show = true;
          return item;
        });
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
  .single-select-wrapper {
    .dropdown-menu {
      z-index: 99999999;
    }
    &.single-select-search {
      .dropdown-menu {
        padding-top: 0px;
        .searchInput {
          border-radius: 0;
          border-top: 0;
          border-left: 0;
          border-right: 0;
          border-bottom-width: 1px;
          display: inline-block;
          &:focus {
            border-bottom-width: 0px;
          }
        }
      }
    }
  }
  .b-dropdown > * {
    width: 100% !important;
  }
  .b-dropdown {
    .dropdown-item a {
      color: unset;
      text-decoration: unset;
    }
    border: 1px solid transparent;
    &.is-valid {
      border-color: #61a633;
    }
    &.is-invalid {
      border-color:#ff5454;
    }
  }
</style>

<style scoped>
  .b-dropdown {
    width: 100% !important;
  }
  .placeholder {
    width: calc(100% - 10px) !important;
    display: inline-block;
    text-align: left;
  }
  .item {
    width: 100% !important;
    font-size: 13px;
    height: 35px;
    line-height: 35px;
    padding: 0px;
    padding-left: 10px;
    padding-right: 10px;
    background: #fff;
    border: 0px;
  }
  .item:hover {
    background: #eee;
  }
  .item:focus {
    color: black;
    outline: none !important;
  }
  .active-item {
    background: #f5f5f5 !important;
  }
</style>
