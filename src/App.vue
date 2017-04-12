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
        <h2 class="title is-4">{{ phase }} :: {{ illum }}% full</h2>
        <p>next full moon :: {{ next }} days</p>
      </div>
  
      <div id="weatherwrapper">
        <h1 class="title"> {{ weather }} </h1>
        <h2 class="subtitle">weather for {{ city }} </h2>
        <input style="margin:10px auto;"
               class="label"
               type="text"
               v-model="zip"
               placeholder="Enter Zip Code">
        <button class="button is-dark"
                v-on:click="getWeatherDynamic()">enter</button>
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
      weather: ''
    }
  },

  methods: {
    getPhase() {
      this.$http.get('http://api.aerisapi.com/sunmoon/37408?client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        this.phase = response.data.response[0].moon.phase.name;
        this.illum = response.data.response[0].moon.phase.illum;
        this.city = response.data.response[0].place.name;
        this.moon = (moonmoji.emoji);
        this.$Progress.finish()
      })
    },
    getWeatherDynamic() {
      this.$http.get('http://api.aerisapi.com/forecasts/' + this.zip + '?from=today&to=today&client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        this.weather = response.data.response[0].periods[0].weatherPrimary.toLowerCase();
      }),
        this.$http.get('http://api.aerisapi.com/sunmoon/' + this.zip + '?client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
          this.city = response.data.response[0].place.name;

        })
    },
    getNextFull() {
      this.$http.get('http://api.aerisapi.com/sunmoon/moonphases/chattanooga,tn&search?query=type:full&limit=1&client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        let nextRaw = (response.data.response[0].dateTimeISO);
        let today = this.$moment().format();
        this.next = this.$moment(nextRaw).diff(today, 'days');
      })
    }
  },
  mounted() {
    this.getPhase();
    this.getNextFull();
    this.getWeatherDynamic();
    
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f2f2f2;
  background: linear-gradient(to bottom, #2c3e50, #3498db);


  #wrapper {
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
  }
}
</style>

