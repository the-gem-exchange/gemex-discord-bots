// Import external modules
const fs      = require("fs");         // To read the credentials file
const Discord = require("discord.js"); // The bot
const client  = new Discord.Client();

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
    // Message is a command
    if( message.content.startsWith("!angst")){
      var msg = "https://cdn.discordapp.com/attachments/293878589731110916/347966825239412737/Angst_counter.png";
      message.channel.send(msg);
    }
  });
};

/**
*   @function sendMessage
*   @input message:string     The message you want to send to Discord
*   @input channel_id:string  The ID of the channel you want the message to be sent to
*/
exports.sendMessage = (message, channel_id) => {
  client.on("ready", () => {
    // console.log(message, channel_id);
    var channel = client.channels.get(channel_id);
    channel.send(message);
  });
};
