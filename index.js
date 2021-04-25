require('dotenv').config()
const Discord = require('discord.js')
const { OpusEncoder } = require('@discordjs/opus')
const client = new Discord.Client()
const ytdl = require('ytdl-core-discord');
const prefix = "+"

const ping = require('./comandos/ping.js')
const aula = require('./comandos/aula')
const comandos = require('./comandos/comandos')
const x1 = require('./comandos/x1.js')


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', async msg => {
    let command = ''
    if (msg.content.startsWith(prefix)) {
        const argvs = msg.content.replace(prefix, "").split(" ");
        command = argvs.shift().toLocaleLowerCase();
    } else {
        return
    }
    if (command === 'comandos') {
        comandos(prefix, msg)
    }
    if (command === 'ping') {
        ping(msg)
    }
    if (command === 'top') {
        if (msg.member.roles.cache.some(role => role.name === 'Professor')) {
            msg.reply('Top mesmo');
        }
    }
    if (command === 'aula') {
        aula(msg)
    }
    if (command === "x1") x1(msg.mentions.users.first(), msg);

    if (command === 'chegae') {
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
            connection.play(await ytdl('https://www.youtube.com/watch?v=VWaQcKiAj_Q'), { type: 'opus' });
        } else {
            msg.reply('O vacilão, quer que eu entre onde? Entra ai nun canal de voz!');
        }
    }

});

client.on('voiceStateUpdate', async(oldState, newState) => {
    if (newState.channelID == '835234047596298270') {
        const connection = await newState.channel.join();
        connection.play(await ytdl('https://www.youtube.com/watch?v=qYS0EeaAUMw'), { type: 'opus' });
    }
})


client.login(process.env.DISCORD_TOKEN)