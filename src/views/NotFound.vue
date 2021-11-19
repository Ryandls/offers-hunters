<template lang="">
  <div class="NotFoundContainer">
    <div>
      <div class="NotFoundContent">
        <h4>Página não encontrada</h4>
        <span
          >Olá caçador, está perdido?<br />
          Parece que acabou se aventurando muito e acabou chegando em uma rota
          que ainda não existe. <br />

          Mas não tem problema, basta apenas clicar no botão abaixo que você vai
          ser redirecionado.</span
        >
        <b-button class="HomeButton" to="/">Home</b-button>
      </div>
      <h2>404</h2>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.NotFoundContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.NotFoundContainer > div {
  width: 100%;
  margin-top: 10rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
}

.NotFoundContainer > div > h2 {
  margin: 0;
  padding: 0;
  color: #6f06f4;
  font-size: 200px;
  font-weight: bold;
}

.NotFoundContent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}

.NotFoundContent > h4 {
  margin-bottom: 1rem;
  color: #6f06f4;
  font-weight: bold;
}

.NotFoundContent > span {
  margin-bottom: 1rem;
  color: #193952;
  font-weight: bold;
}

.HomeButton {
  padding: 0.5rem 1rem;
  border: 2px solid #6f06f4;
  color: #6f06f4;
  width: 10rem;
  background-color: transparent;
  font-weight: bold;
  cursor: pointer;

  transition: all 0.3s ease;
}

.HomeButton:hover {
  background-color: #6f06f4;
  color: #fff;
}

.HomeButton:focus {
  background-color: #6f06f4;
  color: #fff;
}

@media (max-width: 1200px) {
  .NotFoundContainer > div {
    width: 100%;
    margin-top: 5rem;
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    justify-content: space-around;
  }
}

@media (max-width: 800px) {
  .NotFoundContainer > div {
    width: 80%;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    justify-content: space-around;
  }

  .NotFoundContainer > div > h2 {
    font-size: 150px;
  }

  .HomeButton {
    width: 100%;
    display: flex;
    height: 4rem;
    justify-content: center;
    align-items: center;
  }
}
</style>
