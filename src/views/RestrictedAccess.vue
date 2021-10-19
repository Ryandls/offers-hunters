<template>
  <b-container>
    <div class="d-flex align-items-center">
      <b-container style="margin-top:10%;">
        <b-row>
          <b-col>
            <h1 class="ml-3 mb-4">
              <strong class="color-secondary">Acesso Restrito</strong>
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8" class="mt-4 text-justify">
            <label for="login">Login de Administrador:</label>
            <b-form-input
              id="login"
              class="input-layout w-100"
              placeholder="login"
              type="text"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8" class="mt-3">
            <label for="password">Senha de Administrador:</label>
            <b-form-input
              id="password"
              class="input-layout w-100"
              placeholder="senha"
              type="password"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8">
            <b-button variant="none" class="button button-color mt-4 w-100">
              Entrar
            </b-button>
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
export default {};
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
</style>
