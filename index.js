/**
*  index.js
*
*  Run this file to start all Discord bots!
*/

// Internal modules
const virgil       = require('./virgil.js');
const discord_chan = require('./discord-chan.js');

// Initialize the Discord Bot
console.log("Starting Gem Exchange bots.");
virgil.initBot();
discord_chan.initBot();
