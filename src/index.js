// link: https://discord.com/api/oauth2/authorize?client_id=775378069523398686&permissions=8&redirect_uri=http%3A%2F%2Fokirshen.github.io%2F8ball&scope=bot

const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();

const repliesRaw = fs.readFileSync('replies.json');
const replies = JSON.parse(repliesRaw);
function getRandomReply() {
	const reply =
		replies.replies[Math.floor(Math.random() * replies.replies.length)];
	reply.emoji = replies.emojis[reply.type];

	return reply;
}

const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
	if (msg.content.startsWith('8ball')) {
		const reply = getRandomReply();
		msg.reply(`${reply.emoji} ${reply.msg}`);
	}
});

client.login(process.env.TOKEN);
