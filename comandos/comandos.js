const Discord = require('discord.js')

function comandos(prefix, msg) {
    const embed = new Discord.MessageEmbed()
        .setTitle('Comandos do BOT')
        .setColor(0x00ff5e)
        .setDescription('Lista de Comandos válidos')
        .setImage(client.user.displayAvatarURL({ size: 4096, dynamic: true }))
        .addField(`${prefix}ping`, 'Este comando retorna Pong!.')
        .addField(`${prefix}aula`, 'Este comando manda o link da sua aula do itinerário.')
        .addField(`${prefix}lvl`, 'Este comando retorna as informações do seu level.')
        .addField(`${prefix}x1`, 'Este comando te permite tirar um X1 com seu amigo.')
        .addField(`${prefix}chegae`, 'Este comando faz eu entrar na call e tocar uma musica pog!')
        .addField(`${prefix}info`, 'Este comando retorna as informações do usuário mencionado.')
    msg.channel.send(embed)
}

module.exports = comandos;