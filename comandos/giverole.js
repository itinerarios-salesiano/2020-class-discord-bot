const Discord = require('discord.js')

async function GiveRole(user, emoji, guild) {
    let RoleToAdd = ''
    const member = guild.members.cache.get(user.id);
    if (emoji === '👽') RoleToAdd = 'turma 2020'
    if (emoji === '👾') RoleToAdd = 'turma 2021'
    RoleToAdd = await guild.roles.cache.find(role => role.name === RoleToAdd)
    if (member.roles.cache.has(RoleToAdd.id)) return member.roles.remove(RoleToAdd)
    member.roles.add(RoleToAdd)


}

module.exports = GiveRole;