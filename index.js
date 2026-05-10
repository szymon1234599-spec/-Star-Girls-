require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ID KANAŁÓW
const VERIFY_CHANNEL_ID = '1503044167209713774';
const WELCOME_CHANNEL_ID = '1502632839928086660';
const SUGGESTION_CHANNEL_ID = '1503041038707724460';

// BOT ONLINE
client.once('ready', async () => {
  console.log(`✅ Zalogowano jako ${client.user.tag}`);

  try {
    // KANAŁ WERYFIKACJI
    const verifyChannel = await client.channels.fetch(VERIFY_CHANNEL_ID);

    if (!verifyChannel) {
      console.log('❌ Nie znaleziono kanału weryfikacji.');
      return;
    }

    // EMBED WERYFIKACJI
    const verifyEmbed = new EmbedBuilder()
      .setTitle('🔐 Weryfikacja')
      .setDescription(
        'Kliknij przycisk poniżej aby przejść weryfikację.'
      )
      .setColor('#ff66cc')
      .setFooter({
        text: 'Star Girls Verification'
      })
      .setTimestamp();

    // PRZYCISK
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Zweryfikuj się')
        .setStyle(ButtonStyle.Link)
        .setURL('https://vaultcord.win/stargirls')
    );

    // WYŚLIJ WIADOMOŚĆ
    await verifyChannel.send({
      embeds: [verifyEmbed],
      components: [row]
    });

    console.log('✅ Wysłano wiadomość weryfikacyjną.');

  } catch (err) {
    console.error('❌ Błąd:', err);
  }
});

// PRZYWITANIE
client.on('guildMemberAdd', async (member) => {
  try {
    const welcomeChannel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);

    if (!welcomeChannel) return;

    const welcomeEmbed = new EmbedBuilder()
      .setColor('#ff66cc')
      .setTitle('👋 Witaj na Star Girls!')
      .setDescription(
        `💖 ${member}, witamy na serwerze!\n\n` +
        `🎉 Jesteś **${member.guild.memberCount}** osobą na serwerze!\n\n` +
        `🔐 Przejdź weryfikację i baw się dobrze!\n\n` +
        `✨ Życzymy miłego pobytu!`
      )
      .setThumbnail(
        member.user.displayAvatarURL({ dynamic: true })
      )
      .setFooter({
        text: `Star Girls • ${new Date().getFullYear()}`
      })
      .setTimestamp();

    await welcomeChannel.send({
      content: `${member}`,
      embeds: [welcomeEmbed]
    });

    console.log('✅ Wysłano powitanie.');

  } catch (err) {
    console.error('❌ Błąd przy powitaniu:', err);
  }
});

// SYSTEM PROPOZYCJI
client.on('messageCreate', async (message) => {
  try {
    if (message.author.bot) return;

    if (message.channel.id !== SUGGESTION_CHANNEL_ID) return;

    const suggestionEmbed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('💧 Star Girls × PROPOZYCJA')
      .setDescription(
        `📦 **Opublikował:** ${message.author}\n` +
        `📝 **Treść propozycji:** ${message.content}\n` +
        `📆 **Data publikowania:** <t:${Math.floor(Date.now() / 1000)}:F>`
      )
      .setThumbnail(
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setFooter({
        text: `© ${new Date().getFullYear()} Star Girls × Propozycja`
      })
      .setTimestamp();

    // WYŚLIJ EMBED
    const sentMessage = await message.channel.send({
      embeds: [suggestionEmbed]
    });

    // REAKCJE
    await sentMessage.react('👍');
    await sentMessage.react('👎');
    await sentMessage.react('🤍');

    // THREAD
    await sentMessage.startThread({
      name: `Dyskusja • ${message.author.username}`,
      autoArchiveDuration: 1440,
      type: ChannelType.PublicThread
    });

    // USUŃ STARĄ WIADOMOŚĆ
    await message.delete();

    console.log('✅ Dodano propozycję.');

  } catch (err) {
    console.error('❌ Błąd propozycji:', err);
  }
});

// LOGIN
client.login(process.env.TOKEN);
