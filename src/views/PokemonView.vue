<script setup lang="ts">
import { onBeforeMount, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { PokemonDetails } from '@/types/pokemonDetails'
import { processPokemonData } from '@/services/pokemonDetailsService'
import PokemonGallery from '@/components/PokemonDetail/PokemonGallery.vue'
import PokemonAbilities from '@/components/PokemonDetail/PokemonAbilities.vue'
import PokemonMoves from '@/components/PokemonDetail/PokemonMoves.vue'
import PokemonBasicInfo from '@/components/PokemonDetail/PokemonBasicInfo.vue'

// Getting the current route and router instances
const route = useRoute()
const router = useRouter()

// Ref to store Pokémon details, initially set to null
const pokemonDetails = ref<PokemonDetails | null>(null)

// Computed property to process the fetched Pokémon data
const pokemonComputedData = computed(() => processPokemonData(pokemonDetails.value))

// Computed properties for various parts of the Pokémon data
const pokemonTypes = computed(() => pokemonComputedData.value.types)
const pokemonImages = computed(() => pokemonComputedData.value.images)
const pokemonHeldItems = computed(() => pokemonComputedData.value.heldItems)
const pokemonMoves = computed(() => pokemonComputedData.value.moves)
const pokemonHiddenAbilities = computed(() => pokemonComputedData.value.hiddenAbilities)
const pokemonNonHiddenAbilities = computed(() => pokemonComputedData.value.nonHiddenAbilities)

// Computed property to format basic Pokémon information
const pokemonBasicInfo = computed(() => [
  {
    label: 'Name',
    value: pokemonDetails.value?.name || 'Unknown'
  },
  {
    label: 'Id',
    value: pokemonDetails.value?.id || 'Unknown'
  },
  {
    label: 'Order',
    value: pokemonDetails.value?.order || 'Unknown'
  },
  {
    label: 'Weight',
    value: pokemonDetails.value?.weight || 'Unknown'
  },
  {
    label: 'Height',
    value: pokemonDetails.value?.height || 'Unknown'
  },
  {
    label: 'Base Experience',
    value: pokemonDetails.value?.base_experience || 'Unknown'
  },
  {
    label: 'Types',
    value: pokemonTypes.value || 'Unknown'
  },
  {
    label: 'Held Items',
    value: pokemonHeldItems.value || 'Unknown'
  }
])

// Function to fetch Pokémon data by its name
const fetchPokemonData = async (pokemonName: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    if (!response.ok) {
      router.replace({ name: 'NotFound' })
    } else {
      pokemonDetails.value = await response.json()
    }
  } catch (error) {
    router.replace({ name: 'NotFound' })
  }
}

// Fetch the Pokémon data when the component is about to be mounted, using the route parameter (pokemonName)
onBeforeMount(async () => {
  const pokemonName = route.params.pokemonName as string
  await fetchPokemonData(pokemonName)
})
</script>

<template>
  <div v-if="pokemonDetails" class="pokemon-view">
    <PokemonBasicInfo :pokemon-basic-info="pokemonBasicInfo"></PokemonBasicInfo>
    <PokemonMoves :pokemon-moves="pokemonMoves"></PokemonMoves>
    <PokemonAbilities
      :non-hidden-abilities="pokemonNonHiddenAbilities"
      :hidden-abilities="pokemonHiddenAbilities"
    ></PokemonAbilities>
    <PokemonGallery :pokemon-name="pokemonDetails.name" :images="pokemonImages"></PokemonGallery>
  </div>
</template>

<style></style>
