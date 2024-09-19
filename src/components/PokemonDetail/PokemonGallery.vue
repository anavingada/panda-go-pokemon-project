<!-- NOTES

This component accepts props name and images. 
It displays a set of the pokemon's images. -->

<script lang="ts">
import { defineComponent } from 'vue'
import { type PropType } from 'vue'

export default defineComponent({
  name: 'PokemonGallery',
  props: {
    pokemonName: { type: String, required: false, default: '' },
    images: { type: Array as PropType<string[]>, required: false, default: () => [] }
  }
})
</script>

<template>
  <section class="pokemon-gallery">
    <h4>Gallery:</h4>
    <div class="pokemon-gallery__items">
      <img
        v-for="(image, index) in images"
        :key="index"
        :alt="`${pokemonName} image ${index + 1}`"
        class="pokemon-gallery__items__image"
        :src="image"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.pokemon-gallery {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px auto;

  &__items {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;

    @include size-s-up {
      grid-template-columns: repeat(2, 1fr);
    }

    @include size-m-up {
      grid-template-columns: repeat(4, 1fr);
    }

    &__image {
      width: 100%;
      aspect-ratio: 1/1;
      padding: 10px;
    }
  }
}
</style>
