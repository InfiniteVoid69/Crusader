const { SlashCommandBuilder, EmbedBuilder, time } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription("Returns The Tageted Users Information")
    .addUserOption((option) =>
      option.setName("target").setDescription('the targeted user').setRequired(false)
    ),
  async execute(interaction, client) {
    let target = interaction.options.getUser("target");
    if (!target) target = interaction.user
    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setTitle(`${target?.username}'s Info`)
      .setDescription(`||${target?.id}||`)
      .addFields([
        {
          name: 'User Mention',
          value: `<@${target.id}>`,
          inline: true
        },
        {
          name: 'User Display',
          value: `${target.globalName}`,
          inline: true
        },
        { 
          name: 'Account Created',
          value: time(target.createdAt),
          inline: false
        }
      ])
      .setImage(target.displayAvatarURL())
      .setTimestamp(Date.now())
      .setFooter({
        text: `Requested By: ${interaction.user.username}`
      })
    await interaction.reply({
      embeds: [embed]
    });
  },
};