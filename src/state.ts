import { createInterface, type Interface } from "readline";
import { getCommands } from "./repl.js"; 
import { PokeAPI } from "./pokeapi.js";

export type State = {
  reader: Interface;
  commands: Record<string, CLICommand>;
  nextLocationsURL?: string;
  prevLocationsURL?: string;
  pokeAPI: PokeAPI;
  pokedex: Record<string, any>; 
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, inputLine: string) => Promise<void>;
};

export function initState() : State{
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
  });
  return {
  reader: rl,
  commands: {},
  pokeAPI: new PokeAPI(),
  nextLocationsURL: undefined,
  prevLocationsURL: undefined,
  pokedex: {}   
};
}