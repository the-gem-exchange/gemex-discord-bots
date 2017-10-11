"use strict"

/*
  Virgil Bot

  Replies with silly images
*/

// Import external modules
const fs      = require("fs");         // To read the credentials file
const Discord = require("discord.js"); // The bot
const client  = new Discord.Client();

const db = require('./db.js');         // Database files

// Read bot credentials from a file and log in
let credentials = JSON.parse(fs.readFileSync('./client_keys/virgil.json',"utf8"));
// let credentials = JSON.parse(fs.readFileSync('./client_keys/test_bot.json',"utf8"));
client.login(credentials.token);

/**
*   @function    initBot
*   @description Creates an instance of the Discord bot. Should only be called on app startup.
*/
exports.initBot = () => {

  console.log("Waking Virgil.");

  client.on("ready", () => {
    console.log("Virgil ready!");
  });

  client.on("message", (message) => {
    // Set cmd_prefix so we can change it while testing
    var cmd_prefix = "!";

    // Message is a command
    if( message.content.startsWith(cmd_prefix)){
      // Data we will need to reference
      var msg_array  = message.content.split(" ");
      var channel_id = message.channel.id;
      var command    = msg_array[0].replace(cmd_prefix, "");
      var msg = "";

      switch(command){
        case "commands":
          var bot_commands = db.getCommands("virgil");
          msg = "Available commands for Virgil:\n"
          for(i=0;i<bot_commands.length;i++){
            msg += cmd_prefix+bot_commands[i].command+"\n"
          }
          break
        default:
          msg = db.getCommand(command, "virgil")
      }
      // Don't send empty messages
      if(msg != ""){
        message.channel.send(msg);
      }
    }

  });
};
