<template>
  <span>
    <div class="upload-element">
      <div class="file-info">
        <div
          @click="LoadPreview(file)"
          v-if="file.mime_type && file.mime_type.includes('image')"
          class="img"
        >
          <img :src="file.file_path" :alt="file.original_name" width="28px" />
        </div>
        <div v-if="file.original_name">{{ file.original_name }}</div>
        <a :href="file.file_path" target="_blank">
          <div v-if="file.file_name">{{ file.file_name }}</div>
        </a>
        <div v-if="file.size != undefined">
          {{ RenderReadableSize() }}
        </div>
      </div>
      <CopyToClipboardButton
        :ToClipboard="file.file_path"
        :ButtonText="file.file_path"
      />
    </div>
    <span v-if="modalOptions.show == true">
      <Modal
        :Content="modalOptions.content"
        ButtonTwo="Close"
        @ButtonTwoClick="CloseModal()"
        @ToggleInvisible="CloseModal()"
      />
    </span>
  </span>
</template>

<script>
/**
 * About this component.
 * Renders a box with information of the uploaded file.
 */
import CopyToClipboardButton from "./CopyToClipboardButton.vue";
import Modal from "./Modal";
const filesize = require('filesize');
export default {
  methods: {
    LoadPreview(file) {
      if (file.mime_type.includes("image")) {
        this.modalOptions.content = `<img src="${file.file_path}" alt="${file.original_name}" class="img-fluid" width="100px"/>`;
        this.modalOptions.show = true;
        window.scrollTo({ top: 0 });
        this.modalOptions.oldTopValue = document.documentElement.scrollTop;
      }
    },
    CloseModal() {
      this.modalOptions.show = false;
      window.scrollTo({ top: this.modalOptions.oldTopValue });
    },
    RenderReadableSize() {
      if (this.file.size == undefined) return;
      return filesize(this.file.size, { base: 2 });
    },
  },
  components: {
    CopyToClipboardButton,
    Modal,
  },
  props: {
    file: {
      type: Object,
      default: null,
    },
  },
  data: () => {
    return {
      modalOptions: {
        content: "29.191459, -91.017990",
        show: false,
        oldTopValue: 0, // To scroll to the position before the modal was shown.
      },
    };
  },
};
</script>

<style scoped>
.img {
  cursor: pointer;
  display: inline-block;
}
.upload-element {
  background-color: rgba(255, 255, 255, 0.432);
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
}
.file-info {
  font-size: 17px;
  color: rgb(44, 44, 44);
  word-wrap: break-word;
}
a {
  color: rgb(156, 89, 0);
}
a:hover {
  color: rgb(255, 145, 0);
}
@media only screen and (max-width: 426px) {
  .title {
    font-size: calc(100% + 3.2vw);
  }
}
</style>