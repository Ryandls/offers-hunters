<template>
  <b-container class="d-flex">
    <b-container class="position-absolute text-center mt-4">
      <h1>
        <strong class="color-secondary">Anunciar Promoção</strong>
      </h1>
    </b-container>
    <div class="d-flex justify-content-center mt-5 w-100">
      <b-container style="margin-top:10%;">
        <b-row>
          <b-col cols="8" class="mt-4 text-justify">
            <label for="product">Produto:</label>
            <b-form-input
              id="product"
              class="input-layout w-100"
              placeholder="Ex: RTX 3090"
              type="text"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8" class="mt-3">
            <label for="description">Descrição:</label>
            <b-form-input
              id="description"
              class="input-layout w-100"
              placeholder="Ex: 16Gbs, GDDR5"
              type="text"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8" class="mt-3">
            <label for="link">Link para promoção:</label>
            <b-form-input
              id="link"
              class="input-layout w-100"
              placeholder="Ex: www.loja.com.br/456161"
              type="text"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="4" class="mt-3">
            <label for="date">Data de válidade:</label>
            <b-form-input id="date" class="input-layout w-100" type="date" />
          </b-col>
          <b-col cols="4" class="mt-3">
            <label for="price">Valor:</label>
            <money
              class="form-control input-layout w-100"
              id="price"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8">
            <b-button
              class="button button-color w-100 mt-4"
              variant="none"
            >
              Anunciar Promoção
            </b-button>
          </b-col>
        </b-row>
      </b-container>
      <b-container style="margin-top:10%">
        <b-row>
          <b-col>
            <input
              type="file"
              accept="image/*"
              style="display: none"
              ref="fileInput"
              @change="uploadImage"
              id="file-input"
            />
            <b-button
              class="button button-color w-100 mt-4"
              variant="none"
              @click="$refs.fileInput.click()"
            >
              Adicionar print da promoção
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <img
              v-if="previewImage"
              :src="previewImage"
              class="uploading-image w-100 mt-3"
            />
            <img
              v-else
              src="@/assets/empty-img.jpg"
              class="uploading-image w-100 mt-3"
            />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-container>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      previewImage: null,
    };
  },
  mounted() {
    if (!this.$store.isAuthorization) {
      router.push("/");
    }
  },
  methods: {
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
    },
  },
};
</script>
<style scoped>
.button-color {
  background-color: #6f06f4;
  color: #dde9f0;
}
.input-layout {
  border-radius: 10px;
  width: 115%;
}
.uploading-image {
  display: flex;
  border-radius: 20px;
  border: none;
  width: 100%;
  height: 100%;
}
</style>
