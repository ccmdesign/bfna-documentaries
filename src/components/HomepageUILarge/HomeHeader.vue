<template>
  <div class="header">
    <img src="../../assets/bertelsmann-logo.png" alt="Bertelsman Foundation" class="bertelsmann" />
    <img src="../../assets/bfna-documentaries-logo.svg" alt="Documentaries" class="documentaries" />
  </div>
</template>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  width: fit-content;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 540px;
  width: 100%;  
  gap: 35px;
  
  .bertelsmann {
    height: 4vh;
  }

  .documentaries {
    height: 7vh;
  }

  &__title {
    color: #fc8b00;
    text-transform: uppercase;
    font-size: 34px;
    font-weight: 500;
  }
}
</style>
