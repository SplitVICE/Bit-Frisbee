<template>
  <div class="this container mt-5">
    <div class="h1">API</div>
    Bit Frisbee currently counts with 1 developers API to consume.
    <hr />
    <div class="h3">API to upload files</div>
    API location: <b>/api/upload-external/</b>
    <br />
    Requires:<br />
    <b>POST - multipart/form-data request type - files=(file data here)</b
    ><br />
    See Postman example below to see API response to successful file upload.
    <div class="h5">Axios example:</div>
    <div class="code-style">
      <pre>
        let files = undefined;
        input_files.addEventListener('change', e => {
            files = (() => {
                const _ = []
                for (let i = 0; i &lt; e.target.files.length; i++) {
                    _.push(e.target.files[i]);
                }
                return _
            })()
        })

        const formData = new FormData();
        files.forEach(file => { formData.append("files", file); });

        const res = await axios.post('/api/upload-external/', formData,
          { headers: { 'Content-Type': 'multipart/form-data' } });
      </pre>
    </div>
    <div class="h5">Working Postman example:</div>
    <img src="../assets/postman-demo.png" alt="postman api demo" />
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