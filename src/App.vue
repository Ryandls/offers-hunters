<template>
  <div>
    <Header class="mb-3" />
    <div class="background-view">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
//import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    // Footer,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "roboto", sans-serif !important;
}

.color-primary {
  color: #6f06f4;
}
.color-secondary {
  color: #123952;
}

.button {
  display: flex;

  width: 10rem;
  height: 3rem;

  justify-content: center;
  align-items: center;

  margin-right: 2rem;

  border: none;
  border-radius: 8px;

  font-weight: bold;
}
.background-view {
  background-color: #f5f8fa !important;
  width: 100%;
  height: 89vh;
}
</style>
