const Discord = require('discord.js')

const turmas = [
  {
    id: '2020',
    role: 'turma 2020',
    horario: 'Sexta-feira, das 15h35min às 17h20min',
    link: 'https://meet.google.com/lookup/czvnbmmdqc',
    color: 0x2980b9
  },
  {
    id: '2021',
    role: 'turma 2021',
    horario: 'Sexta-feira, das 13h30min às 15h15min',
    link: 'https://meet.google.com/lookup/cc6tnrjmtp',
    color: 0xe74c3c
  }
]

function avisa_turma(msg, id){
  

  turmas.forEach((turma) => {
    if (turma.id == id) {
      let texto = `Atenção galera da ${turma.role}, nossa aula de ${turma.horario} já vai começar. Estou esperando vocês no link ${turma.link}`
      let color = turma.color
      const embed = new Discord.MessageEmbed()
      .setTitle(`Aula da turma ${id}`)
      .setColor(color)
      .setDescription( texto)
      msg.channel.send(embed)
    }
  })
}

function aviso(msg, argvs){
  

  if(argvs[1] == 'turma'){
    avisa_turma(msg, argvs[2])
  }
  


}

module.exports = aviso
