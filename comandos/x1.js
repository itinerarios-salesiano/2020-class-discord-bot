const Discord = require('discord.js');
const client = new Discord.Client();

function MakeX1(mencion, message) {

    // Vendo se o Autor do comando marcou alguém corretamente
    if (typeof(mencion) != 'object') return message.channel.send("**Mencione uma  pessoa corretamente, seu cabaço!**");


    // Definindo as váriaveis para o comando, como a vida dos participantes...  
    let mentionIdd = mencion;
    let men = mencion
    let msgauthor = message.author
    let lifep1 = 100;
    let lifep2 = 100;
    let round = 1;
    let filter = m => m.author.id === message.author.id
    let filtermen = m => m.author.id === mentionIdd.id

    // Função do round do P2, esperamos sua resposta, vendo se é End ou Punch...
    // Se for End encerra o comando, se for Punch calculamos o dano, tiramos da vida do P1...
    // Verificamos se a vida do P1 chegou a zero, senão damos início ao Roundo do P2 
    function P2RoundFightGame() {

        round = 2;
        message.channel.send(`${men}, seu turno, digite **Punch** para socar e **End** para encerrar a batalha. \n Você tem **15 segundos**, após isso a batalha irá se encerrar automaticamente!`).then(() => {
            message.channel.awaitMessages(filtermen, {
                    max: 1,
                    time: 15000,
                    errors: ['time']
                })
                .then(message => {
                    message = message.first()
                    if (message.content.toUpperCase() == 'PUNCH' || message.content.toUpperCase() == 'P') {
                        let p2dmg = Math.floor(Math.random() * 101);
                        lifep1 = lifep1 - p2dmg
                        if (lifep1 <= 0) {

                            message.channel.send(`${men} deu **${p2dmg}** de dano em ${msgauthor}, que agora tem **0** de vida !`)
                            message.channel.send(`A vida do ${msgauthor} chegou a zero! ${men} **ganhou a batalha !**`)
                        } else {
                            message.channel.send(`${men} deu **${p2dmg}** de dano em ${msgauthor}, que agora tem **${lifep1}** de vida !`)
                            P1RoundFightGame();
                        }
                    } else if (message.content.toUpperCase() == 'END' || message.content.toUpperCase() == 'END') {
                        message.channel.send(`Batalha encerrada!`)
                    } else {
                        message.channel.send(`Resposta inválida, reniciando o round ! `)
                        P2RoundFightGame();
                    }
                })
                .catch(collected => {
                    message.channel.send(`O tempo acabou, ${men} arregou ! Logo o ${msgauthor} **é o vitorioso !**`);
                    return
                });
        })
    }

    // Round do P1, mesmo esquema do Roundo do P2...
    function P1RoundFightGame() {

        message.channel.send(`${msgauthor}, Digite **Punch** para socar e **End** para encerrar a batalha.\n Você tem **15 segundos**, após isso a batalha irá se encerrar automaticamente!`).then(() => {
            message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 15000,
                    errors: ['time']
                })
                .then(message => {
                    message = message.first()
                    if (message.content.toUpperCase() == 'PUNCH' || message.content.toUpperCase() == 'P') {
                        let p1dmg = Math.floor(Math.random() * 101);
                        lifep2 = lifep2 - p1dmg
                        if (lifep2 <= 0) {

                            message.channel.send(`${msgauthor} deu **${p1dmg}** de dano em ${men}, que agora tem **0** de vida !`)
                            message.channel.send(`A vida de ${men} chegou a zero ! ${msgauthor} **ganhou a batalha !**`)
                        } else {
                            message.channel.send(`${msgauthor} deu **${p1dmg}** de dano em ${men}, que agora tem **${lifep2}** de vida !`)
                            P2RoundFightGame();

                        }
                    } else if (message.content.toUpperCase() == 'END' || message.content.toUpperCase() == 'END') {
                        message.channel.send(`Batalha encerrada!`)
                    } else {
                        message.channel.send(`Resposta inválida, reniciando o round ! `)
                        P1RoundFightGame();
                    }
                })
                .catch(collected => {
                    message.channel.send(`O tempo acabou, ${msgauthor} arregou ! Logo o **${men} é o vitorioso !**`);
                    return
                });
        })

    }
    P1RoundFightGame();

}
module.exports = MakeX1