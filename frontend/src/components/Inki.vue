<template>
  <div class="ctx" v-if="Options.show === true">
    <img src="https://i.imgur.com/b4OxGWA.png" alt="inki" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      Options: {
        min: 500,
        max: 505,
        show: false,
      },
    };
  },
  mounted() {
    const r = Math.round(Math.random(5) * 1000);
    if (r >= this.Options.min && r <= this.Options.max) {
      this.Options.show = true;
      setTimeout(() => {
        this.Options.show = false;
      }, 4000);
    }
  },
};
</script>

<style scoped>
.ctx {
  position: absolute;
  top: 90vh;
}
</style>