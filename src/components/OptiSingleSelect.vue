<template>
  <div class="single-select-wrapper">
    <b-dropdown @hidden="$_hidden" @shown="$_shown">
      <div slot="button-content" class="placeholder" v-html="$c_placeholder"></div>

      <b-dropdown-item class="item"
        v-for="(item, i) in list" :key="i"
        :class="{ 'active-item': $c_selectedItem ? item.value === $c_selectedItem.value : false}"
        :to="item.to || null"
        @click="$_itemClickAction(item, i)">
        <slot :item="item"><span v-html="item.content"></span></slot>
      </b-dropdown-item>

    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: 'vue-opti-select',
  props: {
    value: null,
    list: { type: Array, required: true },
    placeholder: { type: String, default: '' },
    staticPlaceholder: { type: String, default: '' },
  },
  data() {
    return {
      lastIndex: null,
    };
  },
  computed: {
    $c_selectedIndex() {
      let selectedIndex = null;
      let model = this.value;
      if (typeof model === 'object') model = JSON.stringify(model);
      // Loop through options searching for match value
      for (const index in this.list) {
        if (Object.prototype.hasOwnProperty.call(this.list, index)) {
          const option = this.list[index];
          if (typeof option.value === typeof this.value) {
            const value = typeof option.value === 'object' ? JSON.stringify(option.value) : option.value;
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
      return this.list[this.$c_selectedIndex];
    },
    $c_placeholder() {
      if (this.staticPlaceholder) return this.staticPlaceholder;
      return (this.$c_selectedItem && this.$c_selectedItem.value && this.$c_selectedItem.content) || this.placeholder;
    },
  },
  methods: {
    $_itemClickAction(item, index) {
      this.$emit('input', item.value, item, index);
      this.$emit('click', item, index);
    },
    $_shown() {
      this.lastIndex = this.$c_selectedIndex;
    },
    $_hidden() {
      if (this.lastIndex !== this.$c_selectedIndex) this.$emit('change', this.$c_selectedItem, this.$c_selectedIndex);
    },
  },
};
</script>

<style lang="scss">
  .single-select-wrapper {
    .dropdown-menu {
      z-index: 99999999;
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
