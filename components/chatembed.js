const { imageWH, sendBotMessage } = require("../components/Functions");

const nhentai = require("nhentai");
const api = new nhentai.API();

let embed = {
  type: "rich",
  url: "",
  title: "",
  description: "",
  image: {},
  color: "0x45f5f5",
  footer: {
    text: "",
  },
};

module.exports = {
  executor: async (Code) => {
    api.fetchDoujin(Code).then(doujin => {
      console.log(doujin);
      let cover = doujin.cover.url;
      embed.description = `Tags: ${doujin.tags.tags.map(tag => tag.name).join(', ')}`;
      if (doujin.tags.characters.length > 0) {
        embed.description += `\n\nCharacters: ${doujin.tags.characters.map(char => char.name).join(', ')}`;
      }
      embed.title = doujin.titles.pretty;
      embed.url = doujin.url;
      embed.image = {
        url: "https://external-content.duckduckgo.com/iu/?u="+cover,
        width: doujin.cover.width,
        height: doujin.cover.height
      };
      embed.footer.text = `${doujin.id} | ${doujin.length} Pages`
      return sendBotMessage(embed);
    });
  }
};
