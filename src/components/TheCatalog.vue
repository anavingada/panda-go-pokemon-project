<!--
  NOTES 

The catalog display several sections, the most important, search and catalog. 
It contains logic to filter results according to search. 
-->

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'

import CardsContainer from '@/components/CardsContainer.vue'
import CatalogCard from '@/components/CatalogCard.vue'
import SearchBy from '@/components/SearchBy.vue'

/* Interface representing the search terms for property-based search (not name) */
interface SearchTerms {
  property: string
  propertyValueId: number
}

export default defineComponent({
  name: 'TheCatalog',
  components: {
    SearchBy,
    CatalogCard,
    CardsContainer
  },
  setup() {
    const pokemonStore = usePokemonStore()
    const isLoading = ref(false)
    const isSearching = ref(false) // Flag to track if search was triggered
    // Stores either a string for name search or an object for property-based search
    const searchQuery = ref<SearchTerms | string>('') // Updated type
    // Stores results when searching by properties
    const resultsByPropertyValue = ref()

    // Function to fetch Pokémon data
    const fetchPokemons = async () => {
      isLoading.value = true
      await pokemonStore.fetchPokemons()
      isLoading.value = false
    }

    // Function to handle search by Pokémon name
    const handleSearchByName = async (searchNameQuery: string) => {
      searchQuery.value = searchNameQuery
      pokemonStore.searchQuery = searchQuery.value
      isSearching.value = true // Set the search flag to true
    }

    // Function to handle search by Pokémon property (e.g., ability, type, move; not name)
    const handleSearchByProperty = async (searchPropertyQuery: SearchTerms) => {
      searchQuery.value = searchPropertyQuery
      pokemonStore.searchQuery = searchQuery.value
      isSearching.value = true // Set the search flag to true
      isLoading.value = true
      try {
        // Ensure fetchResultsByPropertyValue returns an array or default to empty array
        resultsByPropertyValue.value = await pokemonStore.fetchResultsByPropertyValue(
          searchQuery.value as SearchTerms
        )
      } catch (error) {
        console.error('Failed to fetch results by property:', error)
        resultsByPropertyValue.value = [] // Handle error by setting an empty array
      } finally {
        isLoading.value = false
      }
    }

    // Function to reset search criteria
    const handleReset = (doReset: Boolean) => {
      if (!doReset) return
      searchQuery.value = ''
      pokemonStore.searchQuery = searchQuery.value
      isSearching.value = true // Set the search flag to true
    }

    // Computed property to filter Pokémon based on search query
    const filteredPokemons = computed(() => {
      // If no search is triggered, return the full Pokémon list
      if (!isSearching.value || !searchQuery.value) {
        return pokemonStore.pokemonsList
      }

      // If searching by property, return results filtered by the selected property
      if (typeof pokemonStore.searchQuery === 'object' && pokemonStore.searchQuery !== null) {
        return pokemonStore.pokemonsByPropertyList
      }

      // If searching by name, filter the list based on the Pokémon name
      return filterResultsByName()
    })

    // Helper function to filter Pokémon by name
    const filterResultsByName = () => {
      if (typeof searchQuery.value === 'string' && searchQuery.value !== null) {
        return pokemonStore.pokemonsList.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.value as string)
        )
      }
      return [] // Return an empty array if searchQuery.value is not a string
    }

    // Computed property to display the number of Pokémon results (either total or filtered)
    const resultsNumber = computed(() => {
      return searchQuery.value ? filteredPokemons.value.length : pokemonStore.totalCount
    })

    // Fetch Pokémon data when the component is mounted
    onMounted(async () => {
      await fetchPokemons()
    })

    return {
      filteredPokemons,
      searchQuery,
      isLoading,
      handleSearchByName,
      handleSearchByProperty,
      handleReset,
      resultsNumber
    }
  }
})
</script>

<template>
  <!-- Search component to filter Pokémon based on name or property -->
  <SearchBy
    @search-name-query="handleSearchByName"
    @search-property-query="handleSearchByProperty"
    @reset-selects="handleReset"
  ></SearchBy>

  <!-- Loading state -->
  <section v-if="isLoading" class="loading">
    <p class="loading__message">Loading Pokédex...</p>
  </section>

  <!-- Pokémon catalog section -->
  <section v-else class="catalog">
    <h2>Catalog</h2>

    <p class="catalog__results-number">Number of Pokémons: {{ resultsNumber }}</p>

    <p v-if="filteredPokemons.length === 0" class="catalog__no-results">
      The pokemon you are searching does not exist. Please try again!
    </p>

    <CardsContainer v-else>
      <CatalogCard
        v-for="(pokemon, index) in filteredPokemons"
        :key="index"
        :pokemon="pokemon"
      ></CatalogCard>
    </CardsContainer>
  </section>
</template>

<style lang="scss" scoped>
.catalog {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px auto;

  &__results-number {
    font-size: 18px;
    text-align: left;
  }

  &__no-results {
    font-size: 18px;
    text-align: center;
    margin: 40px auto;
  }
}
.loading .message {
  font-size: 18px;
  text-align: center;
  margin: 40px auto;
}
</style>
