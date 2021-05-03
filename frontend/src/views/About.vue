<template>
  <div class="this">
    <div class="container">
      <div class="row">
        <div class="margin-top"></div>
        <div class="col-12 col-sm-12 col-md-7 col-lg-6">
          <BitFrisbeePrincipalLogo />
        </div>

        <div class="col-12 col-sm-12 col-md-5 col-lg-6">
          <img
            class="just-vice-logo"
            src="../assets/jv-icon.png"
            alt="JUST VICE logo"
          />
        </div>
      </div>
    </div>

    <div class="text">Application made by JUST VICE</div>

    <div class="links">
      <a href="http://just-vice.com" target="_blank">VICE's website</a>
      <br />
      <a
        href="http://just-vice.com/technology/web-software/bit-frisbee/"
        target="_blank"
        >Bit Frisbee official website</a
      >
    </div>

    <div class="mt-5"></div>
    © MIT |
    <a href="https://github.com/JUSTVICE/Bit-Frisbee" target="_blank">Github</a>
    | {{ application_version }}
  </div>
</template>


<style scoped>
.this {
  text-align: center;
}
.text {
  font-weight: 1000;
  color: rgb(224, 28, 77);
  margin-bottom: 10px;
}
a {
  color: rgb(80, 49, 223);
  font-weight: 700;
}
.just-vice-logo {
  width: 140px;
}
.margin-top {
  margin-top: 50px;
}
@media only screen and (max-width: 373px) {
  .margin-top {
    margin-top: 5px;
  }
}
</style>

<script>
import { mapState } from "vuex";
import BitFrisbeePrincipalLogo from "../components/BitFrisbeePrincipalLogo";
export default {
  components: {
    BitFrisbeePrincipalLogo,
  },
  computed: {
    ...mapState(["application_version"]),
  },
};
</script>