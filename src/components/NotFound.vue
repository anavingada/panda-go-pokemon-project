<!-- NOTES

Template for not found urls. -->

<template>
  <div class="not-found">
    <h2>Oops!</h2>
    <p>The pokémon you are searching for does not exist.</p>
    <router-link to="/">Explore the catalog</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>
