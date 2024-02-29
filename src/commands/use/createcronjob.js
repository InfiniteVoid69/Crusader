const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createcronjob')
    .setDescription("Creates a new cron job to send a message")
    .addIntegerOption((option) => 
      option.setName("timestamp").setDescription('time you want the cron to run, uses discord timestamp').setRequired(true)
    ),
  async execute(interaction, client) {
    let timestamp = interaction.options.getInteger("timestamp");
    function parse(str) {
      var args = [].slice.call(arguments, 1),
          i = 0;
  
      return str.replace(/%s/g, () => args[i++]);
    }
    s = parse(' ```<t:%s:t>``` ', timestamp);
    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setTitle(`Test`)
      .setDescription(`Cron Job Test`)
      .addFields([
        {
          name: 'Time Message Will be sent',
          value: s,
          inline: true
        },
      ])
      .setTimestamp(Date.now())
      .setFooter({
        text: `Requested By: ${interaction.user.username}`
      })
    await interaction.reply({
      embeds: [embed]
    });
  },
};