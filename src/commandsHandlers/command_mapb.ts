import type { State } from "../state";

export async function commandMapBack(state: State): Promise<void> {
  try {
    const api = state.pokeAPI;

    if (!state.prevLocationsURL) {
      console.log("No previous locations.");
      state.reader.prompt();
      return;
    }

    const locations = await api.fetchLocations(state.prevLocationsURL);

    locations.results.forEach(loc => console.log(loc.name));

    state.nextLocationsURL = locations.next ?? undefined;
    state.prevLocationsURL = locations.previous ?? undefined;

    state.reader.prompt();
  } catch (err) {
    console.error("Failed to fetch previous locations:", err);
    state.reader.prompt();
  }
}
