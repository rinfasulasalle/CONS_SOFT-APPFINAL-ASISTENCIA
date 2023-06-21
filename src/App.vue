<template>
  <HelloWorld msg="APP ASISTENCIA ULS"/>
  <CmpRouter/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import CmpRouter from './components/CmpRouter.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    CmpRouter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 10px;
}
</style>
