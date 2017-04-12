import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'vue-moment'
import Vuetify from 'vuetify'
import VueProgressBar from 'vue-progressbar'


Vue.use(require('vue-moment'));
Vue.use(VueAxios, axios)
Vue.use(Vuetify)

const options = {
  color: 'rgb(143, 255, 199)',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.5s',
    opacity: '0.6s'
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)


new Vue({
  el: '#app',
  render: h => h(App)
})
