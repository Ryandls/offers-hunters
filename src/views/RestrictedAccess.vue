<template>
  <b-container>
    <div class="d-flex align-items-center">
      <b-container class="text-center mt-4">
        <h1>
          <strong class="color-secondary"
            >Lista de promoções para validar</strong
          >
        </h1>
      </b-container>
    </div>
    <div class="containerCard mt-5">
      <product-card
        v-for="product of date.filter((element) => element.valid == false)"
        :key="product.id"
        :productId="product.id"
        :description="product.description"
        :product="product.product"
        :price="product.value"
        :validity="product.expiration_date"
        :imgsrc="product.image"
        :link="product.promotion_link"
        :hostName="product.user.name"
        :userAdmin="admin"
      />
    </div>
  </b-container>
</template>

<script>
import router from "@/router";
import { http } from "@/http";
import { watch } from "@vue/composition-api";
import ProductCard from "@/components/ProductCard.vue";
export default {
  components: { ProductCard },
  data() {
    return {
      admin: this.$store.admin,
      date: [],
    };
  },
  mounted() {
    watch(
      () => this.$store.admin,
      () => {
        this.admin = this.$store.admin;
      }
    );

    if (!this.$store.isAuthorization) {
      router.push("/");
    }
    this.loadInfoPromotion();
  },
  methods: {
    loadInfoPromotion() {
      http
        .get(`offer/get_by_query?label=`)
        .then(
          (response) =>
            (this.date = response.data.offers.filter(
              (element) => element.valid === false
            ))
        )
        .catch((error) => error)
        .finally(() =>
          setTimeout(() => {
            this.loadingPage = false;
          }, 1000)
        );
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
.containerCard {
  justify-content: start;
  gap: 4rem;
  margin-left: 4rem;
  display: flex;
  flex-wrap: wrap;
}
</style>
