<template>
  <button class="btn" v-on:click="copy_text_to_clipboard(to_clipboard)">
    {{ button_text }}
  </button>
</template>

<script>
export default {
  data: () => {
    return {
      button_text: "Copy link"
    };
  },
  props: {
    to_clipboard: String,
  },
  methods: {
    copy_text_to_clipboard(text_to_copy) {
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = text_to_copy;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      this.button_text = "Copied!";
      setTimeout(() => {
        this.button_text = "Copy link";
      }, 2000);
    },
  },
};
</script>

<style scoped>
.btn {
  background-color: black;
  color: white;
  width: 100%;
  margin-top: 15px;
}
.btn:hover{
  background-color: rgb(46, 46, 46);
}
</style>