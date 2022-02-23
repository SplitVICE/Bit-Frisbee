<template>
  <span>
    <div v-if="files != ''">
      <div v-for="item in files" :key="item.id">
        <UploadedElement :file="item"/>
      </div>
    </div>
  </span>
</template>

<script>
/**
 * About this component.
 * Loads the definitions of uploaded files stored in localStorage and
 * passes the files array to the UploadedElement component using a v-for.
 */
import UploadedElement from "./UploadedElement.vue";
export default {
  components: {
    UploadedElement
  },
  data: () => {
    return {
      files: "",
    };
  },
  async created() {
    const files = JSON.parse(localStorage.getItem("uploads"));
    if (files == null) return;
    for (const file of files) {
      file.size_megabytes =
        Math.round((file.size / 1048576 + Number.EPSILON) * 100) / 100;
    }
    this.files = files.reverse();
  },
};
</script>

<style scoped>
</style>