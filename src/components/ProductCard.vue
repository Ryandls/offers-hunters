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
        <b-col class="mt-3">
          <span class="defaultFontSize">{{ description }}</span>
        </b-col>
        <b-col class="mt-1">
          <span class="text-danger font-weight-bold ">
            {{ currencyFormat(price) }}
          </span>
        </b-col>
        <b-col>
          <span class="text-danger font-weight-bold defaultFontSize"
            >Válido até {{ validity }}</span
          >
        </b-col>
        <b-col>
          <span class="lowFontSize">Anunciado por {{ hostName }}</span>
        </b-col>
        <b-col>
          <a :href="link" class="text-center" target="_blank">Ir para o site</a>
        </b-col>
      </div>
    </div>
    <div class="d-flex" v-if="userAdmin">
      <b-button
        class="w-50"
        variant="success"
        @click="showModal('modal-validation-confirm')"
        >Validar</b-button
      >
      <b-button
        class="w-50"
        variant="danger"
        @click="showModal('modal-validation-delete')"
        >Deletar</b-button
      >
    </div>

    <b-modal
      id="modal-validation-confirm"
      ok-title="Validar"
      ok-variant="success"
      centered
      @ok="validationPromotion(productId)"
    >
      <form class="text-center">
        <span>Você tem certeza que quer validar essa promoção?</span>
      </form>
    </b-modal>

    <b-modal
      id="modal-validation-delete"
      ok-title="Deletar"
      ok-variant="danger"
      centered
      @ok="deletePromotion(productId)"
    >
      <form class="text-center">
        <span>Você tem certeza que quer deletar essa promoção?</span>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { http } from "@/http";
import Ripple from "vue-ripple-directive";
import router from "@/router";
import { VBModal } from "bootstrap-vue";
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
    userAdmin: Boolean,
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  methods: {
    currencyFormat(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
    deletePromotion(id) {
      http
        .post(`/offer/delete?id=${id}`)
        .then(() => {
          this.$bvToast.toast("Promoção excluida com sucesso!!", {
            title: "Sucesso",
            autoHideDelay: 3000,
            variant: "success",
            solid: true,
          });
        })
        .catch((error) => {
          if (error) {
            this.$bvToast.toast(
              "Ocorreu um erro ao excluir a promoção, por favor, tente mais tarde!",
              {
                title: "Error",
                autoHideDelay: 2000,
                variant: "danger",
                solid: true,
              }
            );
          }
        })
        .finally(setTimeout(() => {}, 2000));
    },
    validationPromotion(id) {
      http
        .put(`/offer/verify_offer?id=${id}`)
        .then(() => {
          this.$bvToast.toast("Promoção validada com sucesso!!", {
            title: "Sucesso",
            autoHideDelay: 3000,
            variant: "success",
            solid: true,
          });
        })
        .catch((error) => {
          if (error) {
            this.$bvToast.toast(
              "Ocorreu um erro ao tentar validar a promoção, por favor, tente mais tarde!",
              {
                title: "Error",
                autoHideDelay: 2000,
                variant: "danger",
                solid: true,
              }
            );
          }
        })
        .finally(
          setTimeout(() => {
            document.location.reload(true);
          }, 2000)
        );
    },
    showModal(modal) {
      this.$bvModal.show(`${modal}`);
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
.lowFontSize {
  font-size: 0.8rem;
  color: #617480;
}
.defaultFontSize {
  font-size: 1rem;
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
  padding: 2px 4%;

  margin-left: 14vh;
}
</style>
