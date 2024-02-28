const apikey = "8b2a47e667mshb4ce639922717bep1ab33bjsn1943ed7458d0"
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('randomverse')
    .setDescription("Returns A Random Bible Verse"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true
    });
    const randomresponseoptions = {
        method: 'GET',
        url: 'https://iq-bible.p.rapidapi.com/GetRandomVerse',
        params: {versionId: 'kjv'},
        headers: {
            'X-RapidAPI-Key': `${apikey}`,
            'X-RapidAPI-Host': 'iq-bible.p.rapidapi.com'
        },
    };
    const randomresponse = await axios.request(randomresponseoptions);
    const getbookoptions = {
        method: 'GET',
        url: 'https://iq-bible.p.rapidapi.com/GetBookNameByVerseId',
        params: {
        verseId: `${randomresponse.data[0].id}`,
        language: 'english'
        },
        headers: {
        'X-RapidAPI-Key': `${apikey}`,
        'X-RapidAPI-Host': 'iq-bible.p.rapidapi.com'
        }
    };
    const getbook = await axios.request(getbookoptions);
    // console.log(randomresponse.data[0].id)
    // console.log(getbook.data)
    const embed = new EmbedBuilder()
      .setColor('Purple')
      .setTitle(`Random Bible Verse - (King James Version)`)
      .addFields([
        {
          name: `${getbook.data[0].n} ${randomresponse.data[0].c}:${randomresponse.data[0].v}`,
          value: `${randomresponse.data[0].t}`,
          inline: false
        },
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