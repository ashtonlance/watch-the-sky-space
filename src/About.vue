<template>
  <div id="about">
    <vue-progress-bar></vue-progress-bar>
    <section id="wrapper2">
  
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
            this app shows you the sky conditions tonight. the brighter the moon, the less stars you'll be able to see
            <br>
            <small><b>powered by <a href="https://darksky.net/poweredby/">dark sky</a></b></small>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item"
             href="mailto:ashton@ashtonlance.com">contact the dev</a>
          <!--<a class="card-footer-item">Delete</a>-->
          <router-link to="/"
                       class="card-footer-item">home</router-link>
        </footer>
      </div>
  
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </section>
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
  font-size: 75px;
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
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}

@media only screen and (min-width: 320px) and (max-width: 769px) and (orientation: landscape) {
  #app {
    height: 200vh;
  }
}
</style>

