<template>
  <b-container>
    <div class="d-flex align-items-center">
      <b-container style="margin-top:10%;">
        <b-row>
          <b-col>
            <h1>
              <strong class="color-secondary">Bem Vindo {{ userName }}</strong>
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8" class="mt-4">
            <b-button variant="none" class="button button-color" to="/advertise-promotion">
              Anunciar Promoção</b-button
            >
            <b-button variant="none" class="button button-color mt-3">
              Procurar Promoção</b-button
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
export default {
  data() {
    return {
      userName: this.$store.userInfo.name,
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
