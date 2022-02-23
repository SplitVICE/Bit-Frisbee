<template>
  <div>
    <div @click="ToggleInvisible" class="ctx-background"></div>
    <div class="ctx">
      <span v-html="Content"></span>
      <hr />
      <div class="btn-container">
        <span v-if="ButtonOne != ''" class="btnOne" v-html="ButtonOne" @click="ActionButtonOne"></span>
        <span v-if="ButtonTwo != ''" class="btnTwo" v-html="ButtonTwo" @click="ActionButtonTwo"></span>
      </div>
    </div>
  </div>
</template>

<script>
/*
About this component:
Shows a configurable modal.

Usage example:
<Modal
    Content="<div class='h1'>Delete uploads history</div>This action cannot be undone. Are you sure?"
    ButtonOne="Delete"
    ButtonTwo="Cancel"
    @ButtonOneClick="foo"
    @ButtonTwoClick="bar"
    @ToggleInvisible="Ink"
/>
*/

/*
Useful data:
Get current vertical scroll value:
https://stackoverflow.com/questions/4096863/how-to-get-and-set-the-current-web-page-scroll-position
document.documentElement.scrollTop

Set scroll to
window.scrollTo({ top: Number });
*/
export default {
  props: {
    Content: {
      type: String,
      default: "",
    },
    ButtonOne: {
      type: String,
      default: "",
    },
    ButtonTwo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      Visible: true,
    };
  },
  methods: {
    ActionButtonOne() {
      this.$emit("ButtonOneClick");
    },
    ActionButtonTwo() {
      this.$emit("ButtonTwoClick");
    },
    ToggleInvisible() {
      this.$emit("ToggleInvisible");
    },
  },
};
</script>

<style scoped>
.btnOne {
  background-color: black;
  color: white;
  padding: 0px 10px 2px 10px;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}
.btnTwo {
  background-color: rgb(189, 189, 189);
  color: rgb(0, 0, 0);
  padding: 0px 10px 2px 10px;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
}
.btnOne:hover {
  background-color: rgb(15, 15, 15);
}
.btnTwo:hover {
  background-color: rgb(214, 214, 214);
}
.btn-container {
  float: right;
}
.ctx {
  position: absolute;
  background-color: white;
  width: 700px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25px;
  padding: 30px;
}
.ctx-background {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.486);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
@media only screen and (max-width: 710px) {
  .ctx {
    transform: translate(-50%, 10%);
    top: 0%;
    width: 100%;
  }
}
</style>