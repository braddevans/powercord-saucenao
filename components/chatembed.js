const { sendBotMessage } = require('../components/Functions');

const nhentai = require('nhentai');
const api = new nhentai.API();

module.exports = {
  executor: async (Code) => {
    const { cover, id, length, tags, titles, url } = await api.fetchDoujin(Code);

    const getDescription = () => {
      let description = `Tags: ${tags.tags.map(tag => tag.name).join(', ')}`;

      if (tags.characters.length > 0) {
        description += `\n\nCharacters: ${tags.characters.map(char => char.name).join(', ')}`;
      }

      return description;
    };

    return sendBotMessage({
      type: 'rich',
      url,
      title: titles.pretty,
      description: getDescription(),
      image: {
        url: `https://external-content.duckduckgo.com/iu/?u=${cover.url}`,
        width: cover.width,
        height: cover.height
      },
      color: '0x45f5f5',
      footer: {
        text: `${id} | ${length} Pages`
      }
    });
  }
};
