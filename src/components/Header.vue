<template>
  <b-container>
    <div class="d-flex justify-content-between mt-3">
      <div>
        <b-button variant="none" :to="isAuthorization ? '/home-menu' : '/'"
          ><h1>
            <strong class="color-secondary">
              Offer <span class="color-primary">Hunters</span></strong
            >
          </h1>
        </b-button>
      </div>
      <div class="d-flex mt-2">
        <b-button
          variant="none"
          class="button button-color"
          to="restricted-access"
          v-if="!isAuthorization"
        >
          Acesso Restrito
        </b-button>
        <b-button
          variant="none"
          class="button button-logout"
          v-if="isAuthorization"
          @click="logOut()"
        >
          Sair
        </b-button>
      </div>
    </div>
  </b-container>
</template>

<script>
import router from "@/router";
export default {
  name: "Header",
  computed: {
    isAuthorization() {
      return this.$store.isAuthorization;
    },
  },
  methods: {
    async logOut() {
      await this.$gAuth.signOut();
      this.$actions.changeAuthorization(this.$gAuth.isAuthorized);
      this.$actions.saveUserInfo({});
      localStorage.AccessToken = "";
      router.push("/");
    },
  },
};
</script>

<style scoped>
.button-color {
  background-color: #dde9f0;
  color: #6f06f4;
}
.button-logout {
  background-color: #6f06f4;
  color: #dde9f0;
  margin-right: 0;
  width: 5rem;
}
</style>
