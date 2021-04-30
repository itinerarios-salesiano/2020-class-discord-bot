const Discord = require('discord.js')

const turmas = [
  {
    role: 'turma 2020',
    horario: 'Sexta-feira, das 15h35min às 17h20min',
    link: 'https://meet.google.com/lookup/czvnbmmdqc',
    color: 0x2980b9
  },
  {
    role: 'turma 2021',
    horario: 'Sexta-feira, das 13h30min às 15h15min',
    link: 'https://meet.google.com/lookup/cc6tnrjmtp',
    color: 0xe74c3c
  }
]


function aula(msg){
  let texto = ''
  let color = ''

  turmas.forEach((turma) => {
    if (msg.member.roles.cache.some(role => role.name === turma.role)) {
      texto = 'sua aula é '+turma.horario+' neste link '+turma.link
      color = turma.color
    }
  })
  if(texto === ''){
    texto = 'você não está cadastrado com nenhuma role de aluno. Não há aulas disponíveis'
    color = 0xff2d16
  }

  const embed = new Discord.MessageEmbed()
    .setTitle('Aula do '+ msg.author.username)
    .setColor(color)
    .setDescription( '<@'+msg.author+'>, '+texto)

  msg.channel.send(embed)
}

module.exports = aula
