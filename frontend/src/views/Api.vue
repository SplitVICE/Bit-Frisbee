<template>
  <div class="this container mt-5">
    <div class="h1">API</div>
    Bit Frisbee counts with 1 public API.
    <hr />
    <div class="h3">API to upload files</div>
    API location: <b>/api/upload-external/</b>
    <br />
    Requires:<br />
    <b>POST - multipart/form-data request type - files=(file data here)</b>
    <br>
    <a href="https://github.com/SplitVICE/Bit-Frisbee/blob/master/backend/src/public/test-room/api-upload-external.html" target="_blank">Example usage</a>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.this {
  font-size: 21px;
}
pre {
  color: rgb(255, 255, 255);
}
.code-style {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>