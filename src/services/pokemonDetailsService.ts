import type { PokemonDetails } from '@/types/pokemonDetails'

/**
 * Processes Pokémon details data and returns a structured object with key information.
 *
 * @param {PokemonDetails | null} pokemonDetails - The details of the Pokémon fetched from the API.
 * @returns {Object} - A processed object containing the Pokémon's types, images, held items, moves, and abilities.
 */
export function processPokemonData(pokemonDetails: PokemonDetails | null) {
  if (!pokemonDetails) return {}

  const types = pokemonDetails.types.map((typeObj) => typeObj.type.name).join(', ')

  const images = Object.values(pokemonDetails.sprites).filter((item) => typeof item === 'string')

  const heldItems = pokemonDetails.held_items.map((heldItem) => heldItem.item.name).join(', ')

  const moves = pokemonDetails.moves.map((moveObj) => moveObj.move.name)

  const hiddenAbilities = pokemonDetails.abilities
    .filter((ability) => ability.is_hidden)
    .map((abilityObj) => abilityObj.ability.name)

  const nonHiddenAbilities = pokemonDetails.abilities
    .filter((ability) => !ability.is_hidden)
    .map((abilityObj) => abilityObj.ability.name)

  // Returns an object containing all the processed Pokémon data
  return {
    types,
    images,
    heldItems,
    moves,
    hiddenAbilities,
    nonHiddenAbilities
  }
}
