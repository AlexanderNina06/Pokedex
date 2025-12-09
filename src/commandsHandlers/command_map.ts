import type { State } from "../state.js";

export async function commandMap(state: State): Promise<void> {
  try {
    const api = state.pokeAPI;

    const locations = await api.fetchLocations(state.nextLocationsURL);

    locations.results.forEach(loc => console.log(loc.name));

    state.nextLocationsURL = locations.next ?? undefined;
    state.prevLocationsURL = locations.previous ?? undefined;

  } catch (err) {
    console.error("Failed to fetch locations:", err);
  } finally {
    state.reader.prompt();
  }
}
