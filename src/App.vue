<template>
  <div id="app">
  
    <section id="wrapper"
             class="hero is-primary">
      <vue-progress-bar></vue-progress-bar>
      <div id="moonwrapper">
        <h4 class="title is-4">star-gazing forecast</h4> {{ moon }}
      </div>
      <div style="padding: 2.5rem 0.5rem;"
           class="hero-body">
  
        <h2 class="title is-4 is-spaced">{{ phase }} :: {{ illum }}% full</h2>
        <p class="subtitle is-spaced">sunset in {{ sunset }} hours</p>
        <p class="subtitle">next full moon :: {{ next }} days</p>
      </div>
  
      <div id="weatherwrapper" class="is-spaced">
        <h1 class="title is-marginless"> {{ weather }} </h1>
        <h2 class="subtitle is-marginless">tonight's forecast for {{ city }} </h2>
  
        <b-field position="centered">
          <b-input class="label"
                   type="text"
                   v-model="zip"
                   placeholder="Enter Zip Code"></b-input>
          <p class="control">
            <button class="button is-dark"
                    v-on:click="getWeatherDynamic()">enter</button>
          </p>
        </b-field>
      </div>
    </section>
  </div>
</template>

<script>
var moonmoji = require('moonmoji')();

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
      sunset: ''
    }
  },

  methods: {
    
    getPhase() {
      this.$http.get('http://api.aerisapi.com/sunmoon/37408?client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        this.phase = response.data.response[0].moon.phase.name;
        this.illum = response.data.response[0].moon.phase.illum;
        this.city = response.data.response[0].place.name;
        this.moon = (moonmoji.emoji);

      })
    },
    getWeatherDynamic() {
      this.$Progress.start()
      let startOfNight = this.$moment().format('YYYY-MM-DD 20:00')
      let now = this.$moment(startOfNight).format()
      // now = this.$moment(now).format('YYYY-MM-DD HH:mm ')
      let tonight = this.$moment(now).add(12, 'h').format('YYYY-MM-DD HH:mm')
      this.zip = localStorage.getItem('zip'),
      
      this.$http.get('http://api.aerisapi.com/forecasts/' + this.zip + '?from=' + now + '&to=' + tonight + '&client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        this.weather = response.data.response[0].periods[0].weatherPrimary.toLowerCase();
      }),
        this.$http.get('http://api.aerisapi.com/sunmoon/' + this.zip + '?client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
          this.city = response.data.response[0].place.name;
          let sunsetRaw = (response.data.response[0].sun.setISO);
          let today = this.$moment().format();
          this.sunset = this.$moment(sunsetRaw).diff(today, 'hours');
        })
      this.$Progress.finish()
    },
    getNextFull() {
      this.$http.get('http://api.aerisapi.com/sunmoon/moonphases/chattanooga,tn&search?query=type:full&limit=1&client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        let nextRaw = (response.data.response[0].dateTimeISO);
        let today = this.$moment().format();
        this.next = this.$moment(nextRaw).diff(today, 'days');
        this.$Progress.finish()
      })
    }
  },
  mounted() {
    this.getPhase();
    this.getNextFull();
    this.getWeatherDynamic();

  },
  created() {
    this.$Progress.start()
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
  height: 100%;
}

body {
  position: absolute;
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f2f2f2;
  background: linear-gradient(to bottom, #2c3e50, #3498db);


  #wrapper {
    height: 100%;
    background: rgba(#000, 0.35);
    padding: 25px;
    padding-top: 5px;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  img {
    max-width: 250px;
    margin-top: 15px;
    width: 50%;
  }

  #moonwrapper {
    font-size: 120px;
    margin-top: 25px;
  }

  #weatherwrapper {
    border-radius: 4px;
    padding: 5px;
    margin-bottom: 15%;
  }
}
</style>

