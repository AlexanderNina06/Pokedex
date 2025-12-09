import { State } from "../state.js";

export async function commandPokedex(state: State) {
  try {
    const entries = Object.keys(state.pokedex);

    if (entries.length === 0) {
      console.log("Your Pokedex is empty. Catch some pokemon!");
      return;
    }

    console.log("Your Pokedex:");
    for (const name of entries) {
      console.log(` - ${name}`);
    }

  } catch (err) {
    console.error("Failed to show pokedex:", err);
  } finally {
    state.reader.prompt();
  }
}
