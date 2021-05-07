require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const ytdl = require('ytdl-core-discord');
const prefix = "+"
const ServerId = process.env.SERVER_ID
const RoleChannelId = process.env.ROLES_CHANNEL_ID
const RolesMessageId = process.env.ROLES_MSG_ID
const TristeChannelId = process.env.TRISTE_CHANNEL_ID



const ping = require('./comandos/ping.js')
const aula = require('./comandos/aula')
const comandos = require('./comandos/comandos')
const x1 = require('./comandos/x1.js')
const GiveRole = require('./comandos/giverole.js')
const aviso = require('./comandos/aviso.js')
const WriteOrUpdateUsers = require('./comandos/writeusers.js')
const CheckLvl = require('./comandos/CheckLvl.js')

client.on('ready', async() => {
    console.log(`Logged in as ${client.user.tag}!`)
    let s = await client.guilds.cache.get(ServerId)
    let c = await s.channels.cache.get(RoleChannelId)
    c.messages.fetch({ around: RolesMessageId, limit: 1 })
});

client.on('message', async msg => {

    if (msg.author.bot) return
    WriteOrUpdateUsers(msg.author, msg.content.length, msg);
    let command = ''
    const argvs = msg.content.split(" ");
    if (argvs[0].startsWith(prefix)) {
        command = argvs[0].replace(prefix, "").toLocaleLowerCase();
    } else {
        return
    }
    if (command === 'comandos') {
        comandos(prefix, msg)
    }
    if (command === 'aviso') {
        if (msg.member.roles.cache.some(role => role.name === 'Professor')) {
            aviso(msg, argvs, await client.guilds.cache.get(ServerId))
        }
    }
    if (command === 'roles') {

        const roleEmbed = new Discord.MessageEmbed()
            .setTitle(`Seja bem vindo, reaja com o emoji de sua turma para desfrutar melhor do servidor !!!`)
            .setDescription('Turma 2020 : 👽 , Turma 2021: 👾 .')
            .setColor('#cf48db')
            .setImage(client.user.displayAvatarURL({ size: 4096, dynamic: true }));

        msg.channel.send(roleEmbed).then(sentMessage => {

            sentMessage.react('👽');
            sentMessage.react('👾');
            console.log(sentMessage.id)

        });
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

    if (command === 'lvl') CheckLvl(msg.author, msg)

    if (command === 'chegae') {
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
            connection.play(await ytdl('https://www.youtube.com/watch?v=VWaQcKiAj_Q'), { type: 'opus' });
        } else {
            msg.reply('O vacilão, quer que eu entre onde? Entra ai nun canal de voz!');
        }
    }

});

client.on("messageReactionAdd", async(reaction, user, message) => {

    // Vendo se a reação é parcial...
    if (reaction.message.partial) await reaction.message.fetch();
    if (user.bot) return
    if (reaction.message.id == RolesMessageId) {

        if (reaction.emoji.name === '👽' || reaction.emoji.name === '👾') GiveRole(user, reaction.emoji.name, await client.guilds.cache.get(ServerId))
        return reaction.users.remove(user.id);



    }
})
client.on('voiceStateUpdate', async(oldState, newState) => {
    if (newState.channelID == TristeChannelId) {
        const connection = await newState.channel.join();
        connection.play(await ytdl('https://www.youtube.com/watch?v=qYS0EeaAUMw'), { type: 'opus' });
    }
})


client.login(process.env.DISCORD_TOKEN)