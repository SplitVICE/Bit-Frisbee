<template>
  <div>
    <div class="up-page-margin"></div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
          <div class="left-container">
            <BitFrisbeePrincipalLogo />
            <button
              class="btn btn-primary button-select-files"
              @click="select_files()"
            >
              Select files
            </button>
            <input
              id="input-select-files"
              @change="input_select_files_onChange()"
              class="input-select-files"
              type="file"
              name="files"
              multiple
            />
            <!-- REACTIVE TEXT THAT CHANGES WHEN FILES ARE SELECTED -->
            <div class="selected-files-container">
              <div v-if="file_amount > 0">
                <span v-if="file_amount == 1">
                  {{ file_amount }} selected file
                </span>
                <span v-else>{{ file_amount }} selected files</span>
              </div>
              <div v-else>No selected files</div>
            </div>
            <!-- UPLOAD NOW BUTTON -->
            <button
              type="submit"
              class="btn button-upload-now"
              :disabled="upload_button_toggle_enable"
              @click="upload_files()"
            >
              Upload now
            </button>
          </div>
        </div>
        <!-- ////////////////////////////////////////// -->
        <!-- RIGHT CONTAINER -->
        <!-- ////////////////////////////////////////// -->
        <!-- Normal home screen -->
        <!-- ////////////////////////////////////////// -->
        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
          <div class="right-container" id="right_container">
            <div
              :class="right_message__host_files_show_hide"
              class="hostFilesForFree-title"
            >
              <span class="right-container-title"> Host files for free </span>
              <span class="right-container-subtitle">
                File size limit: {{ fileSizeLimit.readable }}
              </span>
            </div>
            <!-- Uploading files notice screen -->
            <!-- ////////////////////////////////////////// -->
            <div :class="right_message__uploading_files_show_hide">
              <span class="right-container-title"> Uploading files... </span>
              <span class="right-container-subtitle">
                please, wait till upload is completed...
              </span>
              <progress
                class="progress-bar-upload"
                id="progress_bar"
                value="0"
                max="100"
              ></progress>
              <div class="progress-number-upload" id="progress_number_upload">
                0%
              </div>
            </div>
            <!-- Uploaded files list -->
            <!-- ////////////////////////////////////////// -->
            <span v-if="show_uploaded_files_list == true">
              <div class="title">Uploaded files</div>
              <UploadedFiles />
            </span>
          </div>
        </div>
      </div>
    </div>
    <span v-if="modalOptions.Show === true">
      <Modal
        :Content="modalOptions.Content"
        ButtonOne="Ok"
        @ButtonOneClick="modalOptions.Show = false"
        @ToggleInvisible="modalOptions.Show = false"
      />
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UploadedFiles from "@/components/UploadedFiles";
import UploadedElement from "@/components/UploadedElement";
import BitFrisbeePrincipalLogo from "../components/BitFrisbeePrincipalLogo";
import Modal from "../components/Modal";
import axios from "axios";
export default {
  data: () => {
    return {
      file_amount: 0, // Used to show how many files are selected.
      files: undefined, // Selected files container.
      show_uploading_message: false, // Shows an uploading message and progress bar.
      show_uploaded_files_list: false, // If there are uploaded files, the list of these will be displayed if true.
      modalOptions: {
        Content: "",
        Show: false,
      },
    };
  },
  components: {
    UploadedFiles,
    UploadedElement,
    BitFrisbeePrincipalLogo,
    Modal,
  },
  computed: {
    ...mapState(["serverHost", "fileSizeLimit"]),
    upload_button_toggle_enable() {
      return this.file_amount > 0 ? false : true;
    },
    right_message__host_files_show_hide() {
      if (this.show_uploaded_files_list == true) {
        return "invisible";
      }
      return this.show_uploading_message == true ? "invisible" : "";
    },
    right_message__uploading_files_show_hide() {
      if (this.show_uploaded_files_list == true) {
        return "invisible";
      }
      return this.show_uploading_message == true ? "" : "invisible";
    },
  },
  methods: {
    // Opens a file system window to select the files to upload.
    select_files() {
      document.getElementById("input-select-files").click();
    },
    // Event On Change when files have been selected.
    input_select_files_onChange() {
      // Retrieve files from input type file.
      let { files: _files } = document.getElementById("input-select-files");
      if (_files.length === 0) return;

      _files = [..._files]; // Converts Objeto onto Array.

      const _filesBiggerThanLimit = [];

      for (let i = 0; i < _files.length; i++) {
        if (_files[i].size > this.fileSizeLimit.bytes) {
          _filesBiggerThanLimit.push(_files[i]);
          _files.splice(i, 1);
        }
      }

      this.file_amount = _files.length;
      this.files = _files;

      if (_filesBiggerThanLimit.length > 0) {
        this.modalOptions.Content =
          /* html */
          `<div class="h1">File size limit exceeded</div>
        The following files exceed the file size limit and were removed from the list of
        selected files:<br><br>`;
        for (const file of _filesBiggerThanLimit) {
          this.modalOptions.Content += `${file.name}<br>`;
        }
        this.modalOptions.Show = true;
        document.documentElement.scrollTop;
      }
    },
    // Uploads the files to the server side.
    async upload_files() {
      this.show_uploaded_files_list = false;
      this.show_uploading_message = true;

      const formData = new FormData();
      for (const file of this.files) {
        formData.append("files", file);
      }

      const progress_bar = document.getElementById("progress_bar");
      const progress_number = document.getElementById("progress_number_upload");

      const res = await axios.post(`${this.serverHost}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // DOM API function.
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          progress_bar.value = percentCompleted;
          progress_number.innerHTML = percentCompleted + "%";
        },
      });

      if (
        res.data.status == "success" &&
        res.data.description == "files uploaded"
      ) {

        this.file_amount = 0;

        this.show_uploaded_files_list = true;

        let uploads = [];

        if (localStorage.getItem("uploads") != null) {
          uploads = JSON.parse(localStorage.getItem("uploads"));
        }

        for (const file of res.data.files) {
          uploads.push(file);
        }

        localStorage.setItem("uploads", JSON.stringify(uploads));
      }
    },
  },
  mounted() {
    if (
      localStorage.getItem("uploads") != null &&
      JSON.parse(localStorage.getItem("uploads")).length > 0
    )
      this.show_uploaded_files_list = true;
  },
};
</script>

<style scoped>
.invisible {
  position: absolute;
  top: 0;
  visibility: hidden;
}
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
.input-select-files {
  position: fixed;
  visibility: hidden;
  top: 0;
}
/* RIGHT CONTAINER */
.progress-bar-upload {
  width: 100%;
}
.progress-number-upload {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
}
.right-container {
  width: 100%;
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
.title {
  text-align: center;
  font-size: 60px;
}
.hostFilesForFree-title {
  margin-top: 100px;
}
@media only screen and (max-width: 426px) {
  .title {
    font-size: calc(100% + 3.2vw);
  }
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
@media screen and (max-width: 1045px) {
  .right-container-title {
    font-size: 50px;
  }
}
@media only screen and (max-width: 991px) {
  .hostFilesForFree-title {
    margin-top: 30px;
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