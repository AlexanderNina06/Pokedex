import { State } from "../state.js";

export async function commandInspect(state: State, inputLine: string) {
  const parts = inputLine.split(/\s+/);
  const pokemonName = parts.slice(1).join("-").toLowerCase();

  if (!pokemonName) {
    console.log("Usage: inspect <pokemon>");
    state.reader.prompt();
    return;
  }

  const pokemon = state.pokedex[pokemonName];

  if (!pokemon) {
    console.log("you have not caught that pokemon");
    state.reader.prompt();
    return;
  }

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);

  console.log("Stats:");
  pokemon.stats.forEach((s: any) => {
    console.log(`  -${s.stat.name}: ${s.base_stat}`);
  });

  console.log("Types:");
  pokemon.types.forEach((t: any) => {
    console.log(`  - ${t.type.name}`);
  });

  state.reader.prompt();
}
