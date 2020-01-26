"use strict"

/*
	Discord Chan Bot
*/

const fs      = require("fs");         // To read the credentials file
const fetch   = require('node-fetch'); // To make HTTP requests to the website
const Discord = require("discord.js"); // The bot
const client  = new Discord.Client();

const credentials = JSON.parse(fs.readFileSync('./client_keys/test_bot.json',"utf8"));
// const credentials = JSON.parse(fs.readFileSync('./client_keys/discord_chan.json',"utf8"));

client.login(credentials.token);

const command_server = 'https://thegemexchange.net';
// const command_server  = 'http://localhost:8000';

// These are specific commands that need to be created on the website to work.
// All hard-coded commands will be placed here for easy reference / modification.
const welcome_command = 'welcomemessage';
const list_command    = 'commands';
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
		// This character goes before all commands (ie !foo, !bar, !etc)
		var command_prefix = "!";

		// Message is a command
		if(message.content.startsWith(command_prefix)){
			let command = message.content.split(" ")[0].replace(command_prefix, "");

			// Return a list of all available commands from server
			if(command == list_command){
				fetchCommandMessage(list_command).then((reply) => {
					message.channel.send(JSONtoMarkdown(reply.text));
				});
			}
			// Check the website for the command and reply if it exists
			else{
				fetchCommandMessage(command)
					.then((reply) => {
						if(reply.image){
							message.channel.send(new Discord.RichEmbed().setImage(reply.image));
						}
						else if(reply.text){
							message.channel.send(JSONtoMarkdown(reply.text));
						}
					})
					.catch((error) => {
						console.error(`Error: !${command}`, error)
					})
			}
		}

	});

	client.on("guildMemberAdd", (member) => {
		fetchCommandMessage(welcome_command).then((reply) => {
			member.send(JSONtoMarkdown(reply.text));
		});
	});
};

/**
 *  @function fetchCommandMessage()
 *
 *  @input {String} command = The command name
 *  @return {Promise} reply = The response from the requested command
 */
function fetchCommandMessage(command){
	return new Promise((resolve, reject) => {
		fetch(`${command_server}/bot-commands/${command}/`)
			// Respond with a message if the command exists
			.then((response) => {
				response.json()
					.then((data) => {
						resolve(data);
					})
					.catch((error) => {
						console.error("Error parsing command JSON", error);
						reject();
					})
			})
			.catch((error) => {
				console.error("Error fetching command", error);
				reject();
			});
	});
}

/**
 * @function JSONtoMarkdown()
 * @description Fixes formatting errors caused by retrieving markdown text in JSON format
 * @input {String} text = JSON formatted text
 * @return {String} Markdown formatted text
 */
function JSONtoMarkdown(text){
	let markdown = "";

	// Fix escaped newline characters
	markdown = text.replace(/\\n/g, '\n');

	return markdown
}
