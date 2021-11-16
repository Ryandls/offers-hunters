<template>
  <b-container class="d-flex">
    <b-container class="position-absolute text-center mt-4">
      <h1>
        <strong class="color-secondary">Detalhes da Promoção</strong>
      </h1>
    </b-container>
    <div class="d-flex mt-2 w-100">
      <b-col cols="7" style="margin-top:10%;">
        <b-row style="margin-bottom: 5rem !important;">
          <b-col class="text-center">
            <span style="font-size:0.9rem;"> Print da promoção: </span>
            <img
              v-if="promotionData.image"
              :src="promotionData.image"
              class="uploading-image w-100 mt-3"
            />
            <img
              v-else
              src="@/assets/empty-img.jpg"
              class="uploading-image w-100 mt-3"
            />
          </b-col>
        </b-row>
        <b-row class="ml-1 mr-1 comment">
          <b-col>
            <span class="ml-4 " style="font-size:0.9rem;"> Comentarios: </span>
            <div class="d-flex pl-4">
              <b-form-input
                type="text"
                class="input-layout w-100 mr-3"
                style="background-color:#F5F8FA;"
                v-model="comment"
              />
              <button
                class="button button-color send-button w-25"
                @click="sendCommment()"
              >
                <b-spinner label="Text Centered" v-if="isLoading" />
                <span v-else> Enviar </span>
              </button>
            </div>
            {{ comment }}
            <div class="d-flex mt-4 mb-3 ml-1 mr-3 comments">
              <b-col cols="2">
                <span>João diz:</span>
              </b-col>
              <b-col cols="8"> Loja confiavel e placa de video muito boa</b-col>
              <b-col cols="2" class="current-date"> 25/09/2021 as 17:21</b-col>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="6" style="margin-top: 20%; margin-left:5%">
        <b-container>
          <b-row>
            <b-col cols="8" class="mt-3">
              <label for="user">Postado por:</label>
              <b-container class="container-class text-left">
                <span id="user" class="ml-2">
                  {{ promotionData.user.name }}
                </span>
              </b-container>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="8" class="mt-4 text-justify">
              <label for="product">Produto:</label>
              <b-container class="container-class">
                <span id="product">
                  {{ promotionData.description }}
                </span>
              </b-container>
            </b-col>
          </b-row>
          <!--           <b-row>
            <b-col cols="8" class="mt-3">
              <label for="description">Descrição:</label>
              <span id="description" class="input-layout form-control">
                Ex: 16Gbs, GDDR5
              </span>
            </b-col>
          </b-row> -->
          <b-row>
            <b-col cols="4" class="mt-3 mr-3">
              <label for="date">Válidade:</label>
              <b-container class="container-class">
                <span id="date"> {{ promotionData.expiration_date }}</span>
              </b-container>
            </b-col>
            <b-col cols="4" class="mt-3 ml-2">
              <label for="price">Valor:</label>
              <b-container class="container-class">
                <span id="price">
                  {{ currencyFormat(promotionData.value) }}</span
                >
              </b-container>
            </b-col>
          </b-row>
          <b-row class="d-flex">
            <b-button
              class="button-color button-site w-25 mt-4"
              variant="none"
              :href="promotionData.promotion_link"
              target="_blank"
            >
              Ir para o site
            </b-button>
          </b-row>
        </b-container>
      </b-col>
    </div>
  </b-container>
</template>

<script>
import router from "@/router";
import Datepicker from "vuejs-datepicker";
import { ptBR } from "vuejs-datepicker/dist/locale";
import { http } from "@/http";
import moment from "moment";

export default {
  component: { Datepicker, ptBR },
  data() {
    return {
      promotionData: {},
      comment: "",
      isLoading: false,
    };
  },
  mounted() {
    if (!this.$store.isAuthorization) {
      router.push("/");
    }

    http
      .get(`/offer/get_by_id?id=${this.$route.params.id}`)
      .then((response) => {
        this.promotionData = response.data.offer;
      })
      .catch()
      .finally();
  },
  methods: {
    currencyFormat(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
    sendCommment() {
      if (this.comment) {
        this.isLoading = true;
        http
          .post(`/comment/create`, {
            comment: this.comment,
            user_id: this.promotionData.user_id,
            offer_id: this.$route.params.id,
            name: this.$store.userInfo.given_name,
            created_date:
              moment(this.date).format("L") +
              " às " +
              moment(this.date)
                .format("LT")
                .slice(0, -2),
          })
          .then(() => {
            this.$bvToast.toast("Comentário realizado com sucesso!!", {
              title: "Sucesso",
              autoHideDelay: 3000,
              variant: "success",
              solid: true,
            });
            setTimeout(() => {
              router.push({
                name: "promotion-detail",
                params: { id: this.$route.params.id },
              });
            }, 2000);
          })
          .catch((error) => {
            if (error) {
              this.$bvToast.toast(
                "Ocorreu um erro ao comentar a promoção, por favor, tente mais tarde!",
                {
                  title: "Alerta",
                  autoHideDelay: 2000,
                  variant: "danger",
                  solid: true,
                }
              );
            }
          })
          .finally(() => (this.isLoading = false));
      } else
        this.$bvToast.toast(
          "Campo de comentário vázio, por favor, digite algo!",
          {
            title: "Campo Vázio",
            autoHideDelay: 2000,
            variant: "danger",
            solid: true,
          }
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
.uploading-image {
  display: flex;
  border-radius: 20px;
  border: none;
  width: 100%;
  height: 100%;
}
.button-site {
  margin-left: 20%;
  padding: 5px 10px;
  border-radius: 10px;
  width: 150px !important;
}
.send-button {
  height: 38px;
}
.comment {
  background-color: white;
  border-radius: 15px;
  min-height: 20%;
  padding-top: 10px;
}
.current-date {
  font-size: 0.7rem;
}
.container-class {
  width: 115%;
  border: 1px solid #ced4da;
  background-color: #a0a0a011;
  border-radius: 10px;
  padding: 6px;
  text-align: center;
}
</style>
