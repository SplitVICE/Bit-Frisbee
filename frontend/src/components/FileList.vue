<template>
  <div>
    <div v-if="file_list == `files readability disabled`">
      <div class="alert alert-warning" role="alert">
        Files visibility disabled
      </div>
    </div>

    <div v-else-if="file_list.length == 0">
      <div class="alert alert-warning" role="alert">
        No files stored
      </div>
    </div>

    <div v-else>
      <div>Serving {{ file_list.length }} files</div>
      <div v-for="item in file_list" :key="item.id" class="item">
        <a :href="item.file_path" target="_blank">{{ item.file_name }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    api_host: String,
  },
  data: function () {
    return {
      file_list: "",
    };
  },
  async created() {
    const request = await fetch(this.$props.api_host),
      response = await request.json();
    if (
      response.status == "failed" &&
      response.description == "files readability disabled"
    ) {
      this.file_list = "files readability disabled";
      return;
    }
    this.file_list = response.reverse();
  },
};
</script>

<style scoped>
.item {
  margin-top: 4px;
}
</style>