<template>
  <div id="app">
    <img src="./assets/Earths_Moon.svg">
    <h2>{{ phase }} :: {{ illum }}% full</h2>
    <p>next full moon :: {{ next }} days</p>
    <h3> {{ city }} </h3>

  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      phase: '',
      illum: '',
      city: '',
      next: ''
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f2f2f2;
  background: rgba(black, 0.35);
  border-radius: 4px;
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
</style>
