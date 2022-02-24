<template>
  <div>
    <div v-if="file_list == `loading`">
      <div class="spinner-border" role="status">
        <span class="visually-hidden"></span>
      </div>
    </div>

    <div v-else-if="file_list == `files readability disabled`">
      Files visibility disabled
    </div>

    <div v-else-if="file_list.length == 0">No files stored</div>

    <div v-else>
      <div>Serving {{ file_list.length }} files</div>
      <div v-for="item in file_list" :key="item.id" class="item">
        <UploadedElement :file="item" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * About this component.
 * Loads the definitions of uploaded files stored in the server and
 * passes the files array to the UploadedElement component using a v-for.
 */
import { mapState } from "vuex";
import UploadedElement from "./UploadedElement.vue";
export default {
  computed: {
    ...mapState(["serverHost"]),
  },
  components: {
    UploadedElement,
  },
  data: function () {
    return {
      file_list: "loading",
    };
  },
  async created() {
    const request = await fetch(`${this.serverHost}/api/files`),
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
</style>