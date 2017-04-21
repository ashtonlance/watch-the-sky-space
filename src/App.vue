<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <div v-bind:class="[show ? blurClass : '', bkClass]">
      <div id="wrapper"
           class="hero is-primary">
        <div id="moonwrapper">
          <h4 class="title is-4">star-gazing forecast</h4> {{ moon }}
        </div>
        <div style="padding-top: 0; padding-left:0.75rem;padding-right:0.75rem;padding-bottom:0"
             class="hero-body">
  
          <h1 class="title is-3 is-spaced">{{ phase }}</h1>
          <h2 class="title is-4 is-marginless">the moon is {{ illum }}% full</h2>
          <p class="subtitle is-marginless">next full moon is in {{ next }} days</p>
          <p class="subtitle is-marginless">next new moon is in {{ nextnew }} days</p>
          <p class="subtitle is-4"
             v-if="!sunhasset"
             style="margin-bottom:1rem;">sunset at {{ sunset }}</p>
          <p class="subtitle is-4"
             v-if="sunhasset"
             style="margin-bottom:1rem;">sunrise at {{ sunrise }}</p>
          <h2 class="subtitle is-marginless">conditions tonight in {{ city }} </h2>
          <h1 class="title is-marginless">will be {{ weather }} </h1>
        </div>
  
        <div id="weatherwrapper"
             class="is-spaced">
  
          <button class="button is-dark is-inverted is-outlined"
                  v-on:click="getLocation()">
            use current location
          </button>
          <b-field position="centered"
                   style="margin-top:7px;margin-bottom:0px">
  
            <b-input class="label is-small"
                     type="text"
                     v-model="zip"
                     placeholder="enter zip code"></b-input>
            <p class="control">
              <button class="button is-dark is-inverted is-outlined is small"
                      v-on:click="getWeatherDynamic()">
                enter</button>
            </p>
          </b-field>
          <a v-on:click="show = true">about</a>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div id="modal"
           class="modal is-active"
           v-if="show">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">watch the sky</p>
            <button id="closeModal"
                    class="delete"
                    v-on:click="show = false"></button>
          </header>
          <section class="modal-card-body">
            <div class="content">
              this app shows you the sky conditions tonight.
              <br> the brighter the moon, the less stars you'll be able to see.
              <br>
              <small><b>powered by <a href="https://darksky.net/poweredby/">dark sky</a></b></small>
              <br>
              <small><b><i>created by ashton lance</i></b></small>
              <a href="http://ashtonlance.com"
                 target="_blank">ashtonlance.com</a>
            </div>
          </section>
          <footer class="modal-card-foot is-centered">
            <a style="margin:auto"
               class="button is-dark"
               href="mailto:ashton@ashtonlance.com">contact the dev</a>
          </footer>
        </div>
      </div>
    </transition>
  </div>
  </div>
</template>

<script>
var moonmoji = require('moonmoji')()
var zipcodes = require('zipcodes')
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      phase: '',
      illum: '',
      city: '',
      next: '',
      moon: '',
      zip: '37408',
      weather: '',
      sunset: '',
      lat: '',
      long: '',
      sunhasset: false,
      nextnew: '',
      show: false,
      bkClass: 'bk',
      blurClass: 'blur'
    }
  },

  methods: {

    getPhase() {
      this.$http.get('https://api.aerisapi.com/sunmoon/37408?client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        this.phase = response.data.response[0].moon.phase.name
        this.illum = response.data.response[0].moon.phase.illum
        this.moon = (moonmoji.emoji)

      })
    },
    getWeatherDynamic() {
      let startOfNight = this.$moment().format('YYYY-MM-DD') + 'T22:00:00-04:00'
      let now = this.$moment(startOfNight).format()
      this.tonight = this.$moment(now).add(4, 'h').format('YYYY-MM-DD hh:mm:ss')
      this.tonight = this.$moment(this.tonight).format()

      this.$http.get('https://api.aerisapi.com/sunmoon/' + this.zip + '?client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        var sunsetRaw = response.data.response[0].sun.setISO
        var today = this.$moment().format()
        this.sunset = this.$moment(sunsetRaw).format('h:mm a')

        if (sunsetRaw < today) {
          this.$http.get('https://api.aerisapi.com/sunmoon/' + this.zip + '?from=tomorrow&to=tomorrow&client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
            this.sunhasset = true
            let sunRiseRaw = response.data.response[1].sun.riseISO
            this.sunrise = this.$moment(sunRiseRaw).format('h:mm a')
            var myElement = document.querySelector("#wrapper")
            myElement.style.background = "linear-gradient(to bottom, #172635, #360e18)"
            var myElement2 = document.querySelector("#app")
            myElement2.style.background = "linear-gradient(to bottom, #172635, #360e18)"
          })
        } else {
          this.sunhasset = false
        }

        var location = zipcodes.lookup(this.zip)

        this.lat = location.latitude
        this.long = location.longitude
        this.city = location.city.toLowerCase()


        this.$http.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/bfef1e60cd8ad4b63a54b6074f7ce189/' + this.lat + ',' + this.long + ',' + this.tonight).then((response) => {

          this.weather = response.data.currently.summary.toLowerCase()
        })


      })

    },
    getNextFull() {
      this.$http.get('https://api.aerisapi.com/sunmoon/moonphases/chattanooga,tn&search?query=type:new;type:full&limit=2&client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        let nextRaw = (response.data.response[1].dateTimeISO)
        let newRawNew = (response.data.response[0].dateTimeISO)
        let today = this.$moment().format()
        this.next = this.$moment(nextRaw).diff(today, 'days')
        this.nextnew = this.$moment(newRawNew).diff(today, 'days')
        this.$Progress.finish()
      })
    },
    getLocation() {

      if ("geolocation" in navigator) {

        console.log('this is asking for geolocation')
        navigator.geolocation.getCurrentPosition(function (position) {

          var lat = position.coords.latitude
          var long = position.coords.longitude

          axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&result_type=postal_code&key=AIzaSyCGtc_cTPObI3_EnTtNbBbqswJYnsH2MMA').then((responselocation) => {

            this.city = responselocation.data.results[0].address_components[1].long_name.toLowerCase()
            this.zip = responselocation.data.results[0].address_components[0].long_name
          })
          axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/bfef1e60cd8ad4b63a54b6074f7ce189/' + lat + ',' + long + ',' + this.tonight).then((response) => {

            this.weather = response.data.currently.summary.toLowerCase()
          })
        }.bind(this))
      } else {
        this.$toast.open({
          message: `Something went wrong and we couldn't get your location`,
          position: 'bottom',
          type: 'is-danger'
        })
      }
    }
  },
  mounted() {

    this.getWeatherDynamic()
    this.getPhase()
    this.getNextFull()

  },
  created() {
    this.$Progress.start()

    if (localStorage.getItem('zip') === null) {
      this.zip = '37408'
    } else if (localStorage.getItem('zip') != null) {
      this.zip = localStorage.getItem('zip')
    }
  },
  watch: {
    zip() {
      localStorage.setItem('zip', this.zip)
    }
  }
}
</script>

<style lang="scss">
html {
  -webkit-text-size-adjust: 100%;
}

#app {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f2f2f2;
  background: linear-gradient(to bottom, #2c3e50, #3498db);
  background-repeat: no-repeat;
  background-attachment: fixed;
  top: 0;
  left: 0;
}

#wrapper {
  height: 100%; // background: rgba(#000, 0.35);
  background: linear-gradient(to bottom, #2c3e50, #3498db);
  padding: 25px;
  padding-top: 5px;
}

#moonwrapper {
  font-size: 100px;
  margin-top: 15px;
}

#weatherwrapper {
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 20%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

.bk {
  transition: all 0.1s ease-out;
}

.blur {
  filter: blur(2px);
  opacity: 0.4;
}

.modal-background {
  background-color: rgba(10, 10, 10, 0.1) !important;
}

@media only screen and (min-width: 320px) and (max-width: 769px) and (orientation: landscape) {
  #app {
    height: 200vh;
  }
}
</style>

