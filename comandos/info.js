const Discord = require('discord.js');

function GetinfoFromMencion(mencion, msg) {

    // Verificando se o 'mencion' é uma pessoa, e pegando os dados dela...
    if (typeof(mencion) != 'object') return msg.channel.send("**Mencione uma pessoa corretamente, seu cabaço!**");

    // Embed simples do discord com as informações da mencion....
    const userinfoembed = new Discord.MessageEmbed()
        .setTitle(`Informações de ${mencion.username}`)
        .addField('Username', value = `${mencion.username + '#' + mencion.discriminator}`, inline = true)
        .addField('ID', value = `${mencion.id}`, inline = true)
        .setColor('#00FBFC')
        .setImage(mencion.displayAvatarURL({ dynamic: true }));

    return msg.channel.send(userinfoembed)
}
module.exports = GetinfoFromMencion