const Discord = require('discord.js')

function comandos(prefix, msg) {
    const embed = new Discord.MessageEmbed()
        .setTitle('Comandos do BOT')
        .setColor(0x00ff5e)
        .setDescription('Lista de Comandos válidos')
        .setImage('https://i.imgur.com/0dbXdP1.jpeg')
        .addField(prefix + 'ping', 'Comando Ping')
        .addField(prefix + 'aula', 'Este comando...')
        .addField(prefix + 'lvl', 'Este comando retorna as informações do seu level')


    msg.channel.send(embed)
}

module.exports = comandos;