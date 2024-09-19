// Pokémon Details related types
export interface PokemonType {
  type: { name: string }
}

export interface PokemonHeldItem {
  item: { name: string }
}

export interface PokemonMove {
  move: { name: string }
}

export interface PokemonAbility {
  ability: { name: string }
  is_hidden: boolean
}

export interface PokemonImage {
  image: string
}

export interface PokemonDetails {
  name: string
  id: number
  order: number
  weight: number
  height: number
  base_experience: number
  types: PokemonType[]
  held_items: PokemonHeldItem[]
  moves: PokemonMove[]
  abilities: PokemonAbility[]
  sprites: PokemonImage[]
}
