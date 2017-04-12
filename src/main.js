import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'vue-moment'
import Vuetify from 'vuetify'


Vue.use(require('vue-moment'));
Vue.use(VueAxios, axios)
Vue.use(Vuetify)


new Vue({
  el: '#app',
  render: h => h(App)
})
