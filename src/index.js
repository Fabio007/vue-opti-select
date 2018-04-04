import OptiSingeSelect from './components/OptiSingleSelect';

function install(Vue) {
  Vue.component(OptiSingeSelect.name, OptiSingeSelect);
}

const OptiSingeSelectPlugin = {
  install,
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(OptiSingeSelectPlugin);
}

export default {
  OptiSingeSelect,
  OptiSingeSelectPlugin,
};
// for cdn
export {
  OptiSingeSelect as VueOptiSelect,
};

