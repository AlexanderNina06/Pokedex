import { z } from 'zod';
import { Cache } from './pokecache.js'

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor() {
    this.#cache = new Cache(60000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      try{
        const url = pageURL ? pageURL : PokeAPI.baseURL + "/location-area";

        const cached = this.#cache.get<ShallowLocations>(url);
        if (cached) {
          console.log("[CACHE HIT]:", url);
          return cached.val;
        }
        console.log("[CACHE MISS]: Fetching", url);
        const response = await fetch(pageURL ? pageURL : PokeAPI.baseURL + '/location-area')
        if(!response.ok)
        {
          throw new Error(`${response.statusText}`);
        }

        const data = await response.json();
        const parsed = ShallowLocationsSchema.parse(data);

        this.#cache.add(url, parsed);

        return parsed;
      }
      catch(err){
          throw err;
      }
  }

  async fetchLocation(locationName: string): Promise<LocationArea> {
    try {
      const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

      const cached = this.#cache.get<LocationArea>(url);
      if (cached) {
        console.log("[CACHE HIT]:", url);
        return cached.val;
      }

      console.log("[CACHE MISS]: Fetching", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      const parsed = LocationAreaSchema.parse(data);

      this.#cache.add(url, parsed);

      return parsed;

    } catch (err) {
      throw err;
    }
  }
  
  async fetchPokemon(name: string): Promise<any> {
    try {
      const url = `${PokeAPI.baseURL}/pokemon/${name}`;

      const cached = this.#cache.get<any>(url);
      if (cached) {
        console.log("[CACHE HIT]:", url);
        return cached.val;
      }

      console.log("[CACHE MISS]: Fetching", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Could not fetch pokemon: ${response.statusText}`);
      }

      const data = await response.json();

      this.#cache.add(url, data);

      return data;

    } catch (err) {
      throw err;
    }
  }


}

export type LocationStub = z.infer<typeof LocationStubSchema>;
export type ShallowLocations = z.infer<typeof ShallowLocationsSchema>;
export type LocationArea = z.infer<typeof LocationAreaSchema>;


export const LocationStubSchema = z.object({
  name: z.string(),
  url: z.string().url(), 
});

export const ShallowLocationsSchema = z.object({
  count: z.number().int().optional(), 
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z.array(LocationStubSchema),
});

export const LocationAreaSchema = z.object({
  pokemon_encounters: z.array(
    z.object({
      pokemon: z.object({
        name: z.string()
      })
    })
  )
});

