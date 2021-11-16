<template>
  <div class="card d-flex justify-content-center">
    <div>
      <img
        :src="imgsrc"
        :alt="description"
        class="w-100"
        @click="goToDetailPromotion(productId)"
      />
      <div class="card__description">
        <b-col class="mt-2">
          <span>{{ product }} {{ description }}</span>
        </b-col>
        <b-col class="mt-2">
          <span class="text-danger font-weight-bold">
            {{ currencyFormat(price) }}
          </span>
        </b-col>
        <b-col>
          <span class="text-danger font-weight-bold">Válido até {{ validity }}</span>
        </b-col>
        <b-col>
          <span class="lowFontSize">Anunciado por {{ hostName }}</span>
        </b-col>
        <b-col>
          <a :href="link" class="text-center" target="_blank"
            >Ir para o site</a
          >
        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  props: {
    product: String,
    description: String,
    price: String,
    validity: String,
    imgsrc: String,
    hostName: String,
    link: String,
    productId: String,
  },
  methods: {
    currencyFormat(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
    goToDetailPromotion(id) {
      router.push({ name: "promotion-detail", params: { id: id } });
    },
  },
};
</script>

<style scoped>
.card {
  border: none;
  display: flex;
  width: 300px;
  background-color: white;
  overflow: hidden;
  border-radius: 20px;
}
.card img {
  width: 16vw;
  height: 25vh;
}
.card__description {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 14rem;
  padding-left: 1.5rem;
  background-color: rgba(240, 240, 240, 0.152);
}
.card__description p {
  margin: 0.25rem;
}
.lowFontSize {
  font-size: 0.8rem;
  color: #617480;
}
span {
  font-size: large;
  font-weight: bold;
}
a {
  text-decoration: none;
  color: white;
  background-color: #6f06f4;
  border-radius: 20px;
  padding: 3px 4%;

  margin-left: 14vh;
}
</style>
