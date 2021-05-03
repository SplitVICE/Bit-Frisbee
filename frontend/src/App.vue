<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/files">Files</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
}
</script>

<style>
body{
  /* background:url('../assets/pattern.png'); */
  background-image: url('./assets/pattern.png');

}
#nav {
  padding: 10px 0px 10px 0px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  background-color: rgb(255, 255, 255, 0.3);
}
#nav a {
  font-weight: bold;
  color: #000000;
  text-decoration: none;
  margin-left: 10%;
  margin-right: 10%;
  font-weight: 400;
}
#nav a:hover {
  color: #dd5800;
}
#nav a.router-link-exact-active {
  color: #aaaaaa;
}
@media only screen and (max-width: 470px) {
  #nav{
    font-size: 20px;
  }
}
@media only screen and (max-width: 373px) {
  #nav{
    font-size: 18px;
    margin: 0px 0px 15px 0px;
  }
}
</style>
