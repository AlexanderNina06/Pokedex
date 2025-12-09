import { State } from "../state.js";

export async function commandCatch(state: State, inputLine: string) {
  const parts = inputLine.split(/\s+/);
  const pokemonName = parts.slice(1).join("-").toLowerCase();

  if (!pokemonName) {
    console.log("Usage: catch <pokemon>");
    state.reader.prompt();
    return;
  }

  try {
    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const api = state.pokeAPI;

    const pokemon = await api.fetchPokemon(pokemonName);

    const baseExp = pokemon.base_experience;

    
    const catchChance = Math.max(0.1, 1 - baseExp / 300);

    if (Math.random() < catchChance) {
      console.log(`${pokemonName} was caught!`);
      state.pokedex[pokemonName] = pokemon; 
    } else {
      console.log(`${pokemonName} escaped!`);
    }

  } catch (err) {
    console.error("Failed to catch pokemon:", err);
  } finally {
    state.reader.prompt();
  }
}
