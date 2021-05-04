async function WriteOrUpdateUsersLvl(user, messageLen) {

    const JsonReader = require('./JSONReader.js')
    const fs = require('fs');
    let GivenUserId = user.id;
    let XP = messageLen * 1.7
    JsonReader('./userslevel.json', (err, UserJson) => {
        if (err) {
            console.log('Error reading file:', err)
            return
        }
        UserJson[GivenUserId] = {
            Level: 0,
            CurrentXp: XP,
            MaxXp: 300
        }
        fs.writeFile('./userslevel.json', JSON.stringify(UserJson), (err) => {
            if (err) console.log('Error writing file:', err)
        })



    })

    async function AddUserToJson(userid, userjson, xp) {

        let UserObj = new Object
        UserObj[userid] = {
            Level: 0,
            CurrentXp: xp,
            MaxXp: 300
        }
        let jsonString = JSON.stringify(UserObj)
        fs.writeFile('./userslevel.json', jsonString, err => {
            if (err) {
                console.log('Erro ao adicionar um novo user', err)
            } else {
                console.log('User adicionado com sucesso')
            }
        })

    }


}

module.exports = WriteOrUpdateUsersLvl;