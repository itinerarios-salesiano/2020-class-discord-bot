async function WriteOrUpdateUsersLvl(user, messageLen, msg) {

    const JsonReader = require('./JSONReader.js')
    const fs = require('fs');
    let GivenUserId = user.id;
    JsonReader('./userslevel.json', (err, UserJson) => {
        if (err) {
            console.log('Error reading file:', err)
            return
        }

        if (UserJson[GivenUserId] == undefined) {
            let XP = messageLen * 1.7
            UserJson[GivenUserId] = {
                Level: 1,
                CurrentXp: XP,
                MaxXp: 300
            }
        } else {
            let XP = UserJson[GivenUserId].CurrentXp + (messageLen * 1.3)
            let lvl = UserJson[GivenUserId].Level
            let Maxp = UserJson[GivenUserId].MaxXp
            if (XP >= Maxp) {
                lvl += 1
                XP = Maxp
                Maxp = Maxp * 1.5
                msg.reply(`Parabéns você upou de nível, seu nível atual é ${lvl}`)
            }
            UserJson[GivenUserId] = {
                Level: lvl,
                CurrentXp: XP,
                MaxXp: Maxp
            }

        }

        fs.writeFile('./userslevel.json', JSON.stringify(UserJson), (err) => {
            if (err) console.log('Error writing file:', err)
        })



    })

}

module.exports = WriteOrUpdateUsersLvl;