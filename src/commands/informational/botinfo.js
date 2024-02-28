const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription("Returns The Bot's Information"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true
    });
    const embed = new EmbedBuilder()
      .setColor('Grey')
      .setTitle(`Bots Info`)
      .addFields([
        {
          name: 'API Latency:',
          value: `${client.ws.ping}`,
          inline: false
        },
        {
          name: 'Client Ping:',
          value: `${message.createdTimestamp - interaction.createdTimestamp}ms`,
          inline: false
        }
      ])
      .setTimestamp(Date.now())
      .setFooter({
        text: `Requested By: ${interaction.user.username}`
      })
    await interaction.editReply({
      embeds: [embed]
    });
  },
};