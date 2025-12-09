import { commandExit } from './commandsHandlers/command_exit.js'
import { commandHelp} from './commandsHandlers/command_help.js'
import { CLICommand } from './state.js'
import {State} from "./state.js"
import { commandMap } from "./commandsHandlers/command_map.js";
import { commandMapBack } from "./commandsHandlers/command_mapb.js";
import { commandExplore } from "./commandsHandlers/command_explore.js";
import { commandCatch } from './commandsHandlers/command_catch.js';
import { commandInspect } from './commandsHandlers/command_inspect.js';
import { commandPokedex } from './commandsHandlers/command_pokedex.js';


export function cleanInput(input: string) : string[]{
  return input.toLocaleLowerCase().trim().split(/\s+/)
}

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Shows next 20 locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Shows previous 20 locations",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "explore pokeworld",
      callback: commandExplore
    },
    catch: {
      name: "catch",
      description: "catch a pokemon!",
      callback: commandCatch
    },
    inspect: {
      name: "inspect",
      description: "Inspect a caught pokemon",
      callback: commandInspect
    },
    pokedex : {
      name: "pokedex",
      description: "Shows all caught pokemon",
      callback: commandPokedex
    }
  };
}

export async function startREPL(state : State){

  const rl = state.reader;
  
  const commands = state.commands

  rl.prompt();

  rl.on("line", async (inputLine) => {
      
      const command = cleanInput(inputLine)[0]

      if(command in commands){
        await commands[command].callback(state, inputLine)
      }else{
        console.log("Unknown command")
        rl.prompt()
      }
      
  })

}