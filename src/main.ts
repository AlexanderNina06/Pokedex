import { startREPL } from "./repl.js";
import { initState } from "./state.js"
import { getCommands } from "./repl.js";


function main() {
  const state = initState();
  state.commands = getCommands();
  startREPL(state);
}

main();