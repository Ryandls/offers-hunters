<template>
  <div>
    <header class="background-header">
      <Header />
    </header>
    <body class="background-body">
      <router-view />
    </body>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
//import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  computed: {
    reversedMessage: function() {
      // `this` points to the vm instance
      return console.log("entrou");
    },
  },
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
body {
  background-color: #f5f8fa !important;
  width: 100%;
  height: 100%;
}
.background-header {
  background-color: #ffffff !important;
  padding: 0.5rem 0rem 1rem 0rem
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
</style>
