const { MessageEmbed } = require('discord.js');
const { Manager } = require('erela.js');
const { erela } = require('../../config/config.json');

module.exports = {
	connect: (client) => {
		client.music = new Manager({
			nodes: [{
				host: erela.host,
				port: 8080,
				password: erela.password
			}],
			autoPlay: true,
			setDeaf: true,
			send(id, payload) {
				const guild = client.guilds.cache.get(id);
				if (guild) guild.shard.send(payload);
			}
		});

		client.music.on('nodeConnect', async () => {
			console.log('Bot connected to Lavalink node.');
		});

		client.music.on('nodeDisconnect', async () => {
			console.log('Bot disconnected from Lavalink node.');
		});

		client.music.on('trackStart', async (player, track) => {
			client.channels.cache.get(player.textChannel).send(new MessageEmbed()
				.setColor('PURPLE')
				.setTitle('**Now Playing**')
				.setDescription(`${track.title}`)
			);
		});

		client.music.on('playerMove', async (player) => {
			client.channels.cache.get(player.textChannel).send(new MessageEmbed()
				.setColor('PURPLE')
				.setDescription('Detected that the bot was moved. Pausing playback.')
			);
			if (player.playing) player.pause(true);
			return;
		});

		client.music.on('queueEnd', (player) => {
			// const wait = (time) => new Promise(resolve => setTimeout(resolve, time));
			console.log(`Queue finished. Starting AFK Timer.`);
			client.channels.cache.get(player.textChannel).send(new MessageEmbed()
				.setColor('PURPLE')
				.setTitle('Queue finished.')
			);
			/* .then(async () => {
					//await wait(300000);
					await wait(5000);
					await player.destroy(player.guild.id);
					console.log(`Player destroyed due to inactivity.`);
					client.channels.cache.get(player.textChannel).send(new MessageEmbed()
						.setColor('PURPLE')
						.setDescription('Leaving voice channel due to inactivity. Something something please give my creator (Ascenscion#1870 || @546487471479848970) money and I\'ll stay forever. :^)')
					);
				}); */
			return;
		});
	}

};
