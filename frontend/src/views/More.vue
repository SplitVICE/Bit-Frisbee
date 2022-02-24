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
            class="split-vice-logo"
            src="../assets/jv-icon.png"
            alt="SPLIT VICE logo"
          />
        </div>
      </div>
    </div>

    <div class="text">Application made by SPLIT VICE</div>

    <div class="links">
      <a href="https://split-vice.com" target="_blank">VICE's website</a>
      <br />
      <a
        href="https://split-vice.com/technology/web-software/bit-frisbee/"
        target="_blank"
        >Bit Frisbee official website</a
      >
    </div>

    <div class="mt-4">
      <!-- <a class="mt-3" href="/api">API</a>
      <br /> -->
      <a @click="ToggleShowModal" href="javascript:void(0)"
        >Delete my uploads history</a
      >
    </div>

    <div class="footer">
      © MIT |
      <a href="https://github.com/SplitVICE/Bit-Frisbee" target="_blank"
        >Github</a
      >
      | {{ application_version }}
    </div>
    <span v-if="show_modal == true">
      <Modal
        Content="<div class='h1'>Delete uploads history</div>This action cannot be undone. Are you sure?"
        ButtonOne="Delete history"
        ButtonTwo="Cancel"
        @ButtonOneClick="delete_uploads_history"
        @ButtonTwoClick="ToggleShowModal"
        @ToggleInvisible="ToggleShowModal"
      />
    </span>
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
.split-vice-logo {
  width: 140px;
}
.margin-top {
  margin-top: 50px;
}
.footer {
  margin-top: 30px;
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
import Modal from "../components/Modal.vue";
export default {
  data() {
    return {
      show_modal: false,
    };
  },
  components: {
    BitFrisbeePrincipalLogo,
    Modal,
  },
  computed: {
    ...mapState(["application_version"]),
  },
  methods: {
    ToggleShowModal() {
      this.show_modal = !this.show_modal;
    },
    delete_uploads_history() {
      localStorage.clear("uploads");
      this.show_modal = false;
    },
  },
};
</script>