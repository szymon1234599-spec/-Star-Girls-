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
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', async () => {
  console.log(`Zalogowano jako ${client.user.tag}`);

  // KANAŁ WERYFIKACJI
  const verifyChannel = await client.channels.fetch('1502636585437364295');

  if (!verifyChannel) {
    console.log('Nie znaleziono kanału weryfikacji.');
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

  await verifyChannel.send({
    embeds: [embed],
    components: [row]
  });

  console.log('Wysłano wiadomość weryfikacyjną.');
});

// PRZYWITANIE
client.on('guildMemberAdd', async (member) => {
  const welcomeChannel = member.guild.channels.cache.get('1502632839928086660');

  if (!welcomeChannel) return;

  welcomeChannel.send(
    `💖 Witaj ${member} na serwerze **Star Girls**!\n🔐 Przejdź weryfikację i baw się dobrze!`
  );
});

client.login(process.env.TOKEN);
