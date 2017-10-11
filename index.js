/**
*  index.js
*
*  Run this file to start all Discord bots!
*/

// Internal modules
const virgil       = require('./virgil.js');
const discord_chan = require('./discord-chan.js');

const params = process.argv[2];

// Initialize the Discord Bot
console.log("Starting Gem Exchange bots.");

switch(params){
  case "virgil":
    virgil.initBot();
    break;
  case "discordchan":
    discord_chan.initBot();
    break;
  default:
    virgil.initBot();
    discord_chan.initBot();
}
