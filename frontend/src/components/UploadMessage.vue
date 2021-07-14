<template>
  <div class="container mt-5">
    <div v-if="files != ''">
      <div class="title">Your uploaded files</div>
      <div v-for="item in files" :key="item.id" class="upload-list">
        <div class="item">
          <span class="file-name">{{ item.original_name }}</span
          ><span class="file-link">
            <br />
            <a :href="item.file_path" target="_blank">
              {{ item.file_path }}
            </a>
          </span>
          <CopyToClipboardButton :to_clipboard="item.file_path" />
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import CopyToClipboardButton from "./CopyToClipboardButton.vue";
export default {
  components: {
    CopyToClipboardButton,
  },
  data: () => {
    return {
      files: "",
    };
  },
  props: {
    host_uploaded_files: String,
  },
  async mounted() {
    const dev_example_view = false;

    if (!dev_example_view) {
      const files = JSON.parse(localStorage.getItem("uploads"));
      if (files == null) return;

      this.files = files.reverse();
    } else {
      // Shows this component on home screen for dev purposes
      this.files = [
        {
          file_name: "21JzXoHAET4u_valheim_qwpJNUpF2k.png",
          file_path:
            "http://localhost:4000/f/cvwwwne5cko6t9ilt-asjdnashdbasdhasvbdasvhdgvashdvashgd.png",
          original_name:
            "Colkinab0ko6t8inki-asdbashbdqbdqvqwdjqwjhdbqhwd jhqwbd qwhdbjhqwbasdasd.png",
        },
      ];
      this.$emit("right_container_settings");
    }
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 60px;
}
.file-name {
  font-size: 13px;
  color: rgb(114, 114, 114);
  display: flex;
  justify-content: center;
}
.file-link {
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 20px;
}
.file-link a {
  overflow: hidden;
}
/* SCREEN RESPONSIVE */
@media only screen and (max-width: 1399px) {
  .title {
    font-size: 50px;
  }
}
@media only screen and (max-width: 1199px) {
  .title {
    font-size: 40px;
  }
  .file-link {
    font-size: 17px;
  }
}
@media only screen and (max-width: 409px) {
  .title {
    font-size: 30px;
  }
  .file-link {
    font-size: 15px;
  }
}
@media only screen and (max-width: 335px) {
  .file-link {
    font-size: 13px;
  }
}
@media only screen and (max-width: 325px) {
  .title {
    font-size: 20px;
  }
}
@media only screen and (max-width: 275px) {
  .file-link {
    font-size: 12px;
  }
}
</style>