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
        <input type="text" class="w-100" />
      </div>
    </b-container>
    <div class="justify-content-start mt-5" v-if="date.length > 0">
      <h2>
        <strong>{{
          date.length > 1
            ? `Foram encontrados ${date.length} promoções`
            : `Foi encontrado apenas ${date.length} promoção`
        }}</strong>
      </h2>
      <div class="containerCard mt-5">
        <product-card
          v-for="product of date"
          :key="product.id"
          :description="product.description"
          :product="product.product"
          :price="product.price"
          :validity="product.validity"
          :imgsrc="product.imgsrc"
          :link="product.link"
          :hostName="product.hostName"
        />
      </div>
    </div>

    <div class="text-center color-secondary empty-result" v-else>
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
  </b-container>
</template>

<script>
import router from "@/router";
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: { ProductCard },
  data() {
    return {
      userName: this.$store.userInfo.name,
      date: [
        {
          product: "Placa de Vídeo Zotac NVIDIA GeForce RTX 3090",
          description: "Trinity, 24GB, GDDR6X",
          link: "https://www.kabum.com.br/produto/128562/",
          validity: "20/11/2021",
          price: 18399.9,
          imgsrc: "@/assets/modelo-print.png",
          hostName: "João",
          id: 1,
        },
        {
          product: "Placa de Vídeo Zotac NVIDIA GeForce RTX 3090",
          description: "Trinity, 24GB, GDDR6X",
          link: "https://www.kabum.com.br/produto/128562/",
          validity: "20/11/2021",
          price: 18399.9,
          imgsrc: "@/assets/modelo-print.png",
          hostName: "João",
          id: 2,
        },
        {
          product: "Placa de Vídeo Zotac NVIDIA GeForce RTX 3090",
          description: "Trinity, 24GB, GDDR6X",
          link: "https://www.kabum.com.br/produto/128562/",
          validity: "20/11/2021",
          price: 18399.9,
          imgsrc: "@/assets/modelo-print.png",
          hostName: "João",
          id: 3,
        },
      ],
    };
  },
  mounted() {
    if (!this.$store.isAuthorization) {
      router.push("/");
    }
  },
  methods: {},
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
</style>
