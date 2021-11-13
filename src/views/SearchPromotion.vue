<template>
  <b-container>
    <b-container class="d-flex">
      <div class="d-flex justify-content-center custom-input mt-4 w-50">
        <img
          src="@/assets/search.svg"
          alt="Bootstrap"
          width="25"
          height="25"
          class="mr-4"
        />
        <input
          type="text"
          class="w-100"
          placeholder="Pesquise aqui"
          @change="searchPromotion(search)"
          v-model="search"
        />
      </div>
    </b-container>
    <div class="justify-content-start mt-5" v-if="date">
      <div
        v-if="loadingPage"
        class="no-results show"
        style="text-align: center; padding-top: 30px;"
      >
        <b-spinner variant="primary" label="Text Centered" class="p-4" />
        <span class="sr-only">Carregando...</span>
      </div>
      <div v-else>
        <div
          v-if="!date.length"
          class="text-center color-secondary empty-result"
        >
          <img
            src="@/assets/empty-emoji.png"
            class="mb-4"
            width="80"
            height="80"
            alt="Empty Resulted"
          />
          <h4 class="font-weight-bold">Sem resultados.</h4>
          <h4 class="font-weight-bold">Tente uma nova busca</h4>
        </div>
        <div v-else>
          <h2>
            <strong>{{
              date.length > 1
                ? `Foram encontrados ${date.length} promoções`
                : `Foi encontrado apenas ${date.length} promoção`
            }}</strong>
          </h2>
          <div
            v-if="isLoading"
            class="no-results show"
            style="text-align: center; padding-top: 30px;"
          >
            <b-spinner variant="primary" label="Text Centered" class="p-4" />
            <span class="sr-only">Carregando...</span>
          </div>

          <div class="containerCard mt-5" v-else>
            <product-card
              v-for="product of date"
              :key="product.id"
              :productId="product.id"
              :description="product.description"
              :product="product.product"
              :price="product.value"
              :validity="product.expiration_date"
              :imgsrc="product.image"
              :link="product.promotion_link"
              :hostName="product.user.name"
            />
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import router from "@/router";
import ProductCard from "@/components/ProductCard.vue";
import { http } from "@/http";

export default {
  components: { ProductCard },
  data() {
    return {
      isLoading: false,
      loadingPage: false,
      userName: this.$store.userInfo.name,
      search: "",
      date: [],
    };
  },
  mounted() {
    if (!this.$store.isAuthorization) {
      router.push("/");
    }
    (this.loadingPage = true),
      http
        .get(`offer/get_by_query?label=`)
        .then((response) => (this.date = response.data.offers))
        .catch((error) => error)
        .finally(() =>
          setTimeout(() => {
            this.loadingPage = false;
          }, 1000)
        );
  },
  methods: {
    searchPromotion(change) {
      this.isLoading = true;
      http
        .get(`offer/get_by_query?label=${change}`)
        .then((response) => (this.date = response.data.offers))
        .catch((error) => error)
        .finally(() => (this.isLoading = false));
      http
        .get(`offer/get_by_id?id=57815ddf-16ab-4452-843d-d3bed0c44824`)
        .then((response) => console.log(response.data))
        .catch((error) => error)
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
<style scoped>
input,
input:focus {
  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
}
.custom-input {
  padding: 0.7rem;
  border: 2px solid #dce2e5;
  background-color: white;
  border-radius: 12px;
  margin-left: 25%;
}
.containerCard {
  justify-content: start;
  gap: 4rem;
  margin-left: 4rem;
  display: flex;
  flex-wrap: wrap;
}
.empty-result {
  margin-top: 15vh;
}
.background-view {
  width: 100%;
  height: 89vh;
}
</style>
