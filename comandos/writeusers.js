async function WriteOrUpdateUsersLvl(user, messageLen, msg) {

    const JsonReader = require('./JSONReader.js')
    const fs = require('fs');
    let GivenUserId = user.id;
    JsonReader('./userslevel.json', (err, UserJson) => {
        if (err) {
            console.log('Error reading file:', err)
            return
        }

        try {
            let XP = UserJson[GivenUserId].CurrentXp + (messageLen * 1.3)
            let lvl = UserJson[GivenUserId].Level
            let Maxp = UserJson[GivenUserId].MaxXp
            if (XP >= Maxp) {
                lvl = lvl + 1
                XP = Maxp
                Maxp = Maxp * lvl
                msg.reply(`Parabéns você upou de nível, seu nível atual é ${lvl}`)
            }
            UserJson[GivenUserId] = {
                Level: lvl,
                CurrentXp: XP,
                MaxXp: Maxp
            }
        } catch (err) {
            let XP = messageLen * 1.3
            UserJson[GivenUserId] = {
                Level: 1,
                CurrentXp: XP,
                MaxXp: 800
            }

        }

        fs.writeFile('./userslevel.json', JSON.stringify(UserJson), (err) => {
            if (err) console.log('Error writing file:', err)
        })



    })

}

module.exports = WriteOrUpdateUsersLvl;