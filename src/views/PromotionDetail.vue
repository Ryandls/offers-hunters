<template>
  <b-container class="d-flex">
    <b-container class="position-absolute text-center mt-4">
      <h1>
        <strong class="color-secondary">Detalhes da Promoção</strong>
      </h1>
    </b-container>
    <b-spinner
      label="Text Centered"
      class="d-flex mt-5"
      style="margin-left:46%; margin-top:25% !important;padding:4rem;"
      v-if="!promotionData.user"
    />
    <div class="d-flex mt-2 w-100" v-if="promotionData.user">
      <b-col cols="7" style="margin-top:10%;">
        <b-row style="margin-bottom: 3rem !important;">
          <b-col class="text-center">
            <span style="font-size:0.9rem;"> Print da promoção: </span>
            <div>
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
            </div>
          </b-col>
        </b-row>
        <b-row class="ml-1 mr-1 comment" v-if="!isLoadingData">
          <b-col>
            <span class="ml-4 " style="font-size:0.9rem;"> Comentários: </span>
            <div class="d-flex pl-4">
              <b-form-input
                type="text"
                class="input-layout w-100 mr-3"
                style="background-color:#F5F8FA;"
                v-model="comment"
                placeholder="Comente aqui"
              />
              <button
                class="button button-color send-button w-25"
                @click="sendCommment()"
              >
                <b-spinner label="Text Centered" v-if="isLoading" />
                <span v-else> Enviar </span>
              </button>
            </div>
            <div
              class="d-flex mt-4 mb-3 ml-1 mr-3 comments"
              v-for="comment in promotionData.comments"
              :key="comment.id"
            >
              <b-col cols="2">
                <span>{{ comment.name }}:</span>
              </b-col>
              <b-col cols="8"> {{ comment.comment }}</b-col>
              <b-col cols="2" class="current-date text-center">
                {{ comment.created_date }}
              </b-col>
              <img
                src="../assets/delete.png"
                style="width:20px; height:20px; margin-top:5px;"
                alt="delete"
                title="Deletar comentário"
                v-if="admin"
                @click="deleteComment(comment.id)"
              />
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
                <span id="user" class="ml-2" v-if="promotionData.user">
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
import { watch } from "@vue/composition-api";
import moment from "moment";

export default {
  component: { Datepicker, ptBR },
  data() {
    return {
      promotionData: {},
      comment: "",
      isLoading: false,
      isLoadingData: false,
      admin: this.$store.admin,
    };
  },
  mounted() {
    if (!this.$store.isAuthorization) {
      router.push("/");
    }
    watch(
      () => this.$store.admin,
      () => {
        this.admin = this.$store.admin;
      }
    );

    this.loadPromotionData();
  },
  methods: {
    currencyFormat(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
    loadPromotionData() {
      http
        .get(`/offer/get_by_id?id=${this.$route.params.id}`)
        .then((response) => {
          this.promotionData = response.data.offer;
        })
        .catch()
        .finally();
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
              moment(this.date).format("LT"),
          })
          .then(() => {
            this.$bvToast.toast("Comentário realizado com sucesso!!", {
              title: "Sucesso",
              autoHideDelay: 3000,
              variant: "success",
              solid: true,
            });
            this.loadPromotionData();
          })
          .catch((error) => {
            if (error) {
              this.$bvToast.toast(
                "Ocorreu um erro ao comentar a promoção, por favor, tente mais tarde!",
                {
                  title: "Error",
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
    deleteComment(idComment) {
      http
        .delete(`/comment/delete?id=${idComment}`)
        .then(() => {
          this.$bvToast.toast("Comentário deletado com sucesso!!", {
            title: "Sucesso",
            autoHideDelay: 3000,
            variant: "success",
            solid: true,
          });
          this.loadPromotionData();
        })
        .catch((error) => {
          if (error) {
            this.$bvToast.toast(
              "Ocorreu um erro ao tentar deletar o comentário, por favor, tente mais tarde!",
              {
                title: "Error",
                autoHideDelay: 2000,
                variant: "danger",
                solid: true,
              }
            );
          }
        });
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
  margin-bottom: 3rem;
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
