<template>
  <div>
    <div class="up-page-margin"></div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
          <div class="left-container">
            <BitFrisbeePrincipalLogo subtitle="File storage" />
            <button
              class="btn btn-primary button-select-files"
              @click="select_files()"
            >
              Select files
            </button>

            <form
              :action="serverHost.api_upload"
              method="post"
              enctype="multipart/form-data"
            >
              <input
                id="input-upload"
                @change="input_upload_onChange()"
                class="input-upload"
                type="file"
                name="package"
                multiple
              />

              <div class="selected-files-container">
                <div v-if="file_amouth > 0">
                  <span v-if="file_amouth == 1">
                    {{ file_amouth }} selected file
                  </span>
                  <span v-else>{{ file_amouth }} selected files</span>
                </div>
                <div v-else>No selected files</div>
              </div>
              <button
                type="submit"
                class="btn button-upload-now"
                :disabled="upload_button_toggle_enable"
                @click="right_container_settings('uploading', true)"
              >
                Upload now
              </button>
            </form>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
          <div class="right-container" id="right_container">
            <span v-if="right_container_visible == true">
              <div v-if="show_uploading_message == false">
                <span class="right-container-title"> Host files for free </span>
                <span class="right-container-subtitle">
                  File size limit: unlimited
                </span>
              </div>
              <div v-else>
                <span class="right-container-title"> Uploading files... </span>
                <span class="right-container-subtitle">
                  please, wait till upload is completed...
                  <div class="spinner-border text-danger" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </span>
              </div>
            </span>
            <UploadMessage
              :host_uploaded_files="serverHost.api_uploaded_files_retrieve"
              @right_container_settings="right_container_settings"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UploadMessage from "@/components/UploadMessage.vue";
import BitFrisbeePrincipalLogo from "../components/BitFrisbeePrincipalLogo.vue";
export default {
  data: () => {
    return {
      file_amouth: 0,
      show_uploading_message: false,
      right_container_visible: true,
    };
  },
  components: {
    UploadMessage,
    BitFrisbeePrincipalLogo,
  },
  computed: {
    ...mapState(["serverHost"]),
    upload_button_toggle_enable() {
      return this.file_amouth > 0 ? false : true;
    },
  },
  methods: {
    select_files() {
      document.getElementById("input-upload").click();
    },
    input_upload_onChange() {
      this.file_amouth = document.getElementById("input-upload").files.length;
    },
    right_container_settings(showing, visible) {
      showing === "host files for free"
        ? (this.show_uploading_message = false)
        : (this.show_uploading_message = true);
      this.right_container_visible = visible;
    },
  },
};
</script>

<style scoped>
.up-page-margin {
  margin-top: 55px;
}
/* LEFT CONTAINER */
.left-container {
  width: 100%;
}
.left-container button,
.left-container div {
  display: flex;
  justify-content: center;
}
.button-select-files {
  width: 280px;
  height: 70px;
  font-size: 45px;
  border-radius: 20px;
  background-color: black;
  border-color: black;
  padding: 0;
  padding-bottom: 10px;
  margin-top: 40px;
  margin-right: auto;
  margin-left: auto;
}
.button-select-files:hover {
  background-color: rgb(44, 44, 44);
}
.selected-files-container {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
}
.button-upload-now {
  margin: auto;
  background-color: black;
  color: white;
  border-radius: 15px;
}
.input-upload {
  position: fixed;
  visibility: hidden;
  top: 0;
}
/* RIGHT CONTAINER */
.right-container {
  width: 100%;
  margin-top: 100px;
}
.right-container-title {
  display: flex;
  justify-content: center;
  font-size: 80px;
}
.right-container-subtitle {
  display: flex;
  justify-content: center;
  font-weight: 600;
  margin: auto;
}
/* SCREEN SIZE RESPONSIVENESS */
@media only screen and (max-width: 1399px) {
  .right-container-title {
    font-size: 70px;
  }
}
@media screen and (max-width: 1300px) {
  .right-container-title {
    font-size: 55px;
  }
  .right-container-subtitle {
    margin-left: auto;
  }
}
@media screen and (max-width: 1045px) {
  .right-container-title {
    font-size: 50px;
  }
}
@media only screen and (max-width: 767px) {
  .right-container {
    margin-top: 30px;
  }
}
@media only screen and (max-width: 491px) {
  .up-page-margin {
    margin-top: 10px;
  }
  .right-container,
  .left-container {
    margin-left: 0px;
  }
}
@media only screen and (max-width: 470px) {
  .button-select-files {
    width: 210px;
    height: 55px;
    font-size: 35px;
    padding-bottom: 10px;
    margin-top: 20px;
    margin-right: auto;
    margin-left: auto;
  }
}

@media only screen and (max-width: 402px) {
  .right-container-title {
    font-size: 40px;
  }
}
@media only screen and (max-width: 327px) {
  .right-container-title {
    font-size: 30px;
  }
  .right-container-subtitle {
    font-size: 14px;
  }
}
</style>