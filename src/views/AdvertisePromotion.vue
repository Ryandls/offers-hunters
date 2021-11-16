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
              v-model="product"
              class="input-layout w-100"
              placeholder="Ex: RTX 3090"
              type="text"
              :state="product !== ''"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8" class="mt-3">
            <label for="description">Descrição:</label>
            <b-form-input
              id="description"
              class="input-layout w-100"
              v-model="description"
              placeholder="Ex: 16Gbs, GDDR5"
              type="text"
              :state="description !== ''"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8" class="mt-3">
            <label for="link">Link para promoção:</label>
            <b-form-input
              id="link"
              class="input-layout w-100"
              v-model="linkProduct"
              placeholder="Ex: www.loja.com.br/456161"
              type="text"
              :state="linkProduct !== ''"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="4" class="mt-3">
            <label for="date">Data de válidade:</label>
            <b-form-input
              id="date"
              v-model="validity"
              class="input-layout w-100"
              type="date"
            />
          </b-col>
          <b-col cols="4" class="mt-3">
            <label for="price">Valor:</label>
            <money
              class="form-control input-layout w-100"
              id="price"
              v-model="productValue"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8">
            <div
              v-if="isLoading"
              class="no-results show"
              style="text-align: center; padding-top: 30px;"
            >
              <b-spinner variant="primary" label="Text Centered" />
              <span class="sr-only">Carregando...</span>
            </div>
            <b-button
              class="button button-color w-100 mt-4"
              variant="none"
              @click="handlePromotion()"
              v-if="!isLoading"
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
import Datepicker from "vuejs-datepicker";
import { ptBR } from "vuejs-datepicker/dist/locale";
import { http } from "@/http";

export default {
  component: { Datepicker, ptBR },
  data() {
    return {
      isLoading: false,
      product: "",
      description: "",
      linkProduct: "",
      validity: "",
      productValue: "",
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
    handlePromotion() {
      this.isLoading = true;
      http
        .post("offer/create", {
          description: this.product + " " + this.description,
          promotion_link: this.linkProduct,
          image: this.previewImage,
          expiration_date: this.validity
            .split("-")
            .reverse()
            .join("/"),
          value: parseInt(this.productValue),
          email: this.$store.userInfo.email,
        })
        .then(() => {
          this.$bvToast.toast("Sua promoção foi encaminhada para validação!", {
            title: "Error",
            autoHideDelay: 2000,
            variant: "success",
            solid: true,
          });
          setTimeout(() => {
            router.push("/search-promotion");
          }, 2000);
        })
        .catch((error) => {
          if (error) {
            this.$bvToast.toast(
              this.validity || this.productValue
                ? "Ocorreu um erro ao anunciar a promoção, por favor, tente mais tarde!"
                : "Por favor, preencha todos os campos !!",
              {
                title: (!this.validity, !this.productValue)
                  ? "Error"
                  : "Campo Vázio",
                autoHideDelay: 2000,
                variant: "danger",
                solid: true,
              }
            );
          }
        })
        .finally(() => (this.isLoading = false));
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
