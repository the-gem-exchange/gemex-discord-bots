
const commands = require("./db/commands.json");
const virgil = require("./virgil.js");
const bots = [
  {
    "name":"virgil"
  }
];

exports.table = {
  "commands":commands,
}

/**
 *  @function getCommand()
 *
 *  @input bot = The bot you are retrieving the command for
 *  @return reply = The response from the requested command
 */
exports.getCommand = (command, bot) => {
  for(i=0;i<commands.length;i++){
    if(commands[i].command == command){
      return commands[i].reply
    }
  }
  return ""
};


/**
 *  @function getCommands()
 *
 *  @input bot = The bot you are retrieving commands for
 *  @return available_commands = array of commands
 */
exports.getCommands = (bot) => {
  var available_commands = []
  for(i = 0; i < commands.length; i++){
    if(commands[i].bot == bot)
      available_commands.push(commands[i])
  }
  return available_commands
}
