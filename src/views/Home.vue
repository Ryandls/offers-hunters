<template>
  <b-container>
    <div class="d-flex align-items-center">
      <b-container style="margin-top:10%;">
        <b-row>
          <b-col>
            <h2>
              <strong class="color-secondary"
                >Sua plataforma de promoção</strong
              >
            </h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8" class="mt-4 text-justify">
            <h5>
              Economiza e faça outras pessoas economizarem também, postando
              promoções das mais diversas lojas de eletrônicos.
            </h5>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8" class="mt-4">
            <b-button
              variant="none"
              class="button button-color "
              @click="loginWithGoogle()"
            >
              <img
                src="@/assets/google-icone.png"
                alt="Icone do Google"
                class="img-logo mr-3"
              />Continuar com o Google</b-button
            >
            <b-button variant="none" class="button button-color mt-3">
              <img
                src="@/assets/facebook-icone.png"
                alt="Icone do Facebook"
                class="img-logo mr-3"
              />Continuar com o Facebook</b-button
            >
          </b-col>
        </b-row>
      </b-container>
      <b-container class="d-flex justify-content-end" style="margin-top:10%;">
        <img src="@/assets/logohunter.png" alt="Logo Offer Hunter" />
      </b-container>
    </div>
  </b-container>
</template>

<script>
import router from "@/router";
import { http } from "@/http";
export default {
  methods: {
    async loginWithGoogle() {
      const googleUser = await this.$gAuth.signIn();
      this.$actions.changeAuthorization(this.$gAuth.isAuthorized);
      const payload = googleUser.getBasicProfile();
      console.log(payload)

      const payloadPost = {
        email: payload.Xt || payload.St,
        profile_picture: payload.nK || payload.kK,
        name: payload.IU || payload.GU,
      };

      this.$actions.saveUserInfo(payloadPost);

      http
        .post(`user/create`, payloadPost)
        .then((response) => (response))
        .catch((error) => (error));

      if (this.$gAuth.isAuthorized) {
        router.push("/home-menu");
      }
      //console.log("id", googleUser.getId());
    },
  },
};
</script>
<style scoped>
.button-color {
  background-color: #6f06f4;
  color: #dde9f0;
}
.img-logo {
  width: 20px;
  height: 20px;
}
.button {
  width: 100%;
}
</style>
