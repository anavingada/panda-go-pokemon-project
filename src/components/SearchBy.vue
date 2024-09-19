<!-- NOTES

This component allows to search by name or other properties, passing the information to the parent component. 
It allows resetting the values.  -->

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'

export default defineComponent({
  name: 'SearchBy',

  setup(props, { emit }) {
    const pokemonStore = usePokemonStore()
    const searchQuery = ref()

    // Property Options available
    const options = ref([
      { value: 'name', label: 'Name' },
      { value: 'ability', label: 'Ability' },
      { value: 'move', label: 'Move' },
      { value: 'type', label: 'Type' }
    ])

    // Emit search event when user types and clicks search
    const emitSearchQuery = () => {
      emit('search-name-query', searchQuery.value)
    }

    const selectedProperty = ref('')
    const selectedPropertyValue = ref('')
    const isLoading = ref(false)
    const results = ref<{ value: string; label: string }[]>([])

    // Watch the selected property and fetch results when it changes
    watch(selectedProperty, async (newProperty) => {
      if (newProperty) {
        await fetchResults(newProperty)
      } else {
        emit('resetSelects', true)
      }
    })

    // Watch the selected property value and emit the search event
    watch(selectedPropertyValue, async (newPropertyValue) => {
      if (newPropertyValue) {
        const selectedPropertyId = parseInt(newPropertyValue.split('/')[6])
        emit('search-property-query', {
          property: selectedProperty.value,
          propertyValueId: selectedPropertyId
        })
      } else {
        emit('resetSelects', true)
      }
    })

    // Fetch results options based on the selected property
    const fetchResults = async (property: string) => {
      isLoading.value = true
      try {
        if (property === 'name') return
        const fetchedResults = await pokemonStore.fetchPropertyResults(property)
        results.value = fetchedResults.map((result: { url: string; name: string }) => ({
          value: result.url,
          label: result.name
        }))
        selectedPropertyValue.value = '' // Reset the selected result
      } catch (error) {
        console.error('Failed to fetch results:', error)
      } finally {
        isLoading.value = false
      }
    }

    // Reset function to clear selections
    const resetSelections = () => {
      searchQuery.value = ''
      selectedProperty.value = ''
      selectedPropertyValue.value = ''
      results.value = []
    }

    return {
      searchQuery,
      emitSearchQuery,
      options,
      selectedProperty,
      selectedPropertyValue,
      isLoading,
      results,
      resetSelections
    }
  }
})
</script>

<template>
  <section class="search-by">
    <h2>Search Pokémons</h2>
    <div class="search-by__actions">
      <div class="search-by__actions__property">
        <label for="property-select" class="search-by__actions__property__label"
          >Select Property:</label
        >
        <select
          id="property-select"
          v-model="selectedProperty"
          class="search-by__actions__property__select"
        >
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div v-if="selectedProperty === 'name'" class="search-by__actions__name-input">
        <label for="results-select" class="search-by__actions__name-input__label"
          >Write the name of the pokemon:</label
        >
        <div class="search-by__actions__name-input__search">
          <input
            v-model="searchQuery"
            placeholder="Search Pokémon"
            class="search-by__actions__name-input__search__input"
          />
          <button @click="emitSearchQuery" class="search-by__actions__name-input__search__btn">
            Search
          </button>
        </div>
      </div>

      <div v-else class="search-by__actions__option-select">
        <!-- Second select for displaying fetched results -->
        <label for="results-select" class="search-by__actions__option-select__label"
          >Select Result:</label
        >
        <select
          id="results-select"
          v-model="selectedPropertyValue"
          :disabled="isLoading"
          class="search-by__actions__option-select__select"
        >
          <option v-for="result in results" :key="result.value" :value="result.value">
            {{ result.label }}
          </option>
        </select>
      </div>
    </div>
    <button @click="resetSelections" class="search-by__actions__reset">Reset</button>
  </section>
</template>

<style lang="scss" scoped>
.search-by {
  &__actions {
    display: flex;
    flex-direction: column;
    gap: 32px;
    justify-content: space-evenly;
    align-items: center;

    @include size-m-up {
      flex-direction: row;
    }

    &__property {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 400px;

      &__label {
        font-size: 18px;
        color: var(--text-black);
      }
      &__select {
        padding: 6px 12px;
      }
    }

    &__name-input {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 400px;

      &__label {
        font-size: 18px;
        color: var(--text-black);
      }
      &__search {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        justify-content: space-between;
        width: 100%;
        max-width: 400px;

        &__input {
          padding: 6px 12px;
          width: 100%;
        }
        &__btn {
          padding: 6px 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-black);
          background-color: var(--logo-yellow-shadow);
          border: 1px solid var(--logo-yellow-shadow);
          border-radius: 6px;

          &:hover {
            background-color: var(--logo-yellow);
            cursor: pointer;
          }
        }
      }
    }
    &__option-select {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 400px;

      &__label {
        font-size: 18px;
        color: var(--text-black);
      }
      &__select {
        padding: 6px 12px;
      }
    }
    &__reset {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px auto;
      color: var(--text-black);
      background-color: var(--logo-yellow-shadow);
      border: 1px solid var(--logo-yellow-shadow);
      padding: 12px 24px;
      border-radius: 6px;

      &:hover {
        background-color: var(--logo-yellow);
        cursor: pointer;
      }
    }
  }
}
</style>
