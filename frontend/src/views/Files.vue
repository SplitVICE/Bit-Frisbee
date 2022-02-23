<template>
  <div class="this container">
    <div class="margin-general"></div>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-5">
        <BitFrisbeePrincipalLogo />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-7">
        <div class="title-files-stored">Files stored</div>
        <FileList :api_host="serverHost.api_files" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FileList from "@/components/FileList.vue";
import BitFrisbeePrincipalLogo from "../components/BitFrisbeePrincipalLogo.vue";
export default {
  computed: {
    ...mapState(["serverHost"]),
  },
  components: {
    FileList,
    BitFrisbeePrincipalLogo,
  },
};
</script>

<style scoped>
.this {
  text-align: center;
}
.margin-general{
  margin-top: 60px;
}
.title-files-stored{
  font-size: 80px;
}
@media screen and (max-width: 424px){
.title-files-stored{
  font-size: 40px;
}
.margin-general{
  margin-top: 5px;
}
.margin-files{
  margin-top: 0px;
}
}
</style>