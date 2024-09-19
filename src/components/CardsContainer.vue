<!-- NOTES

This component is a reusable container for the card results of the catalog. -->

<template>
  <div class="cards-container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.cards-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin: 20px auto;

  @include size-s-up {
    grid-template-columns: repeat(2, 1fr);
  }

  @include size-l-up {
    grid-template-columns: repeat(4, 1fr);
  }

  @include size-xl-up {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
