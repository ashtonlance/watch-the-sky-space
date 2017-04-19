<template>
  <div id="about">
    <vue-progress-bar></vue-progress-bar>
    <div id="wrapper2">
  
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            <i>about watch the sky</i>
          </p>
          <a class="card-header-icon">
            <span class="icon">
          <i class="fa fa-angle-down"></i>
        </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
            this app shows you the sky conditions tonight.
            <br>
            the brighter the moon, the less stars you'll be able to see.
            <br>
            <small><b>powered by <a href="https://darksky.net/poweredby/">dark sky</a></b></small>
            <br>
            <small><b><i>created by ashton lance</i></b></small>
            <a href="http://ashtonlance.com" target="_blank">ashtonlance.com</a>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item"
             href="mailto:ashton@ashtonlance.com">contact the dev</a>
          <router-link to="/"
                       class="card-footer-item">close</router-link>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>

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
  background: rgba(#000, 0.85);
  background-repeat: no-repeat;
  background-attachment: fixed;
  top: 0;
  left: 0;
  z-index: 500;
}

#wrapper2 {
  height: 100%; 
  // background: rgba(#000, 0.35);
  // background: linear-gradient(to bottom, #2c3e50, #3498db);
  padding: 25px;
  padding-top: 25px;
}



.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
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
  #about {
    height: 200vh;
  }
}
</style>

