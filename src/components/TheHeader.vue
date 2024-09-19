<!-- NOTES

This is a static component to display the header with a logo and a h1.  -->

<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'TheHeader'
})
</script>

<template>
  <header class="header">
    <router-link to="/">
      <img
        alt="Vue logo"
        class="header__logo"
        src="@/assets/images/pokemon-logo.svg"
        width="125"
        height="125"
    /></router-link>
    <h1 class="header__title">Welcome to Pokédex</h1>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin: 0 auto 40px;

  &__logo {
    max-width: 500px;
    width: 100%;
  }

  &__title {
    font-size: 42px;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--logo-dark-blue);
  }
}
</style>
