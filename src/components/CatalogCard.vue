<!-- NOTES

This component is a reusable cards to show the name, image and rovide a link to the pokemon detail page. -->

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CatalogCard',
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const pokemonStore = usePokemonStore()
    const router = useRouter()

    // Computed property to extract Pokémon ID from URL
    const pokemonId = computed(() => {
      // The URL is structured with the ID as the 7th part after splitting by '/'
      return props.pokemon.url.split('/')[6]
    })

    // Reactive reference for the Pokémon image URL
    const pokemonImageUrl = ref(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`
    )

    // Watch for changes in pokemonId and update pokemonImageUrl
    watch(
      pokemonId,
      (newId) => {
        pokemonImageUrl.value = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${newId}.png`
      },
      { immediate: true } // Immediately run the watcher to set the initial value
    )

    // Function to navigate to the Pokémon detail page
    const goToPokemonDetailPage = () => {
      const pokemonName = props.pokemon.name
      pokemonStore.setSelectedPokemonId(pokemonId.value)
      router.push({ name: 'pokemon-detail', params: { pokemonName } })
    }

    return {
      pokemonImageUrl,
      goToPokemonDetailPage
    }
  }
})
</script>

<template>
  <article @click="goToPokemonDetailPage()" class="catalog-card">
    <img
      :alt="`Image of pokémon ${pokemon.name.replace(/-/g, ' ')}`"
      class="catalog-card__image"
      :src="pokemonImageUrl"
    />
    <div class="catalog-card__background">
      <p class="catalog-card__background__text">{{ pokemon.name.replace(/-/g, ' ') }}</p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.catalog-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  border: 1px solid var(--logo-yellow-shadow);
  border-radius: 6px;
  cursor: pointer;
  position: relative;

  &:hover {
    box-shadow:
      0 5px 5px 0 var(--logo-yellow-shadow),
      0 2.5px 5px 0 var(--logo-yellow);
  }

  &__image {
    width: 100%;
    aspect-ratio: 1/1;
  }

  &__background {
    background: var(--logo-yellow-shadow);
    width: 100%;
    padding: 6px 12px;
    border-radius: 0 0 4px 4px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    &__text {
      color: var(--text-black);
      font-size: 16px;
      text-transform: capitalize;
      text-align: center;
    }
  }
}
</style>
