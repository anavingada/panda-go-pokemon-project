<!-- NOTES

This component accepts move props. 
It displays the moves through the ItemsList component. -->

<script lang="ts">
import { defineComponent } from 'vue'
import ItemsList from '@/components/ItemsList.vue'

export default defineComponent({
  name: 'PokemonMoves',
  components: {
    ItemsList
  },
  props: {
    pokemonMoves: { type: Array, required: false, default: () => [] }
  }
})
</script>

<template>
  <section class="pokemon-moves">
    <h4>Moves:</h4>
    <ItemsList ordered :data="pokemonMoves" />
  </section>
</template>

<style lang="scss" scoped>
.pokemon-moves {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px auto;
}
</style>
