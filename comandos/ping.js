function ping(msg) {
  msg.react('🦧').then(() => msg.react('🦄')).then(() => msg.react('🕊️'));

  const filter = (reaction, user) => {
    return ['🦧', '🦄', '🕊️'].includes(reaction.emoji.name) && user.id === msg.author.id;
  };

  msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
      const reaction = collected.first();
      if (reaction.emoji.name === '🦧') {
        msg.reply('Você escolheu o grande mamaco');
      } else if (reaction.emoji.name === '🦄') {
        msg.reply('Vôce agora detem o poder do arco-iris');
      } else if (reaction.emoji.name === '🕊️') {
        msg.reply('Vôce escolheu errado');
      }
    })
    .catch(collected => {
      msg.reply('you reacted with neither a thumbs up, nor a thumbs down.');
    });
}

module.exports = ping;