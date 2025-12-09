import { State } from "../state.js";

export async function commandExplore(state: State, inputLine: string) {
  const parts = inputLine.split(/\s+/);
  const areaSlug = parts.slice(1).join("-");

  if (!areaSlug) {
    console.log("Usage: explore <location-area>");
    state.reader.prompt();
    return;
  }

  try {
    console.log(`Exploring ${areaSlug}...\n`);

    const api = state.pokeAPI;
    const location = await api.fetchLocation(areaSlug);

    const pokemonNames = location.pokemon_encounters.map(
      (enc) => enc.pokemon.name
    );

    if (pokemonNames.length === 0) {
      console.log("No Pokémon found here.");
    } else {
      console.log("Found Pokémon:");
      for (const name of pokemonNames) {
        console.log(`- ${name}`);
      }
    }

  } catch (err) {
    console.error("Failed to explore location, try again.");

  } finally {
    state.reader.prompt();
  }
}
