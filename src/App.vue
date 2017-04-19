<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <section id="wrapper"
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
           style="margin-bottom:1rem;">sunset in {{ sunset }} hours</p>
        <p class="subtitle is-4"
           v-if="sunhasset"
           style="margin-bottom:1rem;">sunrise in {{ sunrise }} hours</p>
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
                 style="margin-top:7px;">
          
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
        <router-link to="/about">about</router-link>
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>

      </div>
    </section>
  </div>
</template>

<script>
var moonmoji = require('moonmoji')();
var zipcodes = require('zipcodes');
import axios from 'axios';

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
      nextnew: ''
    }
  },

  methods: {

    getPhase() {
      this.$http.get('https://api.aerisapi.com/sunmoon/37408?client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        this.phase = response.data.response[0].moon.phase.name;
        this.illum = response.data.response[0].moon.phase.illum;
        this.moon = (moonmoji.emoji);

      })
    },
    getWeatherDynamic() {
      let startOfNight = this.$moment().format('YYYY-MM-DD') + 'T22:00:00-04:00'
      let now = this.$moment(startOfNight).format()
      this.tonight = this.$moment(now).add(4, 'h').format('YYYY-MM-DD hh:mm:ss')
      this.tonight = this.$moment(this.tonight).format()
      
      this.$http.get('https://api.aerisapi.com/sunmoon/' + this.zip + '?client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        let sunsetRaw = response.data.response[0].sun.setISO;
        let today = this.$moment().format();
        this.sunset = this.$moment(sunsetRaw).diff(today, 'hours');
        
        if (this.sunset <= 0) {
          this.$http.get('https://api.aerisapi.com/sunmoon/' + this.zip + '?from=tomorrow&to=tomorrow&client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
            this.sunhasset = true
            let sunRiseRaw = response.data.response[0].sun.riseISO
            let today = this.$moment().format();
            this.sunrise = Math.abs(this.$moment(today).diff(sunRiseRaw, 'hours'));
            var myElement = document.querySelector("#wrapper");
            myElement.style.background = "linear-gradient(to bottom, #172635, #360e18)";
          })
        } else {
          this.sunhasset = false
        }

        var location = zipcodes.lookup(this.zip);
      
      this.lat = location.latitude;
      this.long = location.longitude;
      this.city = location.city.toLowerCase();


        this.$http.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/bfef1e60cd8ad4b63a54b6074f7ce189/' + this.lat + ',' + this.long + ',' + this.tonight).then((response) => {

          this.weather = response.data.currently.summary.toLowerCase();
        })


      })

    },
    getNextFull() {
      this.$http.get('https://api.aerisapi.com/sunmoon/moonphases/chattanooga,tn&search?query=type:new;type:full&limit=2&client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        let nextRaw = (response.data.response[1].dateTimeISO);
        let newRawNew = (response.data.response[0].dateTimeISO);
        let today = this.$moment().format();
        this.next = this.$moment(nextRaw).diff(today, 'days');
        this.nextnew = this.$moment(newRawNew).diff(today, 'days');
        this.$Progress.finish()
      })
    },
    getLocation() {

      if ("geolocation" in navigator) {

        console.log('this is asking for geolocation')
        navigator.geolocation.getCurrentPosition(function (position) {

          var lat = position.coords.latitude
          var long = position.coords.longitude;

          axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&result_type=postal_code&key=AIzaSyCGtc_cTPObI3_EnTtNbBbqswJYnsH2MMA').then((responselocation) => {
            
            this.city = responselocation.data.results[0].address_components[1].long_name.toLowerCase();
            this.zip = responselocation.data.results[0].address_components[0].long_name;
          })
          axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/bfef1e60cd8ad4b63a54b6074f7ce189/' + lat + ',' + long + ',' + this.tonight).then((response) => {

            this.weather = response.data.currently.summary.toLowerCase();
          })
        }.bind(this));
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
    
    this.getWeatherDynamic();
    this.getPhase();
    this.getNextFull();
    
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

@media only screen and (min-width: 320px) and (max-width: 769px) and (orientation: landscape) {
  #app {
    height: 200vh;
  }
}
</style>

