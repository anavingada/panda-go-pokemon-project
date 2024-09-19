<!-- NOTES

This component accepts props for hidden and non hidden abilities. 
It displays the abilities through the ItemsList component. -->

<script lang="ts">
import { defineComponent } from 'vue'
import ItemsList from '@/components/ItemsList.vue'

export default defineComponent({
  name: 'PokemonAbilities',
  components: {
    ItemsList
  },
  props: {
    nonHiddenAbilities: { type: Array, required: false, default: () => [] },
    hiddenAbilities: { type: Array, required: false, default: () => [] }
  }
})
</script>

<template>
  <section class="pokemon-abilities">
    <div class="pokemon-abilities__type">
      <h4>Abilities: (non hidden)</h4>
      <ItemsList :data="nonHiddenAbilities" />
    </div>
    <div class="pokemon-abilities__type">
      <h4>Abilities: (hidden)</h4>
      <ItemsList :data="hiddenAbilities" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.pokemon-abilities {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin: 20px auto;

  @include size-m-up {
    grid-template-columns: repeat(2, 1fr);
  }

  &__type {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
}
</style>
