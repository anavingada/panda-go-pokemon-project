<!-- NOTES

This component accepts pokemonBasicInfo prop. 
It displays an image, name, id, order, weight, height, base experience, types and held items. -->

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

// Define an interface for the expected structure of the pokemonBasicInfo prop
interface BasicInfo {
  label: string
  value: string | number // Based on your data, adjust the type
}

export default defineComponent({
  name: 'PokemonBasicInfo',
  props: {
    pokemonBasicInfo: { type: Array as PropType<BasicInfo[]>, required: false, default: () => [] }
  },
  computed: {
    pokemonName() {
      // Find the object with the label 'Name'
      return this.findObject('Name')
    },
    pokemonId() {
      // Find the object with label 'Id'
      return this.findObject('Id')
    }
  },
  methods: {
    // Find the object with label
    findObject(searchTerm: string) {
      const object = this.pokemonBasicInfo.find((info) => info.label === searchTerm)
      return object?.value || 'Unknown'
    },
    // Determine the heading tag based on the label
    setHeadingTag(label: string) {
      switch (label) {
        case 'Name':
          return 'h2'
        case 'Id':
        case 'Order':
          return 'h3'
        default:
          return 'h4'
      }
    }
  }
})
</script>

<template>
  <section class="pokemon-basic-info">
    <!-- Image -->
    <div class="pokemon-basic-info__subsection">
      <img
        :alt="`${pokemonName} main image`"
        class="pokemon-basic-info__subsection__image"
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`"
      />
    </div>
    <!-- Info -->
    <div class="pokemon-basic-info__subsection">
      <component
        v-for="(info, index) in pokemonBasicInfo"
        :key="index"
        :is="setHeadingTag(info.label)"
        class="pokemon-basic-info__subsection__heading"
      >
        {{ info.label }}:
        <span class="pokemon-basic-info__subsection__heading__value">{{ info.value }}</span>
      </component>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.pokemon-basic-info {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin: 20px auto;

  @include size-m-up {
    grid-template-columns: 1fr 1fr;
  }

  @include size-l-up {
    grid-template-columns: 1fr 2fr;
  }

  &__subsection {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;

    &__image {
      width: 100%;
      aspect-ratio: 1 / 1;
    }

    &__heading {
      &__value {
        text-transform: capitalize;
        color: var(--text-black);
      }
    }
  }
}
</style>
