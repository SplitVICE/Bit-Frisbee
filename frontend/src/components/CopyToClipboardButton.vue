<template>
  <div class="btn" v-on:click="copy_text_to_clipboard(ToClipboard)">
    {{ button_text }}
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      button_text: "Copy link",
    };
  },
  props: {
    ToClipboard: String,
    ButtonText: String,
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
        this.SetButtonText();
      }, 1000);
    },
    SetButtonText() {
      if (this.ButtonText == "") return;
      this.button_text = this.ButtonText;
    },
  },
  mounted() {
    this.SetButtonText();
  },
};
</script>

<style scoped>
.btn {
  background-color: black;
  color: white;
  width: 100%;
  margin-top: 5px;
  word-wrap: break-word;
}
.btn:hover {
  background-color: rgb(90, 41, 0);
}
</style>