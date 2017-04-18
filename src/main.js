import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'vue-moment'
import Vuetify from 'vuetify'
import VueProgressBar from 'vue-progressbar'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import VueRouter from 'vue-router'
import About from './About.vue'

Vue.use(VueRouter)
Vue.use(require('vue-moment'));
Vue.use(VueAxios, axios)
Vue.use(Vuetify)
Vue.use(Buefy)

const options = {
  color: 'rgb(143, 255, 199)',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.3s'
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

const routes = [
  { path: '/', component: App },
  { path: '/about', component: About }
]

const router = new VueRouter({
  routes // short for routes: routes
})


new Vue({
  el: '#app',
  render: h => h(App),
  router
})
