"use strict"

/*
  Discord Chan Bot

  General purpose bot for general purpose things
*/

// Import external modules
const fs      = require("fs");         // To read the credentials file
const Discord = require("discord.js"); // The bot
const client  = new Discord.Client();

const db = require('./db.js');         // Database files

// For getMotivationalMessage
const motivational_images = [
  "D_M1.png",
  "D_M2.png",
  "D_M3.png",
  "D_M4.png",
  "D_M5.png",
  "D_M6.png",
  "D_M7.png",
  "D_M8.png",
  "HythGood.png",
  "HythGood2.png",
];

// Read bot credentials from a file and log in
let credentials = JSON.parse(fs.readFileSync('./client_keys/discord_chan.json',"utf8"));
// let credentials = JSON.parse(fs.readFileSync('./client_keys/test_bot.json',"utf8"));
client.login(credentials.token);

/**
*   @function initBot
*   Creates an instance of the Discord bot. Should only be called on app startup.
*/
exports.initBot = () => {

  console.log("Waking Discord Chan.");

  client.on("ready", () => {
    console.log("Discord Chan ready!");
  });

  client.on("message", (message) => {
    // Set cmd_prefix so we can change it while testing
    var cmd_prefix = "!";

    // Message is a command
    if( message.content.startsWith(cmd_prefix)){
      // Data we will need to reference
      var msg_array     = message.content.split(" ");
      var channel_id    = message.channel.id;
      var command       = msg_array[0].replace(cmd_prefix, "");
      var command_param = msg_array[1];
      var msg = "";

      switch(command){
        case "commands":
          var bot_commands = db.getCommands("discord-chan");
          msg = "Available commands for Discord Chan:\n"
          for(i=0;i<bot_commands.length;i++){
            msg += cmd_prefix+bot_commands[i].command+"\n"
          }
          break
        case "motivate":
          msg = getMotivationalMessage();
          break
        default:
          msg = db.getCommand(command, "discord-chan")
      }
      // Don't send empty messages
      if(msg != ""){
        message.channel.send(msg);
      }
    }

  });

  client.on("guildMemberAdd", (member) => {
    var msg = "";
        msg += ":sparkles: Thank you for joining The Gem-Exchange! :sparkles:\n\n We're glad you chose to give our community a try. If you have any questions or concerns, please feel free to contact any of the mods (Doritos Locos Tacos) or admins (Cheesy Gordita Crunches) and we will try to get back to you asap! If you're new, please consider checking out the server rules at <http://thegemexchange.net/discord> and perhaps writing out an intro for yourself at <#326947810203271168> so we can get to know you better. Thank you and enjoy your stay. We look forward to talking to you! \n\n";
        msg += "https://cdn.discordapp.com/attachments/293878589731110916/364931784296628235/D_Greeting.png";
    member.send(msg);
  });
};

function getMotivationalMessage(){
  var random_image = motivational_images[Math.floor(Math.random()*motivational_images.length)];
  var url = "https://raw.githubusercontent.com/juan0tron/gem-exchange-bot/master/assets/img/discord-chan/motivate/";
  var msg = url + random_image;
  return msg;
}
