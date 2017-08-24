"use strict"

/*
  Virgil Bot

  Replies with silly images
*/

// Import external modules
const fs      = require("fs");         // To read the credentials file
const Discord = require("discord.js"); // The bot
const client  = new Discord.Client();

const commands_db = require("./db/commands.json");

// Read bot credentials from a file and log in
let credentials = JSON.parse(fs.readFileSync('./client_key.json',"utf8"));
client.login(credentials.token);

/**
*   @function initBot
*   Creates an instance of the Discord bot. Should only be called on app startup.
*/
exports.initBot = () => {

  console.log("Bot initializing.");

  client.on("ready", () => {
    console.log("Bot ready!");
  });

  client.on("message", (message) => {
    // Set cmd_prefix so we can change it while testing
    var cmd_prefix = "$"//"!";

    // Message is a command
    if( message.content.startsWith(cmd_prefix)){
      // Data we will need to reference
      var msg_array  = message.content.split(" ");
      var channel_id = message.channel.id;
      var command    = msg_array[0].replace(cmd_prefix, "");

      switch(command){
        case "commands":
          break;
        default:

      }

      message.channel.send(msg);
    }

  });
};

/**
*   @function getCommand
*   Creates an instance of the Discord bot. Should only be called on app startup.
*/
exports.getCommand = () => {

};
