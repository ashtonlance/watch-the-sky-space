<template>
  <div id="app">
    <section id="wrapper" class="hero is-primary">
      <div id="moonwrapper" > {{ moon }} </div>
      <div style="padding: 2.5rem 0.5rem;" class="hero-body">
      <h2 class="title is-4">{{ phase }} :: {{ illum }}% full</h2>
      <p>next full moon :: {{ next }} days</p>
      </div>
  
      <div id="weatherwrapper">
        <h1 class="title"> {{ temp }} </h1>
        <h2 class="subtitle">current temperature in {{ city }} </h2>
        <input style="margin:10px auto;" class="label" type="text" v-model="zip"
               placeholder="Enter Zip Code">
        <button class="button is-dark" v-on:click="getWeatherDynamic()">Enter</button>
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
      temp: ''
    }
  },

  methods: {
    getPhase() {
      this.$http.get('http://api.aerisapi.com/sunmoon/37408?client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        this.phase = response.data.response[0].moon.phase.name;
        this.illum = response.data.response[0].moon.phase.illum;
        this.moon = (moonmoji.emoji);

      })
    },
    getWeatherDynamic() {
      this.$http.get('http://api.aerisapi.com/observations/' + this.zip + '?client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
        console.log(response.data)
        this.temp = response.data.response.ob.tempF;
        this.city = response.data.response.place.name;


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
}
</script>

<style lang="scss">


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f2f2f2;
  border-radius: 4px;
  background: linear-gradient(to top, #8e9eab, #eef2f3);


#wrapper {
  background: rgba(#000, 0.35);
  padding: 25px;
  
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
  background: rgba(#000, 0.35);
  border-radius: 4px;
  padding: 5px;
}
}
</style>

