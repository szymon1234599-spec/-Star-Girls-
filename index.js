require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  console.log(`Zalogowano jako ${client.user.tag}`);

  const channel = await client.channels.fetch('1502636585437364295');

  if (!channel) {
    console.log('Nie znaleziono kanału.');
    return;
  }

  const embed = new EmbedBuilder()
    .setTitle('🔐 Weryfikacja')
    .setDescription(
      'Kliknij przycisk poniżej aby przejść weryfikację.'
    )
    .setColor('#ff66cc')
    .setFooter({ text: 'StarGirls Verification System' })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel('Zweryfikuj się')
      .setStyle(ButtonStyle.Link)
      .setURL('https://vaultcord.win/stargirls')
  );

  await channel.send({
    embeds: [embed],
    components: [row]
  });

  console.log('Wysłano wiadomość weryfikacyjną.');
});

client.login(process.env.TOKEN);
