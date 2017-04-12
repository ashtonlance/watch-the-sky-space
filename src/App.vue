<template>
  <div id="app">
    <div id="wrapper">
    <span id="moonwrapper"> {{ moon }} </span>
    <h2>{{ phase }} :: {{ illum }}% full</h2>
    <p>next full moon :: {{ next }} days</p>
    <h3> {{ city }} </h3>
    </div>
  </div>
</template>

<script>
var moonmoji = require('moonmoji')();
export default {
  name: 'app',
  data () {
    return {
      phase: '',
      illum: '',
      city: '',
      next: '',
      moon: ''
    }
  },
  mounted() {
    this.getPhase();
    this.getNextFull();
  },
   methods: {
      getPhase() {
        this.$http.get('http://api.aerisapi.com/sunmoon/chattanooga,tn?client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
          this.phase = response.data.response[0].moon.phase.name;
          this.illum = response.data.response[0].moon.phase.illum;
          this.city = response.data.response[0].place.name;
          this.moon = (moonmoji.emoji);
          
        })
      },
      getNextFull() {
        this.$http.get('http://api.aerisapi.com/sunmoon/moonphases/search?query=type:full&limit=1&client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
          let nextRaw = (response.data.response[0].dateTimeISO);
          let today = this.$moment().format();
          this.next = this.$moment(nextRaw).diff(today, 'days');
        })
      }
    }
}
</script>

<style lang="scss">
body {
  background: linear-gradient(to top, #000000, #53346d);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f2f2f2;
  border-radius: 4px;  
}
#wrapper {
  background: rgba(black, 0.35);
  padding: 25px;
}

h1, h2 {
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
</style>
