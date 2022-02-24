<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/files">Files</router-link>
      <router-link to="/more">More</router-link>
    </div>
    <router-view />
    <Inki />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import Inki from "./components/Inki.vue";
import fileSize from "filesize";
export default {
  computed: { ...mapState(["serverHost"]) },
  methods: { ...mapActions(["UpdateFileSizeLimit"]) },
  async created() {
    const request = await fetch(`${this.serverHost}/api/file-size-limit`),
      response = await request.json();
    this.UpdateFileSizeLimit({
      bytes: response.bytes,
      readable: fileSize(response.bytes, { base: 2 }),
    });
  },
  components: { Inki },
};
</script>

<style>
body {
  /* background:url('../assets/pattern.png'); */
  background-image: url("./assets/pattern.png");
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
  #nav {
    font-size: 20px;
  }
}
@media only screen and (max-width: 373px) {
  #nav {
    font-size: 18px;
    margin: 0px 0px 15px 0px;
  }
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(255, 110, 14);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(255, 110, 14);
}
</style>
