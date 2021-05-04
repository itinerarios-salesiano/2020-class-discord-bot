const Discord = require('discord.js')

function CheckLvl(author, msg) {

    const JsonReader = require('./JSONReader.js')
    const fs = require('fs');
    JsonReader('./userslevel.json', (err, UserJson) => {
        if (err) {
            console.log('Error reading file:', err)
            return
        }
        let lvl = ''
        let Maxp = ''
        let XP = ''
        try {
            lvl = UserJson[author.id].Level
            Maxp = UserJson[author.id].MaxXp
            XP = UserJson[author.id].CurrentXp

        } catch (err) {
            XP = 0
            lvl = 1
            Maxp = 800

        }
        const embed = new Discord.MessageEmbed()
            .setTitle('Aqui as informações sobre seu level !')
            .setColor(0x00ff5e)
            .addField('Level', `Level **${lvl}**,  **${((XP * 100 ) / Maxp)|0}%** para o Level **${lvl + 1}**`)
            .addField('XP:', `**${XP|0}/${Maxp}**`)
            .setImage(author.displayAvatarURL({ dynamic: true }))


        msg.channel.send(embed)


    })
}
module.exports = CheckLvl