<template>
  <div id="about">
    <vue-progress-bar></vue-progress-bar>
    <section id="wrapper2">
        
        <div class="card">
  <header class="card-header">
    <p class="card-header-title">
      About  <i> Watch the Sky</i>
    </p>
    <a class="card-header-icon">
      <span class="icon">
        <i class="fa fa-angle-down"></i>
      </span>
    </a>
  </header>
  <div class="card-content">
    <div class="content">
      powered by <a href="https://darksky.net/poweredby/">dark sky</a>
      <br>
      <!--<small>11:09 PM - 1 Jan 2016</small>-->
    </div>
  </div>
  <footer class="card-footer">
    <a class="card-footer-item" href="mailto:ashton@ashtonlance.com">contact the dev</a>
    <a class="card-footer-item">Delete</a>
  </footer>
</div>
    
  
  <router-link to="/">home</router-link>
          <router-view></router-view>
          </section>
          </div>
</template>

<script>
// var moonmoji = require('moonmoji')();
// var zipcodes = require('zipcodes');
// import axios from 'axios';

// export default {
//   name: 'app',
//   data() {
//     return {
//       phase: '',
//       illum: '',
//       city: '',
//       next: '',
//       moon: '',
//       zip: '37408',
//       weather: '',
//       sunset: '',
//       lat: '',
//       long: '',
//       sunhasset: false,
//       nextnew: ''
//     }
//   },

//   methods: {

//     getPhase() {
//       this.$http.get('https://api.aerisapi.com/sunmoon/37408?client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
//         this.phase = response.data.response[0].moon.phase.name;
//         this.illum = response.data.response[0].moon.phase.illum;
//         this.moon = (moonmoji.emoji);

//       })
//     },
//     getWeatherDynamic() {
//       let startOfNight = this.$moment().format('YYYY-MM-DD') + 'T22:00:00-04:00'
//       let now = this.$moment(startOfNight).format()
//       this.tonight = this.$moment(now).add(4, 'h').format('YYYY-MM-DD hh:mm:ss')
//       this.tonight = this.$moment(this.tonight).format()
      
//       this.$http.get('https://api.aerisapi.com/sunmoon/' + this.zip + '?client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
//         let sunsetRaw = response.data.response[0].sun.setISO;
//         let today = this.$moment().format();
//         this.sunset = this.$moment(sunsetRaw).diff(today, 'hours');
        
//         if (this.sunset <= 0) {
//           this.$http.get('https://api.aerisapi.com/sunmoon/' + this.zip + '?from=tomorrow&to=tomorrow&client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
//             this.sunhasset = true
//             let sunRiseRaw = response.data.response[0].sun.riseISO
//             let today = this.$moment().format();
//             this.sunrise = this.$moment(sunRiseRaw).diff(today, 'hours');
//             var myElement = document.querySelector("#wrapper");
//             myElement.style.background = "linear-gradient(to bottom, #172635, #360e18)";
//           })
//         } else {
//           this.sunhasset = false
//         }

//         var location = zipcodes.lookup(this.zip);
      
//       this.lat = location.latitude;
//       this.long = location.longitude;
//       this.city = location.city.toLowerCase();


//         this.$http.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/bfef1e60cd8ad4b63a54b6074f7ce189/' + this.lat + ',' + this.long + ',' + this.tonight).then((response) => {

//           this.weather = response.data.currently.summary.toLowerCase();
//         })


//       })
//       this.getNextFull()

//     },
//     getNextFull() {
//       this.$http.get('https://api.aerisapi.com/sunmoon/moonphases/chattanooga,tn&search?query=type:new;type:full&limit=2&client_id=jYskRupqMPlhogr2iY4i3&client_secret=pvhD0Ydih22gZXcIBDbpMzPlXdzVziJ0pyeRav3Y').then((response) => {
//         let nextRaw = (response.data.response[1].dateTimeISO);
//         let newRawNew = (response.data.response[0].dateTimeISO);
//         let today = this.$moment().format();
//         this.next = this.$moment(nextRaw).diff(today, 'days');
//         this.nextnew = this.$moment(newRawNew).diff(today, 'days');
//         this.$Progress.finish()
//       })
//     },
//     getLocation() {

//       if ("geolocation" in navigator) {

//         console.log('this is asking for geolocation')
//         navigator.geolocation.getCurrentPosition(function (position) {

//           var lat = position.coords.latitude
//           var long = position.coords.longitude;

//           axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&result_type=postal_code&key=AIzaSyCGtc_cTPObI3_EnTtNbBbqswJYnsH2MMA').then((responselocation) => {
            
//             this.city = responselocation.data.results[0].address_components[1].long_name.toLowerCase();
//             this.zip = responselocation.data.results[0].address_components[0].long_name;
//           })
//           axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/bfef1e60cd8ad4b63a54b6074f7ce189/' + lat + ',' + long + ',' + this.tonight).then((response) => {

//             this.weather = response.data.currently.summary.toLowerCase();
//           })
//         }.bind(this));
//       } else {
//         this.$toast.open({
//           message: `Something went wrong and we couldn't get your location`,
//           position: 'bottom',
//           type: 'is-danger'
//         })
//       }
//       this.getNextFull()
//     }
//   },
//   created() {
//     this.$Progress.start()
//     this.getWeatherDynamic();
//     this.getPhase();
//     this.getNextFull();
//     if (localStorage.getItem('zip') === null) {        
//         this.zip = '37408'
//       } else if (localStorage.getItem('zip') != null) {
//         this.zip = localStorage.getItem('zip')
//       }
//   },
//   watch: {
//     zip() {
//       localStorage.setItem('zip', this.zip)
//     }
//   }
// }
</script>

<style lang="scss">
html {
  -webkit-text-size-adjust: 100%;
}

#about {
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

#wrapper2 {
  height: 100%; // background: rgba(#000, 0.35);
  background: linear-gradient(to bottom, #2c3e50, #3498db);
  padding: 25px;
  padding-top: 25px;
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

@media only screen and (min-width: 320px) and (max-width: 769px) and (orientation: landscape) {
  #app {
    height: 200vh;
  }
}
</style>

