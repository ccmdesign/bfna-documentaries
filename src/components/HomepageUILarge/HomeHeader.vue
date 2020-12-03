<template>
  <div class="header">
    <img src="../../assets/bertelsmann-logo.png" width="150" />
    <div class="header__title">
      <h3>Documentaries</h3>
    </div>
  </div>
</template>

<style lang="scss">
.header {
  display: flex;
  align-items: flex-start;
  width: fit-content;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 540px;
  width: 100%;  

  &__title {
    color: #fc8b00;
    text-transform: uppercase;
    font-size: 34px;
    font-weight: 500;
  }
}
</style>
