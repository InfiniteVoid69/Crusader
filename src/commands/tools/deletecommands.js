const { SlashCommandBuilder, EmbedBuilder, REST, Routes } = require('discord.js');
const { clientId } = process.env;
Token = process.env['TOKEN']
const rest = new REST({ version: "9" }).setToken(Token)


module.exports = {
  data: new SlashCommandBuilder()
    .setName("delcommands")
    .setDescription("Deletes all the bot's commands"),
  async execute(interaction, client) {
    if (interaction.user.id != '690634329591906316')
      return await interaction.reply({
        content: `Error 403: You cannot use this command`, ephemeral: true,
    });
    const embed = new EmbedBuilder()
      .setColor('Red')
      .setTitle(`All Bot Commands Deleted`)
      .setTimestamp(Date.now())
      .setFooter({
        text: `Requested By: ${interaction.user.username}`
      })
    rest.put(Routes.applicationCommands(clientId), { body: [] })
      .then(() => console.log('\x1b[41m%s\x1b[0m', "Succesfully deleted application (/) commands."))
      .catch(console.error);

    console.log('\x1b[41m%s\x1b[0m', `${interaction.user.username} - (${interaction.user.id}) has deleted the bot's commands`);
    await interaction.reply({
      embeds: [embed], ephemeral: true
    });
    console.log('\x1b[41m%s\x1b[0m', `${client.user.username} has been shutdown`);
    process.exit();
  },
};